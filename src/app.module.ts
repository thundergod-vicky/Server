import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ContentModule } from './content/content.module';
import { CoursesModule } from './courses/courses.module';
import { PracticeTestsModule } from './practice-tests/practice-tests.module';
import { PaymentsModule } from './payments/payments.module';
import { ChatModule } from './chat/chat.module';
import { NotificationsModule } from './notifications/notifications.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { ProgressModule } from './progress/progress.module';
import { AdminModule } from './admin/admin.module';
import { BatchesModule } from './batches/batches.module';
import { PublicModule } from './public/public.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    ContentModule,
    CoursesModule,
    PracticeTestsModule,
    PaymentsModule,
    ChatModule,
    NotificationsModule,
    EnrollmentModule,
    ProgressModule,
    AdminModule,
    BatchesModule,
    PublicModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
