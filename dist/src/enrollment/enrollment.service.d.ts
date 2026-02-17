import { PrismaService } from '../prisma/prisma.service';
export declare class EnrollmentService {
    private prisma;
    constructor(prisma: PrismaService);
    enroll(studentId: string, courseId: string): Promise<{
        course: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string | null;
            thumbnail: string | null;
            teacherId: string;
            courseType: import("@prisma/client").$Enums.CourseType;
        };
    } & {
        id: string;
        createdAt: Date;
        studentId: string;
        courseId: string;
    }>;
    withdraw(studentId: string, courseId: string): Promise<{
        id: string;
        createdAt: Date;
        studentId: string;
        courseId: string;
    }>;
    getMyCourses(studentId: string): Promise<({
        course: {
            _count: {
                chapters: number;
            };
            teacher: {
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
        };
    } & {
        id: string;
        createdAt: Date;
        studentId: string;
        courseId: string;
    })[]>;
    checkEnrollment(studentId: string, courseId: string): Promise<{
        enrolled: boolean;
    }>;
}
