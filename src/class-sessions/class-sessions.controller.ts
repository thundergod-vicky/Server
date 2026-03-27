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
} from '@nestjs/common';
import { ClassSessionsService } from './class-sessions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';
import { Request as ExpressRequest } from 'express';

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
  constructor(private readonly service: ClassSessionsService) {}

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

  @Delete(':id')
  @Roles(Role.ADMIN, Role.ACADEMIC_OPERATIONS)
  remove(@Param('id') id: string) {
    return this.service.delete(id);
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
