import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { S3Service } from '../content/s3.service';
import { analyzeOmrImageLocal, Answer } from './omr.cv';

@Injectable()
export class OmrService {
  constructor(
    private prisma: PrismaService,
    private s3Service: S3Service,
  ) {}

  async createTemplate(
    teacherId: string,
    file: Express.Multer.File,
    name: string,
    totalQuestions: number,
    description?: string,
  ) {
    console.log(`[OMR Service] Creating template: "${name}" for teacher ${teacherId}`);
    // 1. Upload Mother OMR to S3
    const uploadResult = await this.s3Service.uploadFile(file);

    // 2. Analyze Mother OMR image dynamically with local OpenCV
    const answers = await analyzeOmrImageLocal(file.buffer, totalQuestions);

    // 3. Save to DB
    return this.prisma.omrTemplate.create({
      data: {
        name,
        description,
        motherOmrUrl: uploadResult.webViewLink,
        answers: answers as any,
        totalQuestions,
        teacherId,
      },
    });
  }

  async deleteTemplate(id: string, teacherId: string) {
    const template = await this.prisma.omrTemplate.findUnique({
      where: { id },
    });
    if (!template) throw new NotFoundException('Template not found');
    if (template.teacherId !== teacherId)
      throw new NotFoundException('Not authorized');
    await this.prisma.omrTemplate.delete({ where: { id } });
    return { success: true };
  }

  async getTemplates(teacherId: string) {
    return this.prisma.omrTemplate.findMany({
      where: { teacherId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async scanOmrs(templateId: string, files: Express.Multer.File[]) {
    const template = await this.prisma.omrTemplate.findUnique({
      where: { id: templateId },
    });

    if (!template) {
      throw new NotFoundException('Template not found');
    }

    const correctAnswers = template.answers as Answer[];
    const totalQuestions = template.totalQuestions;

    const results: any[] = [];
    for (const file of files) {
      // 1. Upload student OMR to S3
      const uploadResult = await this.s3Service.uploadFile(file);

      // 2. Detect student's answers using local OpenCV
      const studentAnswers = await analyzeOmrImageLocal(
        file.buffer,
        totalQuestions,
      );

      // 3. Compare against answer key and score
      let score = 0;
      studentAnswers.forEach((sa) => {
        const ca = correctAnswers.find((ca) => ca.number === sa.number);
        if (!ca) return;

        const correctOptions = ca.answer.split(',').filter(Boolean);
        const studentOptions = sa.answer.split(',').filter(Boolean);

        if (studentOptions.length === 0 || sa.answer === '-') {
          // Unanswered: 0 marks
          return;
        }

        const isExactMatch =
          correctOptions.length === studentOptions.length &&
          correctOptions.every((opt) => studentOptions.includes(opt));

        if (isExactMatch) {
          // Full +4 Match
          score += 4;
        } else {
          // Check for partial vs absolute wrong
          const hasWrongOption = studentOptions.some(
            (opt) => !correctOptions.includes(opt),
          );
          if (hasWrongOption) {
            // Any incorrect bubble marked means entirely wrong
            score -= 1;
          } else {
            // They marked correct bubbles, but didn't mark all of them
            // E.g. marked 1 out of 2 correct answers
            score += 2; // Half marks according to partial marking rules
          }
        }
      });

      // 4. Save result to DB
      const result = await this.prisma.omrResult.create({
        data: {
          templateId,
          omrImageUrl: uploadResult.webViewLink,
          score,
          total: totalQuestions * 4, // Max mark is Total Qs * 4 marks each
          answers: studentAnswers as any,
          studentName: file.originalname.split('.')[0],
        },
      });
      results.push(result);
    }

    return results;
  }

  async getResults(templateId: string) {
    return this.prisma.omrResult.findMany({
      where: { templateId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getFileStream(key: string) {
    return this.s3Service.getFileStream(key);
  }

  async getFileMetadata(key: string) {
    return this.s3Service.getFileMetadata(key);
  }
}
