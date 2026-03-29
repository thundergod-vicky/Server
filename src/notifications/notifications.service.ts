import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationType } from '@prisma/client';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async create(
    userId: string,
    title: string,
    message: string,
    type: NotificationType,
  ) {
    return this.prisma.notification.create({
      data: { userId, title, message, type },
    });
  }

  /** Notify both the student and all linked parents */
  async notifyStudentAndParents(
    studentId: string,
    title: string,
    message: string,
    type: NotificationType,
  ) {
    // 1. Notify student
    await this.create(studentId, title, message, type);

    // 2. Find and notify all parents
    try {
      const parents = await this.prisma.parentStudent.findMany({
        where: { studentId },
        select: { parentId: true },
      });

      for (const p of parents) {
        await this.create(p.parentId, `[Child Update] ${title}`, message, type);
      }
    } catch (error) {
      console.error('Failed to notify parents:', error);
    }
  }

  /** Notify all users of specific roles */
  async notifyRoles(
    roles: string[],
    title: string,
    message: string,
    type: NotificationType,
  ) {
    try {
      const users = await this.prisma.user.findMany({
        where: {
          role: { in: roles as any },
        },
        select: { id: true },
      });

      for (const u of users) {
        await this.create(u.id, title, message, type);
      }
    } catch (error) {
      console.error(`Failed to notify roles ${roles}:`, error);
    }
  }

  async findAll(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async markAsRead(id: string) {
    return this.prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
  }

  async delete(id: string) {
    return this.prisma.notification.delete({ where: { id } });
  }

  async getUnreadCount(userId: string) {
    return this.prisma.notification.count({
      where: { userId, isRead: false },
    });
  }
}
