"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let EnrollmentService = class EnrollmentService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async enroll(studentId, courseId) {
        const existing = await this.prisma.enrollment.findUnique({
            where: {
                studentId_courseId: {
                    studentId,
                    courseId,
                },
            },
        });
        if (existing) {
            throw new common_1.BadRequestException('Already enrolled in this course');
        }
        return this.prisma.enrollment.create({
            data: {
                studentId,
                courseId,
            },
            include: {
                course: true,
            },
        });
    }
    async withdraw(studentId, courseId) {
        return this.prisma.enrollment.delete({
            where: {
                studentId_courseId: {
                    studentId,
                    courseId,
                },
            },
        });
    }
    async getMyCourses(studentId) {
        return this.prisma.enrollment.findMany({
            where: {
                studentId,
            },
            include: {
                course: {
                    include: {
                        teacher: {
                            select: {
                                name: true,
                            },
                        },
                        _count: {
                            select: { chapters: true },
                        },
                    },
                },
            },
        });
    }
    async checkEnrollment(studentId, courseId) {
        const enrollment = await this.prisma.enrollment.findUnique({
            where: {
                studentId_courseId: {
                    studentId,
                    courseId,
                },
            },
        });
        return { enrolled: !!enrollment };
    }
};
exports.EnrollmentService = EnrollmentService;
exports.EnrollmentService = EnrollmentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EnrollmentService);
//# sourceMappingURL=enrollment.service.js.map