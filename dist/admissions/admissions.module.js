"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AdmissionsModule", {
    enumerable: true,
    get: function() {
        return AdmissionsModule;
    }
});
const _common = require("@nestjs/common");
const _admissionsservice = require("./admissions.service");
const _admissionscontroller = require("./admissions.controller");
const _contentmodule = require("../content/content.module");
const _prismamodule = require("../prisma/prisma.module");
const _notificationsmodule = require("../notifications/notifications.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AdmissionsModule = class AdmissionsModule {
};
AdmissionsModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _contentmodule.ContentModule,
            _prismamodule.PrismaModule,
            _notificationsmodule.NotificationsModule
        ],
        providers: [
            _admissionsservice.AdmissionsService
        ],
        controllers: [
            _admissionscontroller.AdmissionsController
        ],
        exports: [
            _admissionsservice.AdmissionsService
        ]
    })
], AdmissionsModule);

//# sourceMappingURL=admissions.module.js.map