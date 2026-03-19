import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';

@Injectable()
export class ExamsService {
  constructor(private prisma: PrismaService) {}

  async create(createExamDto: CreateExamDto, creatorId: string) {
    return this.prisma.exam.create({
      data: {
        title: createExamDto.title,
        description: createExamDto.description,
        status: createExamDto.status || 'PLANNED',
        batch: createExamDto.batchId ? { connect: { id: createExamDto.batchId } } : undefined,
        creator: { connect: { id: creatorId } },
      },
    });
  }

  async findAll() {
    return this.prisma.exam.findMany({
      include: {
        batch: { select: { name: true } },
        assignedStudents: { select: { id: true } },
        _count: { select: { results: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string, userRole: string) {
    const exam = await this.prisma.exam.findUnique({
      where: { id },
      include: {
        batch: true,
        assignedStudents: { select: { id: true, name: true, email: true } },
      },
    });

    if (!exam) throw new NotFoundException('Exam not found');

    // If student, filter out questions if not in window
    if (userRole === 'STUDENT') {
      const now = new Date();
      if (!exam.startTime) {
        return { ...exam, questions: null }; // No time set, no questions
      }

      const accessTime = new Date(exam.startTime.getTime() - 5 * 60000); // 5 mins before
      if (now < accessTime) {
        return { ...exam, questions: null };
      }
    }

    return exam;
  }

  async update(id: string, updateExamDto: UpdateExamDto) {
    const { assignedStudentIds, ...updateData } = updateExamDto;

    return this.prisma.exam.update({
      where: { id },
      data: {
        ...updateData,
        assignedStudents: assignedStudentIds
          ? { set: assignedStudentIds.map((sid) => ({ id: sid })) }
          : undefined,
      },
    });
  }

  async findForStudent(studentId: string) {
    return this.prisma.exam.findMany({
      where: {
        status: { in: ['PLANNED', 'SCHEDULED'] },
        OR: [
          { batch: { students: { some: { id: studentId } } } },
          { assignedStudents: { some: { id: studentId } } },
        ],
      },
      include: {
        batch: { select: { name: true } },
        results: { where: { studentId } },
      },
      orderBy: { startTime: 'asc' },
    });
  }

  async submitResult(examId: string, studentId: string, data: { score: number; total: number; answers: any }) {
    return this.prisma.examResult.upsert({
      where: {
        examId_studentId: { examId, studentId },
      },
      update: {
        score: data.score,
        total: data.total,
        answers: data.answers,
        submittedAt: new Date(),
      },
      create: {
        examId,
        studentId,
        score: data.score,
        total: data.total,
        answers: data.answers,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.exam.delete({ where: { id } });
  }
}
