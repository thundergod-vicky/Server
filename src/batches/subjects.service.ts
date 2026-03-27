import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SubjectsService {
  constructor(private prisma: PrismaService) {}

  async create(batchId: string, name: string) {
    // Check if batch exists
    const batch = await this.prisma.batch.findUnique({ where: { id: batchId } });
    if (!batch) {
      throw new NotFoundException(`Batch with ID ${batchId} not found`);
    }

    try {
      return await this.prisma.subject.create({
        data: {
          name,
          batchId,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException(`Subject "${name}" already exists for this batch`);
      }
      throw error;
    }
  }

  async findByBatch(batchId: string) {
    return this.prisma.subject.findMany({
      where: { batchId },
      orderBy: { name: 'asc' },
    });
  }

  async remove(id: string) {
    const subject = await this.prisma.subject.findUnique({ where: { id } });
    if (!subject) {
      throw new NotFoundException(`Subject with ID ${id} not found`);
    }

    return this.prisma.subject.delete({ where: { id } });
  }
}
