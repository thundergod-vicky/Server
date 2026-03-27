import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { ZoomService } from '../zoom/zoom.service';

@Injectable()
export class ClassSessionsService {
  constructor(
    private prisma: PrismaService,
    private notifications: NotificationsService,
    private zoomService: ZoomService,
  ) {}

  async create(data: {
    title: string;
    type: 'LECTURE' | 'PRACTICAL' | 'WORKSHOP';
    teacherId: string;
    batchId: string;
    subjectId?: string;
    date: string;
    startTime: string;
    endTime: string;
    venue?: string;
    isOnline?: boolean;
    meetingUrl?: string;
    meetingId?: string;
    meetingPasscode?: string;
  }) {
    const meetingUrl: string | null = data.meetingUrl || null;
    const meetingId: string | null = data.meetingId || null;
    const meetingPasscode: string | null = data.meetingPasscode || null;

    /* 
    // Auto-generation disabled as per user request to favor manual entry
    if (data.isOnline && !meetingUrl) {
      const start = new Date(`${data.date.split('T')[0]}T${data.startTime}:00`);
      const end = new Date(`${data.date.split('T')[0]}T${data.endTime}:00`);
      const duration = Math.max(
        30,
        Math.round((end.getTime() - start.getTime()) / 60000),
      );

      try {
        const meeting = await this.zoomService.createMeeting(
          data.title,
          start.toISOString(),
          duration,
        );
        meetingUrl = meeting.joinUrl;
        meetingId = meeting.meetingId;
      } catch (err) {
        // Fallback or ignore if zoom fails, just create an offline class, or log it
        console.error('Failed to create zoom meeting for class session', err);
      }
    }
    */

    const session = await this.prisma.classSession.create({
      data: {
        title: data.title,
        type: data.type,
        teacherId: data.teacherId,
        batchId: data.batchId,
        subjectId: data.subjectId || null,
        date: new Date(data.date),
        startTime: data.startTime,
        endTime: data.endTime,
        venue: data.venue,
        isOnline: data.isOnline || false,
        meetingUrl: meetingUrl,
        meetingId: meetingId,
        meetingPasscode: meetingPasscode,
      },
      include: {
        teacher: { select: { id: true, name: true } },
        batch: { include: { students: { select: { id: true } } } },
      },
    });

    // Send notification to teacher
    await this.notifications.create(
      session.teacher.id,
      `New Class Scheduled`,
      `You have a new ${session.type.toLowerCase()} session: "${session.title}" on ${new Date(session.date).toDateString()} from ${session.startTime} to ${session.endTime}${session.venue ? ' at ' + session.venue : ''}.`,
      'INFO',
    );

    // Send notification to all students in the batch
    for (const student of session.batch.students) {
      await this.notifications.create(
        student.id,
        `New Class Scheduled`,
        `A new ${session.type.toLowerCase()} session "${session.title}" has been scheduled for your batch on ${new Date(session.date).toDateString()} from ${session.startTime} to ${session.endTime}${session.venue ? ' at ' + session.venue : ''}.${session.isOnline ? ' This is an online session. Join Link is available in the schedule.' : ''}`,
        'INFO',
      );
    }

    return session;
  }

  async update(
    id: string,
    data: {
      title?: string;
      type?: 'LECTURE' | 'PRACTICAL' | 'WORKSHOP';
      teacherId?: string;
      batchId?: string;
      subjectId?: string;
      date?: string;
      startTime?: string;
      endTime?: string;
      venue?: string;
      isOnline?: boolean;
      meetingUrl?: string;
      meetingId?: string;
      meetingPasscode?: string;
    },
  ) {
    return this.prisma.classSession.update({
      where: { id },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.type && { type: data.type }),
        ...(data.teacherId && { teacherId: data.teacherId }),
        ...(data.batchId && { batchId: data.batchId }),
        ...(data.subjectId !== undefined && {
          subjectId: data.subjectId || null,
        }),
        ...(data.date && { date: new Date(data.date) }),
        ...(data.startTime && { startTime: data.startTime }),
        ...(data.endTime && { endTime: data.endTime }),
        ...(data.venue !== undefined && { venue: data.venue }),
        ...(data.isOnline !== undefined && { isOnline: data.isOnline }),
        ...(data.meetingUrl !== undefined && { meetingUrl: data.meetingUrl }),
        ...(data.meetingId !== undefined && { meetingId: data.meetingId }),
        ...(data.meetingPasscode !== undefined && {
          meetingPasscode: data.meetingPasscode,
        }),
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.classSession.findUnique({
      where: { id },
    });
  }

  async findAll(filters?: {
    batchId?: string;
    teacherId?: string;
    date?: string;
  }) {
    return this.prisma.classSession.findMany({
      where: {
        ...(filters?.batchId && { batchId: filters.batchId }),
        ...(filters?.teacherId && { teacherId: filters.teacherId }),
        ...(filters?.date && {
          date: {
            gte: new Date(new Date(filters.date).setHours(0, 0, 0, 0)),
            lte: new Date(new Date(filters.date).setHours(23, 59, 59, 999)),
          },
        }),
      },
      include: {
        teacher: { select: { id: true, name: true, profileImage: true } },
        batch: { select: { id: true, name: true } },
        subject: true,
        recordings: true,
        attachments: true,
      },
      orderBy: [{ createdAt: 'desc' }, { date: 'asc' }, { startTime: 'asc' }],
    });
  }

  async findByTeacher(teacherId: string) {
    return this.prisma.classSession.findMany({
      where: { teacherId },
      include: {
        batch: { select: { id: true, name: true } },
        teacher: { select: { id: true, name: true, profileImage: true } },
        subject: true,
        recordings: true,
        attachments: true,
      },
      orderBy: [{ createdAt: 'desc' }, { date: 'asc' }, { startTime: 'asc' }],
    });
  }

  async findByStudent(studentId: string) {
    // Get the batches this student is enrolled in
    const user = await this.prisma.user.findUnique({
      where: { id: studentId },
      include: { batchesEnrolled: { select: { id: true } } },
    });
    const batchIds = user?.batchesEnrolled.map((b) => b.id) ?? [];
    return this.prisma.classSession.findMany({
      where: { batchId: { in: batchIds } },
      include: {
        teacher: { select: { id: true, name: true, profileImage: true } },
        batch: { select: { id: true, name: true } },
        subject: true,
        recordings: true,
        attachments: true,
      },
      orderBy: [{ createdAt: 'desc' }, { date: 'asc' }, { startTime: 'asc' }],
    });
  }

  // Artifact Management
  async addRecording(
    sessionId: string,
    title: string,
    url: string,
    passcode?: string,
  ) {
    return this.prisma.sessionRecording.create({
      data: { sessionId, title, url, passcode },
    });
  }

  async updateRecording(id: string, title: string) {
    return this.prisma.sessionRecording.update({
      where: { id },
      data: { title },
    });
  }

  async removeRecording(id: string) {
    return this.prisma.sessionRecording.delete({ where: { id } });
  }

  async addAttachment(
    sessionId: string,
    title: string,
    url: string,
    type: string,
  ) {
    return this.prisma.sessionAttachment.create({
      data: { sessionId, title, url, type },
    });
  }

  async removeAttachment(id: string) {
    return this.prisma.sessionAttachment.delete({ where: { id } });
  }

  /**
   * Sync recording — checks DB first (S3-backed from Lambda), falls back to Zoom API
   */
  async syncRecording(id: string) {
    const session = await this.prisma.classSession.findUnique({
      where: { id },
      include: {
        recordings: {
          where: { status: { not: 'deleted' } },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!session || !session.meetingId || !session.isOnline) {
      return null;
    }

    // Check if we already have S3-backed recordings (from Lambda webhook)
    const s3Recordings = session.recordings.filter(
      (r) => r.s3Key && r.status === 'ready',
    );

    if (s3Recordings.length > 0) {
      return {
        recordings: s3Recordings,
        source: 's3',
      };
    }

    // Check if recordings are currently being processed by Lambda
    const processingRecordings = session.recordings.filter(
      (r) => r.status === 'processing',
    );

    if (processingRecordings.length > 0) {
      return {
        recordings: processingRecordings,
        source: 's3',
        processing: true,
      };
    }

    // If we have any non-S3 recordings already in DB, return them
    if (session.recordings.length > 0) {
      return {
        recordings: session.recordings,
        url: session.recordings[0].url,
        passcode: session.recordings[0].passcode,
        source: 'legacy',
      };
    }

    // Return cached legacy fields if present
    if (session.recordingUrl && session.recordingPasscode) {
      return {
        url: session.recordingUrl,
        passcode: session.recordingPasscode,
        source: 'legacy',
      };
    }

    // Fallback: try to fetch recording from Zoom API (for meetings not yet processed by Lambda)
    try {
      console.log(
        `[ClassSessionsService] Syncing recording for session ${id}, meetingId: ${session.meetingId}`,
      );
      const walk = await this.zoomService.getMeetingRecording(
        session.meetingId,
      );

      if (walk && walk.recordings && walk.recordings.length > 0) {
        // DO NOT save to SessionRecording table anymore to avoid duplicates with S3
        // Just return the Zoom records as a transient fallback
        const transientRecordings = walk.recordings.map((rec, index) => ({
          id: `zoom-temp-${rec.id}`,
          title:
            rec.file_type === 'SHARE_URL'
              ? 'Zoom Share Link'
              : `Recording Part ${index + 1} - ${new Date(
                  rec.recording_start || new Date(),
                ).toLocaleTimeString()}`,
          url: rec.url,
          zoomFileId: rec.id,
          passcode: walk.password,
          fileType: rec.file_type,
          status: 'ready',
          recordedAt: rec.recording_start ? new Date(rec.recording_start) : null,
          sessionId: id,
          isTransient: true,
        }));

        // Update legacy fields for backward compatibility (optional but kept for safety)
        if (walk.recordings.length > 0) {
          await this.prisma.classSession.update({
            where: { id },
            data: {
              recordingUrl: walk.recordings[0].url,
              recordingPasscode: walk.password,
            },
          });
        }

        return {
          url: walk.recordings[0].url,
          passcode: walk.password,
          recordings: transientRecordings,
          source: 'zoom',
        };
      } else {
        console.log(
          `[ClassSessionsService] No recording found for meeting ${session.meetingId}`,
        );
      }
    } catch (err) {
      console.error(
        '[ClassSessionsService] Failed to sync Zoom recording',
        err,
      );
    }

    return null;
  }

  async delete(id: string) {
    return this.prisma.classSession.delete({ where: { id } });
  }
}
