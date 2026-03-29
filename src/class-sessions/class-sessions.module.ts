import { Module } from '@nestjs/common';
import { ClassSessionsController } from './class-sessions.controller';
import { ClassSessionsService } from './class-sessions.service';
import { PrismaModule } from '../prisma/prisma.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { ZoomModule } from '../zoom/zoom.module';
import { GoogleModule } from '../google/google.module';
import { RecordingsModule } from '../recordings/recordings.module';
import { DriveWatcherService } from './drive-watcher.service';

@Module({
  imports: [PrismaModule, NotificationsModule, ZoomModule, GoogleModule, RecordingsModule],
  controllers: [ClassSessionsController],
  providers: [ClassSessionsService, DriveWatcherService],
  exports: [ClassSessionsService],
})
export class ClassSessionsModule {}
