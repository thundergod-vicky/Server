import {
  Controller,
  Post,
  Get,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProgressService } from './progress.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('progress')
@UseGuards(JwtAuthGuard)
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Post('complete/:lessonId')
  async markAsComplete(@Request() req, @Param('lessonId') lessonId: string) {
    return this.progressService.markAsComplete(req.user.id, lessonId);
  }

  @Get('course/:courseId')
  async getCourseProgress(@Request() req, @Param('courseId') courseId: string) {
    return this.progressService.getCourseProgress(req.user.id, courseId);
  }
}
