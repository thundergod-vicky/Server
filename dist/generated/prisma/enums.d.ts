export declare const Role: {
    readonly STUDENT: "STUDENT";
    readonly TEACHER: "TEACHER";
    readonly ADMIN: "ADMIN";
    readonly PARENT: "PARENT";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const LessonType: {
    readonly LIVE: "LIVE";
    readonly RECORDED: "RECORDED";
};
export type LessonType = (typeof LessonType)[keyof typeof LessonType];
export declare const PaymentStatus: {
    readonly PENDING: "PENDING";
    readonly SUCCESS: "SUCCESS";
    readonly FAILED: "FAILED";
};
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
