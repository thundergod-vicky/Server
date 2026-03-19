"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ExamsController", {
    enumerable: true,
    get: function() {
        return ExamsController;
    }
});
const _common = require("@nestjs/common");
const _jwtauthguard = require("../auth/jwt-auth.guard");
const _examsservice = require("./exams.service");
const _createexamdto = require("./dto/create-exam.dto");
const _updateexamdto = require("./dto/update-exam.dto");
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
let ExamsController = class ExamsController {
    // Admin, Teacher, Academic Operations can create exams
    create(createExamDto, req) {
        if (!this.checkAdminAndStaff(req.user.role)) {
            throw new _common.ForbiddenException('Only admin, teacher, or academic operations can create exams');
        }
        return this.examsService.create(createExamDto, req.user.id);
    }
    // List all exams (for management)
    findAll(req) {
        if (!this.checkAdminAndStaff(req.user.role)) {
            throw new _common.ForbiddenException('Only admin, teacher, or academic operations can access this');
        }
        return this.examsService.findAll();
    }
    // Get exams for current student
    findForStudent(req) {
        return this.examsService.findForStudent(req.user.id);
    }
    // Get details (for both admin and student)
    findOne(id, req) {
        return this.examsService.findOne(id, req.user.id, req.user.role);
    }
    // Update exam
    update(id, updateExamDto, req) {
        if (!this.checkAdminAndStaff(req.user.role)) {
            throw new _common.ForbiddenException('Only admin, teacher, or academic operations can access this');
        }
        return this.examsService.update(id, updateExamDto);
    }
    // Submit results (for students)
    submitResult(id, data, req) {
        return this.examsService.submitResult(id, req.user.id, data);
    }
    remove(id, req) {
        if (!this.checkAdminAndStaff(req.user.role)) {
            throw new _common.ForbiddenException('Only admin, teacher, or academic operations can access this');
        }
        return this.examsService.delete(id);
    }
    checkAdminAndStaff(role) {
        return [
            'ADMIN',
            'TEACHER',
            'ACADEMIC_OPERATIONS'
        ].includes(role);
    }
    constructor(examsService){
        this.examsService = examsService;
    }
};
_ts_decorate([
    (0, _common.Post)(),
    _ts_param(0, (0, _common.Body)()),
    _ts_param(1, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createexamdto.CreateExamDto === "undefined" ? Object : _createexamdto.CreateExamDto,
        void 0
    ]),
    _ts_metadata("design:returntype", void 0)
], ExamsController.prototype, "create", null);
_ts_decorate([
    (0, _common.Get)(),
    _ts_param(0, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        void 0
    ]),
    _ts_metadata("design:returntype", void 0)
], ExamsController.prototype, "findAll", null);
_ts_decorate([
    (0, _common.Get)('student'),
    _ts_param(0, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        void 0
    ]),
    _ts_metadata("design:returntype", void 0)
], ExamsController.prototype, "findForStudent", null);
_ts_decorate([
    (0, _common.Get)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        void 0
    ]),
    _ts_metadata("design:returntype", void 0)
], ExamsController.prototype, "findOne", null);
_ts_decorate([
    (0, _common.Patch)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_param(2, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _updateexamdto.UpdateExamDto === "undefined" ? Object : _updateexamdto.UpdateExamDto,
        void 0
    ]),
    _ts_metadata("design:returntype", void 0)
], ExamsController.prototype, "update", null);
_ts_decorate([
    (0, _common.Post)(':id/submit'),
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
], ExamsController.prototype, "submitResult", null);
_ts_decorate([
    (0, _common.Delete)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        void 0
    ]),
    _ts_metadata("design:returntype", void 0)
], ExamsController.prototype, "remove", null);
ExamsController = _ts_decorate([
    (0, _common.Controller)('exams'),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _examsservice.ExamsService === "undefined" ? Object : _examsservice.ExamsService
    ])
], ExamsController);

//# sourceMappingURL=exams.controller.js.map