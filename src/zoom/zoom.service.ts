import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export interface ZoomRecordingFile {
  id: string;
  file_type: string;
  play_url?: string;
  download_url?: string;
  file_size?: number;
  recording_start?: string;
  recording_end?: string;
}

export interface ZoomRecordingResponse {
  recording_files: ZoomRecordingFile[];
  password?: string;
  share_url?: string;
  start_time?: string;
}

export interface SyncedRecording {
  url: string;
  id: string;
  file_type: string;
  file_size?: number;
  recording_start?: string;
  recording_end?: string;
}

export interface ZoomAccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface ZoomMeetingInstance {
  uuid: string;
  start_time: string;
}

export interface ZoomMeetingInstancesResponse {
  meetings: ZoomMeetingInstance[];
}

export interface ZoomMeetingResponse {
  id: number;
  join_url: string;
  start_url: string;
  password?: string;
  message?: string;
}

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

    const data = (await response.json()) as ZoomAccessTokenResponse & {
      reason?: string;
      error?: string;
    };
    if (!response.ok) {
      throw new Error(
        `Failed to get Zoom access token: ${data.reason || data.error || 'Unknown error'}`,
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

    const data = (await response.json()) as ZoomMeetingResponse;
    if (!response.ok) {
      throw new Error(
        `Failed to create Zoom meeting: ${data.message || 'Unknown error'}`,
      );
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

  async getMeetingRecording(
    meetingId: string,
  ): Promise<{ recordings: SyncedRecording[]; password: string } | null> {
    const accessToken = await this.getAccessToken();

    // Sanitize meeting ID (Zoom numeric ID should not have spaces)
    const sanitizedId = meetingId.replace(/\s/g, '');

    // 1. Try to get all instances for this meeting ID
    // Note: Past instances are identified by UUIDs. If a meeting was stopped and restarted, 
    // it creates a new instance.
    const instancesResponse = await fetch(
      `https://api.zoom.us/v2/past_meetings/${sanitizedId}/instances`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    let uuids = [sanitizedId]; // Fallback to the numeric ID if no instances found
    if (instancesResponse.ok) {
      const instanceData =
        (await instancesResponse.json()) as ZoomMeetingInstancesResponse;
      if (instanceData.meetings && instanceData.meetings.length > 0) {
        // Double-encode UUIDs that start with / or contain // as per Zoom requirements
        uuids = instanceData.meetings.map((m: ZoomMeetingInstance) => {
          let uuid = m.uuid;
          if (uuid.startsWith('/') || uuid.includes('//')) {
            uuid = encodeURIComponent(encodeURIComponent(uuid));
          }
          return uuid;
        });
      }
    }

    const allRecordings: SyncedRecording[] = [];
    let commonPasscode = '';

    // 2. Fetch recordings for all found UUIDs (limit to latest 5 instances to be safe)
    for (const uuid of uuids.slice(0, 5)) {
      const response = await fetch(
        `https://api.zoom.us/v2/meetings/${uuid}/recordings`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) continue;

      const data = (await response.json()) as ZoomRecordingResponse;
      
      if (data.recording_files && data.recording_files.length > 0) {
        if (data.password && !commonPasscode) {
          commonPasscode = data.password;
        }

        const mp4Files = data.recording_files.filter(
          (f: ZoomRecordingFile) =>
            f.file_type === 'MP4' && (f.play_url || f.download_url),
        );

        const instanceRecordings: SyncedRecording[] = mp4Files.map(
          (f: ZoomRecordingFile) => ({
            url: (f.play_url || f.download_url) as string,
            id: f.id,
            file_type: f.file_type,
            file_size: f.file_size,
            recording_start: f.recording_start,
            recording_end: f.recording_end,
          }),
        );
        allRecordings.push(...instanceRecordings);
      }
    }

    if (allRecordings.length === 0) {
      return null;
    }

    // Sort by recording start time
    allRecordings.sort((a, b) => {
      return (
        new Date(a.recording_start || 0).getTime() -
        new Date(b.recording_start || 0).getTime()
      );
    });

    console.log(
      `Aggregated ${allRecordings.length} recording files from multiple instances for ${meetingId}`,
    );

    return {
      recordings: allRecordings,
      password: commonPasscode,
    };
  }
}
