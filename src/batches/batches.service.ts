import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBatchDto } from './dto/create-batch.dto';

@Injectable()
export class BatchesService {
  constructor(private prisma: PrismaService) {}

  async create(createBatchDto: CreateBatchDto) {
    return this.prisma.batch.create({
      data: {
        name: createBatchDto.name,
        description: createBatchDto.description,
        teacherId: createBatchDto.teacherId,
      },
      include: {
        teacher: { select: { id: true, name: true, email: true } },
      },
    });
  }

  async findAll() {
    return this.prisma.batch.findMany({
      include: {
        teacher: { select: { id: true, name: true, email: true } },
        _count: { select: { students: true } },
      },
    });
  }

  async findOne(id: string) {
    const batch = await this.prisma.batch.findUnique({
      where: { id },
      include: {
        teacher: { select: { id: true, name: true, email: true } },
        students: { select: { id: true, name: true, email: true } },
      },
    });

    if (!batch) {
      throw new NotFoundException(`Batch with ID ${id} not found`);
    }

    return batch;
  }

  async assignStudents(batchId: string, studentIds: string[]) {
    return this.prisma.batch.update({
      where: { id: batchId },
      data: {
        students: {
          connect: studentIds.map((id) => ({ id })),
        },
      },
      include: {
        students: { select: { id: true, name: true, email: true } },
      },
    });
  }

  async assignTeacher(batchId: string, teacherId: string) {
    return this.prisma.batch.update({
      where: { id: batchId },
      data: {
        teacherId: teacherId,
      },
      include: {
        teacher: { select: { id: true, name: true, email: true } },
      },
    });
  }

  async removeStudent(batchId: string, studentId: string) {
    return this.prisma.batch.update({
      where: { id: batchId },
      data: {
        students: {
          disconnect: { id: studentId },
        },
      },
    });
  }

  async findByStudent(studentId: string) {
    return this.prisma.batch.findMany({
      where: {
        students: {
          some: { id: studentId },
        },
      },
      include: {
        teacher: { select: { id: true, name: true, email: true } },
      },
    });
  }

  async findByTeacher(teacherId: string) {
    return this.prisma.batch.findMany({
      where: { teacherId },
      include: {
        _count: { select: { students: true } },
      },
    });
  }

  async delete(id: string) {
    return this.prisma.batch.delete({
      where: { id },
    });
  }
}
