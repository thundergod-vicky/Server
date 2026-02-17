"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CoursesService", {
    enumerable: true,
    get: function() {
        return CoursesService;
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
let CoursesService = class CoursesService {
    async create(data) {
        return this.prisma.course.create({
            data
        });
    }
    async findAll() {
        return this.prisma.course.findMany({
            where: {
                courseType: 'PUBLIC'
            },
            include: {
                teacher: true,
                chapters: {
                    include: {
                        lessons: true
                    }
                }
            }
        });
    }
    async findAllByTeacher(teacherId) {
        return this.prisma.course.findMany({
            where: {
                teacherId
            },
            include: {
                _count: {
                    select: {
                        chapters: true,
                        enrollments: true
                    }
                },
                chapters: {
                    include: {
                        lessons: true
                    }
                }
            }
        });
    }
    async findOne(id) {
        return this.prisma.course.findUnique({
            where: {
                id
            },
            include: {
                teacher: true,
                chapters: {
                    include: {
                        lessons: {
                            orderBy: {
                                order: 'asc'
                            }
                        }
                    },
                    orderBy: {
                        order: 'asc'
                    }
                }
            }
        });
    }
    async createChapter(data) {
        // Logic to auto-increment order if not provided
        return this.prisma.chapter.create({
            data
        });
    }
    async createLesson(data) {
        return this.prisma.lesson.create({
            data
        });
    }
    // Premium Course Assignment Methods
    async getCoursesForStudent(studentId) {
        const publicCourses = await this.prisma.course.findMany({
            where: {
                courseType: 'PUBLIC'
            },
            include: {
                teacher: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                _count: {
                    select: {
                        chapters: true,
                        enrollments: true
                    }
                }
            }
        });
        const assignedCourses = await this.prisma.courseAssignment.findMany({
            where: {
                studentId
            },
            include: {
                course: {
                    include: {
                        teacher: {
                            select: {
                                id: true,
                                name: true,
                                email: true
                            }
                        },
                        _count: {
                            select: {
                                chapters: true,
                                enrollments: true
                            }
                        }
                    }
                },
                teacher: {
                    select: {
                        name: true
                    }
                }
            }
        });
        return {
            publicCourses,
            assignedCourses: assignedCourses.map((a)=>({
                    ...a.course,
                    deadline: a.deadline,
                    assignedAt: a.assignedAt,
                    assignedBy: a.teacher
                }))
        };
    }
    async assignStudentsToCourse(courseId, teacherId, studentIds, deadline) {
        // Verify course is PREMIUM and belongs to teacher
        const course = await this.prisma.course.findFirst({
            where: {
                id: courseId,
                teacherId,
                courseType: 'PREMIUM'
            }
        });
        if (!course) {
            throw new Error('Course not found or not premium');
        }
        // Create assignments
        return await this.prisma.courseAssignment.createMany({
            data: studentIds.map((studentId)=>({
                    courseId,
                    studentId,
                    assignedBy: teacherId,
                    deadline
                })),
            skipDuplicates: true
        });
    }
    async removeAssignment(courseId, studentId, teacherId) {
        return await this.prisma.courseAssignment.deleteMany({
            where: {
                courseId,
                studentId,
                assignedBy: teacherId
            }
        });
    }
    async getAssignedStudents(courseId, teacherId) {
        return await this.prisma.courseAssignment.findMany({
            where: {
                courseId,
                assignedBy: teacherId
            },
            include: {
                student: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            },
            orderBy: {
                assignedAt: 'desc'
            }
        });
    }
    constructor(prisma){
        this.prisma = prisma;
    }
};
CoursesService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _prismaservice.PrismaService === "undefined" ? Object : _prismaservice.PrismaService
    ])
], CoursesService);

//# sourceMappingURL=courses.service.js.map