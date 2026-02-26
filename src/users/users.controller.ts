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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiExcludeEndpoint,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateAcademicStatusDto } from './dto/update-academic-status.dto';
import { ParentRequestDto } from './dto/parent-request.dto';
import { LinkParentStudentDto } from './dto/link-parent-student.dto';

import { S3Service } from '../content/s3.service';

interface RequestWithUser {
  user: {
    userId?: string;
    id?: string;
    sub?: string;
    role?: string;
  };
}

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly s3Service: S3Service,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'Return user profile' })
  getProfile(@Request() req: RequestWithUser) {
    const userId = req.user.userId || req.user.id || req.user.sub;
    if (!userId) throw new ForbiddenException('User ID not found');
    return this.usersService.findById(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  @ApiOperation({ summary: 'Update current user profile' })
  @ApiResponse({ status: 200, description: 'Profile updated successfully' })
  async updateProfile(
    @Request() req: RequestWithUser,
    @Body() updateData: UpdateProfileDto,
  ) {
    const userId = req.user.userId || req.user.sub || req.user.id;
    if (!userId) throw new ForbiddenException('User ID not found');

    if (updateData.password) {
      const bcrypt = await import('bcrypt');
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    // Cast to any to bypass strict Prisma input type if DTO doesn't match perfectly
    return this.usersService.update(userId, updateData as any);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile-image')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload profile image' })
  async uploadProfileImage(
    @Request() req: RequestWithUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const userId = req.user.userId || req.user.sub || req.user.id;
    if (!userId) throw new ForbiddenException('User ID not found');

    const uploadResult = await this.s3Service.uploadFile(file);
    console.log('Upload Result:', uploadResult);
    // Store the S3 key (id) so it can be routed through our secure stream endpoint
    const result = await this.usersService.update(userId, {
      profileImage: uploadResult.id,
    });
    console.log('Updated User Profile Image:', result?.profileImage);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile-image/reset')
  @ApiOperation({ summary: 'Remove profile image and reset to random avatar' })
  async resetProfileImage(@Request() req: RequestWithUser) {
    const userId = req.user.userId || req.user.sub || req.user.id;
    if (!userId) throw new ForbiddenException('User ID not found');
    return this.usersService.resetProfileImage(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('students')
  @ApiOperation({ summary: 'Get all students (Teachers/Admins only)' })
  @ApiResponse({ status: 200, description: 'Return all students' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async getAllStudents(@Request() req: RequestWithUser) {
    const userId = req.user.userId || req.user.id || req.user.sub;
    if (!userId) throw new ForbiddenException('User ID not found');

    const role =
      req.user.role || (await this.usersService.findById(userId))?.role;

    if (role !== 'TEACHER' && role !== 'ADMIN') {
      throw new ForbiddenException(
        'Only teachers or admins can view all students',
      );
    }
    return this.usersService.findAllStudents();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/academic-status')
  @ApiOperation({
    summary: 'Update student academic status (Teachers/Admins only)',
  })
  @ApiResponse({ status: 200, description: 'Status updated' })
  async updateAcademicStatus(
    @Param('id') studentId: string,
    @Request() req: RequestWithUser,
    @Body() data: UpdateAcademicStatusDto,
  ) {
    const userId = req.user.userId || req.user.id || req.user.sub;
    if (!userId) throw new ForbiddenException('User ID not found');

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

  @UseGuards(JwtAuthGuard)
  @Post('parent-request')
  @ApiOperation({ summary: 'Create a parent-student link request' })
  @ApiResponse({ status: 201, description: 'Request created' })
  async createParentRequest(
    @Request() req: RequestWithUser,
    @Body() body: ParentRequestDto,
  ) {
    const userId = req.user.userId || req.user.id || req.user.sub;
    if (!userId) throw new ForbiddenException('User ID not found');
    return this.usersService.createParentRequest(userId, body.studentEmail);
  }

  @ApiExcludeEndpoint()
  @UseGuards(JwtAuthGuard)
  @Get('admin/parent-requests')
  @ApiOperation({ summary: 'Get all pending parent requests (Admins only)' })
  @ApiResponse({ status: 200, description: 'Return pending requests' })
  getPendingRequests() {
    return this.usersService.getPendingRequests();
  }

  @ApiExcludeEndpoint()
  @UseGuards(JwtAuthGuard)
  @Post('admin/parent-request/:id/approve')
  @ApiOperation({ summary: 'Approve a parent request (Admins only)' })
  @ApiResponse({ status: 200, description: 'Request approved' })
  async approveRequest(@Param('id') id: string) {
    return this.usersService.approveRequest(id);
  }

  @ApiExcludeEndpoint()
  @UseGuards(JwtAuthGuard)
  @Post('admin/parent-request/:id/reject')
  @ApiOperation({ summary: 'Reject a parent request (Admins only)' })
  @ApiResponse({ status: 200, description: 'Request rejected' })
  async rejectRequest(@Param('id') id: string) {
    return this.usersService.rejectRequest(id);
  }

  @ApiExcludeEndpoint()
  @UseGuards(JwtAuthGuard)
  @Post('admin/link-parent-student')
  @ApiOperation({ summary: 'Manually link parent and student (Admins only)' })
  @ApiResponse({ status: 201, description: 'Linked successfully' })
  async manualLinkParentStudent(@Body() body: LinkParentStudentDto) {
    return this.usersService.manualLinkParentStudent(
      body.parentId,
      body.studentEmail,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('parent/student-data/:studentId')
  @ApiOperation({ summary: 'Get linked student data (Parents only)' })
  @ApiResponse({ status: 200, description: 'Return student data' })
  async getStudentData(
    @Param('studentId') studentId: string,
    @Request() req: RequestWithUser,
  ) {
    const parentId = req.user.userId || req.user.id || req.user.sub;
    if (!parentId) throw new ForbiddenException('Parent ID not found');
    return this.usersService.getStudentData(parentId, studentId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('teachers')
  @ApiOperation({ summary: 'Get all teachers for messaging directory' })
  async getTeachers() {
    return this.usersService.findAllTeachers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('parents')
  @ApiOperation({ summary: 'Get all parents (Teachers/Admins only)' })
  async getParents(@Request() req: RequestWithUser) {
    const userId = req.user.userId || req.user.id || req.user.sub;
    if (!userId) throw new ForbiddenException('User ID not found');

    const role = req.user.role || (await this.usersService.findById(userId))?.role;
    if (role !== 'TEACHER' && role !== 'ADMIN') {
      throw new ForbiddenException('Only teachers or admins can view parents');
    }
    return this.usersService.findAllParents();
  }
}
