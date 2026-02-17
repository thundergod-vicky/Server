"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EnrollmentService", {
    enumerable: true,
    get: function() {
        return EnrollmentService;
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
let EnrollmentService = class EnrollmentService {
    async enroll(studentId, courseId) {
        // Check if already enrolled
        const existing = await this.prisma.enrollment.findUnique({
            where: {
                studentId_courseId: {
                    studentId,
                    courseId
                }
            }
        });
        if (existing) {
            throw new _common.BadRequestException('Already enrolled in this course');
        }
        return this.prisma.enrollment.create({
            data: {
                studentId,
                courseId
            },
            include: {
                course: true
            }
        });
    }
    async withdraw(studentId, courseId) {
        return this.prisma.enrollment.delete({
            where: {
                studentId_courseId: {
                    studentId,
                    courseId
                }
            }
        });
    }
    async getMyCourses(studentId) {
        return this.prisma.enrollment.findMany({
            where: {
                studentId
            },
            include: {
                course: {
                    include: {
                        teacher: {
                            select: {
                                name: true
                            }
                        },
                        _count: {
                            select: {
                                chapters: true
                            }
                        }
                    }
                }
            }
        });
    }
    async checkEnrollment(studentId, courseId) {
        const enrollment = await this.prisma.enrollment.findUnique({
            where: {
                studentId_courseId: {
                    studentId,
                    courseId
                }
            }
        });
        return {
            enrolled: !!enrollment
        };
    }
    constructor(prisma){
        this.prisma = prisma;
    }
};
EnrollmentService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _prismaservice.PrismaService === "undefined" ? Object : _prismaservice.PrismaService
    ])
], EnrollmentService);

//# sourceMappingURL=enrollment.service.js.map