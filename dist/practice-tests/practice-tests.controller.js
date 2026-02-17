"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PracticeTestsController", {
    enumerable: true,
    get: function() {
        return PracticeTestsController;
    }
});
const _common = require("@nestjs/common");
const _practicetestsservice = require("./practice-tests.service");
const _jwtauthguard = require("../auth/jwt-auth.guard");
const _createpracticetestdto = require("./dto/create-practice-test.dto");
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
let PracticeTestsController = class PracticeTestsController {
    create(createPracticeTestDto, req) {
        return this.practiceTestsService.create(req.user.id, createPracticeTestDto);
    }
    findAllByTeacher(req) {
        return this.practiceTestsService.findAllByTeacher(req.user.id);
    }
    findAll() {
        return this.practiceTestsService.findAll();
    }
    findOne(id) {
        return this.practiceTestsService.findOne(id);
    }
    update(id, createPracticeTestDto, req) {
        return this.practiceTestsService.update(id, req.user.id, createPracticeTestDto);
    }
    remove(id, req) {
        return this.practiceTestsService.remove(id, req.user.id);
    }
    submitResult(data, req) {
        return this.practiceTestsService.submitResult(req.user.id, data.testId, data);
    }
    findResultsByStudent(req) {
        return this.practiceTestsService.findResultsByStudent(req.user.id);
    }
    checkResult(testId, req) {
        return this.practiceTestsService.findResultByStudentAndTest(req.user.id, testId);
    }
    constructor(practiceTestsService){
        this.practiceTestsService = practiceTestsService;
    }
};
_ts_decorate([
    (0, _common.Post)(),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    _ts_param(0, (0, _common.Body)()),
    _ts_param(1, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createpracticetestdto.CreatePracticeTestDto === "undefined" ? Object : _createpracticetestdto.CreatePracticeTestDto,
        void 0
    ]),
    _ts_metadata("design:returntype", void 0)
], PracticeTestsController.prototype, "create", null);
_ts_decorate([
    (0, _common.Get)('teacher'),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    _ts_param(0, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        void 0
    ]),
    _ts_metadata("design:returntype", void 0)
], PracticeTestsController.prototype, "findAllByTeacher", null);
_ts_decorate([
    (0, _common.Get)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], PracticeTestsController.prototype, "findAll", null);
_ts_decorate([
    (0, _common.Get)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], PracticeTestsController.prototype, "findOne", null);
_ts_decorate([
    (0, _common.Patch)(':id'),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_param(2, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _createpracticetestdto.CreatePracticeTestDto === "undefined" ? Object : _createpracticetestdto.CreatePracticeTestDto,
        void 0
    ]),
    _ts_metadata("design:returntype", void 0)
], PracticeTestsController.prototype, "update", null);
_ts_decorate([
    (0, _common.Delete)(':id'),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        void 0
    ]),
    _ts_metadata("design:returntype", void 0)
], PracticeTestsController.prototype, "remove", null);
_ts_decorate([
    (0, _common.Post)('results'),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    _ts_param(0, (0, _common.Body)()),
    _ts_param(1, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object,
        void 0
    ]),
    _ts_metadata("design:returntype", void 0)
], PracticeTestsController.prototype, "submitResult", null);
_ts_decorate([
    (0, _common.Get)('results/student'),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    _ts_param(0, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        void 0
    ]),
    _ts_metadata("design:returntype", void 0)
], PracticeTestsController.prototype, "findResultsByStudent", null);
_ts_decorate([
    (0, _common.Get)('results/check/:testId'),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    _ts_param(0, (0, _common.Param)('testId')),
    _ts_param(1, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        void 0
    ]),
    _ts_metadata("design:returntype", void 0)
], PracticeTestsController.prototype, "checkResult", null);
PracticeTestsController = _ts_decorate([
    (0, _common.Controller)('practice-tests'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _practicetestsservice.PracticeTestsService === "undefined" ? Object : _practicetestsservice.PracticeTestsService
    ])
], PracticeTestsController);

//# sourceMappingURL=practice-tests.controller.js.map