/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class ZoomService {
  // Use ZOOM_SDK_KEY/SECRET if they are separate from OAuth credentials
  private sdkKey = process.env.ZOOM_SDK_KEY || process.env.ZOOM_CLIENT_ID || '';
  private sdkSecret =
    process.env.ZOOM_SDK_SECRET || process.env.ZOOM_CLIENT_SECRET || '';
  private accountId = process.env.ZOOM_ACCOUNT_ID || '';
  private clientId = process.env.ZOOM_CLIENT_ID || '';
  private clientSecret = process.env.ZOOM_CLIENT_SECRET || '';

  private async getAccessToken(): Promise<string> {
    const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString(
      'base64',
    );
    const response = await fetch(
      `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${this.accountId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${auth}`,
        },
      },
    );

    const data: any = await response.json();
    if (!response.ok) {
      throw new Error(
        `Failed to get Zoom access token: ${data.reason || data.error}`,
      );
    }

    return data.access_token;
  }

  async createMeeting(topic: string, startTime: string, duration: number = 60) {
    const accessToken = await this.getAccessToken();

    const response = await fetch('https://api.zoom.us/v2/users/me/meetings', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic,
        type: 2, // Scheduled meeting
        start_time: startTime,
        duration,
        timezone: 'UTC',
        settings: {
          host_video: true,
          participant_video: true,
          join_before_host: true,
          mute_upon_entry: true,
          waiting_room: false,
          enforce_login: false,
          auto_recording: 'cloud', // Web SDK only supports cloud recording
        },
      }),
    });

    const data: any = await response.json();
    if (!response.ok) {
      throw new Error(`Failed to create Zoom meeting: ${data.message}`);
    }

    return {
      meetingId: data.id.toString(),
      joinUrl: data.join_url,
      startUrl: data.start_url,
    };
  }

  generateSignature(meetingNumber: string, role: number): string {
    if (!this.sdkKey || !this.sdkSecret) {
      throw new Error(
        'Zoom SDK credentials (ZOOM_SDK_KEY / ZOOM_SDK_SECRET) are not configured.',
      );
    }

    // Clean meeting number (remove any spaces)
    const cleanedMeetingNumber = meetingNumber.toString().replace(/\s/g, '');
    const iat = Math.round(new Date().getTime() / 1000) - 30;
    const exp = iat + 60 * 60 * 2;

    const payload = {
      sdkKey: this.sdkKey,
      appKey: this.sdkKey,
      mn: cleanedMeetingNumber,
      role: role,
      iat: iat,
      exp: exp,
      tokenExp: exp,
    };

    const header = { alg: 'HS256', typ: 'JWT' };

    // Use jsonwebtoken for standard-compliant encoding
    // Zoom SDK expects exactly this format
    const signature = jwt.sign(payload, this.sdkSecret, {
      algorithm: 'HS256',
      header: header,
    });

    console.log(
      `[ZoomService] Generated signature for meeting ${cleanedMeetingNumber}, role: ${role}, using sdkKey: ${this.sdkKey.substring(0, 5)}...`,
    );
    return signature;
  }
}
