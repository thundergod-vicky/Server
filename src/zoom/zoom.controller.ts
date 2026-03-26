/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Query,
  Param,
} from '@nestjs/common';
import { ZoomService } from './zoom.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

// Force reload - debug version 2
@Controller('zoom')
export class ZoomController {
  constructor(private readonly zoomService: ZoomService) {}

  @UseGuards(JwtAuthGuard)
  @Post('signature')
  generateSignature(@Body() body: { meetingNumber: string; role: number }) {
    console.log(
      `[Zoom] Generating signature for meeting: ${body.meetingNumber}, role: ${body.role}`,
    );
    const signature = this.zoomService.generateSignature(
      body.meetingNumber,
      body.role,
    );
    console.log(`[Zoom] Generated signature: ${signature}`);
    // Also return decoded payload for debugging
    const parts = signature.split('.');
    let payload: any = {};
    if (parts.length === 3) {
      payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
    }
    return {
      signature,
      sdkKey:
        payload.sdkKey ||
        process.env.ZOOM_SDK_KEY ||
        process.env.ZOOM_CLIENT_ID ||
        'missing_key',
      _debug_payload: payload,
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.ACADEMIC_OPERATIONS)
  @Post('create-meeting')
  async createMeeting(
    @Body() body: { topic: string; startTime: string; duration: number },
  ) {
    return this.zoomService.createMeeting(
      body.topic,
      body.startTime,
      body.duration,
    );
  }

  @Get('debug')
  debugConfig(@Query('meetingNumber') meetingNumber: string) {
    const meetingNum = meetingNumber || '123456789';
    const sig = this.zoomService.generateSignature(meetingNum, 0);
    const parts = sig.split('.');
    const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());

    return {
      sdkKeyUsed: payload.sdkKey,
      sdkKeyLength: payload.sdkKey?.length || 0,
      sdkSecretLength: process.env.ZOOM_CLIENT_SECRET?.length || 0,
      sdkSecretFirst4: process.env.ZOOM_CLIENT_SECRET?.substring(0, 4) || 'N/A',
      sdkSecretLast4: process.env.ZOOM_CLIENT_SECRET?.slice(-4) || 'N/A',
      meetingNumber: payload.mn,
      role: payload.role,
      iat: payload.iat,
      exp: payload.exp,
      tokenExp: payload.tokenExp,
      now: Math.round(Date.now() / 1000),
      payload,
      message:
        'Check if sdkKey matches your Zoom Marketplace Client ID (standard length is 22).',
    };
  }

  @Get('debug-recording/:meetingId')
  async debugRecording(@Param('meetingId') meetingId: string) {
    try {
      const result = await this.zoomService.getMeetingRecording(meetingId);
      return { success: true, result };
    } catch (err: any) {
      return { success: false, error: err.message || err?.toString() };
    }
  }
}
