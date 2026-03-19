"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ExamsService", {
    enumerable: true,
    get: function() {
        return ExamsService;
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
let ExamsService = class ExamsService {
    async create(createExamDto, creatorId) {
        return this.prisma.exam.create({
            data: {
                title: createExamDto.title,
                description: createExamDto.description,
                status: createExamDto.status || 'PLANNED',
                batch: createExamDto.batchId ? {
                    connect: {
                        id: createExamDto.batchId
                    }
                } : undefined,
                creator: {
                    connect: {
                        id: creatorId
                    }
                }
            }
        });
    }
    async findAll() {
        return this.prisma.exam.findMany({
            include: {
                batch: {
                    select: {
                        name: true
                    }
                },
                assignedStudents: {
                    select: {
                        id: true
                    }
                },
                _count: {
                    select: {
                        results: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }
    async findOne(id, userId, userRole) {
        const exam = await this.prisma.exam.findUnique({
            where: {
                id
            },
            include: {
                batch: true,
                assignedStudents: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });
        if (!exam) throw new _common.NotFoundException('Exam not found');
        // If student, filter out questions if not in window
        if (userRole === 'STUDENT') {
            const now = new Date();
            if (!exam.startTime) {
                return {
                    ...exam,
                    questions: null
                }; // No time set, no questions
            }
            const accessTime = new Date(exam.startTime.getTime() - 5 * 60000); // 5 mins before
            if (now < accessTime) {
                return {
                    ...exam,
                    questions: null
                };
            }
        }
        return exam;
    }
    async update(id, updateExamDto) {
        const { assignedStudentIds, ...updateData } = updateExamDto;
        return this.prisma.exam.update({
            where: {
                id
            },
            data: {
                ...updateData,
                assignedStudents: assignedStudentIds ? {
                    set: assignedStudentIds.map((sid)=>({
                            id: sid
                        }))
                } : undefined
            }
        });
    }
    async findForStudent(studentId) {
        return this.prisma.exam.findMany({
            where: {
                status: {
                    in: [
                        'PLANNED',
                        'SCHEDULED'
                    ]
                },
                OR: [
                    {
                        batch: {
                            students: {
                                some: {
                                    id: studentId
                                }
                            }
                        }
                    },
                    {
                        assignedStudents: {
                            some: {
                                id: studentId
                            }
                        }
                    }
                ]
            },
            include: {
                batch: {
                    select: {
                        name: true
                    }
                },
                results: {
                    where: {
                        studentId
                    }
                }
            },
            orderBy: {
                startTime: 'asc'
            }
        });
    }
    async submitResult(examId, studentId, data) {
        return this.prisma.examResult.upsert({
            where: {
                examId_studentId: {
                    examId,
                    studentId
                }
            },
            update: {
                score: data.score,
                total: data.total,
                answers: data.answers,
                submittedAt: new Date()
            },
            create: {
                examId,
                studentId,
                score: data.score,
                total: data.total,
                answers: data.answers
            }
        });
    }
    async delete(id) {
        return this.prisma.exam.delete({
            where: {
                id
            }
        });
    }
    constructor(prisma){
        this.prisma = prisma;
    }
};
ExamsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _prismaservice.PrismaService === "undefined" ? Object : _prismaservice.PrismaService
    ])
], ExamsService);

//# sourceMappingURL=exams.service.js.map