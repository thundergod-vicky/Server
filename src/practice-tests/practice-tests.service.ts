import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePracticeTestDto } from './dto/create-practice-test.dto';

@Injectable()
export class PracticeTestsService {
  constructor(private prisma: PrismaService) {}

  async create(teacherId: string, dto: CreatePracticeTestDto) {
    return await this.prisma.practiceTest.create({
      data: {
        title: dto.title,
        totalQuestions: dto.totalQuestions,
        questions: dto.questions,
        timeLimit: dto.timeLimit,
        teacherId: teacherId,
      },
    });
  }

  async findAllByTeacher(teacherId: string) {
    return await this.prisma.practiceTest.findMany({
      where: { teacherId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return await this.prisma.practiceTest.findUnique({
      where: { id },
    });
  }

  async findAll() {
    return await this.prisma.practiceTest.findMany({
      include: { teacher: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: string, teacherId: string, dto: CreatePracticeTestDto) {
    return await this.prisma.practiceTest.update({
      where: { id, teacherId },
      data: {
        title: dto.title,
        totalQuestions: dto.totalQuestions,
        questions: dto.questions,
        timeLimit: dto.timeLimit,
      },
    });
  }

  async remove(id: string, teacherId: string) {
    return await this.prisma.practiceTest.delete({
      where: { id, teacherId },
    });
  }

  async submitResult(
    studentId: string,
    testId: string,
    data: {
      score: number;
      total: number;
      timeTaken: number;
      status: 'COMPLETED' | 'CHEATED';
      answers: any;
    },
  ) {
    // Basic rating calculation: (score / total) * 5
    const baseRating = (data.score / data.total) * 5;

    // Bonus for speed (very basic implementation for now)
    // If student finished in less than 50% of the time, add a small boost
    const test = await this.prisma.practiceTest.findUnique({
      where: { id: testId },
    });
    let finalRating = baseRating;
    if (test?.timeLimit && data.timeTaken < (test.timeLimit * 60) / 2) {
      finalRating = Math.min(5, finalRating + 0.5);
    }

    return await this.prisma.practiceTestResult.create({
      data: {
        studentId,
        testId,
        score: data.score,
        total: data.total,
        timeTaken: data.timeTaken,
        status: data.status,
        rating: parseFloat(finalRating.toFixed(1)),
        answers: data.answers,
      },
    });
  }

  async findResultsByStudent(studentId: string) {
    return await this.prisma.practiceTestResult.findMany({
      where: { studentId },
      include: { test: { select: { title: true, totalQuestions: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findResultByStudentAndTest(studentId: string, testId: string) {
    return await this.prisma.practiceTestResult.findFirst({
      where: { studentId, testId },
    });
  }
}
