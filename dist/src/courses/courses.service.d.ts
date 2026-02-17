import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class CoursesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.CourseCreateInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        thumbnail: string | null;
        teacherId: string;
        courseType: import("@prisma/client").$Enums.CourseType;
    }>;
    findAll(): Promise<({
        teacher: {
            id: string;
            email: string;
            password: string;
            name: string | null;
            phone: string | null;
            role: import("@prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
            medal: import("@prisma/client").$Enums.AcademicMedal | null;
            grade: import("@prisma/client").$Enums.AcademicGrade | null;
            academicAssignedAt: Date | null;
            assignedByTeacherId: string | null;
        };
        chapters: ({
            lessons: {
                id: string;
                title: string;
                order: number;
                type: import("@prisma/client").$Enums.LessonType;
                videoUrl: string | null;
                content: string | null;
                chapterId: string;
                driveFileId: string | null;
                mimeType: string | null;
                duration: number | null;
                pages: number | null;
            }[];
        } & {
            id: string;
            title: string;
            courseId: string;
            order: number;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        thumbnail: string | null;
        teacherId: string;
        courseType: import("@prisma/client").$Enums.CourseType;
    })[]>;
    findAllByTeacher(teacherId: string): Promise<({
        _count: {
            enrollments: number;
            chapters: number;
        };
        chapters: ({
            lessons: {
                id: string;
                title: string;
                order: number;
                type: import("@prisma/client").$Enums.LessonType;
                videoUrl: string | null;
                content: string | null;
                chapterId: string;
                driveFileId: string | null;
                mimeType: string | null;
                duration: number | null;
                pages: number | null;
            }[];
        } & {
            id: string;
            title: string;
            courseId: string;
            order: number;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        thumbnail: string | null;
        teacherId: string;
        courseType: import("@prisma/client").$Enums.CourseType;
    })[]>;
    findOne(id: string): Promise<({
        teacher: {
            id: string;
            email: string;
            password: string;
            name: string | null;
            phone: string | null;
            role: import("@prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
            medal: import("@prisma/client").$Enums.AcademicMedal | null;
            grade: import("@prisma/client").$Enums.AcademicGrade | null;
            academicAssignedAt: Date | null;
            assignedByTeacherId: string | null;
        };
        chapters: ({
            lessons: {
                id: string;
                title: string;
                order: number;
                type: import("@prisma/client").$Enums.LessonType;
                videoUrl: string | null;
                content: string | null;
                chapterId: string;
                driveFileId: string | null;
                mimeType: string | null;
                duration: number | null;
                pages: number | null;
            }[];
        } & {
            id: string;
            title: string;
            courseId: string;
            order: number;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        thumbnail: string | null;
        teacherId: string;
        courseType: import("@prisma/client").$Enums.CourseType;
    }) | null>;
    createChapter(data: Prisma.ChapterCreateInput): Promise<{
        id: string;
        title: string;
        courseId: string;
        order: number;
    }>;
    createLesson(data: Prisma.LessonCreateInput): Promise<{
        id: string;
        title: string;
        order: number;
        type: import("@prisma/client").$Enums.LessonType;
        videoUrl: string | null;
        content: string | null;
        chapterId: string;
        driveFileId: string | null;
        mimeType: string | null;
        duration: number | null;
        pages: number | null;
    }>;
    getCoursesForStudent(studentId: string): Promise<{
        publicCourses: ({
            _count: {
                enrollments: number;
                chapters: number;
            };
            teacher: {
                id: string;
                email: string;
                name: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string | null;
            thumbnail: string | null;
            teacherId: string;
            courseType: import("@prisma/client").$Enums.CourseType;
        })[];
        assignedCourses: {
            deadline: Date | null;
            assignedAt: Date;
            assignedBy: {
                name: string | null;
            };
            _count: {
                enrollments: number;
                chapters: number;
            };
            teacher: {
                id: string;
                email: string;
                name: string | null;
            };
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string | null;
            thumbnail: string | null;
            teacherId: string;
            courseType: import("@prisma/client").$Enums.CourseType;
        }[];
    }>;
    assignStudentsToCourse(courseId: string, teacherId: string, studentIds: string[], deadline?: Date): Promise<Prisma.BatchPayload>;
    removeAssignment(courseId: string, studentId: string, teacherId: string): Promise<Prisma.BatchPayload>;
    getAssignedStudents(courseId: string, teacherId: string): Promise<({
        student: {
            id: string;
            email: string;
            name: string | null;
        };
    } & {
        id: string;
        studentId: string;
        courseId: string;
        assignedBy: string;
        deadline: Date | null;
        assignedAt: Date;
    })[]>;
}
