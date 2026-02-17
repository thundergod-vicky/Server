"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "NotificationsService", {
    enumerable: true,
    get: function() {
        return NotificationsService;
    }
});
const _common = require("@nestjs/common");
const _prismaservice = require("../prisma/prisma.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let NotificationsService = class NotificationsService {
    async create(userId, title, message, type) {
        return this.prisma.notification.create({
            data: {
                userId,
                title,
                message,
                type
            }
        });
    }
    async findAll(userId) {
        return this.prisma.notification.findMany({
            where: {
                userId
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }
    async markAsRead(id) {
        return this.prisma.notification.update({
            where: {
                id
            },
            data: {
                isRead: true
            }
        });
    }
    async delete(id) {
        return this.prisma.notification.delete({
            where: {
                id
            }
        });
    }
    async getUnreadCount(userId) {
        return this.prisma.notification.count({
            where: {
                userId,
                isRead: false
            }
        });
    }
    constructor(prisma){
        this.prisma = prisma;
    }
};
NotificationsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _prismaservice.PrismaService === "undefined" ? Object : _prismaservice.PrismaService
    ])
], NotificationsService);

//# sourceMappingURL=notifications.service.js.map