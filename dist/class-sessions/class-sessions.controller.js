"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ClassSessionsController", {
    enumerable: true,
    get: function() {
        return ClassSessionsController;
    }
});
const _common = require("@nestjs/common");
const _classsessionsservice = require("./class-sessions.service");
const _jwtauthguard = require("../auth/jwt-auth.guard");
const _rolesguard = require("../auth/roles.guard");
const _rolesdecorator = require("../auth/roles.decorator");
const _client = require("@prisma/client");
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
let ClassSessionsController = class ClassSessionsController {
    create(body) {
        return this.service.create(body);
    }
    findAll(batchId, teacherId, date) {
        return this.service.findAll({
            batchId,
            teacherId,
            date
        });
    }
    findMyTeacherSessions(req) {
        const userId = req.user.id || req.user.userId || req.user.sub;
        return this.service.findByTeacher(userId);
    }
    findMyStudentSessions(req) {
        const userId = req.user.id || req.user.userId || req.user.sub;
        return this.service.findByStudent(userId);
    }
    remove(id) {
        return this.service.delete(id);
    }
    constructor(service){
        this.service = service;
    }
};
_ts_decorate([
    (0, _common.Post)(),
    (0, _rolesdecorator.Roles)(_client.Role.ADMIN, _client.Role.ACADEMIC_OPERATIONS),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], ClassSessionsController.prototype, "create", null);
_ts_decorate([
    (0, _common.Get)(),
    (0, _rolesdecorator.Roles)(_client.Role.ADMIN, _client.Role.ACADEMIC_OPERATIONS, _client.Role.ACCOUNTS),
    _ts_param(0, (0, _common.Query)('batchId')),
    _ts_param(1, (0, _common.Query)('teacherId')),
    _ts_param(2, (0, _common.Query)('date')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        String,
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], ClassSessionsController.prototype, "findAll", null);
_ts_decorate([
    (0, _common.Get)('my-sessions'),
    (0, _rolesdecorator.Roles)(_client.Role.TEACHER),
    _ts_param(0, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], ClassSessionsController.prototype, "findMyTeacherSessions", null);
_ts_decorate([
    (0, _common.Get)('student-sessions'),
    (0, _rolesdecorator.Roles)(_client.Role.STUDENT, _client.Role.PARENT),
    _ts_param(0, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], ClassSessionsController.prototype, "findMyStudentSessions", null);
_ts_decorate([
    (0, _common.Delete)(':id'),
    (0, _rolesdecorator.Roles)(_client.Role.ADMIN, _client.Role.ACADEMIC_OPERATIONS),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], ClassSessionsController.prototype, "remove", null);
ClassSessionsController = _ts_decorate([
    (0, _common.Controller)('class-sessions'),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard, _rolesguard.RolesGuard),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _classsessionsservice.ClassSessionsService === "undefined" ? Object : _classsessionsservice.ClassSessionsService
    ])
], ClassSessionsController);

//# sourceMappingURL=class-sessions.controller.js.map