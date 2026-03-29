import { Controller, Post, Body, HttpCode, Logger } from '@nestjs/common';
import { RecordingsService } from '../recordings/recordings.service';

interface PubSubMessage {
  message: {
    data: string; // Base64 encoded JSON
    messageId: string;
    publishTime: string;
  };
  subscription: string;
}

interface MeetEvent {
  '@type': string;
  eventTime: string;
  meetingUri: string;
  recording: {
    driveDestination: {
      fileId: string;
    };
  };
}

@Controller('webhooks')
export class WebhooksController {
  private readonly logger = new Logger(WebhooksController.name);

  constructor(private readonly recordingsService: RecordingsService) {}

  @Post('meet')
  @HttpCode(200)
  async handleMeetEvent(@Body() body: PubSubMessage) {
    if (!body?.message?.data) {
      this.logger.warn('Received Pub/Sub message with no data');
      return { status: 'no_data' };
    }

    try {
      // 1. Decode Base64
      const decodedData = Buffer.from(body.message.data, 'base64').toString('utf-8');
      const event = JSON.parse(decodedData) as MeetEvent;

      this.logger.log(`Received Meet Event: ${event['@type'] || 'unknown'}`);

      // 2. Verify Event Type
      // Format: type.googleapis.com/google.workspace.meet.recording.v2.fileGenerated
      if (!event['@type']?.includes('google.workspace.meet.recording.v2.fileGenerated')) {
        this.logger.log('Ignoring non-recording event');
        return { status: 'ignored' };
      }

      // 3. Extract Data
      const meetingUri = event.meetingUri;
      const driveFileId = event.recording?.driveDestination?.fileId;

      if (!meetingUri || !driveFileId) {
        this.logger.error('Missing meetingUri or driveFileId in event payload');
        return { status: 'missing_fields' };
      }

      this.logger.log(`New recording generated for ${meetingUri}: ${driveFileId}`);

      // 4. Process (Fire and forget from the webhook's perspective)
      // await is not strictly needed if we want to return 200 fast, but for robustness:
      await this.recordingsService.processNewRecording(meetingUri, driveFileId).catch(err => {
        this.logger.error(`Failed to trigger recording process for ${meetingUri}`, err);
      });

      return { status: 'processing' };
    } catch (error) {
      this.logger.error('Failed to parse Pub/Sub message data', error);
      return { status: 'error' };
    }
  }
}
