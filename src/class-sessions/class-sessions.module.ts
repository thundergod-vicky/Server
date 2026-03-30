import { Module } from '@nestjs/common';
import { ClassSessionsController } from './class-sessions.controller';
import { ClassSessionsService } from './class-sessions.service';
import { PrismaModule } from '../prisma/prisma.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { ZoomModule } from '../zoom/zoom.module';
import { WebinarGGModule } from '../webinar-gg/webinar-gg.module';

@Module({
  imports: [PrismaModule, NotificationsModule, ZoomModule, WebinarGGModule],
  controllers: [ClassSessionsController],
  providers: [ClassSessionsService],
  exports: [ClassSessionsService],
})
export class ClassSessionsModule {}
