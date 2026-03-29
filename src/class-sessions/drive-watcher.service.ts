import { Injectable, Logger } from '@nestjs/common';
import { GoogleService } from '../google/google.service';
import { RecordingsService } from '../recordings/recordings.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DriveWatcherService {
  private readonly logger = new Logger(DriveWatcherService.name);

  constructor(
    private googleService: GoogleService,
    private recordingsService: RecordingsService,
    private prisma: PrismaService,
  ) {}

  /**
   * Scan the Google Drive folder for new recordings and sync them to S3
   */
  async syncRecentRecordings(sessionId: string) {
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
    if (!folderId) {
      this.logger.error('GOOGLE_DRIVE_FOLDER_ID not configured');
      return;
    }

    // Scan for files created in the last 24 hours (or adjust based on need)
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const files = await this.googleService.listNewRecordings(folderId, yesterday);

    for (const file of files) {
      if (!file.id) continue;

      // Check if we already have this recording in our DB (S3-backed)
      const existing = await this.prisma.sessionRecording.findFirst({
        where: {
          sessionId,
          url: `drive://${file.id}`,
        },
      });

      if (!existing || existing.status === 'processing') {
        this.logger.log(`Starting automated transfer for Drive file: ${file.name} (${file.id})`);
        
        // This runs asynchronously to avoid blocking
        this.recordingsService.processDriveRecording(file.id, sessionId)
          .catch(err => this.logger.error(`Failed to process recording ${file.id}`, err));
      }
    }
  }

  /**
   * Helper to set up a Drive Watch (Push Notification)
   * This would be called once during class creation or via a cron
   */
  async setupFolderWatch() {
    // Implementation for google.drive.changes.watch or files.watch
    // Requires a public URL to receive the POST from Google
  }
}
