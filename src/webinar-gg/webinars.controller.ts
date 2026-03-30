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
import { WebinarGGService } from './webinar-gg.service';
import { EncryptionService } from './encryption.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RecordingsService } from '../recordings/recordings.service';
import { Role } from '@prisma/client';

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
  async join(@Param('sessionId') sessionId: string, @Req() req: any) {
    const user = req.user;
    const session = await this.prisma.classSession.findUnique({
      where: { id: sessionId },
      include: { webinarAccount: true },
    });

    if (!session || !session.webinarId || !session.webinarAccount) {
      console.error(
        `[WebinarsController] Join failed for sessionId: ${sessionId}`,
      );
      if (!session) console.error('  - Reason: Session not found in database');
      else if (!session.webinarId)
        console.error('  - Reason: webinarId is missing on session');
      else if (!session.webinarAccount)
        console.error('  - Reason: webinarAccount relationship is missing');

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
      console.log('  - Logging student attendance...');
      await this.prisma.sessionAttendance.upsert({
        where: {
          sessionId_studentId: {
            sessionId,
            studentId: user.id || user.userId,
          },
        },
        update: { joinedAt: new Date() },
        create: {
          sessionId,
          studentId: user.id || user.userId,
          joinedAt: new Date(),
        },
      });
    }

    // 2. Generate Join Token
    const apiKey = this.encryption.decrypt(session.webinarAccount.apiKey);

    try {
      const isHost = [
        Role.TEACHER,
        Role.ADMIN,
        Role.ACADEMIC_OPERATIONS,
      ].includes(user.role as Role);

      // Identity for Webinar.gg
      let joinEmail: string;
      let firstName: string;
      let lastName: string;

      if (isHost) {
        // For hosts (teachers/admins), use the Webinar Account's email and a generic Organizer name
        // This ensures Webinar.gg grants Host/Organizer privileges
        joinEmail = session.webinarAccount.name;
        firstName = 'Webinar';
        lastName = 'Organizer';
      } else {
        // For students, use their own identity for tracking
        joinEmail = user.email;
        const names = (user.name || user.email || 'User Participant').split(' ');
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
  async handleWebhook(@Body() body: any) {
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
