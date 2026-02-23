"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BatchesController", {
    enumerable: true,
    get: function() {
        return BatchesController;
    }
});
const _common = require("@nestjs/common");
const _swagger = require("@nestjs/swagger");
const _batchesservice = require("./batches.service");
const _createbatchdto = require("./dto/create-batch.dto");
const _assignstudentsdto = require("./dto/assign-students.dto");
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
let BatchesController = class BatchesController {
    checkAdmin(req) {
        const user = req.user;
        if (user.role !== 'ADMIN') {
            throw new _common.ForbiddenException('Only admins can perform this action');
        }
    }
    create(createBatchDto, req) {
        this.checkAdmin(req);
        return this.batchesService.create(createBatchDto);
    }
    findAll(req) {
        this.checkAdmin(req);
        return this.batchesService.findAll();
    }
    findMyBatches(req) {
        const user = req.user;
        if (user.role === 'STUDENT') {
            return this.batchesService.findByStudent(user.userId);
        } else if (user.role === 'TEACHER') {
            return this.batchesService.findByTeacher(user.userId);
        }
        throw new _common.ForbiddenException('Not applicable for this role');
    }
    findOne(id) {
        return this.batchesService.findOne(id);
    }
    assignStudents(id, assignStudentsDto, req) {
        this.checkAdmin(req);
        return this.batchesService.assignStudents(id, assignStudentsDto.studentIds);
    }
    assignTeacher(id, data, req) {
        this.checkAdmin(req);
        return this.batchesService.assignTeacher(id, data.teacherId);
    }
    removeStudent(id, studentId, req) {
        this.checkAdmin(req);
        return this.batchesService.removeStudent(id, studentId);
    }
    remove(id, req) {
        this.checkAdmin(req);
        return this.batchesService.delete(id);
    }
    constructor(batchesService){
        this.batchesService = batchesService;
    }
};
_ts_decorate([
    (0, _common.Post)(),
    (0, _swagger.ApiOperation)({
        summary: 'Create a new batch (Admin only)'
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_param(1, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createbatchdto.CreateBatchDto === "undefined" ? Object : _createbatchdto.CreateBatchDto,
        void 0
    ]),
    _ts_metadata("design:returntype", void 0)
], BatchesController.prototype, "create", null);
_ts_decorate([
    (0, _common.Get)(),
    (0, _swagger.ApiOperation)({
        summary: 'Get all batches (Admin only)'
    }),
    _ts_param(0, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        void 0
    ]),
    _ts_metadata("design:returntype", void 0)
], BatchesController.prototype, "findAll", null);
_ts_decorate([
    (0, _common.Get)('my-batches'),
    (0, _swagger.ApiOperation)({
        summary: 'Get batches for the current student or teacher'
    }),
    _ts_param(0, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], BatchesController.prototype, "findMyBatches", null);
_ts_decorate([
    (0, _common.Get)(':id'),
    (0, _swagger.ApiOperation)({
        summary: 'Get batch details'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], BatchesController.prototype, "findOne", null);
_ts_decorate([
    (0, _common.Patch)(':id/students'),
    (0, _swagger.ApiOperation)({
        summary: 'Assign students to a batch (Admin only)'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_param(2, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _assignstudentsdto.AssignStudentsDto === "undefined" ? Object : _assignstudentsdto.AssignStudentsDto,
        void 0
    ]),
    _ts_metadata("design:returntype", void 0)
], BatchesController.prototype, "assignStudents", null);
_ts_decorate([
    (0, _common.Patch)(':id/teacher'),
    (0, _swagger.ApiOperation)({
        summary: 'Assign a teacher to a batch (Admin only)'
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
    _ts_metadata("design:returntype", void 0)
], BatchesController.prototype, "assignTeacher", null);
_ts_decorate([
    (0, _common.Delete)(':id/students/:studentId'),
    (0, _swagger.ApiOperation)({
        summary: 'Remove a student from a batch (Admin only)'
    }),
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
], BatchesController.prototype, "removeStudent", null);
_ts_decorate([
    (0, _common.Delete)(':id'),
    (0, _swagger.ApiOperation)({
        summary: 'Delete a batch (Admin only)'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        void 0
    ]),
    _ts_metadata("design:returntype", void 0)
], BatchesController.prototype, "remove", null);
BatchesController = _ts_decorate([
    (0, _swagger.ApiTags)('Batches'),
    (0, _swagger.ApiBearerAuth)(),
    (0, _common.Controller)('batches'),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _batchesservice.BatchesService === "undefined" ? Object : _batchesservice.BatchesService
    ])
], BatchesController);

//# sourceMappingURL=batches.controller.js.map