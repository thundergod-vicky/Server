import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { RecordingsService } from './recordings.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';
import { InternalAuthGuard } from '../auth/internal-auth.guard';

@Controller()
export class RecordingsController {
  constructor(private readonly service: RecordingsService) {}

  // ─── Stream URL for a recording (CloudFront signed URL) ──────────────
  @Get('recordings/:id/stream')
  @UseGuards(JwtAuthGuard)
  async getStreamUrl(@Param('id') id: string) {
    const result = await this.service.getStreamUrl(id);
    if (!result) {
      return { error: 'Recording not found', statusCode: 404 };
    }
    return result;
  }

  // ─── Delete recording (soft delete + S3 cleanup) ─────────────────────
  @Delete('recordings/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.ACADEMIC_OPERATIONS)
  async deleteRecording(@Param('id') id: string) {
    const result = await this.service.deleteRecording(id);
    if (!result) {
      return { error: 'Recording not found', statusCode: 404 };
    }
    return result;
  }

  // ─── Lambda webhook: Mark recordings as "processing" ─────────────────
  @Post('internal/meetings/:meetingId/recordings/processing')
  @UseGuards(InternalAuthGuard)
  @HttpCode(200)
  async markProcessing(
    @Param('meetingId') meetingId: string,
    @Body()
    body: {
      topic: string;
      startTime: string;
      files: Array<{
        zoomFileId: string;
        fileType: string;
        recordedAt?: string;
        durationSecs?: number;
      }>;
    },
  ) {
    return this.service.markProcessing(
      meetingId,
      body.topic,
      body.startTime,
      body.files,
    );
  }

  // ─── Lambda webhook: Mark recordings as "ready" (S3 upload done) ─────
  @Post('internal/meetings/:meetingId/recordings/ready')
  @UseGuards(InternalAuthGuard)
  @HttpCode(200)
  async markReady(
    @Param('meetingId') meetingId: string,
    @Body()
    body: {
      savedFiles: Array<{
        zoomFileId: string;
        s3Key: string;
        fileType: string;
      }>;
    },
  ) {
    return this.service.markReady(meetingId, body.savedFiles);
  }
}
