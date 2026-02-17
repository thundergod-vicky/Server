import { PrismaService } from '../prisma/prisma.service';
import { CreatePracticeTestDto } from './dto/create-practice-test.dto';
export declare class PracticeTestsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(teacherId: string, dto: CreatePracticeTestDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        teacherId: string;
        questions: import("@prisma/client/runtime/client").JsonValue;
        totalQuestions: number;
        timeLimit: number | null;
    }>;
    findAllByTeacher(teacherId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        teacherId: string;
        questions: import("@prisma/client/runtime/client").JsonValue;
        totalQuestions: number;
        timeLimit: number | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        teacherId: string;
        questions: import("@prisma/client/runtime/client").JsonValue;
        totalQuestions: number;
        timeLimit: number | null;
    } | null>;
    findAll(): Promise<({
        teacher: {
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
    update(id: string, teacherId: string, dto: CreatePracticeTestDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        teacherId: string;
        questions: import("@prisma/client/runtime/client").JsonValue;
        totalQuestions: number;
        timeLimit: number | null;
    }>;
    remove(id: string, teacherId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        teacherId: string;
        questions: import("@prisma/client/runtime/client").JsonValue;
        totalQuestions: number;
        timeLimit: number | null;
    }>;
    submitResult(studentId: string, testId: string, data: {
        score: number;
        total: number;
        timeTaken: number;
        status: 'COMPLETED' | 'CHEATED';
        answers: any;
    }): Promise<{
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
    }>;
    findResultsByStudent(studentId: string): Promise<({
        test: {
            title: string;
            totalQuestions: number;
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
    findResultByStudentAndTest(studentId: string, testId: string): Promise<{
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
    } | null>;
}
