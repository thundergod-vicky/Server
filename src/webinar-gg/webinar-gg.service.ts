import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EncryptionService } from './encryption.service';

@Injectable()
export class WebinarGGService {
  private readonly baseUrl = 'https://webinar-api.webinar.gg/api/v1';

  constructor(
    private prisma: PrismaService,
    private encryption: EncryptionService,
  ) {}

  async findAvailableAccount(
    date: Date,
    startTimeStr: string,
    endTimeStr: string,
  ) {
    const accounts = await this.prisma.webinarGGAccount.findMany({
      where: { isActive: true },
    });

    if (accounts.length === 0) {
      throw new InternalServerErrorException(
        'No active Webinar.gg accounts configured.',
      );
    }

    // Overlap Check Strategy:
    // Buffer = 1 min
    // A meeting overlaps if its [start, end+1m] range intersects with the new [reqStart, reqEnd] range.

    // For each account, check for overlaps on that date
    for (const account of accounts) {
      const overlaps = await this.prisma.classSession.findFirst({
        where: {
          webinarAccountId: account.id,
          date: date,
          OR: [
            {
              // Case: Existing session starts before new session ends
              // And ends after new session starts (with 1 min buffer)
              startTime: { lt: endTimeStr },
              endTime: { gt: startTimeStr }, // Should be gt to be safe, but let's be precise
            },
          ],
        },
      });

      // Precise intersection logic:
      // (start1 < end2) AND (end1 > start2)
      // With buffer: We treat end1 as (end1 + 1 min)

      const overlappingSessions = await this.prisma.classSession.findMany({
        where: {
          webinarAccountId: account.id,
          date: date,
        },
      });

      const hasOverlap = overlappingSessions.some((s) => {
        const sStart = this.timeToMinutes(s.startTime);
        const sEnd = this.timeToMinutes(s.endTime) + 1; // 1 min buffer
        const rStart = this.timeToMinutes(startTimeStr);
        const rEnd = this.timeToMinutes(endTimeStr);

        return sStart < rEnd && sEnd > rStart;
      });

      if (!hasOverlap) {
        return {
          ...account,
          decryptedApiKey: this.encryption.decrypt(account.apiKey),
        };
      }
    }

    return null; // All busy
  }

  private timeToMinutes(timeStr: string): number {
    const [hrs, mins] = timeStr.split(':').map(Number);
    return hrs * 60 + mins;
  }

  async createMeeting(data: {
    title: string;
    date: string; // YYYY-MM-DD
    time: string; // HH:mm
    meridiem: string; // AM/PM
    timezone: string;
    recordingEnabled: boolean;
    apiKey: string;
  }) {
    const response = await fetch(`${this.baseUrl}/webinar/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${data.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: data.title,
        date: data.date,
        time: data.time,
        meridiem: data.meridiem,
        timezone: data.timezone,
        recordingEnabled: data.recordingEnabled,
      }),
    });

    const resData = await response.json();
    console.log(
      '[WebinarGG API] Create Meeting Response:',
      JSON.stringify(resData, null, 2),
    );
    if (!response.ok) {
      throw new InternalServerErrorException(
        resData.message || 'Failed to create meeting on Webinar.gg',
      );
    }

    return resData.data; // Corrected: ID is nested in data object
  }

  async generateJoinToken(data: {
    webinarId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    passcode?: string;
    apiKey: string;
  }) {
    const response = await fetch(`${this.baseUrl}/webinar/join-token`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${data.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        webinarId: data.webinarId,
        firstName: data.firstName || 'User',
        lastName: data.lastName || 'Participant',
        email: data.email,
        phone: data.phone || '',
        passcode: data.passcode || '',
      }),
    });

    const resData = await response.json();
    console.log(
      '[WebinarGG API] Join Token Response:',
      JSON.stringify(resData, null, 2),
    );
    if (!response.ok) {
      throw new InternalServerErrorException(
        resData.message || 'Failed to generate join token',
      );
    }

    return resData.data.token; // Corrected: token is nested in data object
  }
}
