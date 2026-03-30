/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Controller,
  Post,
  Param,
  Req,
  UseGuards,
  Body,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { WebinarGGService } from './webinar-gg.service';
import { EncryptionService } from './encryption.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RecordingsService } from '../recordings/recordings.service';
import { Role } from '@prisma/client';

interface RequestWithUser extends Request {
  user: {
    id?: string;
    userId?: string;
    email: string;
    role: Role;
    name?: string;
  };
}

@Controller('webinars')
export class WebinarsController {
  constructor(
    private webinarService: WebinarGGService,
    private encryption: EncryptionService,
    private prisma: PrismaService,
    private recordingsService: RecordingsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('join/:sessionId')
  async join(
    @Param('sessionId') sessionId: string,
    @Req() req: RequestWithUser,
  ) {
    const user = req.user;
    const session = await this.prisma.classSession.findUnique({
      where: { id: sessionId },
    });

    if (!session || !session.webinarId) {
      console.error(
        `[WebinarsController] Join failed for sessionId: ${sessionId}`,
      );
      if (!session) console.error('  - Reason: Session not found in database');
      else if (!session.webinarId)
        console.error('  - Reason: webinarId is missing on session');

      throw new NotFoundException(
        'Webinar session not found or not configured.',
      );
    }

    // 1. Log Attendance (Students only)
    console.log(
      `[WebinarsController] Joining session: ${sessionId}, webinarId: ${session.webinarId}`,
    );
    console.log(`  - User: ${user.email}, role: ${user.role}`);

    // LOG: Attendance for students
    if (user.role === Role.STUDENT) {
      const studentId = user.id || user.userId;
      if (!studentId) {
        throw new InternalServerErrorException('User ID not found in token');
      }

      console.log('  - Logging student attendance...');
      await this.prisma.sessionAttendance.upsert({
        where: {
          sessionId_studentId: {
            sessionId,
            studentId,
          },
        },
        update: { joinedAt: new Date() },
        create: {
          sessionId,
          studentId,
          joinedAt: new Date(),
        },
      });
    }

    // 2. Generate Join Token
    // Fetch the assigned teacher's Webinar credentials
    const teacherAccount = await this.webinarService.getTeacherWebinarAccount(
      session.teacherId,
    );
    const apiKey = teacherAccount.apiKey;

    try {
      const isHost = (
        [Role.TEACHER, Role.ADMIN, Role.ACADEMIC_OPERATIONS] as Role[]
      ).includes(user.role);

      // Identity for Webinar.gg
      let joinEmail: string;
      let firstName: string;
      let lastName: string;

      if (isHost) {
        // For hosts (teachers/admins), use the assigned Teacher's Webinar credentials
        // This ensures Webinar.gg grants Host/Organizer privileges
        joinEmail = teacherAccount.email || user.email;
        const displayName: string =
          teacherAccount.name || user.name || 'Webinar Organizer';
        const nameParts = displayName.split(' ');
        firstName = nameParts[0];
        lastName = nameParts.slice(1).join(' ') || 'Organizer';
      } else {
        // For students, use their own identity for tracking
        joinEmail = user.email;
        const displayName: string = user.name || user.email || 'User Participant';
        const names = displayName.split(' ');
        firstName = names[0];
        lastName = names.slice(1).join(' ') || 'Participant';
      }

      console.log(
        `  - Identity for Webinar.gg: ${joinEmail} (${firstName} ${lastName}) (Host: ${isHost})`,
      );

      const token = await this.webinarService.generateJoinToken({
        webinarId: session.webinarId,
        firstName,
        lastName,
        email: joinEmail,
        apiKey,
        passcode: '', // Standard webinars usually have no passcode or handled via token
        role: isHost ? 'host' : 'audience', // Pass the correct role for token generation
      });

      const iframeUrl = `https://webinar.gg/webinar-page/${session.webinarId}?token=${token}`;
      console.log(`  - Generated Iframe URL: ${iframeUrl}`);

      return {
        token,
        iframeUrl,
      };
    } catch (err: any) {
      console.error('[WebinarsController] Failed to generate join token:', err);
      // Detailed logging of the error response if possible
      throw new InternalServerErrorException(
        err.message || 'Identity verification with Webinar.gg failed.',
      );
    }
  }

  @Post('webhook')
  async handleWebhook(@Body() body: { event: string; data: any }) {
    console.log('[WebinarGG Webhook] Received:', JSON.stringify(body));

    if (body.event === 'webinar.recording.created') {
      const { webinarId, mp4Url, title } = body.data;

      // Find the session associated with this webinarId
      const session = await this.prisma.classSession.findFirst({
        where: { webinarId },
      });

      if (!session) {
        console.error(
          `[WebinarGG Webhook] No session found for webinarId: ${webinarId}`,
        );
        return { success: false };
      }

      // Sync to S3 via RecordingsService
      // Assuming recordingsService has a method for this, or I'll need to implement one.
      // For now, let's look at how Zoom recordings are synced.
      try {
        await this.recordingsService.syncWebinarRecording(
          session.id,
          mp4Url,
          title || 'Class Recording',
        );
        return { success: true };
      } catch (err) {
        console.error('[WebinarGG Webhook] Sync failed:', err);
        throw new InternalServerErrorException('Failed to sync recording');
      }
    }

    return { success: true };
  }
}
