import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EnrollmentService {
  constructor(private prisma: PrismaService) {}

  async enroll(studentId: string, courseId: string) {
    // Check if already enrolled
    const existing = await this.prisma.enrollment.findUnique({
      where: {
        studentId_courseId: {
          studentId,
          courseId,
        },
      },
    });

    if (existing) {
      throw new BadRequestException('Already enrolled in this course');
    }

    return this.prisma.enrollment.create({
      data: {
        studentId,
        courseId,
      },
      include: {
        course: true,
      },
    });
  }

  async withdraw(studentId: string, courseId: string) {
    return this.prisma.enrollment.delete({
      where: {
        studentId_courseId: {
          studentId,
          courseId,
        },
      },
    });
  }

  async getMyCourses(studentId: string) {
    return this.prisma.enrollment.findMany({
      where: {
        studentId,
      },
      include: {
        course: {
          include: {
            teacher: {
              select: {
                name: true,
              },
            },
            _count: {
              select: { chapters: true },
            },
          },
        },
      },
    });
  }

  async checkEnrollment(studentId: string, courseId: string) {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: {
        studentId_courseId: {
          studentId,
          courseId,
        },
      },
    });
    return { enrolled: !!enrollment };
  }
}
