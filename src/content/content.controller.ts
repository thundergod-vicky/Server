import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from './s3.service';
import type { Response } from 'express';

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

  @Get('stream/*path')
  async streamFile(
    @Param('path') path: string | string[],
    @Res() res: Response,
  ) {
    // path is the captured string or array from the wildcard route
    const segments = Array.isArray(path) ? path : [path];
    const fileId = segments.join('/');
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
