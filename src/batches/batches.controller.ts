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
import { BatchesService } from './batches.service';
import { CreateBatchDto } from './dto/create-batch.dto';
import { AssignStudentsDto } from './dto/assign-students.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Batches')
@ApiBearerAuth()
@Controller('batches')
@UseGuards(JwtAuthGuard)
export class BatchesController {
  constructor(private readonly batchesService: BatchesService) {}

  private checkAdmin(req: any) {
    const user = req.user as { role: string };
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Only admins can perform this action');
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a new batch (Admin only)' })
  create(@Body() createBatchDto: CreateBatchDto, @Request() req) {
    this.checkAdmin(req);
    return this.batchesService.create(createBatchDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all batches (Admin only)' })
  findAll(@Request() req) {
    this.checkAdmin(req);
    return this.batchesService.findAll();
  }

  @Get('my-batches')
  @ApiOperation({ summary: 'Get batches for the current student or teacher' })
  findMyBatches(@Request() req: any) {
    const user = req.user as { userId: string; role: string };
    if (user.role === 'STUDENT') {
      return this.batchesService.findByStudent(user.userId);
    } else if (user.role === 'TEACHER') {
      return this.batchesService.findByTeacher(user.userId);
    }
    throw new ForbiddenException('Not applicable for this role');
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get batch details' })
  findOne(@Param('id') id: string) {
    return this.batchesService.findOne(id);
  }

  @Patch(':id/students')
  @ApiOperation({ summary: 'Assign students to a batch (Admin only)' })
  assignStudents(
    @Param('id') id: string,
    @Body() assignStudentsDto: AssignStudentsDto,
    @Request() req,
  ) {
    this.checkAdmin(req);
    return this.batchesService.assignStudents(id, assignStudentsDto.studentIds);
  }

  @Patch(':id/teacher')
  @ApiOperation({ summary: 'Assign a teacher to a batch (Admin only)' })
  assignTeacher(
    @Param('id') id: string,
    @Body() data: { teacherId: string },
    @Request() req,
  ) {
    this.checkAdmin(req);
    return this.batchesService.assignTeacher(id, data.teacherId);
  }

  @Delete(':id/students/:studentId')
  @ApiOperation({ summary: 'Remove a student from a batch (Admin only)' })
  removeStudent(
    @Param('id') id: string,
    @Param('studentId') studentId: string,
    @Request() req,
  ) {
    this.checkAdmin(req);
    return this.batchesService.removeStudent(id, studentId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a batch (Admin only)' })
  remove(@Param('id') id: string, @Request() req) {
    this.checkAdmin(req);
    return this.batchesService.delete(id);
  }
}
