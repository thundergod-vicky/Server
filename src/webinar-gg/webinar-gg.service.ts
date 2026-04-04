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

  async getTeacherWebinarAccount(teacherId: string) {
    const teacher = await this.prisma.user.findUnique({
      where: { id: teacherId },
      select: {
        webinarApiKey: true,
        webinarEmail: true,
        webinarName: true,
        role: true,
      },
    });

    if (!teacher) {
      throw new InternalServerErrorException('Teacher not found.');
    }

    if (!teacher.webinarApiKey) {
      throw new InternalServerErrorException(
        'This teacher has no Webinar.gg account linked. Please configure it in User Management.',
      );
    }

    return {
      apiKey: this.encryption.decrypt(teacher.webinarApiKey),
      email: teacher.webinarEmail,
      name: teacher.webinarName,
    };
  }

  async checkTeacherAvailability(
    teacherId: string,
    date: Date,
    startTimeStr: string,
    endTimeStr: string,
    excludeSessionId?: string,
  ) {
    const overlappingSessions = await this.prisma.classSession.findMany({
      where: {
        teacherId: teacherId,
        date: date,
        id: excludeSessionId ? { not: excludeSessionId } : undefined,
      },
    });

    const hasOverlap = overlappingSessions.some((s) => {
      const sStart = this.timeToMinutes(s.startTime);
      const sEnd = this.timeToMinutes(s.endTime) + 1; // 1 min buffer
      const rStart = this.timeToMinutes(startTimeStr);
      const rEnd = this.timeToMinutes(endTimeStr);

      return sStart < rEnd && sEnd > rStart;
    });

    return !hasOverlap;
  }

  private timeToMinutes(timeStr: string): number {
    const [hrs, mins] = timeStr.split(':').map(Number);
    return hrs * 60 + mins;
  }

  async createMeeting(data: {
    title: string;
    date: string; // YYYY-MM-DD
    time: string; // HH:mm — send 24-hour format so consumer page shows it unambiguously (e.g. "14:20")
    meridiem: string; // AM/PM — required by Webinar.gg API validation (consumer page ignores it)
    timezone: string;
    recordingEnabled: boolean;
    apiKey: string;
  }) {
    const requestBody = {
      title: data.title,
      date: data.date,
      time: data.time,
      meridiem: data.meridiem,
      timezone: data.timezone,
      recordingEnabled: data.recordingEnabled,
    };

    try {
      const fs = require('fs');
      const logMsg = `[WebinarGG DEBUG] Request: ${JSON.stringify(requestBody)}\n`;
      fs.appendFileSync('/tmp/webinar_debug.log', logMsg);
    } catch (e) {}

    const response = await fetch(`${this.baseUrl}/webinar/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${data.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const resData = await response.json();
    
    try {
      const fs = require('fs');
      const logMsg = `[WebinarGG DEBUG] Response: ${JSON.stringify(resData)}\n`;
      fs.appendFileSync('/tmp/webinar_debug.log', logMsg);
    } catch (e) {}

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
    role?: string;
    apiKey: string;
  }) {
    console.log('[WebinarGG API] Preparing Join Token Request:', {
      webinarId: data.webinarId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      passcode: data.passcode,
      role: data.role,
    });

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
        phone: String(data.phone || ''),
        passcode: String(data.passcode || ''),
        role: data.role, // Added undocumented role parameter from support
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
