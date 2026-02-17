import { EnrollmentService } from './enrollment.service';
export declare class EnrollmentController {
    private readonly enrollmentService;
    constructor(enrollmentService: EnrollmentService);
    enroll(req: any, courseId: string): Promise<{
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
    withdraw(req: any, courseId: string): Promise<{
        id: string;
        createdAt: Date;
        studentId: string;
        courseId: string;
    }>;
    getMyCourses(req: any): Promise<({
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
    checkEnrollment(req: any, courseId: string): Promise<{
        enrolled: boolean;
    }>;
}
