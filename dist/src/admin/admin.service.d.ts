import { PrismaService } from '../prisma/prisma.service';
export declare class AdminService {
    private prisma;
    constructor(prisma: PrismaService);
    getGlobalStats(): Promise<{
        users: {
            total: number;
            students: number;
            teachers: number;
        };
        courses: {
            total: number;
        };
        revenue: {
            total: number;
        };
        systemStatus: string;
        uptime: string;
    }>;
    getAllUsers(): Promise<({
        _count: {
            coursesOwned: number;
            enrollments: number;
            practiceTestResults: number;
        };
    } & {
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
    })[]>;
    updateUserRole(userId: string, role: any): Promise<{
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
    }>;
    getAllCourses(): Promise<({
        _count: {
            enrollments: number;
            chapters: number;
        };
        teacher: {
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
    })[]>;
    deleteCourse(courseId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        thumbnail: string | null;
        teacherId: string;
        courseType: import("@prisma/client").$Enums.CourseType;
    }>;
    getAllPracticeTests(): Promise<({
        _count: {
            results: number;
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
        teacherId: string;
        questions: import("@prisma/client/runtime/client").JsonValue;
        totalQuestions: number;
        timeLimit: number | null;
    })[]>;
    getTestAnalytics(testId: string): Promise<{
        test: {
            teacher: {
                id: string;
                email: string;
                name: string | null;
            };
            results: ({
                student: {
                    id: string;
                    email: string;
                    name: string | null;
                };
            } & {
                id: string;
                createdAt: Date;
                studentId: string;
                score: number;
                testId: string;
                status: import("@prisma/client").$Enums.TestStatus;
                total: number;
                timeTaken: number | null;
                rating: number | null;
                answers: import("@prisma/client/runtime/client").JsonValue | null;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            teacherId: string;
            questions: import("@prisma/client/runtime/client").JsonValue;
            totalQuestions: number;
            timeLimit: number | null;
        };
        analytics: {
            totalAttempts: number;
            uniqueStudents: number;
            completedAttempts: number;
            cheatedAttempts: number;
            averageScore: number;
            averagePercentage: number;
            averageRating: number;
            passRate: number;
            averageTimeTaken: number;
            cheatingRate: number;
        };
    } | null>;
    getTestResults(testId: string): Promise<({
        student: {
            id: string;
            email: string;
            name: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        studentId: string;
        score: number;
        testId: string;
        status: import("@prisma/client").$Enums.TestStatus;
        total: number;
        timeTaken: number | null;
        rating: number | null;
        answers: import("@prisma/client/runtime/client").JsonValue | null;
    })[]>;
    deletePracticeTest(testId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        teacherId: string;
        questions: import("@prisma/client/runtime/client").JsonValue;
        totalQuestions: number;
        timeLimit: number | null;
    }>;
}
