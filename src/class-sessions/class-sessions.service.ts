import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { WebinarGGService } from '../webinar-gg/webinar-gg.service';

@Injectable()
export class ClassSessionsService {
  constructor(
    private prisma: PrismaService,
    private notifications: NotificationsService,
    private webinarService: WebinarGGService,
  ) {}

  async create(data: {
    title: string;
    type: 'LECTURE' | 'PRACTICAL' | 'WORKSHOP';
    teacherId: string;
    batchId: string;
    subjectId?: string;
    date: string;
    startTime: string;
    endTime: string;
    venue?: string;
    isOnline?: boolean;
    meetingUrl?: string;
    meetingId?: string;
    meetingPasscode?: string;
  }) {
    const meetingUrl: string | null = data.meetingUrl || null;
    const meetingId: string | null = data.meetingId || null;
    const meetingPasscode: string | null = data.meetingPasscode || null;

    const webinarData = data.isOnline ? await this.ensureWebinar({ ...data, teacherId: data.teacherId }) : null;

    const session = await this.prisma.classSession.create({
      data: {
        title: data.title,
        type: data.type,
        teacherId: data.teacherId,
        batchId: data.batchId,
        subjectId: data.subjectId || null,
        date: new Date(data.date),
        startTime: data.startTime,
        endTime: data.endTime,
        venue: data.venue,
        isOnline: data.isOnline || false,
        meetingUrl: meetingUrl,
        meetingId: meetingId,
        meetingPasscode: meetingPasscode,
        ...(webinarData && {
          webinarId: webinarData.webinarId,
        }),
      },
      include: {
        teacher: { select: { id: true, name: true } },
        batch: { include: { students: { select: { id: true } } } },
      },
    });

    await this.sendSessionNotifications(session);
    return session;
  }

  async update(
    id: string,
    data: {
      title?: string;
      type?: 'LECTURE' | 'PRACTICAL' | 'WORKSHOP';
      teacherId?: string;
      batchId?: string;
      subjectId?: string;
      date?: string;
      startTime?: string;
      endTime?: string;
      venue?: string;
      isOnline?: boolean;
      meetingUrl?: string;
      meetingId?: string;
      meetingPasscode?: string;
    },
  ) {
    const session = await this.prisma.classSession.findUnique({
      where: { id },
    });

    if (!session) {
      throw new Error('Session not found');
    }

    // Determine if we need to generate/update webinar
    const updatedIsOnline = data.isOnline !== undefined ? data.isOnline : session.isOnline;
    let webinarData: { webinarId: string } | null = null;

    if (updatedIsOnline && !session.webinarId) {
      webinarData = await this.ensureWebinar({
        title: data.title || session.title,
        date: data.date || session.date,
        startTime: data.startTime || session.startTime,
        endTime: data.endTime || session.endTime,
        isOnline: true,
        teacherId: data.teacherId || session.teacherId,
      });
    }

    return this.prisma.classSession.update({
      where: { id },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.type && { type: data.type }),
        ...(data.teacherId && { teacherId: data.teacherId }),
        ...(data.batchId && { batchId: data.batchId }),
        ...(data.subjectId !== undefined && {
          subjectId: data.subjectId || null,
        }),
        ...(data.date && { date: new Date(data.date) }),
        ...(data.startTime && { startTime: data.startTime }),
        ...(data.endTime && { endTime: data.endTime }),
        ...(data.venue !== undefined && { venue: data.venue }),
        ...(data.isOnline !== undefined && { isOnline: data.isOnline }),
        ...(data.meetingUrl !== undefined && { meetingUrl: data.meetingUrl }),
        ...(data.meetingId !== undefined && { meetingId: data.meetingId }),
        ...(data.meetingPasscode !== undefined && {
          meetingPasscode: data.meetingPasscode,
        }),
        ...(webinarData && {
          webinarId: webinarData.webinarId,
        }),
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.classSession.findUnique({
      where: { id },
    });
  }

  async findAll(filters?: {
    batchId?: string;
    teacherId?: string;
    date?: string;
  }) {
    return this.prisma.classSession.findMany({
      where: {
        ...(filters?.batchId && { batchId: filters.batchId }),
        ...(filters?.teacherId && { teacherId: filters.teacherId }),
        ...(filters?.date && {
          date: {
            gte: new Date(new Date(filters.date).setHours(0, 0, 0, 0)),
            lte: new Date(new Date(filters.date).setHours(23, 59, 59, 999)),
          },
        }),
      },
      include: {
        teacher: { select: { id: true, name: true, profileImage: true } },
        batch: { select: { id: true, name: true } },
        subject: true,
        recordings: true,
        attachments: true,
      },
      orderBy: [{ createdAt: 'desc' }, { date: 'asc' }, { startTime: 'asc' }],
    });
  }

  async findByTeacher(teacherId: string) {
    return this.prisma.classSession.findMany({
      where: { teacherId },
      include: {
        batch: { select: { id: true, name: true } },
        teacher: { select: { id: true, name: true, profileImage: true } },
        subject: true,
        recordings: true,
        attachments: true,
      },
      orderBy: [{ createdAt: 'desc' }, { date: 'asc' }, { startTime: 'asc' }],
    });
  }

  async findByStudent(studentId: string) {
    // Get the batches this student is enrolled in
    const user = await this.prisma.user.findUnique({
      where: { id: studentId },
      include: { batchesEnrolled: { select: { id: true } } },
    });
    const batchIds = user?.batchesEnrolled.map((b) => b.id) ?? [];
    return this.prisma.classSession.findMany({
      where: { batchId: { in: batchIds } },
      include: {
        teacher: { select: { id: true, name: true, profileImage: true } },
        batch: { select: { id: true, name: true } },
        subject: true,
        recordings: true,
        attachments: true,
      },
      orderBy: [{ createdAt: 'desc' }, { date: 'asc' }, { startTime: 'asc' }],
    });
  }

  // Artifact Management
  async addRecording(
    sessionId: string,
    title: string,
    url: string,
    passcode?: string,
  ) {
    return this.prisma.sessionRecording.create({
      data: { sessionId, title, url, passcode },
    });
  }

  async updateRecording(id: string, title: string) {
    return this.prisma.sessionRecording.update({
      where: { id },
      data: { title },
    });
  }

  async removeRecording(id: string) {
    return this.prisma.sessionRecording.delete({ where: { id } });
  }

  async addAttachment(
    sessionId: string,
    title: string,
    url: string,
    type: string,
  ) {
    return this.prisma.sessionAttachment.create({
      data: { sessionId, title, url, type },
    });
  }

  async removeAttachment(id: string) {
    return this.prisma.sessionAttachment.delete({ where: { id } });
  }

  /**
   * Sync recording — checks DB first (S3-backed from Lambda), falls back to Zoom API
   */
  async syncRecording(id: string) {
    const session = await this.prisma.classSession.findUnique({
      where: { id },
      include: {
        recordings: {
          where: { status: { not: 'deleted' } },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!session || !session.isOnline) {
      return null;
    }

    // Check if we already have S3-backed recordings (from Lambda webhook)
    const s3Recordings = session.recordings.filter(
      (r) => r.s3Key && r.status === 'ready',
    );

    if (s3Recordings.length > 0) {
      return {
        recordings: s3Recordings,
        source: 's3',
      };
    }

    // Check if recordings are currently being processed by Lambda
    const processingRecordings = session.recordings.filter(
      (r) => r.status === 'processing',
    );

    if (processingRecordings.length > 0) {
      return {
        recordings: processingRecordings,
        source: 's3',
        processing: true,
      };
    }

    // If we have any non-S3 recordings already in DB, return them
    if (session.recordings.length > 0) {
      return {
        recordings: session.recordings,
        url: session.recordings[0].url,
        passcode: session.recordings[0].passcode,
        source: 'legacy',
      };
    }

    // Return cached legacy fields if present
    if (session.recordingUrl && session.recordingPasscode) {
      return {
        url: session.recordingUrl,
        passcode: session.recordingPasscode,
        source: 'legacy',
      };
    }

    // No recordings found in DB
    return null;

    return null;
  }

  async delete(id: string) {
    return this.prisma.classSession.delete({ where: { id } });
  }

  private async ensureWebinar(data: {
    title: string;
    date: string | Date;
    startTime: string;
    endTime: string;
    isOnline?: boolean;
    webinarId?: string | null;
    teacherId: string;
  }) {
    if (!data.isOnline || data.webinarId) {
      return null;
    }

    const date = new Date(data.date);
    
    // 1. Check teacher availability (Booked status)
    const isAvailable = await this.webinarService.checkTeacherAvailability(
      data.teacherId,
      date,
      data.startTime,
      data.endTime,
    );

    if (!isAvailable) {
      throw new Error(
        'Teacher is already booked for another session during this time slot.',
      );
    }

    // 2. Get Teacher's Webinar.gg Credentials
    const account = await this.webinarService.getTeacherWebinarAccount(
      data.teacherId,
    );

    try {
      const meeting = await this.webinarService.createMeeting({
        title: data.title,
        date: date.toISOString().split('T')[0],
        time: this.formatTo12Hour(data.startTime),
        meridiem: this.getMeridiem(data.startTime),
        timezone: 'Asia/Kolkata', // Default to Kolkata as per context
        recordingEnabled: true,
        apiKey: account.apiKey,
      });

      return {
        webinarId: meeting.id,
      };
    } catch (err: any) {
      console.error('[ClassSessionsService] Webinar generation failed:', err);
      throw new Error(`Webinar generation failed: ${err.message}`);
    }
  }

  private getMeridiem(timeStr: string): string {
    const [hrs] = timeStr.split(':').map(Number);
    return hrs >= 12 ? 'PM' : 'AM';
  }

  private formatTo12Hour(timeStr: string): string {
    let [hrs, mins] = timeStr.split(':').map(Number);
    hrs = hrs % 12;
    if (hrs === 0) hrs = 12;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  }

  private async sendSessionNotifications(session: any) {
    // Send notification to teacher
    await this.notifications.create(
      session.teacher.id,
      `New Class Scheduled`,
      `You have a new ${session.type.toLowerCase()} session: "${session.title}" on ${new Date(session.date).toDateString()} from ${session.startTime} to ${session.endTime}${session.venue ? ' at ' + session.venue : ''}.`,
      'INFO',
      `/dashboard?view=schedule`,
    );

    // Send notification to all students in the batch
    for (const student of session.batch.students) {
      await this.notifications.create(
        student.id,
        `New Class Scheduled`,
        `A new ${session.type.toLowerCase()} session "${session.title}" has been scheduled for your batch on ${new Date(session.date).toDateString()} from ${session.startTime} to ${session.endTime}${session.venue ? ' at ' + session.venue : ''}.${session.isOnline ? ' This is an online session. Join Link is available in the schedule.' : ''}`,
        'INFO',
        `/dashboard?view=schedule`,
      );
    }
  }
}
