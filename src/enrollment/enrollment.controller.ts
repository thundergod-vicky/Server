import {
  Controller,
  Post,
  Delete,
  Get,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('enrollments')
@UseGuards(JwtAuthGuard)
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post()
  async enroll(@Request() req, @Body('courseId') courseId: string) {
    return this.enrollmentService.enroll(req.user.id, courseId);
  }

  @Delete(':courseId')
  async withdraw(@Request() req, @Param('courseId') courseId: string) {
    return this.enrollmentService.withdraw(req.user.id, courseId);
  }

  @Get()
  async getMyCourses(@Request() req) {
    return this.enrollmentService.getMyCourses(req.user.id);
  }

  @Get(':courseId/check')
  async checkEnrollment(@Request() req, @Param('courseId') courseId: string) {
    return this.enrollmentService.checkEnrollment(req.user.id, courseId);
  }
}
