import { Module, forwardRef } from '@nestjs/common';
import { AdmissionsService } from './admissions.service';
import { AdmissionsController } from './admissions.controller';
import { ContentModule } from '../content/content.module';
import { PrismaModule } from '../prisma/prisma.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [ContentModule, PrismaModule, NotificationsModule, forwardRef(() => UsersModule)],
  providers: [AdmissionsService],
  controllers: [AdmissionsController],
  exports: [AdmissionsService],
})
export class AdmissionsModule {}
