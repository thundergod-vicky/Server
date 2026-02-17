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
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CoursesService = class CoursesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.course.create({ data });
    }
    async findAll() {
        return this.prisma.course.findMany({
            where: { courseType: 'PUBLIC' },
            include: { teacher: true, chapters: { include: { lessons: true } } },
        });
    }
    async findAllByTeacher(teacherId) {
        return this.prisma.course.findMany({
            where: { teacherId },
            include: {
                _count: {
                    select: { chapters: true, enrollments: true },
                },
                chapters: {
                    include: {
                        lessons: true,
                    },
                },
            },
        });
    }
    async findOne(id) {
        return this.prisma.course.findUnique({
            where: { id },
            include: {
                teacher: true,
                chapters: {
                    include: {
                        lessons: {
                            orderBy: { order: 'asc' },
                        },
                    },
                    orderBy: { order: 'asc' },
                },
            },
        });
    }
    async createChapter(data) {
        return this.prisma.chapter.create({ data });
    }
    async createLesson(data) {
        return this.prisma.lesson.create({ data });
    }
    async getCoursesForStudent(studentId) {
        const publicCourses = await this.prisma.course.findMany({
            where: { courseType: 'PUBLIC' },
            include: {
                teacher: { select: { id: true, name: true, email: true } },
                _count: { select: { chapters: true, enrollments: true } },
            },
        });
        const assignedCourses = await this.prisma.courseAssignment.findMany({
            where: { studentId },
            include: {
                course: {
                    include: {
                        teacher: { select: { id: true, name: true, email: true } },
                        _count: { select: { chapters: true, enrollments: true } },
                    },
                },
                teacher: { select: { name: true } },
            },
        });
        return {
            publicCourses,
            assignedCourses: assignedCourses.map((a) => ({
                ...a.course,
                deadline: a.deadline,
                assignedAt: a.assignedAt,
                assignedBy: a.teacher,
            })),
        };
    }
    async assignStudentsToCourse(courseId, teacherId, studentIds, deadline) {
        const course = await this.prisma.course.findFirst({
            where: { id: courseId, teacherId, courseType: 'PREMIUM' },
        });
        if (!course) {
            throw new Error('Course not found or not premium');
        }
        return await this.prisma.courseAssignment.createMany({
            data: studentIds.map((studentId) => ({
                courseId,
                studentId,
                assignedBy: teacherId,
                deadline,
            })),
            skipDuplicates: true,
        });
    }
    async removeAssignment(courseId, studentId, teacherId) {
        return await this.prisma.courseAssignment.deleteMany({
            where: {
                courseId,
                studentId,
                assignedBy: teacherId,
            },
        });
    }
    async getAssignedStudents(courseId, teacherId) {
        return await this.prisma.courseAssignment.findMany({
            where: { courseId, assignedBy: teacherId },
            include: {
                student: { select: { id: true, name: true, email: true } },
            },
            orderBy: { assignedAt: 'desc' },
        });
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CoursesService);
//# sourceMappingURL=courses.service.js.map