import { Injectable } from '@nestjs/common';
import { createHmac } from 'crypto';

@Injectable()
export class ZoomService {
  // For Zoom General Apps: Client ID = SDK Key, Client Secret = SDK Secret
  private sdkKey = process.env.ZOOM_CLIENT_ID || '';
  private sdkSecret = process.env.ZOOM_CLIENT_SECRET || '';

  generateSignature(meetingNumber: string, role: number): string {
    if (!this.sdkKey || !this.sdkSecret) {
      throw new Error('Zoom SDK credentials (ZOOM_CLIENT_ID / ZOOM_CLIENT_SECRET) are not configured.');
    }

    const iat = Math.round(new Date().getTime() / 1000) - 30;
    const exp = iat + 60 * 60 * 2;

    // Zoom Meeting SDK JWT payload (v5+ spec)
    const payload = {
      appKey: this.sdkKey,
      sdkKey: this.sdkKey,
      mn: meetingNumber,
      role: role,
      iat: iat,
      exp: exp,
      tokenExp: exp,
    };

    const header = { alg: 'HS256', typ: 'JWT' };

    const encodedHeader = this.base64UrlEncode(JSON.stringify(header));
    const encodedPayload = this.base64UrlEncode(JSON.stringify(payload));
    const signingInput = `${encodedHeader}.${encodedPayload}`;

    const signature = createHmac('sha256', this.sdkSecret)
      .update(signingInput)
      .digest('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');

    const jwt = `${signingInput}.${signature}`;
    console.log(`[ZoomService] Generated JWT for meeting ${meetingNumber} (role ${role}), sdkKey: ${this.sdkKey}`);
    return jwt;
  }

  private base64UrlEncode(str: string): string {
    return Buffer.from(str)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }
}
