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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiExcludeController,
} from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiExcludeController()
@ApiTags('Admin')
@ApiBearerAuth()
@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  private checkAdmin(req: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (req.user.role !== 'ADMIN') {
      throw new ForbiddenException('Ask For permission');
    }
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get global stats' })
  @ApiResponse({ status: 200, description: 'Return stats' })
  @ApiResponse({ status: 403, description: 'Ask For permission' })
  async getStats(@Request() req) {
    this.checkAdmin(req);
    return this.adminService.getGlobalStats();
  }

  @Get('users')
  @ApiOperation({ summary: 'Get all users' })
  async getUsers(@Request() req) {
    this.checkAdmin(req);
    return this.adminService.getAllUsers();
  }

  @Patch('users/:id/role')
  @ApiOperation({ summary: 'Update user role' })
  async updateRole(
    @Param('id') userId: string,
    @Body() data: { role: string },
    @Request() req,
  ) {
    this.checkAdmin(req);
    return this.adminService.updateUserRole(userId, data.role as any);
  }

  @Get('courses')
  @ApiOperation({ summary: 'Get all courses' })
  async getCourses(@Request() req) {
    this.checkAdmin(req);
    return this.adminService.getAllCourses();
  }

  @Delete('courses/:id')
  @ApiOperation({ summary: 'Delete a course' })
  async deleteCourse(@Param('id') courseId: string, @Request() req) {
    this.checkAdmin(req);
    return this.adminService.deleteCourse(courseId);
  }

  // Practice Test Management
  @Get('practice-tests')
  @ApiOperation({ summary: 'Get all practice tests' })
  async getPracticeTests(@Request() req) {
    this.checkAdmin(req);
    return this.adminService.getAllPracticeTests();
  }

  @Get('practice-tests/:id/analytics')
  @ApiOperation({ summary: 'Get test analytics' })
  async getTestAnalytics(@Param('id') testId: string, @Request() req) {
    this.checkAdmin(req);
    return this.adminService.getTestAnalytics(testId);
  }

  @Get('practice-tests/:id/results')
  @ApiOperation({ summary: 'Get test results' })
  async getTestResults(@Param('id') testId: string, @Request() req) {
    this.checkAdmin(req);
    return this.adminService.getTestResults(testId);
  }

  @Delete('practice-tests/:id')
  @ApiOperation({ summary: 'Delete a practice test' })
  async deletePracticeTest(@Param('id') testId: string, @Request() req) {
    this.checkAdmin(req);
    return this.adminService.deletePracticeTest(testId);
  }
}
