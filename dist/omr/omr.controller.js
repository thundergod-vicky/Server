"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "OmrController", {
    enumerable: true,
    get: function() {
        return OmrController;
    }
});
const _common = require("@nestjs/common");
const _platformexpress = require("@nestjs/platform-express");
const _omrservice = require("./omr.service");
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
let OmrController = class OmrController {
    async createTemplate(req, file, name, description) {
        return this.omrService.createTemplate(req.user.id, file, name, description);
    }
    async getTemplates(req) {
        return this.omrService.getTemplates(req.user.id);
    }
    async scanOmrs(templateId, files) {
        return this.omrService.scanOmrs(templateId, files);
    }
    async getResults(templateId) {
        return this.omrService.getResults(templateId);
    }
    constructor(omrService){
        this.omrService = omrService;
    }
};
_ts_decorate([
    (0, _common.Post)('template'),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    (0, _common.UseInterceptors)((0, _platformexpress.FileInterceptor)('file')),
    _ts_param(0, (0, _common.Request)()),
    _ts_param(1, (0, _common.UploadedFile)()),
    _ts_param(2, (0, _common.Body)('name')),
    _ts_param(3, (0, _common.Body)('description')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        void 0,
        typeof Express === "undefined" || typeof Express.Multer === "undefined" || typeof Express.Multer.File === "undefined" ? Object : Express.Multer.File,
        String,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], OmrController.prototype, "createTemplate", null);
_ts_decorate([
    (0, _common.Get)('templates'),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    _ts_param(0, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        void 0
    ]),
    _ts_metadata("design:returntype", Promise)
], OmrController.prototype, "getTemplates", null);
_ts_decorate([
    (0, _common.Post)('scan/:templateId'),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    (0, _common.UseInterceptors)((0, _platformexpress.FilesInterceptor)('files')),
    _ts_param(0, (0, _common.Param)('templateId')),
    _ts_param(1, (0, _common.UploadedFiles)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Array
    ]),
    _ts_metadata("design:returntype", Promise)
], OmrController.prototype, "scanOmrs", null);
_ts_decorate([
    (0, _common.Get)('results/:templateId'),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    _ts_param(0, (0, _common.Param)('templateId')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], OmrController.prototype, "getResults", null);
OmrController = _ts_decorate([
    (0, _common.Controller)('omr'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _omrservice.OmrService === "undefined" ? Object : _omrservice.OmrService
    ])
], OmrController);

//# sourceMappingURL=omr.controller.js.map