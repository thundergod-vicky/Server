import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationType, Role } from '@prisma/client';

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
      console.log(`[NotificationService] Notifying roles: ${roles.join(', ')}`);

      const users = await this.prisma.user.findMany({
        where: {
          role: { in: roles as Role[] },
        },
        select: { id: true, role: true, name: true },
      });

      console.log(
        `[NotificationService] Found ${users.length} users with matching roles.`,
      );

      if (users.length === 0) {
        console.warn(
          `[NotificationService] No users found for roles: ${roles.join(', ')}. Check if roles in DB match exactly.`,
        );
      }

      for (const u of users) {
        await this.create(u.id, title, message, type);
        console.log(
          `[NotificationService] Created notification for ${u.name ?? 'User'} (Role: ${u.role})`,
        );
      }
    } catch (error) {
      console.error(
        `[NotificationService] Failed to notify roles ${roles.join(', ')}:`,
        error,
      );
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

  async markAllAsRead(userId: string) {
    return this.prisma.notification.updateMany({
      where: { userId, isRead: false },
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
