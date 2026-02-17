import { CoursesService } from './courses.service';
export declare class CoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    create(createCourseDto: any, req: any): Promise<{
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
    findAllByTeacher(req: any): Promise<({
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
    createChapter(courseId: string, data: any): Promise<{
        id: string;
        title: string;
        courseId: string;
        order: number;
    }>;
    createLesson(chapterId: string, data: any): Promise<{
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
    getStudentCourses(req: any): Promise<{
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
    assignStudents(courseId: string, data: {
        studentIds: string[];
        deadline?: string;
    }, req: any): Promise<import("@prisma/client").Prisma.BatchPayload>;
    removeAssignment(courseId: string, studentId: string, req: any): Promise<import("@prisma/client").Prisma.BatchPayload>;
    getAssignments(courseId: string, req: any): Promise<({
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
