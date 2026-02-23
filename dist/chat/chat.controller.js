"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ChatController", {
    enumerable: true,
    get: function() {
        return ChatController;
    }
});
const _common = require("@nestjs/common");
const _chatservice = require("./chat.service");
const _jwtauthguard = require("../auth/jwt-auth.guard");
const _swagger = require("@nestjs/swagger");
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
let ChatController = class ChatController {
    async getMessages(req, contactId) {
        const userId = req.user.userId || req.user.id || req.user.sub || '';
        return this.chatService.getMessages(userId, contactId);
    }
    async getChatList(req) {
        const userId = req.user.userId || req.user.id || req.user.sub || '';
        return this.chatService.getChatList(userId);
    }
    async getPendingRequests(req) {
        const userId = req.user.userId || req.user.id || req.user.sub || '';
        return this.chatService.getPendingRequests(userId);
    }
    async getSentRequests(req) {
        const userId = req.user.userId || req.user.id || req.user.sub || '';
        return this.chatService.getSentRequests(userId);
    }
    async handleRequest(requestId, body) {
        return this.chatService.handleRequest(requestId, body.status);
    }
    constructor(chatService){
        this.chatService = chatService;
    }
};
_ts_decorate([
    (0, _common.Get)('messages/:contactId'),
    (0, _swagger.ApiOperation)({
        summary: 'Get messages between two users'
    }),
    _ts_param(0, (0, _common.Request)()),
    _ts_param(1, (0, _common.Param)('contactId')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof RequestWithUser === "undefined" ? Object : RequestWithUser,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], ChatController.prototype, "getMessages", null);
_ts_decorate([
    (0, _common.Get)('contacts'),
    (0, _swagger.ApiOperation)({
        summary: 'Get list of active chat contacts'
    }),
    _ts_param(0, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof RequestWithUser === "undefined" ? Object : RequestWithUser
    ]),
    _ts_metadata("design:returntype", Promise)
], ChatController.prototype, "getChatList", null);
_ts_decorate([
    (0, _common.Get)('requests'),
    (0, _swagger.ApiOperation)({
        summary: 'Get pending message requests (Teachers only)'
    }),
    _ts_param(0, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof RequestWithUser === "undefined" ? Object : RequestWithUser
    ]),
    _ts_metadata("design:returntype", Promise)
], ChatController.prototype, "getPendingRequests", null);
_ts_decorate([
    (0, _common.Get)('sent-requests'),
    (0, _swagger.ApiOperation)({
        summary: 'Get sent message requests'
    }),
    _ts_param(0, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof RequestWithUser === "undefined" ? Object : RequestWithUser
    ]),
    _ts_metadata("design:returntype", Promise)
], ChatController.prototype, "getSentRequests", null);
_ts_decorate([
    (0, _common.Post)('request/:id/handle'),
    (0, _swagger.ApiOperation)({
        summary: 'Approve or Reject a message request'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], ChatController.prototype, "handleRequest", null);
ChatController = _ts_decorate([
    (0, _swagger.ApiTags)('Chat'),
    (0, _swagger.ApiBearerAuth)(),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    (0, _common.Controller)('chat'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _chatservice.ChatService === "undefined" ? Object : _chatservice.ChatService
    ])
], ChatController);

//# sourceMappingURL=chat.controller.js.map