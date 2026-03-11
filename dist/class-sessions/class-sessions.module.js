"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ClassSessionsModule", {
    enumerable: true,
    get: function() {
        return ClassSessionsModule;
    }
});
const _common = require("@nestjs/common");
const _classsessionscontroller = require("./class-sessions.controller");
const _classsessionsservice = require("./class-sessions.service");
const _prismamodule = require("../prisma/prisma.module");
const _notificationsmodule = require("../notifications/notifications.module");
const _zoommodule = require("../zoom/zoom.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ClassSessionsModule = class ClassSessionsModule {
};
ClassSessionsModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _prismamodule.PrismaModule,
            _notificationsmodule.NotificationsModule,
            _zoommodule.ZoomModule
        ],
        controllers: [
            _classsessionscontroller.ClassSessionsController
        ],
        providers: [
            _classsessionsservice.ClassSessionsService
        ],
        exports: [
            _classsessionsservice.ClassSessionsService
        ]
    })
], ClassSessionsModule);

//# sourceMappingURL=class-sessions.module.js.map