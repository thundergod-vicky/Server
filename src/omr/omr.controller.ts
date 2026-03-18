import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Body,
  UseGuards,
  Request,
  Res,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import * as express from 'express';
import { OmrService } from './omr.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('omr')
export class OmrController {
  constructor(private readonly omrService: OmrService) {}

  @Post('template')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async createTemplate(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
    @Body('name') name: string,
    @Body('totalQuestions') totalQuestionsStr: string,
    @Body('description') description?: string,
  ) {
    const totalQuestions = parseInt(totalQuestionsStr ?? '20', 10);
    return this.omrService.createTemplate(
      req.user.id,
      file,
      name,
      totalQuestions,
      description,
    );
  }

  @Get('templates')
  @UseGuards(JwtAuthGuard)
  async getTemplates(@Request() req) {
    return this.omrService.getTemplates(req.user.id);
  }

  @Delete('template/:id')
  @UseGuards(JwtAuthGuard)
  async deleteTemplate(@Request() req, @Param('id') id: string) {
    return this.omrService.deleteTemplate(id, req.user.id);
  }

  @Post('scan/:templateId')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('files'))
  async scanOmrs(
    @Param('templateId') templateId: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.omrService.scanOmrs(templateId, files);
  }

  @Get('results/:templateId')
  @UseGuards(JwtAuthGuard)
  async getResults(@Param('templateId') templateId: string) {
    return this.omrService.getResults(templateId);
  }

  @Get('image/*path')
  async getImage(
    @Param('path') rawKey: string | string[],
    @Res() res: express.Response,
  ) {
    // NestJS may split wildcard param into an array for multi-segment paths
    const key = Array.isArray(rawKey) ? rawKey.join('/') : rawKey;

    try {
      const stream = await this.omrService.getFileStream(key);
      const metadata = await this.omrService.getFileMetadata(key);

      res.setHeader('Content-Type', metadata.mimeType);
      res.setHeader('Cache-Control', 'public, max-age=31536000');
      stream.pipe(res);
    } catch {
      res.status(404).json({ message: 'Image not found' });
    }
  }
}
