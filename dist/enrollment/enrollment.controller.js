"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EnrollmentController", {
    enumerable: true,
    get: function() {
        return EnrollmentController;
    }
});
const _common = require("@nestjs/common");
const _enrollmentservice = require("./enrollment.service");
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
let EnrollmentController = class EnrollmentController {
    async enroll(req, courseId) {
        return this.enrollmentService.enroll(req.user.id, courseId);
    }
    async withdraw(req, courseId) {
        return this.enrollmentService.withdraw(req.user.id, courseId);
    }
    async getMyCourses(req) {
        return this.enrollmentService.getMyCourses(req.user.id);
    }
    async checkEnrollment(req, courseId) {
        return this.enrollmentService.checkEnrollment(req.user.id, courseId);
    }
    constructor(enrollmentService){
        this.enrollmentService = enrollmentService;
    }
};
_ts_decorate([
    (0, _common.Post)(),
    _ts_param(0, (0, _common.Request)()),
    _ts_param(1, (0, _common.Body)('courseId')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        void 0,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], EnrollmentController.prototype, "enroll", null);
_ts_decorate([
    (0, _common.Delete)(':courseId'),
    _ts_param(0, (0, _common.Request)()),
    _ts_param(1, (0, _common.Param)('courseId')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        void 0,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], EnrollmentController.prototype, "withdraw", null);
_ts_decorate([
    (0, _common.Get)(),
    _ts_param(0, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        void 0
    ]),
    _ts_metadata("design:returntype", Promise)
], EnrollmentController.prototype, "getMyCourses", null);
_ts_decorate([
    (0, _common.Get)(':courseId/check'),
    _ts_param(0, (0, _common.Request)()),
    _ts_param(1, (0, _common.Param)('courseId')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        void 0,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], EnrollmentController.prototype, "checkEnrollment", null);
EnrollmentController = _ts_decorate([
    (0, _common.Controller)('enrollments'),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _enrollmentservice.EnrollmentService === "undefined" ? Object : _enrollmentservice.EnrollmentService
    ])
], EnrollmentController);

//# sourceMappingURL=enrollment.controller.js.map