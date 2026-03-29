import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  Request,
  UseGuards,
  Patch,
  ForbiddenException,
  Res,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { ClassSessionsService } from './class-sessions.service';
import { DriveWatcherService } from './drive-watcher.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';
import type { Request as ExpressRequest, Response } from 'express';

interface RequestWithUser extends ExpressRequest {
  user: {
    id: string;
    userId?: string;
    sub?: string;
    email: string;
    role: Role;
  };
}
@Controller('class-sessions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClassSessionsController {
  private readonly logger = new Logger(ClassSessionsController.name);
  constructor(
    private readonly service: ClassSessionsService,
    private readonly driveWatcher: DriveWatcherService,
  ) {}

  @Post()
  @Roles(Role.ADMIN, Role.ACADEMIC_OPERATIONS)
  create(
    @Body()
    body: {
      title: string;
      type: 'LECTURE' | 'PRACTICAL' | 'WORKSHOP';
      teacherId: string;
      batchId: string;
      subjectId?: string;
      date: string;
      startTime: string;
      endTime: string;
      venue?: string;
      isOnline?: boolean;
      meetingUrl?: string;
      meetingId?: string;
      meetingPasscode?: string;
    },
  ) {
    return this.service.create(body);
  }

  @Get()
  @Roles(Role.ADMIN, Role.ACADEMIC_OPERATIONS, Role.ACCOUNTS)
  findAll(
    @Query('batchId') batchId?: string,
    @Query('teacherId') teacherId?: string,
    @Query('date') date?: string,
  ) {
    return this.service.findAll({ batchId, teacherId, date });
  }

  @Get('my-sessions')
  @Roles(Role.TEACHER)
  findMyTeacherSessions(@Request() req: RequestWithUser) {
    const userId = req.user.id;
    return this.service.findByTeacher(userId);
  }

  @Get('student-sessions')
  @Roles(Role.STUDENT, Role.PARENT)
  findMyStudentSessions(@Request() req: RequestWithUser) {
    const userId = req.user.id;
    return this.service.findByStudent(userId);
  }

  @Get(':id/recording')
  @Roles(
    Role.ADMIN,
    Role.ACADEMIC_OPERATIONS,
    Role.TEACHER,
    Role.STUDENT,
    Role.PARENT,
  )
  syncRecording(@Param('id') id: string) {
    return this.service.syncRecording(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.ACADEMIC_OPERATIONS, Role.TEACHER)
  async update(
    @Param('id') id: string,
    @Request() req: RequestWithUser,
    @Body()
    body: {
      title?: string;
      type?: 'LECTURE' | 'PRACTICAL' | 'WORKSHOP';
      teacherId?: string;
      batchId?: string;
      subjectId?: string;
      date?: string;
      startTime?: string;
      endTime?: string;
      venue?: string;
      isOnline?: boolean;
      meetingUrl?: string;
      meetingId?: string;
      meetingPasscode?: string;
    },
  ) {
    if (req.user.role === Role.TEACHER) {
      const session = await this.service.findOne(id);
      if (!session || session.teacherId !== req.user.id) {
        throw new ForbiddenException('You can only edit your own sessions');
      }
    }
    return this.service.update(id, body);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.ACADEMIC_OPERATIONS)
  remove(@Param('id') id: string) {
    return this.service.delete(id);
  }

  @Get('attend/:id')
  @Roles(Role.STUDENT, Role.ADMIN, Role.TEACHER) // Admin allowed for testing
  async attend(
    @Param('id') id: string,
    @Request() req: RequestWithUser,
    @Res() res: Response,
  ) {
    const session = await this.service.findOne(id);
    if (!session) {
      throw new NotFoundException('Class session not found');
    }

    if (!session.meetingUrl) {
      throw new NotFoundException('Meeting URL not available for this session');
    }

    // Log attendance
    await this.service.logAttendance(id, req.user.id);

    // Redirect to meeting
    return res.redirect(session.meetingUrl);
  }

  @Post('recordings/webhook')
  @Roles(Role.ADMIN) // Security: In production, verify Google signature/headers
  handleRecordingWebhook(
    @Request() req: any,
    @Query('id') sessionId: string,
  ) {
    // Google Drive Push Notifications send file info in headers or body depending on setup
    // For now, we'll trigger a manual sync of the recordings folder
    this.logger.log(`Received Drive Webhook for session: ${sessionId}`);

    // Trigger sync (this is fire-and-forget to respond to Google quickly)
    this.driveWatcher.syncRecentRecordings(sessionId).catch((err) => {
      this.logger.error(`Sync failed for session ${sessionId}`, err);
    });

    return { success: true };
  }

  // Artifacts
  @Post(':id/recordings')
  @Roles(Role.ADMIN, Role.ACADEMIC_OPERATIONS, Role.TEACHER)
  addRecording(
    @Param('id') id: string,
    @Body() data: { title: string; url: string; passcode?: string },
  ) {
    return this.service.addRecording(id, data.title, data.url, data.passcode);
  }

  @Patch('recordings/:recordingId')
  @Roles(Role.ADMIN, Role.ACADEMIC_OPERATIONS, Role.TEACHER)
  updateRecording(
    @Param('recordingId') recordingId: string,
    @Body() data: { title: string },
  ) {
    return this.service.updateRecording(recordingId, data.title);
  }

  @Post(':id/attachments')
  @Roles(Role.ADMIN, Role.ACADEMIC_OPERATIONS, Role.TEACHER)
  addAttachment(
    @Param('id') id: string,
    @Body() data: { title: string; url: string; type: string },
  ) {
    return this.service.addAttachment(id, data.title, data.url, data.type);
  }

  @Delete('attachments/:attachmentId')
  @Roles(Role.ADMIN, Role.ACADEMIC_OPERATIONS, Role.TEACHER)
  removeAttachment(@Param('attachmentId') attachmentId: string) {
    return this.service.removeAttachment(attachmentId);
  }
}
