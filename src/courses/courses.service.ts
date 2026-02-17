import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.CourseCreateInput) {
    return this.prisma.course.create({ data });
  }

  async findAll() {
    return this.prisma.course.findMany({
      where: { courseType: 'PUBLIC' },
      include: { teacher: true, chapters: { include: { lessons: true } } },
    });
  }

  async findAllByTeacher(teacherId: string) {
    return this.prisma.course.findMany({
      where: { teacherId },
      include: {
        _count: {
          select: { chapters: true, enrollments: true },
        },
        chapters: {
          include: {
            lessons: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.course.findUnique({
      where: { id },
      include: {
        teacher: true,
        chapters: {
          include: {
            lessons: {
              orderBy: { order: 'asc' },
            },
          },
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async createChapter(data: Prisma.ChapterCreateInput) {
    // Logic to auto-increment order if not provided
    return this.prisma.chapter.create({ data });
  }

  async createLesson(data: Prisma.LessonCreateInput) {
    return this.prisma.lesson.create({ data });
  }

  // Premium Course Assignment Methods
  async getCoursesForStudent(studentId: string) {
    const publicCourses = await this.prisma.course.findMany({
      where: { courseType: 'PUBLIC' },
      include: {
        teacher: { select: { id: true, name: true, email: true } },
        _count: { select: { chapters: true, enrollments: true } },
      },
    });

    const assignedCourses = await this.prisma.courseAssignment.findMany({
      where: { studentId },
      include: {
        course: {
          include: {
            teacher: { select: { id: true, name: true, email: true } },
            _count: { select: { chapters: true, enrollments: true } },
          },
        },
        teacher: { select: { name: true } },
      },
    });

    return {
      publicCourses,
      assignedCourses: assignedCourses.map((a) => ({
        ...a.course,
        deadline: a.deadline,
        assignedAt: a.assignedAt,
        assignedBy: a.teacher,
      })),
    };
  }

  async assignStudentsToCourse(
    courseId: string,
    teacherId: string,
    studentIds: string[],
    deadline?: Date,
  ) {
    // Verify course is PREMIUM and belongs to teacher
    const course = await this.prisma.course.findFirst({
      where: { id: courseId, teacherId, courseType: 'PREMIUM' },
    });

    if (!course) {
      throw new Error('Course not found or not premium');
    }

    // Create assignments
    return await this.prisma.courseAssignment.createMany({
      data: studentIds.map((studentId) => ({
        courseId,
        studentId,
        assignedBy: teacherId,
        deadline,
      })),
      skipDuplicates: true,
    });
  }

  async removeAssignment(
    courseId: string,
    studentId: string,
    teacherId: string,
  ) {
    return await this.prisma.courseAssignment.deleteMany({
      where: {
        courseId,
        studentId,
        assignedBy: teacherId,
      },
    });
  }

  async getAssignedStudents(courseId: string, teacherId: string) {
    return await this.prisma.courseAssignment.findMany({
      where: { courseId, assignedBy: teacherId },
      include: {
        student: { select: { id: true, name: true, email: true } },
      },
      orderBy: { assignedAt: 'desc' },
    });
  }
}
