import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { getSignedUrl } from '@aws-sdk/cloudfront-signer';
import {
  S3Client,
  DeleteObjectsCommand,
} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { GoogleService } from '../google/google.service';
import * as fs from 'fs';
import * as path from 'path';

interface RecordingFileInput {
  zoomFileId: string;
  fileType: string;
  recordedAt?: string;
  durationSecs?: number;
}

interface SavedFileInput {
  zoomFileId: string;
  s3Key: string;
  fileType: string;
}

@Injectable()
export class RecordingsService {
  private s3: S3Client;
  private cloudfrontPrivateKey: string;

  constructor(
    private prisma: PrismaService,
    private googleService: GoogleService,
  ) {
    this.s3 = new S3Client({ region: process.env.AWS_S3_REGION || 'ap-south-1' });

    // Read CloudFront private key from file
    try {
      const keyPath = path.resolve(
        process.cwd(),
        'cloudfront_private.pem',
      );
      this.cloudfrontPrivateKey = fs.readFileSync(keyPath, 'utf-8');
    } catch {
      console.warn(
        '[RecordingsService] cloudfront_private.pem not found — signed URLs will not work',
      );
      this.cloudfrontPrivateKey = '';
    }
  }

  /**
   * Generate a CloudFront signed URL for streaming a recording
   */
  async getStreamUrl(recordingId: string) {
    const recording = await this.prisma.sessionRecording.findUnique({
      where: { id: recordingId },
    });

    if (!recording || recording.status === 'deleted') {
      return null;
    }

    // If recording is still processing, return status info
    if (recording.status === 'processing') {
      return {
        status: 'processing',
        fileType: recording.fileType,
      };
    }

    // If no s3Key, fall back to the legacy direct URL
    if (!recording.s3Key) {
      return {
        url: recording.url,
        fileType: recording.fileType || 'MP4',
        duration: recording.durationSecs,
        status: 'ready',
        legacy: true,
      };
    }

    const domain = process.env.CLOUDFRONT_DOMAIN;
    const keyPairId = process.env.CLOUDFRONT_KEY_PAIR_ID;

    if (!domain || !keyPairId || !this.cloudfrontPrivateKey) {
      console.error(
        '[RecordingsService] CloudFront config missing — returning unsigned URL',
      );
      return {
        url: `https://${domain || 's3-direct'}/${recording.s3Key}`,
        fileType: recording.fileType || 'MP4',
        duration: recording.durationSecs,
        status: 'ready',
      };
    }

    const signedUrl = getSignedUrl({
      url: `https://${domain}/${recording.s3Key}`,
      keyPairId,
      privateKey: this.cloudfrontPrivateKey,
      dateLessThan: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours
    });

    return {
      url: signedUrl,
      fileType: recording.fileType || 'MP4',
      duration: recording.durationSecs,
      status: 'ready',
    };
  }

  /**
   * Soft-delete a recording and remove from S3
   */
  async deleteRecording(recordingId: string) {
    const recording = await this.prisma.sessionRecording.findUnique({
      where: { id: recordingId },
    });

    if (!recording || recording.status === 'deleted') {
      return null;
    }

    // Delete from S3 if s3Key exists
    if (recording.s3Key) {
      try {
        await this.s3.send(
          new DeleteObjectsCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Delete: { Objects: [{ Key: recording.s3Key }] },
          }),
        );
      } catch (err) {
        console.error(
          `[RecordingsService] Failed to delete S3 object ${recording.s3Key}`,
          err,
        );
      }
    }

    // Soft delete in DB
    await this.prisma.sessionRecording.update({
      where: { id: recordingId },
      data: { status: 'deleted' },
    });

    return { success: true };
  }

  /**
   * Step 1: Lambda calls this when recording.completed webhook fires.
   * Creates recording rows with status='processing'.
   */
  async markProcessing(
    zoomMeetingUuid: string,
    topic: string,
    startTime: string,
    files: RecordingFileInput[],
  ) {
    // Find the ClassSession by meetingId (Zoom numeric meeting ID)
    // The Lambda sends the UUID, but our DB stores the numeric meeting ID
    // We need to find sessions that match this meeting
    const sessions = await this.prisma.classSession.findMany({
      where: {
        meetingId: { not: null },
        isOnline: true,
      },
      select: { id: true, meetingId: true, title: true },
    });

    // Try to find a matching session — Zoom UUIDs are unique per instance,
    // but the numeric meetingId is what we store. We'll try to match.
    // If no match is found, we store them anyway for later matching.
    const matchedSession = sessions.find((s) => s.meetingId === zoomMeetingUuid);

    if (!matchedSession) {
      // The UUID might not match directly — store a placeholder URL
      console.log(
        `[RecordingsService] No session found for meeting UUID: ${zoomMeetingUuid}. ` +
          `Will create recordings that can be matched later.`,
      );
    }

    const created: any[] = [];
    for (const file of files) {
      const title =
        files.length === 1
          ? topic || 'Recording'
          : `${topic || 'Recording'} - Part ${files.indexOf(file) + 1}`;

      if (matchedSession) {
        const recording = await this.prisma.sessionRecording.upsert({
          where: {
            sessionId_url: {
              sessionId: matchedSession.id,
              url: `zoom://${zoomMeetingUuid}/${file.zoomFileId}`,
            },
          },
          create: {
            sessionId: matchedSession.id,
            title,
            url: `zoom://${zoomMeetingUuid}/${file.zoomFileId}`,
            zoomFileId: file.zoomFileId,
            fileType: file.fileType,
            status: 'processing',
            durationSecs: file.durationSecs || null,
            recordedAt: file.recordedAt ? new Date(file.recordedAt) : null,
          },
          update: {
            status: 'processing',
            fileType: file.fileType,
            durationSecs: file.durationSecs || null,
            recordedAt: file.recordedAt ? new Date(file.recordedAt) : null,
            zoomFileId: file.zoomFileId,
          },
        });
        created.push(recording);
      }
    }

    return { matched: !!matchedSession, created: created.length };
  }

  /**
   * Step 2: Lambda calls this after uploading all files to S3.
   * Updates recordings with S3 keys and sets status='ready'.
   */
  async markReady(zoomMeetingUuid: string, savedFiles: SavedFileInput[]) {
    let updated = 0;

    for (const file of savedFiles) {
      try {
        // Find the recording by URL pattern
        const recording = await this.prisma.sessionRecording.findFirst({
          where: {
            OR: [
              { zoomFileId: file.zoomFileId },
              { url: `zoom://${zoomMeetingUuid}/${file.zoomFileId}` },
            ],
          },
        });

        if (recording) {
          await this.prisma.sessionRecording.update({
            where: { id: recording.id },
            data: {
              s3Key: file.s3Key,
              status: 'ready',
              fileType: file.fileType,
            },
          });
          updated++;
        }
      } catch (err) {
        console.error(
          `[RecordingsService] Failed to mark recording ready for file ${file.zoomFileId}`,
          err,
        );
      }
    }

    return { updated };
  }

  /**
   * Stream a file from Google Drive directly to AWS S3
   */
  async processDriveRecording(fileId: string, sessionId: string) {
    try {
      // 1. Get Metadata
      const metadata = await this.googleService.getFileMetadata(fileId);
      const fileName = metadata.name || `Recording-${fileId}.mp4`;
      const s3Key = `recordings/${sessionId}/${Date.now()}-${fileName}`;

      // 2. Create/Update record as processing
      const recording = await this.prisma.sessionRecording.upsert({
        where: {
          sessionId_url: {
            sessionId,
            url: `drive://${fileId}`,
          },
        },
        create: {
          sessionId,
          title: fileName.replace('.mp4', ''),
          url: `drive://${fileId}`,
          status: 'processing',
          fileType: 'MP4',
          recordedAt: metadata.createdTime
            ? new Date(metadata.createdTime)
            : new Date(),
        },
        update: {
          status: 'processing',
        },
      });

      // 3. Get stream from Google Drive
      const driveStream = await this.googleService.getFileStream(fileId);

      // 4. Upload to S3 using streaming (multipart upload)
      const upload = new Upload({
        client: this.s3,
        params: {
          Bucket: process.env.AWS_S3_BUCKET_NAME || 'src-adhyayan',
          Key: s3Key,
          Body: driveStream,
          ContentType: 'video/mp4',
        },
      });

      await upload.done();

      // 5. Mark as ready
      await this.prisma.sessionRecording.update({
        where: { id: recording.id },
        data: {
          s3Key: s3Key,
          status: 'ready',
        },
      });

      console.log(
        `[RecordingsService] Successfully transferred Drive file ${fileId} to S3 bucket`,
      );
      return { success: true, recordingId: recording.id };
    } catch (error) {
      console.error(
        `[RecordingsService] Failed to process Drive recording ${fileId}`,
        error,
      );
      throw error;
    }
  }

  /**
   * Called by the WebhookController when a new recording file is generated.
   */
  async processNewRecording(meetingUri: string, driveFileId: string) {
    try {
      // Find the session associated with this meeting URI
      // meetingUri typically looks like https://meet.google.com/abc-defg-hij
      const session = await this.prisma.classSession.findFirst({
        where: {
          meetingUrl: {
            contains: meetingUri,
          },
        },
      });

      if (!session) {
        console.warn(
          `[RecordingsService] Webhook received for unknown meeting: ${meetingUri}`,
        );
        return;
      }

      console.log(
        `[RecordingsService] Triggering recording transfer for session ${session.id} (Meeting: ${meetingUri})`,
      );

      // Start the Drive-to-S3 transfer
      return this.processDriveRecording(driveFileId, session.id);
    } catch (error) {
      console.error(
        `[RecordingsService] Error processing new recording event for ${meetingUri}`,
        error,
      );
    }
  }

  /**
   * List all non-deleted recordings for a session
   */
  async getBySession(sessionId: string) {
    return this.prisma.sessionRecording.findMany({
      where: {
        sessionId,
        status: { not: 'deleted' },
      },
      orderBy: { createdAt: 'asc' },
    });
  }
}
