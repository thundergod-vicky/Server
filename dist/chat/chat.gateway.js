"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ChatGateway", {
    enumerable: true,
    get: function() {
        return ChatGateway;
    }
});
const _websockets = require("@nestjs/websockets");
const _socketio = require("socket.io");
const _jwt = require("@nestjs/jwt");
const _chatservice = require("./chat.service");
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
let ChatGateway = class ChatGateway {
    async handleConnection(client) {
        try {
            const token = client.handshake.auth.token || client.handshake.headers.authorization?.split(' ')[1];
            if (!token) {
                client.disconnect();
                return;
            }
            const payload = this.jwtService.verify(token);
            client.data.user = payload;
            // Join a room specific to this user
            await client.join(`user_${payload.sub}`);
            console.log(`User connected: ${payload.sub} (socket: ${client.id})`);
        } catch (e) {
            console.error('Socket connection error:', e.message);
            client.disconnect();
        }
    }
    handleDisconnect(client) {
        if (client.data.user) {
            console.log(`User disconnected: ${client.data.user.sub}`);
        }
    }
    async handleMessage(client, data) {
        const senderId = client.data.user.sub;
        try {
            const message = await this.chatService.createMessage({
                senderId,
                ...data
            });
            // Emit to receiver's room
            this.server.to(`user_${data.receiverId}`).emit('newMessage', message);
            // Emit back to sender (for multi-device sync or acknowledgment)
            this.server.to(`user_${senderId}`).emit('messageSent', message);
            return {
                success: true,
                message
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
    async handleRequest(client, data) {
        const senderId = client.data.user.sub;
        try {
            const request = await this.chatService.sendChatRequest(senderId, data.receiverId, data.firstMessage);
            // Notify the teacher/admin
            this.server.to(`user_${data.receiverId}`).emit('newChatRequest', request);
            return {
                success: true,
                request
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
    handleTyping(client, data) {
        const senderId = client.data.user.sub;
        this.server.to(`user_${data.receiverId}`).emit('userTyping', {
            senderId,
            isTyping: data.isTyping
        });
    }
    constructor(jwtService, chatService){
        this.jwtService = jwtService;
        this.chatService = chatService;
    }
};
_ts_decorate([
    (0, _websockets.WebSocketServer)(),
    _ts_metadata("design:type", typeof _socketio.Server === "undefined" ? Object : _socketio.Server)
], ChatGateway.prototype, "server", void 0);
_ts_decorate([
    (0, _websockets.SubscribeMessage)('sendMessage'),
    _ts_param(0, (0, _websockets.ConnectedSocket)()),
    _ts_param(1, (0, _websockets.MessageBody)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _socketio.Socket === "undefined" ? Object : _socketio.Socket,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleMessage", null);
_ts_decorate([
    (0, _websockets.SubscribeMessage)('sendRequest'),
    _ts_param(0, (0, _websockets.ConnectedSocket)()),
    _ts_param(1, (0, _websockets.MessageBody)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _socketio.Socket === "undefined" ? Object : _socketio.Socket,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleRequest", null);
_ts_decorate([
    (0, _websockets.SubscribeMessage)('typing'),
    _ts_param(0, (0, _websockets.ConnectedSocket)()),
    _ts_param(1, (0, _websockets.MessageBody)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _socketio.Socket === "undefined" ? Object : _socketio.Socket,
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleTyping", null);
ChatGateway = _ts_decorate([
    (0, _websockets.WebSocketGateway)({
        cors: {
            origin: [
                'http://localhost:3000',
                'http://localhost:3001'
            ],
            credentials: true
        }
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _jwt.JwtService === "undefined" ? Object : _jwt.JwtService,
        typeof _chatservice.ChatService === "undefined" ? Object : _chatservice.ChatService
    ])
], ChatGateway);

//# sourceMappingURL=chat.gateway.js.map