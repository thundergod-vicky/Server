import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
  ForbiddenException,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Request as ExpressRequest } from 'express';
import { BatchesService } from './batches.service';
import { CreateBatchDto } from './dto/create-batch.dto';
import { AssignStudentsDto } from './dto/assign-students.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Role } from '@prisma/client';

interface RequestWithUser extends ExpressRequest {
  user: {
    id: string;
    email: string;
    role: Role;
  };
}

@ApiTags('Batches')
@ApiBearerAuth()
@Controller('batches')
@UseGuards(JwtAuthGuard)
export class BatchesController {
  constructor(private readonly batchesService: BatchesService) {}

  private checkAdmin(req: RequestWithUser) {
    if (req.user.role !== 'ADMIN' && req.user.role !== 'ACADEMIC_OPERATIONS') {
      throw new ForbiddenException(
        'Only admins or academic operations can perform this action',
      );
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a new batch (Admin only)' })
  create(
    @Body() createBatchDto: CreateBatchDto,
    @Request() req: RequestWithUser,
  ) {
    this.checkAdmin(req);
    return this.batchesService.create(createBatchDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all batches (Role-aware)' })
  findAll(@Request() req: RequestWithUser) {
    const { id, role } = req.user;
    if (role === 'ADMIN' || role === 'ACADEMIC_OPERATIONS') {
      return this.batchesService.findAll();
    } else if (role === 'TEACHER') {
      return this.batchesService.findByTeacher(id);
    } else if (role === 'STUDENT') {
      return this.batchesService.findByStudent(id);
    }
    throw new ForbiddenException('Access denied for this role');
  }

  @Get('my-batches')
  @ApiOperation({ summary: 'Get batches for the current student or teacher' })
  findMyBatches(@Request() req: RequestWithUser) {
    const { id, role } = req.user;
    if (role === 'STUDENT') {
      return this.batchesService.findByStudent(id);
    } else if (role === 'TEACHER') {
      return this.batchesService.findByTeacher(id);
    }
    throw new ForbiddenException('Not applicable for this role');
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get batch details' })
  findOne(@Param('id') id: string, @Request() req: RequestWithUser) {
    const { id: userId, role } = req.user;
    return this.batchesService.findOne(id, userId, role);
  }

  @Patch(':id/students')
  @ApiOperation({ summary: 'Assign students to a batch (Admin only)' })
  assignStudents(
    @Param('id') id: string,
    @Body() assignStudentsDto: AssignStudentsDto,
    @Request() req: RequestWithUser,
  ) {
    this.checkAdmin(req);
    return this.batchesService.assignStudents(id, assignStudentsDto.studentIds);
  }

  @Patch(':id/teachers')
  @ApiOperation({ summary: 'Assign teachers to a batch (Admin only)' })
  assignTeachers(
    @Param('id') id: string,
    @Body() data: { teacherIds: string[] },
    @Request() req: RequestWithUser,
  ) {
    this.checkAdmin(req);
    return this.batchesService.assignTeachers(id, data.teacherIds);
  }

  @Delete(':id/students/:studentId')
  @ApiOperation({ summary: 'Remove a student from a batch (Admin only)' })
  removeStudent(
    @Param('id') id: string,
    @Param('studentId') studentId: string,
    @Request() req: RequestWithUser,
  ) {
    this.checkAdmin(req);
    return this.batchesService.removeStudent(id, studentId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a batch (Admin only)' })
  remove(@Param('id') id: string, @Request() req: RequestWithUser) {
    this.checkAdmin(req);
    return this.batchesService.delete(id);
  }
}
