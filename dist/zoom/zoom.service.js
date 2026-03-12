"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ZoomService", {
    enumerable: true,
    get: function() {
        return ZoomService;
    }
});
const _common = require("@nestjs/common");
const _crypto = require("crypto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ZoomService = class ZoomService {
    generateSignature(meetingNumber, role) {
        if (!this.sdkKey || !this.sdkSecret) {
            throw new Error('Zoom SDK credentials (ZOOM_CLIENT_ID / ZOOM_CLIENT_SECRET) are not configured.');
        }
        const iat = Math.round(new Date().getTime() / 1000) - 30;
        const exp = iat + 60 * 60 * 2;
        // Zoom Meeting SDK JWT payload (v5+ spec)
        const payload = {
            appKey: this.sdkKey,
            sdkKey: this.sdkKey,
            mn: meetingNumber,
            role: role,
            iat: iat,
            exp: exp,
            tokenExp: exp
        };
        const header = {
            alg: 'HS256',
            typ: 'JWT'
        };
        const encodedHeader = this.base64UrlEncode(JSON.stringify(header));
        const encodedPayload = this.base64UrlEncode(JSON.stringify(payload));
        const signingInput = `${encodedHeader}.${encodedPayload}`;
        const signature = (0, _crypto.createHmac)('sha256', this.sdkSecret).update(signingInput).digest('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
        const jwt = `${signingInput}.${signature}`;
        console.log(`[ZoomService] Generated JWT for meeting ${meetingNumber} (role ${role}), sdkKey: ${this.sdkKey}`);
        return jwt;
    }
    base64UrlEncode(str) {
        return Buffer.from(str).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    }
    constructor(){
        // For Zoom General Apps: Client ID = SDK Key, Client Secret = SDK Secret
        this.sdkKey = process.env.ZOOM_CLIENT_ID || '';
        this.sdkSecret = process.env.ZOOM_CLIENT_SECRET || '';
    }
};
ZoomService = _ts_decorate([
    (0, _common.Injectable)()
], ZoomService);

//# sourceMappingURL=zoom.service.js.map