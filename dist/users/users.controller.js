"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UsersController", {
    enumerable: true,
    get: function() {
        return UsersController;
    }
});
const _common = require("@nestjs/common");
const _usersservice = require("./users.service");
const _jwtauthguard = require("../auth/jwt-auth.guard");
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
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
let UsersController = class UsersController {
    getProfile(req) {
        const userId = req.user.userId || req.user.id || req.user.sub;
        return this.usersService.findById(userId);
    }
    async updateProfile(req, updateData) {
        const userId = req.user.userId || req.user.sub || req.user.id;
        if (updateData.password) {
            const bcrypt = await Promise.resolve().then(()=>/*#__PURE__*/ _interop_require_wildcard(require("bcrypt")));
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }
        return this.usersService.update(userId, updateData);
    }
    async getAllStudents(req) {
        const role = req.user.role || (await this.usersService.findById(req.user.userId || req.user.id || req.user.sub))?.role;
        if (role !== 'TEACHER' && role !== 'ADMIN') {
            throw new _common.ForbiddenException('Only teachers or admins can view all students');
        }
        return this.usersService.findAllStudents();
    }
    async updateAcademicStatus(studentId, req, data) {
        const userId = req.user.userId || req.user.id || req.user.sub;
        const user = await this.usersService.findById(userId);
        const role = user?.role || req.user.role;
        if (role !== 'TEACHER' && role !== 'ADMIN') {
            console.log(`Access denied for user ${userId} with role ${role}`);
            throw new _common.ForbiddenException('Only teachers or admins can update student academic status');
        }
        return this.usersService.updateAcademicStatus(studentId, userId, data);
    }
    // Parent Portal Endpoints
    async createParentRequest(req, body) {
        const userId = req.user.userId || req.user.id || req.user.sub;
        return this.usersService.createParentRequest(userId, body.studentEmail);
    }
    async getPendingRequests(req) {
        // Should ideally check for Admin role here
        return this.usersService.getPendingRequests();
    }
    async approveRequest(id) {
        return this.usersService.approveRequest(id);
    }
    async rejectRequest(id) {
        return this.usersService.rejectRequest(id);
    }
    async manualLinkParentStudent(body) {
        return this.usersService.manualLinkParentStudent(body.parentId, body.studentEmail);
    }
    async getStudentData(studentId, req) {
        const parentId = req.user.userId || req.user.id || req.user.sub;
        return this.usersService.getStudentData(parentId, studentId);
    }
    constructor(usersService){
        this.usersService = usersService;
    }
};
_ts_decorate([
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    (0, _common.Get)('profile'),
    _ts_param(0, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        void 0
    ]),
    _ts_metadata("design:returntype", void 0)
], UsersController.prototype, "getProfile", null);
_ts_decorate([
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    (0, _common.Patch)('profile'),
    _ts_param(0, (0, _common.Request)()),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        void 0,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], UsersController.prototype, "updateProfile", null);
_ts_decorate([
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    (0, _common.Get)('students'),
    _ts_param(0, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        void 0
    ]),
    _ts_metadata("design:returntype", Promise)
], UsersController.prototype, "getAllStudents", null);
_ts_decorate([
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    (0, _common.Patch)(':id/academic-status'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Request)()),
    _ts_param(2, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        void 0,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], UsersController.prototype, "updateAcademicStatus", null);
_ts_decorate([
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    (0, _common.Post)('parent-request'),
    _ts_param(0, (0, _common.Request)()),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        void 0,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], UsersController.prototype, "createParentRequest", null);
_ts_decorate([
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    (0, _common.Get)('admin/parent-requests'),
    _ts_param(0, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        void 0
    ]),
    _ts_metadata("design:returntype", Promise)
], UsersController.prototype, "getPendingRequests", null);
_ts_decorate([
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    (0, _common.Post)('admin/parent-request/:id/approve'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], UsersController.prototype, "approveRequest", null);
_ts_decorate([
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    (0, _common.Post)('admin/parent-request/:id/reject'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], UsersController.prototype, "rejectRequest", null);
_ts_decorate([
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    (0, _common.Post)('admin/link-parent-student'),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], UsersController.prototype, "manualLinkParentStudent", null);
_ts_decorate([
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    (0, _common.Get)('parent/student-data/:studentId'),
    _ts_param(0, (0, _common.Param)('studentId')),
    _ts_param(1, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        void 0
    ]),
    _ts_metadata("design:returntype", Promise)
], UsersController.prototype, "getStudentData", null);
UsersController = _ts_decorate([
    (0, _common.Controller)('users'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _usersservice.UsersService === "undefined" ? Object : _usersservice.UsersService
    ])
], UsersController);

//# sourceMappingURL=users.controller.js.map