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
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ZoomService = class ZoomService {
    async getAccessToken() {
        const now = Date.now();
        // Refresh token if it's expired or expires in less than 5 minutes (300000ms)
        if (this.accessToken && this.tokenExpiresAt > now + 300000) {
            return this.accessToken;
        }
        try {
            const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');
            const response = await fetch(`https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${this.accountId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${auth}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            if (!response.ok) {
                const errorText = await response.text();
                this.logger.error(`Failed to get Zoom access token: ${response.status} ${errorText}`);
                throw new Error(`Zoom auth failed: ${response.statusText}`);
            }
            const data = await response.json();
            this.accessToken = data.access_token;
            // expires_in is usually 3599 seconds
            this.tokenExpiresAt = now + data.expires_in * 1000;
            this.logger.log('Successfully fetched Zoom access token');
            return this.accessToken || '';
        } catch (error) {
            this.logger.error('Error in Zoom getAccessToken', error);
            throw error;
        }
    }
    /**
   * Creates a Zoom Meeting
   * @param topic Topic of the meeting
   * @param startTime Start time in ISO 8601 format (e.g. 2026-03-12T10:00:00Z)
   * @param duration Duration in minutes
   * @returns Meeting link and id
   */ async createMeeting(topic, startTime, duration) {
        try {
            const token = await this.getAccessToken();
            const payload = {
                topic: topic,
                type: 2,
                start_time: startTime,
                duration: duration,
                timezone: 'Asia/Kolkata',
                settings: {
                    host_video: true,
                    participant_video: false,
                    join_before_host: true,
                    mute_upon_entry: true,
                    auto_recording: 'cloud',
                    waiting_room: false
                }
            };
            const response = await fetch('https://api.zoom.us/v2/users/me/meetings', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                const errorText = await response.text();
                this.logger.error(`Failed to create Zoom meeting: ${response.status} ${errorText}`);
                throw new Error(`Failed to create Zoom meeting`);
            }
            const data = await response.json();
            return {
                joinUrl: data.join_url,
                meetingId: data.id.toString()
            };
        } catch (error) {
            this.logger.error('Error in Zoom createMeeting', error);
            throw error;
        }
    }
    constructor(){
        this.logger = new _common.Logger(ZoomService.name);
        // Consider moving these to .env for production
        this.accountId = process.env.ZOOM_ACCOUNT_ID || 'jAmPmQpQTfymhq0ygnH3Lw';
        this.clientId = process.env.ZOOM_CLIENT_ID || '9bUWN0_FRoGih7zLKsuSSg';
        this.clientSecret = process.env.ZOOM_CLIENT_SECRET || '1yqq3P14JqXpZ1SK2VxljQ9Qw119XZ3D';
        this.accessToken = null;
        this.tokenExpiresAt = 0;
    }
};
ZoomService = _ts_decorate([
    (0, _common.Injectable)()
], ZoomService);

//# sourceMappingURL=zoom.service.js.map