import { Controller, Post, Get, Body, UseGuards, Query } from '@nestjs/common';
import { ZoomService } from './zoom.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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
      sdkKey: process.env.ZOOM_CLIENT_ID || 'missing_key',
      _debug_payload: payload,
    };
  }

  @Get('debug')
  debugConfig(@Query('meetingNumber') meetingNumber: string) {
    const sig = this.zoomService.generateSignature(
      meetingNumber || '123456789',
      0,
    );
    const parts = sig.split('.');
    const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
    return {
      sdkKeyUsed: payload.appKey,
      secretLength: process.env.ZOOM_CLIENT_SECRET?.length ?? 0,
      secretFirst4: process.env.ZOOM_CLIENT_SECRET?.substring(0, 4) ?? 'N/A',
      payload,
      message: 'Use this to verify your credentials on https://jwt.io',
    };
  }
}
