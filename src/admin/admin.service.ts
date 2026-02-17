import { Injectable, ForbiddenException } from '@nestjs/common';
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

  async updateUserRole(userId: string, role: any) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { role },
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
