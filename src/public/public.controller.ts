import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';

@ApiTags('Public')
@Controller('public')
export class PublicController {
  constructor(private prisma: PrismaService) {}

  @Get('profile/:slug')
  @ApiOperation({ summary: 'Get student public profile by slug' })
  async getPublicProfile(@Param('slug') slug: string) {
    const student = await this.prisma.user.findUnique({
      where: { profileSlug: slug },
      select: {
        id: true,
        name: true,
        medal: true,
        grade: true,
        academicAssignedAt: true,
        profileSettings: true,
        profileImage: true,
        assignedByTeacher: {
          select: { name: true },
        },
        enrollments: {
          include: {
            course: {
              select: { title: true, thumbnail: true },
            },
          },
        },
        practiceTestResults: {
          include: {
            test: { select: { title: true } },
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!student) {
      throw new NotFoundException('Profile not found');
    }

    const settings = (student.profileSettings as any) || {
      showMedals: true,
      showGrades: true,
      showCourses: true,
      showTestResults: true,
    };

    const enrollments = settings.showCourses 
      ? student.enrollments.filter(e => !settings.hiddenCourseIds?.includes(e.courseId))
      : [];

    const practiceTestResults = settings.showTestResults
      ? student.practiceTestResults.filter(r => !settings.hiddenTestResultIds?.includes(r.id))
      : [];

    return {
      id: student.id,
      name: student.name,
      profileSettings: student.profileSettings,
      medal: settings.showMedals ? student.medal : null,
      grade: settings.showGrades ? student.grade : null,
      academicAssignedAt: (settings.showMedals || settings.showGrades) ? student.academicAssignedAt : null,
      assignedByTeacher: (settings.showMedals || settings.showGrades) ? student.assignedByTeacher : null,
      enrollments,
      practiceTestResults,
      profileImage: student.profileImage,
    };
  }
}
