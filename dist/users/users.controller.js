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
const _swagger = require("@nestjs/swagger");
const _usersservice = require("./users.service");
const _jwtauthguard = require("../auth/jwt-auth.guard");
const _updateprofiledto = require("./dto/update-profile.dto");
const _updateacademicstatusdto = require("./dto/update-academic-status.dto");
const _parentrequestdto = require("./dto/parent-request.dto");
const _linkparentstudentdto = require("./dto/link-parent-student.dto");
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
        if (!userId) throw new _common.ForbiddenException('User ID not found');
        return this.usersService.findById(userId);
    }
    async updateProfile(req, updateData) {
        const userId = req.user.userId || req.user.sub || req.user.id;
        if (!userId) throw new _common.ForbiddenException('User ID not found');
        if (updateData.password) {
            const bcrypt = await Promise.resolve().then(()=>/*#__PURE__*/ _interop_require_wildcard(require("bcrypt")));
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }
        // Cast to any to bypass strict Prisma input type if DTO doesn't match perfectly
        return this.usersService.update(userId, updateData);
    }
    async getAllStudents(req) {
        const userId = req.user.userId || req.user.id || req.user.sub;
        if (!userId) throw new _common.ForbiddenException('User ID not found');
        const role = req.user.role || (await this.usersService.findById(userId))?.role;
        if (role !== 'TEACHER' && role !== 'ADMIN') {
            throw new _common.ForbiddenException('Only teachers or admins can view all students');
        }
        return this.usersService.findAllStudents();
    }
    async updateAcademicStatus(studentId, req, data) {
        const userId = req.user.userId || req.user.id || req.user.sub;
        if (!userId) throw new _common.ForbiddenException('User ID not found');
        const user = await this.usersService.findById(userId);
        const role = user?.role || req.user.role;
        if (role !== 'TEACHER' && role !== 'ADMIN') {
            console.log(`Access denied for user ${userId} with role ${role}`);
            throw new _common.ForbiddenException('Only teachers or admins can update student academic status');
        }
        return this.usersService.updateAcademicStatus(studentId, userId, data);
    }
    async createParentRequest(req, body) {
        const userId = req.user.userId || req.user.id || req.user.sub;
        if (!userId) throw new _common.ForbiddenException('User ID not found');
        return this.usersService.createParentRequest(userId, body.studentEmail);
    }
    getPendingRequests() {
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
        if (!parentId) throw new _common.ForbiddenException('Parent ID not found');
        return this.usersService.getStudentData(parentId, studentId);
    }
    constructor(usersService){
        this.usersService = usersService;
    }
};
_ts_decorate([
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    (0, _common.Get)('profile'),
    (0, _swagger.ApiOperation)({
        summary: 'Get current user profile'
    }),
    (0, _swagger.ApiResponse)({
        status: 200,
        description: 'Return user profile'
    }),
    _ts_param(0, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof RequestWithUser === "undefined" ? Object : RequestWithUser
    ]),
    _ts_metadata("design:returntype", void 0)
], UsersController.prototype, "getProfile", null);
_ts_decorate([
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    (0, _common.Patch)('profile'),
    (0, _swagger.ApiOperation)({
        summary: 'Update current user profile'
    }),
    (0, _swagger.ApiResponse)({
        status: 200,
        description: 'Profile updated successfully'
    }),
    _ts_param(0, (0, _common.Request)()),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof RequestWithUser === "undefined" ? Object : RequestWithUser,
        typeof _updateprofiledto.UpdateProfileDto === "undefined" ? Object : _updateprofiledto.UpdateProfileDto
    ]),
    _ts_metadata("design:returntype", Promise)
], UsersController.prototype, "updateProfile", null);
_ts_decorate([
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    (0, _common.Get)('students'),
    (0, _swagger.ApiOperation)({
        summary: 'Get all students (Teachers/Admins only)'
    }),
    (0, _swagger.ApiResponse)({
        status: 200,
        description: 'Return all students'
    }),
    (0, _swagger.ApiResponse)({
        status: 403,
        description: 'Forbidden'
    }),
    _ts_param(0, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof RequestWithUser === "undefined" ? Object : RequestWithUser
    ]),
    _ts_metadata("design:returntype", Promise)
], UsersController.prototype, "getAllStudents", null);
_ts_decorate([
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    (0, _common.Patch)(':id/academic-status'),
    (0, _swagger.ApiOperation)({
        summary: 'Update student academic status (Teachers/Admins only)'
    }),
    (0, _swagger.ApiResponse)({
        status: 200,
        description: 'Status updated'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Request)()),
    _ts_param(2, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof RequestWithUser === "undefined" ? Object : RequestWithUser,
        typeof _updateacademicstatusdto.UpdateAcademicStatusDto === "undefined" ? Object : _updateacademicstatusdto.UpdateAcademicStatusDto
    ]),
    _ts_metadata("design:returntype", Promise)
], UsersController.prototype, "updateAcademicStatus", null);
_ts_decorate([
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    (0, _common.Post)('parent-request'),
    (0, _swagger.ApiOperation)({
        summary: 'Create a parent-student link request'
    }),
    (0, _swagger.ApiResponse)({
        status: 201,
        description: 'Request created'
    }),
    _ts_param(0, (0, _common.Request)()),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof RequestWithUser === "undefined" ? Object : RequestWithUser,
        typeof _parentrequestdto.ParentRequestDto === "undefined" ? Object : _parentrequestdto.ParentRequestDto
    ]),
    _ts_metadata("design:returntype", Promise)
], UsersController.prototype, "createParentRequest", null);
_ts_decorate([
    (0, _swagger.ApiExcludeEndpoint)(),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    (0, _common.Get)('admin/parent-requests'),
    (0, _swagger.ApiOperation)({
        summary: 'Get all pending parent requests (Admins only)'
    }),
    (0, _swagger.ApiResponse)({
        status: 200,
        description: 'Return pending requests'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], UsersController.prototype, "getPendingRequests", null);
_ts_decorate([
    (0, _swagger.ApiExcludeEndpoint)(),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    (0, _common.Post)('admin/parent-request/:id/approve'),
    (0, _swagger.ApiOperation)({
        summary: 'Approve a parent request (Admins only)'
    }),
    (0, _swagger.ApiResponse)({
        status: 200,
        description: 'Request approved'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], UsersController.prototype, "approveRequest", null);
_ts_decorate([
    (0, _swagger.ApiExcludeEndpoint)(),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    (0, _common.Post)('admin/parent-request/:id/reject'),
    (0, _swagger.ApiOperation)({
        summary: 'Reject a parent request (Admins only)'
    }),
    (0, _swagger.ApiResponse)({
        status: 200,
        description: 'Request rejected'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], UsersController.prototype, "rejectRequest", null);
_ts_decorate([
    (0, _swagger.ApiExcludeEndpoint)(),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    (0, _common.Post)('admin/link-parent-student'),
    (0, _swagger.ApiOperation)({
        summary: 'Manually link parent and student (Admins only)'
    }),
    (0, _swagger.ApiResponse)({
        status: 201,
        description: 'Linked successfully'
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _linkparentstudentdto.LinkParentStudentDto === "undefined" ? Object : _linkparentstudentdto.LinkParentStudentDto
    ]),
    _ts_metadata("design:returntype", Promise)
], UsersController.prototype, "manualLinkParentStudent", null);
_ts_decorate([
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    (0, _common.Get)('parent/student-data/:studentId'),
    (0, _swagger.ApiOperation)({
        summary: 'Get linked student data (Parents only)'
    }),
    (0, _swagger.ApiResponse)({
        status: 200,
        description: 'Return student data'
    }),
    _ts_param(0, (0, _common.Param)('studentId')),
    _ts_param(1, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof RequestWithUser === "undefined" ? Object : RequestWithUser
    ]),
    _ts_metadata("design:returntype", Promise)
], UsersController.prototype, "getStudentData", null);
UsersController = _ts_decorate([
    (0, _swagger.ApiTags)('Users'),
    (0, _swagger.ApiBearerAuth)(),
    (0, _common.Controller)('users'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _usersservice.UsersService === "undefined" ? Object : _usersservice.UsersService
    ])
], UsersController);

//# sourceMappingURL=users.controller.js.map