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
import { OmrModule } from './omr/omr.module';
import { ClassSessionsModule } from './class-sessions/class-sessions.module';
import { WebinarGGModule } from './webinar-gg/webinar-gg.module';
import { ZoomModule } from './zoom/zoom.module';
import { BillingModule } from './billing/billing.module';
import { ExamsModule } from './exams/exams.module';
import { RecordingsModule } from './recordings/recordings.module';
import { AdmissionsModule } from './admissions/admissions.module';
import { AttendanceModule } from './attendance/attendance.module';

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
    OmrModule,
    ClassSessionsModule,
    WebinarGGModule,
    ZoomModule,
    BillingModule,
    ExamsModule,
    RecordingsModule,
    AdmissionsModule,
    AttendanceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
