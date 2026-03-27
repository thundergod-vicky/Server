"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ClassSessionsService", {
    enumerable: true,
    get: function() {
        return ClassSessionsService;
    }
});
const _common = require("@nestjs/common");
const _prismaservice = require("../prisma/prisma.service");
const _notificationsservice = require("../notifications/notifications.service");
const _zoomservice = require("../zoom/zoom.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ClassSessionsService = class ClassSessionsService {
    async create(data) {
        let meetingUrl = null;
        let meetingId = null;
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
                meetingId: meetingId
            },
            include: {
                teacher: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                batch: {
                    include: {
                        students: {
                            select: {
                                id: true
                            }
                        }
                    }
                }
            }
        });
        // Send notification to teacher
        await this.notifications.create(session.teacher.id, `New Class Scheduled`, `You have a new ${session.type.toLowerCase()} session: "${session.title}" on ${new Date(session.date).toDateString()} from ${session.startTime} to ${session.endTime}${session.venue ? ' at ' + session.venue : ''}.`, 'INFO');
        // Send notification to all students in the batch
        for (const student of session.batch.students){
            await this.notifications.create(student.id, `New Class Scheduled`, `A new ${session.type.toLowerCase()} session "${session.title}" has been scheduled for your batch on ${new Date(session.date).toDateString()} from ${session.startTime} to ${session.endTime}${session.venue ? ' at ' + session.venue : ''}.${session.isOnline ? ' This is an online session. Join Link is available in the schedule.' : ''}`, 'INFO');
        }
        return session;
    }
    async findAll(filters) {
        return this.prisma.classSession.findMany({
            where: {
                ...filters?.batchId && {
                    batchId: filters.batchId
                },
                ...filters?.teacherId && {
                    teacherId: filters.teacherId
                },
                ...filters?.date && {
                    date: {
                        gte: new Date(new Date(filters.date).setHours(0, 0, 0, 0)),
                        lte: new Date(new Date(filters.date).setHours(23, 59, 59, 999))
                    }
                }
            },
            include: {
                teacher: {
                    select: {
                        id: true,
                        name: true,
                        profileImage: true
                    }
                },
                batch: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
            orderBy: [
                {
                    createdAt: 'desc'
                },
                {
                    date: 'asc'
                },
                {
                    startTime: 'asc'
                }
            ]
        });
    }
    async findByTeacher(teacherId) {
        return this.prisma.classSession.findMany({
            where: {
                teacherId
            },
            include: {
                batch: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                teacher: {
                    select: {
                        id: true,
                        name: true,
                        profileImage: true
                    }
                }
            },
            orderBy: [
                {
                    createdAt: 'desc'
                },
                {
                    date: 'asc'
                },
                {
                    startTime: 'asc'
                }
            ]
        });
    }
    async findByStudent(studentId) {
        // Get the batches this student is enrolled in
        const user = await this.prisma.user.findUnique({
            where: {
                id: studentId
            },
            include: {
                batchesEnrolled: {
                    select: {
                        id: true
                    }
                }
            }
        });
        const batchIds = user?.batchesEnrolled.map((b)=>b.id) ?? [];
        return this.prisma.classSession.findMany({
            where: {
                batchId: {
                    in: batchIds
                }
            },
            include: {
                teacher: {
                    select: {
                        id: true,
                        name: true,
                        profileImage: true
                    }
                },
                batch: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
            orderBy: [
                {
                    createdAt: 'desc'
                },
                {
                    date: 'asc'
                },
                {
                    startTime: 'asc'
                }
            ]
        });
    }
    async delete(id) {
        return this.prisma.classSession.delete({
            where: {
                id
            }
        });
    }
    constructor(prisma, notifications, zoomService){
        this.prisma = prisma;
        this.notifications = notifications;
        this.zoomService = zoomService;
    }
};
ClassSessionsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _prismaservice.PrismaService === "undefined" ? Object : _prismaservice.PrismaService,
        typeof _notificationsservice.NotificationsService === "undefined" ? Object : _notificationsservice.NotificationsService,
        typeof _zoomservice.ZoomService === "undefined" ? Object : _zoomservice.ZoomService
    ])
], ClassSessionsService);

//# sourceMappingURL=class-sessions.service.js.map