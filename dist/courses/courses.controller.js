"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CoursesController", {
    enumerable: true,
    get: function() {
        return CoursesController;
    }
});
const _common = require("@nestjs/common");
const _coursesservice = require("./courses.service");
const _jwtauthguard = require("../auth/jwt-auth.guard");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let CoursesController = class CoursesController {
    create(createCourseDto, req) {
        return this.coursesService.create({
            ...createCourseDto,
            teacher: {
                connect: {
                    id: req.user.id
                }
            }
        });
    }
    findAll() {
        return this.coursesService.findAll();
    }
    findAllByTeacher(req) {
        return this.coursesService.findAllByTeacher(req.user.id);
    }
    findOne(id) {
        return this.coursesService.findOne(id);
    }
    createChapter(courseId, data) {
        return this.coursesService.createChapter({
            ...data,
            course: {
                connect: {
                    id: courseId
                }
            }
        });
    }
    createLesson(chapterId, data) {
        return this.coursesService.createLesson({
            ...data,
            chapter: {
                connect: {
                    id: chapterId
                }
            }
        });
    }
    // Premium Course Assignment Endpoints
    getStudentCourses(req) {
        return this.coursesService.getCoursesForStudent(req.user.id);
    }
    assignStudents(courseId, data, req) {
        return this.coursesService.assignStudentsToCourse(courseId, req.user.id, data.studentIds, data.deadline ? new Date(data.deadline) : undefined);
    }
    removeAssignment(courseId, studentId, req) {
        return this.coursesService.removeAssignment(courseId, studentId, req.user.id);
    }
    getAssignments(courseId, req) {
        return this.coursesService.getAssignedStudents(courseId, req.user.id);
    }
    constructor(coursesService){
        this.coursesService = coursesService;
    }
};
_ts_decorate([
    (0, _common.Post)(),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    _ts_param(0, (0, _common.Body)()),
    _ts_param(1, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object,
        void 0
    ]),
    _ts_metadata("design:returntype", void 0)
], CoursesController.prototype, "create", null);
_ts_decorate([
    (0, _common.Get)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], CoursesController.prototype, "findAll", null);
_ts_decorate([
    (0, _common.Get)('teacher'),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    _ts_param(0, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        void 0
    ]),
    _ts_metadata("design:returntype", void 0)
], CoursesController.prototype, "findAllByTeacher", null);
_ts_decorate([
    (0, _common.Get)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], CoursesController.prototype, "findOne", null);
_ts_decorate([
    (0, _common.Post)(':id/chapters'),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], CoursesController.prototype, "createChapter", null);
_ts_decorate([
    (0, _common.Post)('chapters/:chapterId/lessons'),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    _ts_param(0, (0, _common.Param)('chapterId')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], CoursesController.prototype, "createLesson", null);
_ts_decorate([
    (0, _common.Get)('student/all'),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    _ts_param(0, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        void 0
    ]),
    _ts_metadata("design:returntype", void 0)
], CoursesController.prototype, "getStudentCourses", null);
_ts_decorate([
    (0, _common.Post)(':id/assign'),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_param(2, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object,
        void 0
    ]),
    _ts_metadata("design:returntype", void 0)
], CoursesController.prototype, "assignStudents", null);
_ts_decorate([
    (0, _common.Delete)(':id/assign/:studentId'),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Param)('studentId')),
    _ts_param(2, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        String,
        void 0
    ]),
    _ts_metadata("design:returntype", void 0)
], CoursesController.prototype, "removeAssignment", null);
_ts_decorate([
    (0, _common.Get)(':id/assignments'),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        void 0
    ]),
    _ts_metadata("design:returntype", void 0)
], CoursesController.prototype, "getAssignments", null);
CoursesController = _ts_decorate([
    (0, _common.Controller)('courses'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _coursesservice.CoursesService === "undefined" ? Object : _coursesservice.CoursesService
    ])
], CoursesController);

//# sourceMappingURL=courses.controller.js.map