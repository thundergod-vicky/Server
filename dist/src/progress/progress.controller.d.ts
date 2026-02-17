import { ProgressService } from './progress.service';
export declare class ProgressController {
    private readonly progressService;
    constructor(progressService: ProgressService);
    markAsComplete(req: any, lessonId: string): Promise<{
        id: string;
        studentId: string;
        lessonId: string;
        completed: boolean;
        score: number | null;
        completedAt: Date | null;
    }>;
    getCourseProgress(req: any, courseId: string): Promise<{
        id: string;
        studentId: string;
        lessonId: string;
        completed: boolean;
        score: number | null;
        completedAt: Date | null;
    }[]>;
}
