"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ProgressService", {
    enumerable: true,
    get: function() {
        return ProgressService;
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
let ProgressService = class ProgressService {
    async markAsComplete(studentId, lessonId) {
        return this.prisma.studentProgress.upsert({
            where: {
                studentId_lessonId: {
                    studentId,
                    lessonId
                }
            },
            update: {
                completed: true,
                completedAt: new Date()
            },
            create: {
                studentId,
                lessonId,
                completed: true,
                completedAt: new Date()
            }
        });
    }
    async getCourseProgress(studentId, courseId) {
        return this.prisma.studentProgress.findMany({
            where: {
                studentId,
                lesson: {
                    chapter: {
                        courseId
                    }
                }
            }
        });
    }
    constructor(prisma){
        this.prisma = prisma;
    }
};
ProgressService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _prismaservice.PrismaService === "undefined" ? Object : _prismaservice.PrismaService
    ])
], ProgressService);

//# sourceMappingURL=progress.service.js.map