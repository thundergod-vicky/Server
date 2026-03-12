"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ZoomController", {
    enumerable: true,
    get: function() {
        return ZoomController;
    }
});
const _common = require("@nestjs/common");
const _zoomservice = require("./zoom.service");
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
let ZoomController = class ZoomController {
    generateSignature(body) {
        console.log(`[Zoom] Generating signature for meeting: ${body.meetingNumber}, role: ${body.role}`);
        const signature = this.zoomService.generateSignature(body.meetingNumber, body.role);
        console.log(`[Zoom] Generated signature: ${signature}`);
        // Also return decoded payload for debugging
        const parts = signature.split('.');
        let payload = {};
        if (parts.length === 3) {
            payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
        }
        return {
            signature,
            sdkKey: process.env.ZOOM_CLIENT_ID || 'missing_key',
            _debug_payload: payload
        };
    }
    debugConfig(meetingNumber) {
        const sig = this.zoomService.generateSignature(meetingNumber || '123456789', 0);
        const parts = sig.split('.');
        const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
        return {
            sdkKeyUsed: payload.appKey,
            secretLength: process.env.ZOOM_CLIENT_SECRET?.length ?? 0,
            secretFirst4: process.env.ZOOM_CLIENT_SECRET?.substring(0, 4) ?? 'N/A',
            payload,
            message: 'Use this to verify your credentials on https://jwt.io'
        };
    }
    constructor(zoomService){
        this.zoomService = zoomService;
    }
};
_ts_decorate([
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    (0, _common.Post)('signature'),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], ZoomController.prototype, "generateSignature", null);
_ts_decorate([
    (0, _common.Get)('debug'),
    _ts_param(0, (0, _common.Query)('meetingNumber')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], ZoomController.prototype, "debugConfig", null);
ZoomController = _ts_decorate([
    (0, _common.Controller)('zoom'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _zoomservice.ZoomService === "undefined" ? Object : _zoomservice.ZoomService
    ])
], ZoomController);

//# sourceMappingURL=zoom.controller.js.map