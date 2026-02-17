"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PracticeTestsController = void 0;
const common_1 = require("@nestjs/common");
const practice_tests_service_1 = require("./practice-tests.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_practice_test_dto_1 = require("./dto/create-practice-test.dto");
let PracticeTestsController = class PracticeTestsController {
    practiceTestsService;
    constructor(practiceTestsService) {
        this.practiceTestsService = practiceTestsService;
    }
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
};
exports.PracticeTestsController = PracticeTestsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_practice_test_dto_1.CreatePracticeTestDto, Object]),
    __metadata("design:returntype", void 0)
], PracticeTestsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('teacher'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PracticeTestsController.prototype, "findAllByTeacher", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PracticeTestsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PracticeTestsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_practice_test_dto_1.CreatePracticeTestDto, Object]),
    __metadata("design:returntype", void 0)
], PracticeTestsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PracticeTestsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('results'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PracticeTestsController.prototype, "submitResult", null);
__decorate([
    (0, common_1.Get)('results/student'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PracticeTestsController.prototype, "findResultsByStudent", null);
__decorate([
    (0, common_1.Get)('results/check/:testId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('testId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PracticeTestsController.prototype, "checkResult", null);
exports.PracticeTestsController = PracticeTestsController = __decorate([
    (0, common_1.Controller)('practice-tests'),
    __metadata("design:paramtypes", [practice_tests_service_1.PracticeTestsService])
], PracticeTestsController);
//# sourceMappingURL=practice-tests.controller.js.map