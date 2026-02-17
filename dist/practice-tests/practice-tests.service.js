"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PracticeTestsService", {
    enumerable: true,
    get: function() {
        return PracticeTestsService;
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
let PracticeTestsService = class PracticeTestsService {
    async create(teacherId, dto) {
        return await this.prisma.practiceTest.create({
            data: {
                title: dto.title,
                totalQuestions: dto.totalQuestions,
                questions: dto.questions,
                timeLimit: dto.timeLimit,
                teacherId: teacherId
            }
        });
    }
    async findAllByTeacher(teacherId) {
        return await this.prisma.practiceTest.findMany({
            where: {
                teacherId
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }
    async findOne(id) {
        return await this.prisma.practiceTest.findUnique({
            where: {
                id
            }
        });
    }
    async findAll() {
        return await this.prisma.practiceTest.findMany({
            include: {
                teacher: {
                    select: {
                        name: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }
    async update(id, teacherId, dto) {
        return await this.prisma.practiceTest.update({
            where: {
                id,
                teacherId
            },
            data: {
                title: dto.title,
                totalQuestions: dto.totalQuestions,
                questions: dto.questions,
                timeLimit: dto.timeLimit
            }
        });
    }
    async remove(id, teacherId) {
        return await this.prisma.practiceTest.delete({
            where: {
                id,
                teacherId
            }
        });
    }
    async submitResult(studentId, testId, data) {
        // Basic rating calculation: (score / total) * 5
        const baseRating = data.score / data.total * 5;
        // Bonus for speed (very basic implementation for now)
        // If student finished in less than 50% of the time, add a small boost
        const test = await this.prisma.practiceTest.findUnique({
            where: {
                id: testId
            }
        });
        let finalRating = baseRating;
        if (test?.timeLimit && data.timeTaken < test.timeLimit * 60 / 2) {
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
                answers: data.answers
            }
        });
    }
    async findResultsByStudent(studentId) {
        return await this.prisma.practiceTestResult.findMany({
            where: {
                studentId
            },
            include: {
                test: {
                    select: {
                        title: true,
                        totalQuestions: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }
    async findResultByStudentAndTest(studentId, testId) {
        return await this.prisma.practiceTestResult.findFirst({
            where: {
                studentId,
                testId
            }
        });
    }
    constructor(prisma){
        this.prisma = prisma;
    }
};
PracticeTestsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _prismaservice.PrismaService === "undefined" ? Object : _prismaservice.PrismaService
    ])
], PracticeTestsService);

//# sourceMappingURL=practice-tests.service.js.map