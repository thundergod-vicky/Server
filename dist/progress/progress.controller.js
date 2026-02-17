"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ProgressController", {
    enumerable: true,
    get: function() {
        return ProgressController;
    }
});
const _common = require("@nestjs/common");
const _progressservice = require("./progress.service");
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
let ProgressController = class ProgressController {
    async markAsComplete(req, lessonId) {
        return this.progressService.markAsComplete(req.user.id, lessonId);
    }
    async getCourseProgress(req, courseId) {
        return this.progressService.getCourseProgress(req.user.id, courseId);
    }
    constructor(progressService){
        this.progressService = progressService;
    }
};
_ts_decorate([
    (0, _common.Post)('complete/:lessonId'),
    _ts_param(0, (0, _common.Request)()),
    _ts_param(1, (0, _common.Param)('lessonId')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        void 0,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], ProgressController.prototype, "markAsComplete", null);
_ts_decorate([
    (0, _common.Get)('course/:courseId'),
    _ts_param(0, (0, _common.Request)()),
    _ts_param(1, (0, _common.Param)('courseId')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        void 0,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], ProgressController.prototype, "getCourseProgress", null);
ProgressController = _ts_decorate([
    (0, _common.Controller)('progress'),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _progressservice.ProgressService === "undefined" ? Object : _progressservice.ProgressService
    ])
], ProgressController);

//# sourceMappingURL=progress.controller.js.map