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
} from '@nestjs/common';
import { ClassSessionsService } from './class-sessions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('class-sessions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClassSessionsController {
  constructor(private readonly service: ClassSessionsService) {}

  @Post()
  @Roles(Role.ADMIN, Role.ACADEMIC_OPERATIONS)
  create(@Body() body: {
    title: string;
    type: 'LECTURE' | 'PRACTICAL' | 'WORKSHOP';
    teacherId: string;
    batchId: string;
    date: string;
    startTime: string;
    endTime: string;
    venue?: string;
  }) {
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
  findMyTeacherSessions(@Request() req: any) {
    const userId = req.user.id || req.user.userId || req.user.sub;
    return this.service.findByTeacher(userId);
  }

  @Get('student-sessions')
  @Roles(Role.STUDENT, Role.PARENT)
  findMyStudentSessions(@Request() req: any) {
    const userId = req.user.id || req.user.userId || req.user.sub;
    return this.service.findByStudent(userId);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.ACADEMIC_OPERATIONS)
  remove(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
