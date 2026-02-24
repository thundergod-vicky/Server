import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Req,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from './s3.service';
import type { Response } from 'express';

interface UploadResult {
  id: string;
  name: string;
  mimeType: string;
  webViewLink: string | null;
}

@Controller('content')
export class ContentController {
  constructor(private readonly s3Service: S3Service) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const result = await this.s3Service.uploadFile(file);
    return {
      ...result,
      url: `/content/stream/${result.id}`,
    };
  }

  @Get('stream/*')
  async streamFile(@Req() req: any, @Res() res: Response) {
    // Extract the file path from the URL after 'stream/'
    const fullPath = req.url; // e.g., '/content/stream/uploads/timestamp-filename.pdf'
    const fileId = fullPath.replace('/content/stream/', '');
    const decodedFileId = decodeURIComponent(fileId);

    console.log('Streaming file:', decodedFileId);

    try {
      // Get file metadata to set proper content type
      const metadata = await this.s3Service.getFileMetadata(decodedFileId);

      // Get file stream from S3
      const stream = await this.s3Service.getFileStream(decodedFileId);

      // Set headers for proper PDF/video display
      res.setHeader(
        'Content-Type',
        metadata.mimeType || 'application/octet-stream',
      );
      res.setHeader('Accept-Ranges', 'bytes');
      res.setHeader('Cache-Control', 'no-cache');

      // Stream the file
      stream.pipe(res);
    } catch (error) {
      console.error('Streaming error:', error);
      res.status(500).send('Failed to stream file');
    }
  }
}
