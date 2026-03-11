import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ZoomService {
  private readonly logger = new Logger(ZoomService.name);

  // Consider moving these to .env for production
  private readonly accountId = process.env.ZOOM_ACCOUNT_ID || 'jAmPmQpQTfymhq0ygnH3Lw';
  private readonly clientId = process.env.ZOOM_CLIENT_ID || '9bUWN0_FRoGih7zLKsuSSg';
  private readonly clientSecret = process.env.ZOOM_CLIENT_SECRET || '1yqq3P14JqXpZ1SK2VxljQ9Qw119XZ3D';

  private accessToken: string | null = null;
  private tokenExpiresAt: number = 0;

  private async getAccessToken(): Promise<string> {
    const now = Date.now();
    // Refresh token if it's expired or expires in less than 5 minutes (300000ms)
    if (this.accessToken && this.tokenExpiresAt > now + 300000) {
      return this.accessToken;
    }

    try {
      const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');
      const response = await fetch(`https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${this.accountId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        this.logger.error(`Failed to get Zoom access token: ${response.status} ${errorText}`);
        throw new Error(`Zoom auth failed: ${response.statusText}`);
      }

      const data = await response.json();
      this.accessToken = data.access_token;
      // expires_in is usually 3599 seconds
      this.tokenExpiresAt = now + data.expires_in * 1000;
      
      this.logger.log('Successfully fetched Zoom access token');
      return this.accessToken || '';
    } catch (error) {
      this.logger.error('Error in Zoom getAccessToken', error);
      throw error;
    }
  }

  /**
   * Creates a Zoom Meeting
   * @param topic Topic of the meeting
   * @param startTime Start time in ISO 8601 format (e.g. 2026-03-12T10:00:00Z)
   * @param duration Duration in minutes
   * @returns Meeting link and id
   */
  async createMeeting(topic: string, startTime: string, duration: number): Promise<{ joinUrl: string; meetingId: string }> {
    try {
      const token = await this.getAccessToken();
      
      const payload = {
        topic: topic,
        type: 2, // 2 = Scheduled Meeting
        start_time: startTime,
        duration: duration,
        timezone: 'Asia/Kolkata', // Set a default timezone or pass dynamically
        settings: {
          host_video: true,
          participant_video: false,
          join_before_host: true,
          mute_upon_entry: true,
          auto_recording: 'cloud',
          waiting_room: false,
        },
      };

      const response = await fetch('https://api.zoom.us/v2/users/me/meetings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        this.logger.error(`Failed to create Zoom meeting: ${response.status} ${errorText}`);
        throw new Error(`Failed to create Zoom meeting`);
      }

      const data = await response.json();
      return {
        joinUrl: data.join_url,
        meetingId: data.id.toString(),
      };
    } catch (error) {
      this.logger.error('Error in Zoom createMeeting', error);
      throw error;
    }
  }
}
