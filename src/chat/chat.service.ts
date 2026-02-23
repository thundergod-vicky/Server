import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MessageType, RequestStatus } from '@prisma/client';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class ChatService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
  ) {}

  async createMessage(data: {
    senderId: string;
    receiverId: string;
    message?: string;
    mediaUrl?: string;
    type: MessageType;
  }) {
    // Check if there is an approved request or if sender is teacher
    const sender = await this.prisma.user.findUnique({
      where: { id: data.senderId },
      select: { role: true },
    });

    if (sender?.role !== 'TEACHER' && sender?.role !== 'ADMIN') {
      const request = await this.prisma.chatRequest.findUnique({
        where: {
          senderId_receiverId: {
            senderId: data.senderId,
            receiverId: data.receiverId,
          },
        },
      });

      if (!request || request.status !== 'APPROVED') {
        throw new Error('Message request not approved yet');
      }
    }

    const message = await this.prisma.chatMessage.create({
      data: {
        senderId: data.senderId,
        receiverId: data.receiverId,
        message: data.message,
        mediaUrl: data.mediaUrl,
        type: data.type,
      },
    });

    // Create notification for receiver
    await this.notificationsService.create(
      data.receiverId,
      'New Message',
      `You received a new message from ${sender?.role === 'TEACHER' ? 'Teacher' : 'Student'}`,
      'INFO',
    );

    return message;
  }

  async sendChatRequest(senderId: string, receiverId: string, firstMessage: string) {
    // Check if recipient is a teacher
    const receiver = await this.prisma.user.findUnique({
      where: { id: receiverId },
      select: { role: true },
    });

    if (receiver?.role !== 'TEACHER' && receiver?.role !== 'ADMIN') {
      throw new Error('You can only send message requests to Teachers or Admins');
    }

    const request = await this.prisma.chatRequest.create({
      data: {
        senderId,
        receiverId,
        firstMessage,
        status: 'PENDING',
      },
    });

    await this.notificationsService.create(
      receiverId,
      'New Message Request',
      'A student/parent wants to message you.',
      'INFO',
    );

    return request;
  }

  async handleRequest(requestId: string, status: 'APPROVED' | 'REJECTED') {
    const request = await this.prisma.chatRequest.update({
      where: { id: requestId },
      data: { status: status as RequestStatus },
    });

    if (status === 'APPROVED') {
      // Create initial message from the request's firstMessage
      await this.prisma.chatMessage.create({
        data: {
          senderId: request.senderId,
          receiverId: request.receiverId,
          message: request.firstMessage,
          type: 'TEXT',
        },
      });
    }

    await this.notificationsService.create(
      request.senderId,
      'Message Request Update',
      `Your message request has been ${status.toLowerCase()}.`,
      status === 'APPROVED' ? 'INFO' : 'WARNING',
    );

    return request;
  }

  async getMessages(userId: string, contactId: string) {
    return this.prisma.chatMessage.findMany({
      where: {
        OR: [
          { senderId: userId, receiverId: contactId },
          { senderId: contactId, receiverId: userId },
        ],
      },
      orderBy: { timestamp: 'asc' },
    });
  }

  async getChatList(userId: string) {
    // Get all users the current user has exchanged messages with
    const sent = await this.prisma.chatMessage.findMany({
      where: { senderId: userId },
      select: { receiverId: true },
      distinct: ['receiverId'],
    });

    const received = await this.prisma.chatMessage.findMany({
      where: { receiverId: userId },
      select: { senderId: true },
      distinct: ['senderId'],
    });

    const contactIds = [
      ...new Set([
        ...sent.map((s) => s.receiverId),
        ...received.map((r) => r.senderId),
      ]),
    ].filter(Boolean) as string[];

    return this.prisma.user.findMany({
      where: { id: { in: contactIds } },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        parentOf: {
          include: {
            student: { select: { name: true } }
          }
        }
      },
    });
  }

  async getPendingRequests(teacherId: string) {
    return this.prisma.chatRequest.findMany({
      where: { receiverId: teacherId, status: 'PENDING' },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            parentOf: {
              include: {
                student: { select: { name: true } }
              }
            }
          }
        }
      }
    });
  }

  async getSentRequests(senderId: string) {
    return this.prisma.chatRequest.findMany({
      where: { senderId, status: 'PENDING' },
      include: {
        receiver: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          }
        }
      }
    });
  }
}
