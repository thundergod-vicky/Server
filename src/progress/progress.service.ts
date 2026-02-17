import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProgressService {
  constructor(private prisma: PrismaService) {}

  async markAsComplete(studentId: string, lessonId: string) {
    return this.prisma.studentProgress.upsert({
      where: {
        studentId_lessonId: {
          studentId,
          lessonId,
        },
      },
      update: {
        completed: true,
        completedAt: new Date(),
      },
      create: {
        studentId,
        lessonId,
        completed: true,
        completedAt: new Date(),
      },
    });
  }

  async getCourseProgress(studentId: string, courseId: string) {
    return this.prisma.studentProgress.findMany({
      where: {
        studentId,
        lesson: {
          chapter: {
            courseId,
          },
        },
      },
    });
  }
}
