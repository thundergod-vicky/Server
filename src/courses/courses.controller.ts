import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  Delete,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createCourseDto: any, @Request() req) {
    return this.coursesService.create({
      ...createCourseDto,
      teacher: { connect: { id: req.user.id } },
    });
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get('teacher')
  @UseGuards(JwtAuthGuard)
  findAllByTeacher(@Request() req) {
    return this.coursesService.findAllByTeacher(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Post(':id/chapters')
  @UseGuards(JwtAuthGuard)
  createChapter(@Param('id') courseId: string, @Body() data: any) {
    return this.coursesService.createChapter({
      ...data,
      course: { connect: { id: courseId } },
    });
  }

  @Post('chapters/:chapterId/lessons')
  @UseGuards(JwtAuthGuard)
  createLesson(@Param('chapterId') chapterId: string, @Body() data: any) {
    return this.coursesService.createLesson({
      ...data,
      chapter: { connect: { id: chapterId } },
    });
  }

  // Premium Course Assignment Endpoints
  @Get('student/all')
  @UseGuards(JwtAuthGuard)
  getStudentCourses(@Request() req) {
    return this.coursesService.getCoursesForStudent(req.user.id);
  }

  @Post(':id/assign')
  @UseGuards(JwtAuthGuard)
  assignStudents(
    @Param('id') courseId: string,
    @Body() data: { studentIds: string[]; deadline?: string },
    @Request() req,
  ) {
    return this.coursesService.assignStudentsToCourse(
      courseId,
      req.user.id,
      data.studentIds,
      data.deadline ? new Date(data.deadline) : undefined,
    );
  }

  @Delete(':id/assign/:studentId')
  @UseGuards(JwtAuthGuard)
  removeAssignment(
    @Param('id') courseId: string,
    @Param('studentId') studentId: string,
    @Request() req,
  ) {
    return this.coursesService.removeAssignment(
      courseId,
      studentId,
      req.user.id,
    );
  }

  @Get(':id/assignments')
  @UseGuards(JwtAuthGuard)
  getAssignments(@Param('id') courseId: string, @Request() req) {
    return this.coursesService.getAssignedStudents(courseId, req.user.id);
  }
}
