"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PaymentsController", {
    enumerable: true,
    get: function() {
        return PaymentsController;
    }
});
const _common = require("@nestjs/common");
const _paymentsservice = require("./payments.service");
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
let PaymentsController = class PaymentsController {
    findAll(studentId) {
        return this.paymentsService.findAll(studentId);
    }
    getStudentSummaries() {
        return this.paymentsService.getStudentSummaries();
    }
    create(body) {
        return this.paymentsService.create(body);
    }
    findByStudent(studentId) {
        return this.paymentsService.findByStudent(studentId);
    }
    updateStatus(id, status) {
        return this.paymentsService.update(id, status);
    }
    updateStudentStatus(studentId, status) {
        return this.paymentsService.updateStudentStatus(studentId, status);
    }
    remove(id) {
        return this.paymentsService.remove(id);
    }
    constructor(paymentsService){
        this.paymentsService = paymentsService;
    }
};
_ts_decorate([
    (0, _common.Get)(),
    (0, _rolesdecorator.Roles)(_client.Role.ADMIN, _client.Role.ACCOUNTS),
    _ts_param(0, (0, _common.Query)('studentId')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], PaymentsController.prototype, "findAll", null);
_ts_decorate([
    (0, _common.Get)('summaries'),
    (0, _rolesdecorator.Roles)(_client.Role.ADMIN, _client.Role.ACCOUNTS),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], PaymentsController.prototype, "getStudentSummaries", null);
_ts_decorate([
    (0, _common.Post)(),
    (0, _rolesdecorator.Roles)(_client.Role.ADMIN, _client.Role.ACCOUNTS),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], PaymentsController.prototype, "create", null);
_ts_decorate([
    (0, _common.Get)('student/:studentId'),
    (0, _rolesdecorator.Roles)(_client.Role.ADMIN, _client.Role.ACCOUNTS),
    _ts_param(0, (0, _common.Param)('studentId')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], PaymentsController.prototype, "findByStudent", null);
_ts_decorate([
    (0, _common.Patch)(':id/status'),
    (0, _rolesdecorator.Roles)(_client.Role.ADMIN, _client.Role.ACCOUNTS),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)('status')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], PaymentsController.prototype, "updateStatus", null);
_ts_decorate([
    (0, _common.Patch)('student/:studentId/status'),
    (0, _rolesdecorator.Roles)(_client.Role.ADMIN, _client.Role.ACCOUNTS),
    _ts_param(0, (0, _common.Param)('studentId')),
    _ts_param(1, (0, _common.Body)('status')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], PaymentsController.prototype, "updateStudentStatus", null);
_ts_decorate([
    (0, _common.Delete)(':id'),
    (0, _rolesdecorator.Roles)(_client.Role.ADMIN, _client.Role.ACCOUNTS),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], PaymentsController.prototype, "remove", null);
PaymentsController = _ts_decorate([
    (0, _common.Controller)('payments'),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard, _rolesguard.RolesGuard),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _paymentsservice.PaymentsService === "undefined" ? Object : _paymentsservice.PaymentsService
    ])
], PaymentsController);

//# sourceMappingURL=payments.controller.js.map