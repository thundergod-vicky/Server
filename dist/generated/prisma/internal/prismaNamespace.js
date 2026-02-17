"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineExtension = exports.JsonNullValueFilter = exports.NullsOrder = exports.QueryMode = exports.JsonNullValueInput = exports.SortOrder = exports.ChatMessageScalarFieldEnum = exports.PaymentScalarFieldEnum = exports.TestResultScalarFieldEnum = exports.TestScalarFieldEnum = exports.StudentProgressScalarFieldEnum = exports.QuestionSetScalarFieldEnum = exports.LessonScalarFieldEnum = exports.ChapterScalarFieldEnum = exports.EnrollmentScalarFieldEnum = exports.CourseScalarFieldEnum = exports.ParentStudentScalarFieldEnum = exports.UserScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.prismaVersion = exports.getExtensionContext = exports.Decimal = exports.Sql = exports.raw = exports.join = exports.empty = exports.sql = exports.PrismaClientValidationError = exports.PrismaClientInitializationError = exports.PrismaClientRustPanicError = exports.PrismaClientUnknownRequestError = exports.PrismaClientKnownRequestError = void 0;
const runtime = __importStar(require("@prisma/client/runtime/client"));
exports.PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
exports.PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
exports.PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
exports.PrismaClientInitializationError = runtime.PrismaClientInitializationError;
exports.PrismaClientValidationError = runtime.PrismaClientValidationError;
exports.sql = runtime.sqltag;
exports.empty = runtime.empty;
exports.join = runtime.join;
exports.raw = runtime.raw;
exports.Sql = runtime.Sql;
exports.Decimal = runtime.Decimal;
exports.getExtensionContext = runtime.Extensions.getExtensionContext;
exports.prismaVersion = {
    client: "7.4.0",
    engine: "ab56fe763f921d033a6c195e7ddeb3e255bdbb57"
};
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    User: 'User',
    ParentStudent: 'ParentStudent',
    Course: 'Course',
    Enrollment: 'Enrollment',
    Chapter: 'Chapter',
    Lesson: 'Lesson',
    QuestionSet: 'QuestionSet',
    StudentProgress: 'StudentProgress',
    Test: 'Test',
    TestResult: 'TestResult',
    Payment: 'Payment',
    ChatMessage: 'ChatMessage'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.UserScalarFieldEnum = {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    phone: 'phone',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ParentStudentScalarFieldEnum = {
    id: 'id',
    parentId: 'parentId',
    studentId: 'studentId'
};
exports.CourseScalarFieldEnum = {
    id: 'id',
    title: 'title',
    description: 'description',
    thumbnail: 'thumbnail',
    teacherId: 'teacherId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.EnrollmentScalarFieldEnum = {
    id: 'id',
    studentId: 'studentId',
    courseId: 'courseId',
    createdAt: 'createdAt'
};
exports.ChapterScalarFieldEnum = {
    id: 'id',
    title: 'title',
    order: 'order',
    courseId: 'courseId'
};
exports.LessonScalarFieldEnum = {
    id: 'id',
    title: 'title',
    order: 'order',
    type: 'type',
    videoUrl: 'videoUrl',
    content: 'content',
    chapterId: 'chapterId'
};
exports.QuestionSetScalarFieldEnum = {
    id: 'id',
    lessonId: 'lessonId',
    questions: 'questions'
};
exports.StudentProgressScalarFieldEnum = {
    id: 'id',
    studentId: 'studentId',
    lessonId: 'lessonId',
    completed: 'completed',
    score: 'score',
    completedAt: 'completedAt'
};
exports.TestScalarFieldEnum = {
    id: 'id',
    title: 'title',
    questions: 'questions',
    chapterId: 'chapterId'
};
exports.TestResultScalarFieldEnum = {
    id: 'id',
    studentId: 'studentId',
    testId: 'testId',
    score: 'score',
    rank: 'rank',
    createdAt: 'createdAt'
};
exports.PaymentScalarFieldEnum = {
    id: 'id',
    studentId: 'studentId',
    amount: 'amount',
    status: 'status',
    txRef: 'txRef',
    createdAt: 'createdAt'
};
exports.ChatMessageScalarFieldEnum = {
    id: 'id',
    senderId: 'senderId',
    receiverId: 'receiverId',
    message: 'message',
    timestamp: 'timestamp'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.JsonNullValueInput = {
    JsonNull: exports.JsonNull
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.JsonNullValueFilter = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull,
    AnyNull: exports.AnyNull
};
exports.defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map