"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ChatModule", {
    enumerable: true,
    get: function() {
        return ChatModule;
    }
});
const _common = require("@nestjs/common");
const _chatgateway = require("./chat.gateway");
const _chatservice = require("./chat.service");
const _jwt = require("@nestjs/jwt");
const _prismamodule = require("../prisma/prisma.module");
const _notificationsmodule = require("../notifications/notifications.module");
const _chatcontroller = require("./chat.controller");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ChatModule = class ChatModule {
};
ChatModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _prismamodule.PrismaModule,
            _notificationsmodule.NotificationsModule,
            _jwt.JwtModule.register({
                secret: process.env.JWT_SECRET || 'secretKey',
                signOptions: {
                    expiresIn: '7d'
                }
            })
        ],
        controllers: [
            _chatcontroller.ChatController
        ],
        providers: [
            _chatgateway.ChatGateway,
            _chatservice.ChatService
        ],
        exports: [
            _chatservice.ChatService
        ]
    })
], ChatModule);

//# sourceMappingURL=chat.module.js.map