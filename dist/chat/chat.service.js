"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ChatService", {
    enumerable: true,
    get: function() {
        return ChatService;
    }
});
const _common = require("@nestjs/common");
const _prismaservice = require("../prisma/prisma.service");
const _notificationsservice = require("../notifications/notifications.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ChatService = class ChatService {
    async createMessage(data) {
        // Check if there is an approved request or if sender is teacher
        const sender = await this.prisma.user.findUnique({
            where: {
                id: data.senderId
            },
            select: {
                role: true
            }
        });
        if (sender?.role !== 'TEACHER' && sender?.role !== 'ADMIN') {
            const request = await this.prisma.chatRequest.findUnique({
                where: {
                    senderId_receiverId: {
                        senderId: data.senderId,
                        receiverId: data.receiverId
                    }
                }
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
                type: data.type
            }
        });
        // Create notification for receiver
        await this.notificationsService.create(data.receiverId, 'New Message', `You received a new message from ${sender?.role === 'TEACHER' ? 'Teacher' : 'Student'}`, 'INFO');
        return message;
    }
    async sendChatRequest(senderId, receiverId, firstMessage) {
        // Check if recipient is a teacher
        const receiver = await this.prisma.user.findUnique({
            where: {
                id: receiverId
            },
            select: {
                role: true
            }
        });
        if (receiver?.role !== 'TEACHER' && receiver?.role !== 'ADMIN') {
            throw new Error('You can only send message requests to Teachers or Admins');
        }
        const request = await this.prisma.chatRequest.create({
            data: {
                senderId,
                receiverId,
                firstMessage,
                status: 'PENDING'
            }
        });
        await this.notificationsService.create(receiverId, 'New Message Request', 'A student/parent wants to message you.', 'INFO');
        return request;
    }
    async handleRequest(requestId, status) {
        const request = await this.prisma.chatRequest.update({
            where: {
                id: requestId
            },
            data: {
                status: status
            }
        });
        if (status === 'APPROVED') {
            // Create initial message from the request's firstMessage
            await this.prisma.chatMessage.create({
                data: {
                    senderId: request.senderId,
                    receiverId: request.receiverId,
                    message: request.firstMessage,
                    type: 'TEXT'
                }
            });
        }
        await this.notificationsService.create(request.senderId, 'Message Request Update', `Your message request has been ${status.toLowerCase()}.`, status === 'APPROVED' ? 'INFO' : 'WARNING');
        return request;
    }
    async getMessages(userId, contactId) {
        return this.prisma.chatMessage.findMany({
            where: {
                OR: [
                    {
                        senderId: userId,
                        receiverId: contactId
                    },
                    {
                        senderId: contactId,
                        receiverId: userId
                    }
                ]
            },
            orderBy: {
                timestamp: 'asc'
            }
        });
    }
    async getChatList(userId) {
        // Get all users the current user has exchanged messages with
        const sent = await this.prisma.chatMessage.findMany({
            where: {
                senderId: userId
            },
            select: {
                receiverId: true
            },
            distinct: [
                'receiverId'
            ]
        });
        const received = await this.prisma.chatMessage.findMany({
            where: {
                receiverId: userId
            },
            select: {
                senderId: true
            },
            distinct: [
                'senderId'
            ]
        });
        const contactIds = [
            ...new Set([
                ...sent.map((s)=>s.receiverId),
                ...received.map((r)=>r.senderId)
            ])
        ].filter(Boolean);
        return this.prisma.user.findMany({
            where: {
                id: {
                    in: contactIds
                }
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                parentOf: {
                    include: {
                        student: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        });
    }
    async getPendingRequests(teacherId) {
        return this.prisma.chatRequest.findMany({
            where: {
                receiverId: teacherId,
                status: 'PENDING'
            },
            include: {
                sender: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        parentOf: {
                            include: {
                                student: {
                                    select: {
                                        name: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
    }
    async getSentRequests(senderId) {
        return this.prisma.chatRequest.findMany({
            where: {
                senderId,
                status: 'PENDING'
            },
            include: {
                receiver: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true
                    }
                }
            }
        });
    }
    constructor(prisma, notificationsService){
        this.prisma = prisma;
        this.notificationsService = notificationsService;
    }
};
ChatService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _prismaservice.PrismaService === "undefined" ? Object : _prismaservice.PrismaService,
        typeof _notificationsservice.NotificationsService === "undefined" ? Object : _notificationsservice.NotificationsService
    ])
], ChatService);

//# sourceMappingURL=chat.service.js.map