import {
  Controller,
  Get,
  Patch,
  Post,
  Body,
  UseGuards,
  Request,
  Param,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    const userId = req.user.userId || req.user.id || req.user.sub;
    return this.usersService.findById(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  async updateProfile(@Request() req, @Body() updateData: any) {
    const userId = req.user.userId || req.user.sub || req.user.id;

    if (updateData.password) {
      const bcrypt = await import('bcrypt');
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    return this.usersService.update(userId, updateData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('students')
  async getAllStudents(@Request() req) {
    const role =
      req.user.role ||
      (
        await this.usersService.findById(
          req.user.userId || req.user.id || req.user.sub,
        )
      )?.role;

    if (role !== 'TEACHER' && role !== 'ADMIN') {
      throw new ForbiddenException(
        'Only teachers or admins can view all students',
      );
    }
    return this.usersService.findAllStudents();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/academic-status')
  async updateAcademicStatus(
    @Param('id') studentId: string,
    @Request() req,
    @Body() data: any,
  ) {
    const userId = req.user.userId || req.user.id || req.user.sub;
    const user = await this.usersService.findById(userId);
    const role = user?.role || req.user.role;

    if (role !== 'TEACHER' && role !== 'ADMIN') {
      console.log(`Access denied for user ${userId} with role ${role}`);
      throw new ForbiddenException(
        'Only teachers or admins can update student academic status',
      );
    }

    return this.usersService.updateAcademicStatus(studentId, userId, data);
  }

  // Parent Portal Endpoints

  @UseGuards(JwtAuthGuard)
  @Post('parent-request')
  async createParentRequest(
    @Request() req,
    @Body() body: { studentEmail: string },
  ) {
    const userId = req.user.userId || req.user.id || req.user.sub;
    return this.usersService.createParentRequest(userId, body.studentEmail);
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin/parent-requests')
  async getPendingRequests(@Request() req) {
    // Should ideally check for Admin role here
    return this.usersService.getPendingRequests();
  }

  @UseGuards(JwtAuthGuard)
  @Post('admin/parent-request/:id/approve')
  async approveRequest(@Param('id') id: string) {
    return this.usersService.approveRequest(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('admin/parent-request/:id/reject')
  async rejectRequest(@Param('id') id: string) {
    return this.usersService.rejectRequest(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('admin/link-parent-student')
  async manualLinkParentStudent(
    @Body() body: { parentId: string; studentEmail: string },
  ) {
    return this.usersService.manualLinkParentStudent(
      body.parentId,
      body.studentEmail,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('parent/student-data/:studentId')
  async getStudentData(@Param('studentId') studentId: string, @Request() req) {
    const parentId = req.user.userId || req.user.id || req.user.sub;
    return this.usersService.getStudentData(parentId, studentId);
  }
}
