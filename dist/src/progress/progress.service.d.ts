import { PrismaService } from '../prisma/prisma.service';
export declare class ProgressService {
    private prisma;
    constructor(prisma: PrismaService);
    markAsComplete(studentId: string, lessonId: string): Promise<{
        id: string;
        studentId: string;
        lessonId: string;
        completed: boolean;
        score: number | null;
        completedAt: Date | null;
    }>;
    getCourseProgress(studentId: string, courseId: string): Promise<{
        id: string;
        studentId: string;
        lessonId: string;
        completed: boolean;
        score: number | null;
        completedAt: Date | null;
    }[]>;
}
