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
exports.PracticeTestsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PracticeTestsService = class PracticeTestsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(teacherId, dto) {
        return await this.prisma.practiceTest.create({
            data: {
                title: dto.title,
                totalQuestions: dto.totalQuestions,
                questions: dto.questions,
                timeLimit: dto.timeLimit,
                teacherId: teacherId,
            },
        });
    }
    async findAllByTeacher(teacherId) {
        return await this.prisma.practiceTest.findMany({
            where: { teacherId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        return await this.prisma.practiceTest.findUnique({
            where: { id },
        });
    }
    async findAll() {
        return await this.prisma.practiceTest.findMany({
            include: { teacher: { select: { name: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    async update(id, teacherId, dto) {
        return await this.prisma.practiceTest.update({
            where: { id, teacherId },
            data: {
                title: dto.title,
                totalQuestions: dto.totalQuestions,
                questions: dto.questions,
                timeLimit: dto.timeLimit,
            },
        });
    }
    async remove(id, teacherId) {
        return await this.prisma.practiceTest.delete({
            where: { id, teacherId },
        });
    }
    async submitResult(studentId, testId, data) {
        const baseRating = (data.score / data.total) * 5;
        const test = await this.prisma.practiceTest.findUnique({
            where: { id: testId },
        });
        let finalRating = baseRating;
        if (test?.timeLimit && data.timeTaken < (test.timeLimit * 60) / 2) {
            finalRating = Math.min(5, finalRating + 0.5);
        }
        return await this.prisma.practiceTestResult.create({
            data: {
                studentId,
                testId,
                score: data.score,
                total: data.total,
                timeTaken: data.timeTaken,
                status: data.status,
                rating: parseFloat(finalRating.toFixed(1)),
                answers: data.answers,
            },
        });
    }
    async findResultsByStudent(studentId) {
        return await this.prisma.practiceTestResult.findMany({
            where: { studentId },
            include: { test: { select: { title: true, totalQuestions: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findResultByStudentAndTest(studentId, testId) {
        return await this.prisma.practiceTestResult.findFirst({
            where: { studentId, testId },
        });
    }
};
exports.PracticeTestsService = PracticeTestsService;
exports.PracticeTestsService = PracticeTestsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PracticeTestsService);
//# sourceMappingURL=practice-tests.service.js.map