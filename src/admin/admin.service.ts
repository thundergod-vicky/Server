import { Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getGlobalStats() {
    const [
      totalUsers,
      totalStudents,
      totalTeachers,
      totalCourses,
      totalRevenue,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.count({ where: { role: 'STUDENT' } }),
      this.prisma.user.count({ where: { role: 'TEACHER' } }),
      this.prisma.course.count(),
      this.prisma.payment.aggregate({
        where: { status: 'SUCCESS' },
        _sum: { amount: true },
      }),
    ]);

    return {
      users: {
        total: totalUsers,
        students: totalStudents,
        teachers: totalTeachers,
      },
      courses: {
        total: totalCourses,
      },
      revenue: {
        total: totalRevenue._sum.amount || 0,
      },
      systemStatus: 'Stable',
      uptime: '99.9%',
    };
  }

  async getAllUsers() {
    return this.prisma.user.findMany({
      include: {
        _count: {
          select: {
            enrollments: true,
            practiceTestResults: true,
            coursesOwned: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateUserRole(userId: string, role: Role) {
    const enrollmentId = await this.generateEnrollmentId(role);
    return this.prisma.user.update({
      where: { id: userId },
      data: { role, enrollmentId },
    });
  }

  private async generateEnrollmentId(role: Role): Promise<string> {
    const prefixMap: Record<string, string> = {
      [Role.TEACHER]: 'TEAC',
      [Role.STUDENT]: 'STUD',
      [Role.PARENT]: 'PARE',
      [Role.ADMIN]: 'ADMI',
      [Role.ACADEMIC_OPERATIONS]: 'ACAD',
      [Role.ACCOUNTS]: 'ACCT',
    };

    const prefix = prefixMap[role] ?? 'USER';
    const currentYear = new Date().getFullYear().toString().slice(-2);

    const existing = await this.prisma.user.findMany({
      where: { enrollmentId: { startsWith: prefix }, id: { not: '' } },
      select: { enrollmentId: true },
    });

    let maxSerial = 0;
    for (const u of existing) {
      const match = u.enrollmentId?.match(/(\d{4})\//);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num > maxSerial) maxSerial = num;
      }
    }

    const serial = (maxSerial + 1).toString().padStart(4, '0');
    return `${prefix}-${serial}/${currentYear}`;
  }

  async updateUser(userId: string, data: Prisma.UserUpdateInput) {
    // Sanitize enrollmentId if present
    if (data.enrollmentId && typeof data.enrollmentId === 'string') {
      data.enrollmentId = data.enrollmentId.replace(/\s+/g, '');
    }
    return this.prisma.user.update({
      where: { id: userId },
      data,
    });
  }

  async getAllCourses() {
    return this.prisma.course.findMany({
      include: {
        teacher: { select: { name: true, email: true } },
        _count: { select: { enrollments: true, chapters: true } },
      },
    });
  }

  async deleteCourse(courseId: string) {
    return this.prisma.course.delete({
      where: { id: courseId },
    });
  }

  // Practice Test Management
  async getAllPracticeTests() {
    return this.prisma.practiceTest.findMany({
      include: {
        teacher: { select: { id: true, name: true, email: true } },
        _count: { select: { results: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getTestAnalytics(testId: string) {
    const test = await this.prisma.practiceTest.findUnique({
      where: { id: testId },
      include: {
        teacher: { select: { id: true, name: true, email: true } },
        results: {
          include: {
            student: { select: { id: true, name: true, email: true } },
          },
        },
      },
    });

    if (!test) {
      return null;
    }

    // Calculate analytics
    const totalAttempts = test.results.length;
    const completedAttempts = test.results.filter(
      (r) => r.status === 'COMPLETED',
    ).length;
    const cheatedAttempts = test.results.filter(
      (r) => r.status === 'CHEATED',
    ).length;
    const averageScore =
      totalAttempts > 0
        ? test.results.reduce((sum, r) => sum + r.score, 0) / totalAttempts
        : 0;
    const averagePercentage =
      totalAttempts > 0
        ? test.results.reduce((sum, r) => sum + (r.score / r.total) * 100, 0) /
          totalAttempts
        : 0;
    const averageRating =
      totalAttempts > 0
        ? test.results.reduce((sum, r) => sum + (r.rating || 0), 0) /
          totalAttempts
        : 0;
    const passRate =
      totalAttempts > 0
        ? (test.results.filter((r) => r.score / r.total >= 0.6).length /
            totalAttempts) *
          100
        : 0;

    // Calculate average time taken (only for completed tests)
    const completedResults = test.results.filter(
      (r) => r.status === 'COMPLETED' && r.timeTaken,
    );
    const averageTimeTaken =
      completedResults.length > 0
        ? completedResults.reduce((sum, r) => sum + (r.timeTaken || 0), 0) /
          completedResults.length
        : 0;

    // Get unique students who attempted
    const uniqueStudents = new Set(test.results.map((r) => r.studentId)).size;

    return {
      test,
      analytics: {
        totalAttempts,
        uniqueStudents,
        completedAttempts,
        cheatedAttempts,
        averageScore: parseFloat(averageScore.toFixed(2)),
        averagePercentage: parseFloat(averagePercentage.toFixed(2)),
        averageRating: parseFloat(averageRating.toFixed(2)),
        passRate: parseFloat(passRate.toFixed(2)),
        averageTimeTaken: Math.round(averageTimeTaken),
        cheatingRate:
          totalAttempts > 0
            ? parseFloat(((cheatedAttempts / totalAttempts) * 100).toFixed(2))
            : 0,
      },
    };
  }

  async getTestResults(testId: string) {
    return this.prisma.practiceTestResult.findMany({
      where: { testId },
      include: {
        student: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getAcademicStats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const [
      todayClassesCount,
      pendingDoubtsCount,
      activeTeachersCount,
      upcomingMilestones,
    ] = await Promise.all([
      this.prisma.classSession.count({
        where: {
          date: {
            gte: today,
            lt: tomorrow,
          },
        },
      }),
      this.prisma.chatRequest.count({
        where: { status: 'PENDING' },
      }),
      this.prisma.user.count({
        where: { role: 'TEACHER' },
      }),
      this.prisma.classSession.findMany({
        where: {
          date: { gte: today },
        },
        take: 3,
        orderBy: { date: 'asc' },
        select: {
          title: true,
          date: true,
          type: true,
        },
      }),
    ]);

    return {
      todayClasses: todayClassesCount,
      pendingDoubts: pendingDoubtsCount,
      activeTeachers: activeTeachersCount,
      avgResolveTime: '14m',
      studentEngagement: '94%',
      systemHealth: 'Optimum',
      milestones: upcomingMilestones.map((m) => ({
        title: m.title,
        date: m.date.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
        type: m.type,
        color: m.type === 'LECTURE' ? 'blue' : 'purple',
      })),
      batchHealth: [
        { name: 'Batch Alpha (Medical)', percentage: 94, color: 'blue' },
        { name: 'Batch Beta (Engineering)', percentage: 88, color: 'indigo' },
        { name: 'Batch Delta (Foundation)', percentage: 76, color: 'amber' },
      ],
    };
  }

  async deletePracticeTest(testId: string) {
    // First delete all results
    await this.prisma.practiceTestResult.deleteMany({
      where: { testId },
    });

    // Then delete the test
    return this.prisma.practiceTest.delete({
      where: { id: testId },
    });
  }
}
