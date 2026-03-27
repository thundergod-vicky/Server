"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AdmissionsController", {
    enumerable: true,
    get: function() {
        return AdmissionsController;
    }
});
const _common = require("@nestjs/common");
const _platformexpress = require("@nestjs/platform-express");
const _admissionsservice = require("./admissions.service");
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
let AdmissionsController = class AdmissionsController {
    getNextNumbers() {
        return this.admissionsService.getNextNumbers();
    }
    submitAdmission(req, data, photo) {
        return this.admissionsService.submitAdmission(req.user.id || req.user.userId, data, photo);
    }
    getMyAdmission(req) {
        return this.admissionsService.getMyAdmission(req.user.id || req.user.userId);
    }
    getAllAdmissions() {
        return this.admissionsService.getAllAdmissions();
    }
    getAdmissionByStudent(studentId) {
        return this.admissionsService.getAdmissionByStudentId(studentId);
    }
    async getPhoto(id, res) {
        try {
            const { stream, contentType } = await this.admissionsService.getPhotoStream(id);
            res.set({
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=3600'
            });
            stream.pipe(res);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Photo not found';
            res.status(404).send(message);
        }
    }
    approveAdmission(id, req) {
        return this.admissionsService.approveAdmission(id, req.user.id || req.user.userId);
    }
    rejectAdmission(id) {
        return this.admissionsService.rejectAdmission(id);
    }
    constructor(admissionsService){
        this.admissionsService = admissionsService;
    }
};
_ts_decorate([
    (0, _common.Get)('next-numbers'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], AdmissionsController.prototype, "getNextNumbers", null);
_ts_decorate([
    (0, _common.Post)(),
    (0, _common.UseInterceptors)((0, _platformexpress.FileInterceptor)('photo')),
    _ts_param(0, (0, _common.Req)()),
    _ts_param(1, (0, _common.Body)()),
    _ts_param(2, (0, _common.UploadedFile)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        void 0,
        Object,
        typeof Express === "undefined" || typeof Express.Multer === "undefined" || typeof Express.Multer.File === "undefined" ? Object : Express.Multer.File
    ]),
    _ts_metadata("design:returntype", void 0)
], AdmissionsController.prototype, "submitAdmission", null);
_ts_decorate([
    (0, _common.Get)('me'),
    _ts_param(0, (0, _common.Req)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        void 0
    ]),
    _ts_metadata("design:returntype", void 0)
], AdmissionsController.prototype, "getMyAdmission", null);
_ts_decorate([
    (0, _common.Get)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], AdmissionsController.prototype, "getAllAdmissions", null);
_ts_decorate([
    (0, _common.Get)('student/:studentId'),
    _ts_param(0, (0, _common.Param)('studentId')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], AdmissionsController.prototype, "getAdmissionByStudent", null);
_ts_decorate([
    (0, _common.Get)('photo/:id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Res)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof Response === "undefined" ? Object : Response
    ]),
    _ts_metadata("design:returntype", Promise)
], AdmissionsController.prototype, "getPhoto", null);
_ts_decorate([
    (0, _common.Patch)(':id/approve'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Req)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        void 0
    ]),
    _ts_metadata("design:returntype", void 0)
], AdmissionsController.prototype, "approveAdmission", null);
_ts_decorate([
    (0, _common.Patch)(':id/reject'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], AdmissionsController.prototype, "rejectAdmission", null);
AdmissionsController = _ts_decorate([
    (0, _common.Controller)('admissions'),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _admissionsservice.AdmissionsService === "undefined" ? Object : _admissionsservice.AdmissionsService
    ])
], AdmissionsController);

//# sourceMappingURL=admissions.controller.js.map