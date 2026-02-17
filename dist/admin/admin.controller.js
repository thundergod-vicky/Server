"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AdminController", {
    enumerable: true,
    get: function() {
        return AdminController;
    }
});
const _common = require("@nestjs/common");
const _adminservice = require("./admin.service");
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
let AdminController = class AdminController {
    async checkAdmin(req) {
        if (req.user.role !== 'ADMIN') {
            throw new _common.ForbiddenException('Only administrators can access this section');
        }
    }
    async getStats(req) {
        await this.checkAdmin(req);
        return this.adminService.getGlobalStats();
    }
    async getUsers(req) {
        await this.checkAdmin(req);
        return this.adminService.getAllUsers();
    }
    async updateRole(userId, data, req) {
        await this.checkAdmin(req);
        return this.adminService.updateUserRole(userId, data.role);
    }
    async getCourses(req) {
        await this.checkAdmin(req);
        return this.adminService.getAllCourses();
    }
    async deleteCourse(courseId, req) {
        await this.checkAdmin(req);
        return this.adminService.deleteCourse(courseId);
    }
    // Practice Test Management
    async getPracticeTests(req) {
        await this.checkAdmin(req);
        return this.adminService.getAllPracticeTests();
    }
    async getTestAnalytics(testId, req) {
        await this.checkAdmin(req);
        return this.adminService.getTestAnalytics(testId);
    }
    async getTestResults(testId, req) {
        await this.checkAdmin(req);
        return this.adminService.getTestResults(testId);
    }
    async deletePracticeTest(testId, req) {
        await this.checkAdmin(req);
        return this.adminService.deletePracticeTest(testId);
    }
    constructor(adminService){
        this.adminService = adminService;
    }
};
_ts_decorate([
    (0, _common.Get)('stats'),
    _ts_param(0, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        void 0
    ]),
    _ts_metadata("design:returntype", Promise)
], AdminController.prototype, "getStats", null);
_ts_decorate([
    (0, _common.Get)('users'),
    _ts_param(0, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        void 0
    ]),
    _ts_metadata("design:returntype", Promise)
], AdminController.prototype, "getUsers", null);
_ts_decorate([
    (0, _common.Patch)('users/:id/role'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_param(2, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object,
        void 0
    ]),
    _ts_metadata("design:returntype", Promise)
], AdminController.prototype, "updateRole", null);
_ts_decorate([
    (0, _common.Get)('courses'),
    _ts_param(0, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        void 0
    ]),
    _ts_metadata("design:returntype", Promise)
], AdminController.prototype, "getCourses", null);
_ts_decorate([
    (0, _common.Delete)('courses/:id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        void 0
    ]),
    _ts_metadata("design:returntype", Promise)
], AdminController.prototype, "deleteCourse", null);
_ts_decorate([
    (0, _common.Get)('practice-tests'),
    _ts_param(0, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        void 0
    ]),
    _ts_metadata("design:returntype", Promise)
], AdminController.prototype, "getPracticeTests", null);
_ts_decorate([
    (0, _common.Get)('practice-tests/:id/analytics'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        void 0
    ]),
    _ts_metadata("design:returntype", Promise)
], AdminController.prototype, "getTestAnalytics", null);
_ts_decorate([
    (0, _common.Get)('practice-tests/:id/results'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        void 0
    ]),
    _ts_metadata("design:returntype", Promise)
], AdminController.prototype, "getTestResults", null);
_ts_decorate([
    (0, _common.Delete)('practice-tests/:id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        void 0
    ]),
    _ts_metadata("design:returntype", Promise)
], AdminController.prototype, "deletePracticeTest", null);
AdminController = _ts_decorate([
    (0, _common.Controller)('admin'),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _adminservice.AdminService === "undefined" ? Object : _adminservice.AdminService
    ])
], AdminController);

//# sourceMappingURL=admin.controller.js.map