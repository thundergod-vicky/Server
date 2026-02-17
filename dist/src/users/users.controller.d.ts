import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(req: any): Promise<{
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
    } | null>;
    updateProfile(req: any, updateData: any): Promise<{
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
    getAllStudents(req: any): Promise<{
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
    updateAcademicStatus(studentId: string, req: any, data: any): Promise<{
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
    createParentRequest(req: any, body: {
        studentEmail: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        parentId: string;
        status: import("@prisma/client").$Enums.RequestStatus;
        studentEmail: string;
    }>;
    getPendingRequests(req: any): Promise<({
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
    approveRequest(id: string): Promise<{
        success: boolean;
    }>;
    rejectRequest(id: string): Promise<{
        id: string;
        createdAt: Date;
        parentId: string;
        status: import("@prisma/client").$Enums.RequestStatus;
        studentEmail: string;
    }>;
    manualLinkParentStudent(body: {
        parentId: string;
        studentEmail: string;
    }): Promise<{
        success: boolean;
    }>;
    getStudentData(studentId: string, req: any): Promise<({
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
                questions: import("@prisma/client/runtime/client").JsonValue;
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
            answers: import("@prisma/client/runtime/client").JsonValue | null;
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
