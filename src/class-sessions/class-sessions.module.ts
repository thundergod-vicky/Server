import { Module } from '@nestjs/common';
import { ClassSessionsController } from './class-sessions.controller';
import { ClassSessionsService } from './class-sessions.service';
import { PrismaModule } from '../prisma/prisma.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [PrismaModule, NotificationsModule],
  controllers: [ClassSessionsController],
  providers: [ClassSessionsService],
  exports: [ClassSessionsService],
})
export class ClassSessionsModule {}
