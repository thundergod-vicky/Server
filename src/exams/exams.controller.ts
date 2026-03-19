import { 
    Controller, 
    Get, 
    Post, 
    Body, 
    Patch, 
    Param, 
    Delete, 
    UseGuards, 
    Request, 
    UnauthorizedException,
    ForbiddenException
  } from '@nestjs/common';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { ExamsService } from './exams.service';
  import { CreateExamDto } from './dto/create-exam.dto';
  import { UpdateExamDto } from './dto/update-exam.dto';
  
  @Controller('exams')
  @UseGuards(JwtAuthGuard)
  export class ExamsController {
    constructor(private readonly examsService: ExamsService) {}
  
    // Admin, Teacher, Academic Operations can create exams
    @Post()
    create(@Body() createExamDto: CreateExamDto, @Request() req) {
      if (!this.checkAdminAndStaff(req.user.role)) {
        throw new ForbiddenException('Only admin, teacher, or academic operations can create exams');
      }
      return this.examsService.create(createExamDto, req.user.id);
    }
  
    // List all exams (for management)
    @Get()
    findAll(@Request() req) {
      if (!this.checkAdminAndStaff(req.user.role)) {
          throw new ForbiddenException('Only admin, teacher, or academic operations can access this');
      }
      return this.examsService.findAll();
    }
  
    // Get exams for current student
    @Get('student')
    findForStudent(@Request() req) {
      return this.examsService.findForStudent(req.user.id);
    }
  
    // Get details (for both admin and student)
    @Get(':id')
    findOne(@Param('id') id: string, @Request() req) {
      return this.examsService.findOne(id, req.user.id, req.user.role);
    }
  
    // Update exam
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateExamDto: UpdateExamDto, @Request() req) {
      if (!this.checkAdminAndStaff(req.user.role)) {
          throw new ForbiddenException('Only admin, teacher, or academic operations can access this');
      }
      return this.examsService.update(id, updateExamDto);
    }
  
    // Submit results (for students)
    @Post(':id/submit')
    submitResult(@Param('id') id: string, @Body() data: any, @Request() req) {
      return this.examsService.submitResult(id, req.user.id, data);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string, @Request() req) {
      if (!this.checkAdminAndStaff(req.user.role)) {
          throw new ForbiddenException('Only admin, teacher, or academic operations can access this');
      }
      return this.examsService.delete(id);
    }
  
    private checkAdminAndStaff(role: string): boolean {
      return ['ADMIN', 'TEACHER', 'ACADEMIC_OPERATIONS'].includes(role);
    }
  }
