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
const _swagger = require("@nestjs/swagger");
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
    checkAdmin(req) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const role = req.user.role;
        if (role !== 'ADMIN' && role !== 'ACADEMIC_OPERATIONS' && role !== 'ACCOUNTS') {
            throw new _common.ForbiddenException('Ask For permission');
        }
    }
    async getStats(req) {
        this.checkAdmin(req);
        return this.adminService.getGlobalStats();
    }
    async getAcademicStats(req) {
        this.checkAdmin(req);
        return this.adminService.getAcademicStats();
    }
    async getUsers(req) {
        this.checkAdmin(req);
        return this.adminService.getAllUsers();
    }
    async updateRole(userId, data, req) {
        this.checkAdmin(req);
        return this.adminService.updateUserRole(userId, data.role);
    }
    async updateUser(userId, data, req) {
        this.checkAdmin(req);
        return this.adminService.updateUser(userId, data);
    }
    async getCourses(req) {
        this.checkAdmin(req);
        return this.adminService.getAllCourses();
    }
    async deleteCourse(courseId, req) {
        this.checkAdmin(req);
        return this.adminService.deleteCourse(courseId);
    }
    // Practice Test Management
    async getPracticeTests(req) {
        this.checkAdmin(req);
        return this.adminService.getAllPracticeTests();
    }
    async getTestAnalytics(testId, req) {
        this.checkAdmin(req);
        return this.adminService.getTestAnalytics(testId);
    }
    async getTestResults(testId, req) {
        this.checkAdmin(req);
        return this.adminService.getTestResults(testId);
    }
    async deletePracticeTest(testId, req) {
        this.checkAdmin(req);
        return this.adminService.deletePracticeTest(testId);
    }
    async deleteUser(userId, req) {
        this.checkAdmin(req);
        return this.adminService.deleteUser(userId);
    }
    async createUser(data, req) {
        this.checkAdmin(req);
        return this.adminService.createUser(data);
    }
    constructor(adminService){
        this.adminService = adminService;
    }
};
_ts_decorate([
    (0, _common.Get)('stats'),
    (0, _swagger.ApiOperation)({
        summary: 'Get global stats'
    }),
    (0, _swagger.ApiResponse)({
        status: 200,
        description: 'Return stats'
    }),
    (0, _swagger.ApiResponse)({
        status: 403,
        description: 'Ask For permission'
    }),
    _ts_param(0, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        void 0
    ]),
    _ts_metadata("design:returntype", Promise)
], AdminController.prototype, "getStats", null);
_ts_decorate([
    (0, _common.Get)('academic/stats'),
    (0, _swagger.ApiOperation)({
        summary: 'Get academic operations stats'
    }),
    _ts_param(0, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        void 0
    ]),
    _ts_metadata("design:returntype", Promise)
], AdminController.prototype, "getAcademicStats", null);
_ts_decorate([
    (0, _common.Get)('users'),
    (0, _swagger.ApiOperation)({
        summary: 'Get all users'
    }),
    _ts_param(0, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        void 0
    ]),
    _ts_metadata("design:returntype", Promise)
], AdminController.prototype, "getUsers", null);
_ts_decorate([
    (0, _common.Patch)('users/:id/role'),
    (0, _swagger.ApiOperation)({
        summary: 'Update user role'
    }),
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
    (0, _common.Patch)('users/:id'),
    (0, _swagger.ApiOperation)({
        summary: 'Update user profile'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_param(2, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], AdminController.prototype, "updateUser", null);
_ts_decorate([
    (0, _common.Get)('courses'),
    (0, _swagger.ApiOperation)({
        summary: 'Get all courses'
    }),
    _ts_param(0, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        void 0
    ]),
    _ts_metadata("design:returntype", Promise)
], AdminController.prototype, "getCourses", null);
_ts_decorate([
    (0, _common.Delete)('courses/:id'),
    (0, _swagger.ApiOperation)({
        summary: 'Delete a course'
    }),
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
    (0, _swagger.ApiOperation)({
        summary: 'Get all practice tests'
    }),
    _ts_param(0, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        void 0
    ]),
    _ts_metadata("design:returntype", Promise)
], AdminController.prototype, "getPracticeTests", null);
_ts_decorate([
    (0, _common.Get)('practice-tests/:id/analytics'),
    (0, _swagger.ApiOperation)({
        summary: 'Get test analytics'
    }),
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
    (0, _swagger.ApiOperation)({
        summary: 'Get test results'
    }),
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
    (0, _swagger.ApiOperation)({
        summary: 'Delete a practice test'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        void 0
    ]),
    _ts_metadata("design:returntype", Promise)
], AdminController.prototype, "deletePracticeTest", null);
_ts_decorate([
    (0, _common.Delete)('users/:id'),
    (0, _swagger.ApiOperation)({
        summary: 'Delete a user'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        void 0
    ]),
    _ts_metadata("design:returntype", Promise)
], AdminController.prototype, "deleteUser", null);
_ts_decorate([
    (0, _common.Post)('users'),
    (0, _swagger.ApiOperation)({
        summary: 'Create a new user'
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_param(1, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object,
        void 0
    ]),
    _ts_metadata("design:returntype", Promise)
], AdminController.prototype, "createUser", null);
AdminController = _ts_decorate([
    (0, _swagger.ApiExcludeController)(),
    (0, _swagger.ApiTags)('Admin'),
    (0, _swagger.ApiBearerAuth)(),
    (0, _common.Controller)('admin'),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _adminservice.AdminService === "undefined" ? Object : _adminservice.AdminService
    ])
], AdminController);

//# sourceMappingURL=admin.controller.js.map