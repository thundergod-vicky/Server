import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { User, Prisma } from '@prisma/client';
export declare class UsersService {
    private prisma;
    private notificationsService;
    constructor(prisma: PrismaService, notificationsService: NotificationsService);
    findOne(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    findAllStudents(): Promise<{
        id: string;
        email: string;
        name: string | null;
        medal: import("@prisma/client").$Enums.AcademicMedal | null;
        grade: import("@prisma/client").$Enums.AcademicGrade | null;
        academicAssignedAt: Date | null;
        assignedByTeacher: {
            name: string | null;
        } | null;
        _count: {
            enrollments: number;
            practiceTestResults: number;
        };
    }[]>;
    updateAcademicStatus(studentId: string, teacherId: string, data: {
        medal?: any;
        grade?: any;
    }): Promise<{
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
    create(data: Prisma.UserCreateInput): Promise<User>;
    update(id: string, data: Prisma.UserUpdateInput): Promise<User>;
    createParentRequest(parentId: string, studentEmail: string): Promise<{
        id: string;
        createdAt: Date;
        parentId: string;
        status: import("@prisma/client").$Enums.RequestStatus;
        studentEmail: string;
    }>;
    getPendingRequests(): Promise<({
        parent: {
            id: string;
            email: string;
            name: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        parentId: string;
        status: import("@prisma/client").$Enums.RequestStatus;
        studentEmail: string;
    })[]>;
    approveRequest(requestId: string): Promise<{
        success: boolean;
    }>;
    rejectRequest(requestId: string): Promise<{
        id: string;
        createdAt: Date;
        parentId: string;
        status: import("@prisma/client").$Enums.RequestStatus;
        studentEmail: string;
    }>;
    manualLinkParentStudent(parentId: string, studentEmail: string): Promise<{
        success: boolean;
    }>;
    getStudentData(parentId: string, studentId: string): Promise<({
        enrollments: ({
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
        })[];
        practiceTestResults: ({
            test: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                title: string;
                teacherId: string;
                questions: Prisma.JsonValue;
                totalQuestions: number;
                timeLimit: number | null;
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
            answers: Prisma.JsonValue | null;
        })[];
        assignedByTeacher: {
            email: string;
            name: string | null;
        } | null;
        assignedCourses: ({
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
            studentId: string;
            courseId: string;
            assignedBy: string;
            deadline: Date | null;
            assignedAt: Date;
        })[];
        loginHistory: {
            id: string;
            userId: string;
            loginTime: Date;
            logoutTime: Date | null;
            ipAddress: string | null;
            device: string | null;
        }[];
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
    }) | null>;
}
