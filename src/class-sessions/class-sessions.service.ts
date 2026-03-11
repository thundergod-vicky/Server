import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { ZoomService } from '../zoom/zoom.service';

@Injectable()
export class ClassSessionsService {
  constructor(
    private prisma: PrismaService,
    private notifications: NotificationsService,
    private zoomService: ZoomService,
  ) {}

  async create(data: {
    title: string;
    type: 'LECTURE' | 'PRACTICAL' | 'WORKSHOP';
    teacherId: string;
    batchId: string;
    date: string;
    startTime: string;
    endTime: string;
    venue?: string;
    isOnline?: boolean;
  }) {
    let meetingUrl: string | null = null;
    let meetingId: string | null = null;

    if (data.isOnline) {
      const start = new Date(`${data.date.split('T')[0]}T${data.startTime}:00`);
      const end = new Date(`${data.date.split('T')[0]}T${data.endTime}:00`);
      const duration = Math.max(30, Math.round((end.getTime() - start.getTime()) / 60000));
      
      try {
        const meeting = await this.zoomService.createMeeting(data.title, start.toISOString(), duration);
        meetingUrl = meeting.joinUrl;
        meetingId = meeting.meetingId;
      } catch (err) {
        // Fallback or ignore if zoom fails, just create an offline class, or log it
        console.error('Failed to create zoom meeting for class session', err);
      }
    }

    const session = await this.prisma.classSession.create({
      data: {
        title: data.title,
        type: data.type,
        teacherId: data.teacherId,
        batchId: data.batchId,
        date: new Date(data.date),
        startTime: data.startTime,
        endTime: data.endTime,
        venue: data.venue,
        isOnline: data.isOnline || false,
        meetingUrl: meetingUrl,
        meetingId: meetingId,
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

  async findAll(filters?: { batchId?: string; teacherId?: string; date?: string }) {
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
      },
      orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
    });
  }

  async findByTeacher(teacherId: string) {
    return this.prisma.classSession.findMany({
      where: { teacherId },
      include: {
        batch: { select: { id: true, name: true } },
        teacher: { select: { id: true, name: true, profileImage: true } },
      },
      orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
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
      },
      orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
    });
  }

  async delete(id: string) {
    return this.prisma.classSession.delete({ where: { id } });
  }
}
