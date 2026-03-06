import {
  Controller,
  Post,
  Get,
  Param,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
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
    @Body('description') description?: string,
  ) {
    return this.omrService.createTemplate(req.user.id, file, name, description);
  }

  @Get('templates')
  @UseGuards(JwtAuthGuard)
  async getTemplates(@Request() req) {
    return this.omrService.getTemplates(req.user.id);
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
}
