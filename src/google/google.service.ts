import { Injectable, Logger } from '@nestjs/common';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

@Injectable()
export class GoogleService {
  private readonly logger = new Logger(GoogleService.name);
  private auth: JWT;

  constructor() {
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const adminEmail = process.env.GOOGLE_ADMIN_EMAIL;

    if (!email || !privateKey || !adminEmail) {
      this.logger.error(
        'Missing Google API credentials in environment variables',
      );
    }

    this.auth = new google.auth.JWT({
      email: email,
      key: privateKey,
      scopes: [
        'https://www.googleapis.com/auth/calendar.events',
        'https://www.googleapis.com/auth/drive.readonly',
        'https://www.googleapis.com/auth/drive.metadata.readonly',
        'https://www.googleapis.com/auth/meetings.space.settings',
      ],
      subject: adminEmail,
    });
  }

  async createMeetLink(
    title: string,
    startTime: Date,
    endTime: Date,
    teacherEmail?: string,
  ): Promise<{ meetLink: string; spaceCode: string }> {
    const calendar = google.calendar({ version: 'v3', auth: this.auth });
    const adminEmail = process.env.GOOGLE_ADMIN_EMAIL;

    try {
      this.logger.log(
        `Creating Meet Link as ${adminEmail} for: ${title} (${startTime.toISOString()})`,
      );
      const event = await calendar.events.insert({
        calendarId: 'primary',
        conferenceDataVersion: 1,
        requestBody: {
          summary: title,
          description: 'Class Session via Google Meet',
          start: { dateTime: startTime.toISOString() },
          end: { dateTime: endTime.toISOString() },
          conferenceData: {
            createRequest: {
              requestId: `meet-${Date.now()}`,
              conferenceSolutionKey: { type: 'hangoutsMeet' },
            },
          },
        },
      });

      const meetLink = event.data.hangoutLink;
      const spaceCode = event.data.conferenceData?.conferenceId;
      if (!meetLink || !spaceCode) {
        this.logger.warn(
          'Calendar event created, but Google Meet link was not generated. Check if Meet is enabled for this account.',
        );
        throw new Error('Failed to generate Meet link');
      }

      this.logger.log(`Generated Meet space: ${spaceCode} at ${meetLink}`);

      // Add teacher as co-host if email is provided
      if (teacherEmail) {
        try {
          this.logger.log(`Adding teacher as co-host: ${teacherEmail}`);
          // Using manual request as v2beta members API might not be in the current googleapis version
          await this.auth.request({
            method: 'POST',
            url: `https://meet.googleapis.com/v2beta/spaces/${spaceCode}/members`,
            data: {
              role: 'COHOST',
              user: {
                name: `users/${teacherEmail}`,
              },
            },
          });
          this.logger.log(
            `Successfully added teacher ${teacherEmail} as co-host`,
          );
        } catch (memberError: any) {
          const errMsg =
            memberError.response?.data?.error?.message || memberError.message;
          this.logger.warn(
            `Failed to add teacher as co-host: ${errMsg}. They will still be an attendee.`,
          );
        }
      }

      return { meetLink, spaceCode };
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error?.message || error.message;
      this.logger.error(
        `Error creating Google Meet meeting: ${errorMessage}`,
        error.stack,
      );
      throw error;
    }
  }

  async getFileStream(fileId: string) {
    const drive = google.drive({ version: 'v3', auth: this.auth });
    try {
      const response = await drive.files.get(
        { fileId, alt: 'media' },
        { responseType: 'stream' },
      );
      return response.data;
    } catch (error) {
      this.logger.error(
        `Error fetching file stream from Drive: ${fileId}`,
        error,
      );
      throw error;
    }
  }

  async getFileMetadata(fileId: string) {
    const drive = google.drive({ version: 'v3', auth: this.auth });
    try {
      const response = await drive.files.get({
        fileId,
        fields: 'id, name, mimeType, webContentLink, createdTime',
      });
      return response.data;
    } catch (error) {
      this.logger.error(
        `Error fetching file metadata from Drive: ${fileId}`,
        error,
      );
      throw error;
    }
  }

  async listNewRecordings(folderId: string, since: Date) {
    const drive = google.drive({ version: 'v3', auth: this.auth });
    try {
      const response = await drive.files.list({
        q: `'${folderId}' in parents and mimeType = 'video/mp4' and createdTime > '${since.toISOString()}'`,
        fields: 'files(id, name, createdTime)',
      });
      return response.data.files || [];
    } catch (error) {
      this.logger.error(
        `Error listing recordings in Drive folder: ${folderId}`,
        error,
      );
      throw error;
    }
  }

  async subscribeToRecording(spaceCode: string) {
    const workspaceEvents = google.workspaceevents({
      version: 'v1',
      auth: this.auth,
    });

    const topicName = process.env.PUBSUB_TOPIC_NAME;
    if (!topicName) {
      this.logger.error('PUBSUB_TOPIC_NAME not configured');
      return;
    }

    try {
      this.logger.log(`Subscribing to Meet space events: spaces/${spaceCode}`);
      const res = await workspaceEvents.subscriptions.create({
        requestBody: {
          targetResource: `//meet.googleapis.com/spaces/${spaceCode}`,
          eventTypes: ['google.workspace.meet.recording.v2.fileGenerated'],
          notificationEndpoint: {
            pubsubTopic: topicName,
          },
          payloadOptions: {
            includeResource: true,
          },
        },
      });

      this.logger.log(`Subscription created: ${res.data.name}`);
      return res.data;
    } catch (error) {
      this.logger.error(
        `Error subscribing to Meet recording events for space: ${spaceCode}`,
        error,
      );
      // We don't throw here to avoid failing class creation if only the recording hook fails
    }
  }
}
