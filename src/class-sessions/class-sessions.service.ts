import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { ZoomService } from '../zoom/zoom.service';
import { GoogleService } from '../google/google.service';

@Injectable()
export class ClassSessionsService {
  private readonly logger = new Logger(ClassSessionsService.name);
  constructor(
    private prisma: PrismaService,
    private notifications: NotificationsService,
    private zoomService: ZoomService,
    private googleService: GoogleService,
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
    let meetingUrl: string | null = data.meetingUrl || null;
    let meetingId: string | null = data.meetingId || null;
    const meetingPasscode: string | null = data.meetingPasscode || null;

    if (data.isOnline && !meetingUrl) {
      const meet = await this.ensureMeetingUrl({
        ...data,
        teacherId: data.teacherId,
      });
      if (meet) {
        meetingUrl = meet.meetLink;
        // For Google Meet, we often use the URL as ID if none provided
        meetingId = meetingId || meet.spaceCode;
      }
    }

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
      },
      include: {
        teacher: { select: { id: true, name: true } },
        batch: { include: { students: { select: { id: true } } } },
      },
    });

    // Send notification to teacher
    await this.notifications.create(
      session.teacher.id,
      `New Class Scheduled`,
      `You have a new ${session.type.toLowerCase()} session: "${session.title}" on ${new Date(session.date).toDateString()} from ${session.startTime} to ${session.endTime}${session.venue ? ' at ' + session.venue : ''}.`,
      'INFO',
    );

    // Send notification to all students in the batch
    for (const student of session.batch.students) {
      await this.notifications.create(
        student.id,
        `New Class Scheduled`,
        `A new ${session.type.toLowerCase()} session "${session.title}" has been scheduled for your batch on ${new Date(session.date).toDateString()} from ${session.startTime} to ${session.endTime}${session.venue ? ' at ' + session.venue : ''}.${session.isOnline ? ' This is an online session. Join Link is available in the schedule.' : ''}`,
        'INFO',
      );
    }

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
    const current = await this.prisma.classSession.findUnique({ where: { id } });
    if (!current) throw new NotFoundException('Session not found');

    const updateData: any = {
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
    };

    // If toggled to online and no URL exists, generate one
    if (
      (data.isOnline === true || (current.isOnline && data.isOnline !== false)) &&
      !updateData.meetingUrl &&
      !current.meetingUrl
    ) {
      const meet = await this.ensureMeetingUrl({
        title: data.title || current.title,
        date: data.date || current.date.toISOString(),
        startTime: data.startTime || current.startTime,
        endTime: data.endTime || current.endTime,
        teacherId: data.teacherId || current.teacherId,
      });
      if (meet) {
        updateData.meetingUrl = meet.meetLink;
        updateData.meetingId = updateData.meetingId || meet.spaceCode;
      }
    }

    return this.prisma.classSession.update({
      where: { id },
      data: updateData,
    });
  }

  private async ensureMeetingUrl(data: {
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    teacherId: string;
  }) {
    try {
      const datePart = data.date.split('T')[0];
      const start = new Date(`${datePart}T${data.startTime}:00`);
      const end = new Date(`${datePart}T${data.endTime}:00`);

      // Fetch teacher email
      const teacher = await this.prisma.user.findUnique({
        where: { id: data.teacherId },
        select: { email: true },
      });

      this.logger.log(
        `Generating Google Meet link for: ${data.title} (Teacher: ${teacher?.email})`,
      );
      const result = await this.googleService.createMeetLink(
        data.title,
        start,
        end,
        teacher?.email,
      );

      // Subscribe to recording events for this space
      await this.googleService.subscribeToRecording(result.spaceCode);

      return result;
    } catch (err) {
      this.logger.error('Failed to ensure Google Meet link', err);
      return null;
    }
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

    if (!session || !session.meetingId || !session.isOnline) {
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

    // Fallback: try to fetch recording from Zoom API (for meetings not yet processed by Lambda)
    try {
      console.log(
        `[ClassSessionsService] Syncing recording for session ${id}, meetingId: ${session.meetingId}`,
      );
      const walk = await this.zoomService.getMeetingRecording(
        session.meetingId,
      );

      if (walk && walk.recordings && walk.recordings.length > 0) {
        // DO NOT save to SessionRecording table anymore to avoid duplicates with S3
        // Just return the Zoom records as a transient fallback
        const transientRecordings = walk.recordings.map((rec, index) => ({
          id: `zoom-temp-${rec.id}`,
          title:
            rec.file_type === 'SHARE_URL'
              ? 'Zoom Share Link'
              : `Recording Part ${index + 1} - ${new Date(
                  rec.recording_start || new Date(),
                ).toLocaleTimeString()}`,
          url: rec.url,
          zoomFileId: rec.id,
          passcode: walk.password,
          fileType: rec.file_type,
          status: 'ready',
          recordedAt: rec.recording_start ? new Date(rec.recording_start) : null,
          sessionId: id,
          isTransient: true,
        }));

        // Update legacy fields for backward compatibility (optional but kept for safety)
        if (walk.recordings.length > 0) {
          await this.prisma.classSession.update({
            where: { id },
            data: {
              recordingUrl: walk.recordings[0].url,
              recordingPasscode: walk.password,
            },
          });
        }

        return {
          url: walk.recordings[0].url,
          passcode: walk.password,
          recordings: transientRecordings,
          source: 'zoom',
        };
      } else {
        console.log(
          `[ClassSessionsService] No recording found for meeting ${session.meetingId}`,
        );
      }
    } catch (err) {
      console.error(
        '[ClassSessionsService] Failed to sync Zoom recording',
        err,
      );
    }

    return null;
  }

  async logAttendance(sessionId: string, studentId: string) {
    return this.prisma.attendance.upsert({
      where: {
        studentId_sessionId: { studentId, sessionId },
      },
      update: { timestamp: new Date() }, // Update timestamp if they click again
      create: { studentId, sessionId },
    });
  }

  async delete(id: string) {
    return this.prisma.classSession.delete({ where: { id } });
  }
}
