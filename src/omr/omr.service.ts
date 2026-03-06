import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { S3Service } from '../content/s3.service';
import OpenAI from 'openai';
import sharp from 'sharp';

type Answer = { number: number; answer: string };

@Injectable()
export class OmrService {
  private _openai: OpenAI | null = null;

  private get openai(): OpenAI {
    if (!this._openai) {
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey || apiKey === 'your-openai-api-key-here') {
        throw new Error('OPENAI_API_KEY is not configured. Please add it to your .env file.');
      }
      this._openai = new OpenAI({ apiKey });
    }
    return this._openai;
  }

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
    // 1. Upload Mother OMR to S3
    const uploadResult = await this.s3Service.uploadFile(file);

    // 2. Analyze image with GPT-4o Vision to detect filled bubbles
    const answers = await this.detectAnswersWithAI(file.buffer, file.mimetype, totalQuestions);

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
    const template = await this.prisma.omrTemplate.findUnique({ where: { id } });
    if (!template) throw new NotFoundException('Template not found');
    if (template.teacherId !== teacherId) throw new NotFoundException('Not authorized');
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

      // 2. Detect student's answers using AI
      const studentAnswers = await this.detectAnswersWithAI(file.buffer, file.mimetype, totalQuestions);

      // 3. Compare against answer key
      const score = studentAnswers.filter((sa) => {
        const correct = correctAnswers.find((ca) => ca.number === sa.number);
        return correct && correct.answer === sa.answer;
      }).length;

      // 4. Save result to DB
      const result = await this.prisma.omrResult.create({
        data: {
          templateId,
          omrImageUrl: uploadResult.webViewLink,
          score,
          total: totalQuestions,
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

  /**
   * Uses GPT-4o Vision to analyze an OMR sheet image and detect which bubble
   * (A, B, C or D) is filled for each question.
   *
   * The model is instructed to return a strict JSON array so we can parse it reliably.
   */
  /**
   * Uses GPT-4o Vision to analyze an OMR sheet image and detect which bubble
   * (A, B, C or D) is filled for each question.
   *
   * IMPROVED: Crops the image to focus on "Section 8" to increase resolution/focus.
   */
  private async detectAnswersWithAI(
    buffer: Buffer,
    mimeType: string,
    totalQuestions: number,
  ): Promise<Answer[]> {
    try {
      const image = sharp(buffer);
      const metadata = await image.metadata();

      if (!metadata.width || !metadata.height) {
        throw new Error('Could not read image metadata');
      }

      // SECTION 8 (Answers) is in the bottom ~40% of the page
      const sectionTop = Math.floor(metadata.height * 0.6);
      const sectionHeight = Math.floor(metadata.height * 0.4);
      const columnWidth = Math.floor(metadata.width / 4);

      // Define question ranges for each column (assuming standard 4-column layout)
      const columnDefinitions = [
        { start: 1, end: 10, left: 0 },
        { start: 11, end: 20, left: columnWidth },
        { start: 21, end: 30, left: columnWidth * 2 },
        { start: 31, end: 40, left: columnWidth * 3 },
      ];

      const allDetectedAnswers: Answer[] = [];

      // Process columns in parallel for extreme accuracy and speed
      await Promise.all(
        columnDefinitions.map(async (col) => {
          // If the template has fewer questions, skip irrelevant columns
          if (col.start > totalQuestions) return;

          // 1. Crop the specific column strip
          const columnBuffer = await image
            .clone()
            .extract({
              left: col.left,
              top: sectionTop,
              width: columnWidth,
              height: sectionHeight,
            })
            .toBuffer();

          const base64Image = columnBuffer.toString('base64');
          const imageUrl = `data:${mimeType};base64,${base64Image}`;

          const prompt = `You are an expert OMR Scanner analyzing ONE VERTICAL COLUMN of questions.
This column contains questions ${col.start} to ${Math.min(col.end, totalQuestions)}.

RULES:
1. ONLY identify bubbles that are SOLIDLY and DARKLY filled with ink (Blue or Black).
2. If a bubble is hollow, empty, or has a letter (A, B, C, D) clearly visible inside, it is EMPTY.
3. If no bubble is DARKLY filled for a question, result must be "-".
4. IGNORE pink/purple horizontal stripes. Marks must be MUCH DARKER than the background.

Return ONLY a JSON array of objects:
[{"number": ${col.start}, "answer": "..."}, ...]`;

          try {
            const response = await this.openai.chat.completions.create({
              model: 'gpt-4o',
              messages: [
                {
                  role: 'user',
                  content: [
                    { type: 'image_url', image_url: { url: imageUrl, detail: 'high' } },
                    { type: 'text', text: prompt },
                  ],
                },
              ],
              temperature: 0,
            });

            const raw = response.choices[0]?.message?.content ?? '[]';
            const jsonMatch = raw.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
              const columnAnswers: Answer[] = JSON.parse(jsonMatch[0]);
              allDetectedAnswers.push(...columnAnswers);
            }
          } catch (err) {
            console.error(`Error analyzing column ${col.start}-${col.end}:`, err);
          }
        }),
      );

      // Sanitize and sort results
      const valid = allDetectedAnswers
        .filter(
          (a) =>
            typeof a.number === 'number' &&
            a.number >= 1 &&
            a.number <= totalQuestions &&
            ['A', 'B', 'C', 'D', '-'].includes(a.answer?.toUpperCase()),
        )
        .map((a) => ({ number: a.number, answer: a.answer.toUpperCase() }));

      // Fill in any missing questions with "-" to ensure consistency
      for (let i = 1; i <= totalQuestions; i++) {
        if (!valid.find((v) => v.number === i)) {
          valid.push({ number: i, answer: '-' });
        }
      }

      valid.sort((a, b) => a.number - b.number);
      return valid;
    } catch (error) {
      console.error('AI OMR detection error:', error);
      return Array.from({ length: totalQuestions }, (_, i) => ({
        number: i + 1,
        answer: '-',
      }));
    }
  }
}
