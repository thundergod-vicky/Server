import {
  Controller,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  private async checkAdmin(req: any) {
    if (req.user.role !== 'ADMIN') {
      throw new ForbiddenException(
        'Only administrators can access this section',
      );
    }
  }

  @Get('stats')
  async getStats(@Request() req) {
    await this.checkAdmin(req);
    return this.adminService.getGlobalStats();
  }

  @Get('users')
  async getUsers(@Request() req) {
    await this.checkAdmin(req);
    return this.adminService.getAllUsers();
  }

  @Patch('users/:id/role')
  async updateRole(
    @Param('id') userId: string,
    @Body() data: { role: string },
    @Request() req,
  ) {
    await this.checkAdmin(req);
    return this.adminService.updateUserRole(userId, data.role as any);
  }

  @Get('courses')
  async getCourses(@Request() req) {
    await this.checkAdmin(req);
    return this.adminService.getAllCourses();
  }

  @Delete('courses/:id')
  async deleteCourse(@Param('id') courseId: string, @Request() req) {
    await this.checkAdmin(req);
    return this.adminService.deleteCourse(courseId);
  }

  // Practice Test Management
  @Get('practice-tests')
  async getPracticeTests(@Request() req) {
    await this.checkAdmin(req);
    return this.adminService.getAllPracticeTests();
  }

  @Get('practice-tests/:id/analytics')
  async getTestAnalytics(@Param('id') testId: string, @Request() req) {
    await this.checkAdmin(req);
    return this.adminService.getTestAnalytics(testId);
  }

  @Get('practice-tests/:id/results')
  async getTestResults(@Param('id') testId: string, @Request() req) {
    await this.checkAdmin(req);
    return this.adminService.getTestResults(testId);
  }

  @Delete('practice-tests/:id')
  async deletePracticeTest(@Param('id') testId: string, @Request() req) {
    await this.checkAdmin(req);
    return this.adminService.deletePracticeTest(testId);
  }
}
