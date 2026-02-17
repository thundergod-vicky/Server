import { PracticeTestsService } from './practice-tests.service';
import { CreatePracticeTestDto } from './dto/create-practice-test.dto';
export declare class PracticeTestsController {
    private readonly practiceTestsService;
    constructor(practiceTestsService: PracticeTestsService);
    create(createPracticeTestDto: CreatePracticeTestDto, req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        teacherId: string;
        questions: import("@prisma/client/runtime/client").JsonValue;
        totalQuestions: number;
        timeLimit: number | null;
    }>;
    findAllByTeacher(req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        teacherId: string;
        questions: import("@prisma/client/runtime/client").JsonValue;
        totalQuestions: number;
        timeLimit: number | null;
    }[]>;
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
    update(id: string, createPracticeTestDto: CreatePracticeTestDto, req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        teacherId: string;
        questions: import("@prisma/client/runtime/client").JsonValue;
        totalQuestions: number;
        timeLimit: number | null;
    }>;
    remove(id: string, req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        teacherId: string;
        questions: import("@prisma/client/runtime/client").JsonValue;
        totalQuestions: number;
        timeLimit: number | null;
    }>;
    submitResult(data: any, req: any): Promise<{
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
    findResultsByStudent(req: any): Promise<({
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
    checkResult(testId: string, req: any): Promise<{
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
