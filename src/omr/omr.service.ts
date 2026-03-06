import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { S3Service } from '../content/s3.service';
import sharp from 'sharp';

@Injectable()
export class OmrService {
  constructor(
    private prisma: PrismaService,
    private s3Service: S3Service,
  ) {}

  async createTemplate(teacherId: string, file: Express.Multer.File, name: string, description?: string) {
    // 1. Upload Mother OMR to S3
    const uploadResult = await this.s3Service.uploadFile(file);

    // 2. Identify answers from Mother OMR (Computer Vision)
    const answers = await this.detectAnswers(file.buffer);

    // 3. Save to DB
    return this.prisma.omrTemplate.create({
      data: {
        name,
        description,
        motherOmrUrl: uploadResult.webViewLink,
        answers: answers as any,
        teacherId,
      },
    });
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

    const results = [];
    for (const file of files) {
      // 1. Upload student OMR to S3
      const uploadResult = await this.s3Service.uploadFile(file);

      // 2. Analyze against template
      const analysis = this.analyzeOmr(file.buffer, template.answers as any);

      // 3. Save result to DB
      const result = await this.prisma.omrResult.create({
        data: {
          templateId,
          omrImageUrl: uploadResult.webViewLink,
          score: analysis.score,
          total: analysis.total,
          answers: analysis.studentAnswers as any,
          studentName: file.originalname.split('.')[0], // Default to filename
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

  /**
   * Stub for answer detection. 
   * In a real system, this would use computer vision to find marked bubbles.
   * For this implementation, we will use a simplified grid detection.
   */
  private async detectAnswers(buffer: Buffer) {
    const image = sharp(buffer);
    const metadata = await image.metadata();
    
    // We expect a grid of bubbles. 
    // Let's assume a standard 20-question, 4-option OMR for now.
    // Ideally, we'd detect circles here.
    
    // Placeholder logic for detecting marked options:
    // We'll return a mock set of correct answers for now, 
    // but the final version should actually process the image.
    const questions: { number: number; answer: string }[] = [];
    for (let i = 1; i <= 20; i++) {
      questions.push({
        number: i,
        answer: String.fromCharCode(65 + Math.floor(Math.random() * 4)), // Random A-D
      });
    }
    return questions;
  }

  /**
   * Stub for OMR analysis.
   */
  private analyzeOmr(buffer: Buffer, correctAnswers: { number: number; answer: string }[]) {
    let score = 0;
    const studentAnswers: { number: number; answer: string }[] = [];

    for (const q of correctAnswers) {
      const studentChoice = String.fromCharCode(65 + Math.floor(Math.random() * 4));
      if (studentChoice === q.answer) {
        score++;
      }
      studentAnswers.push({
        number: q.number,
        answer: studentChoice,
      });
    }

    return {
      score,
      total: correctAnswers.length,
      studentAnswers,
    };
  }
}
