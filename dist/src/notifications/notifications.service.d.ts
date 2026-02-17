import { PrismaService } from '../prisma/prisma.service';
import { NotificationType } from '@prisma/client';
export declare class NotificationsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, title: string, message: string, type: NotificationType): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        type: import("@prisma/client").$Enums.NotificationType;
        message: string;
        isRead: boolean;
        userId: string;
    }>;
    findAll(userId: string): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        type: import("@prisma/client").$Enums.NotificationType;
        message: string;
        isRead: boolean;
        userId: string;
    }[]>;
    markAsRead(id: string): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        type: import("@prisma/client").$Enums.NotificationType;
        message: string;
        isRead: boolean;
        userId: string;
    }>;
    delete(id: string): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        type: import("@prisma/client").$Enums.NotificationType;
        message: string;
        isRead: boolean;
        userId: string;
    }>;
    getUnreadCount(userId: string): Promise<number>;
}
