"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EnrollmentModule", {
    enumerable: true,
    get: function() {
        return EnrollmentModule;
    }
});
const _common = require("@nestjs/common");
const _enrollmentcontroller = require("./enrollment.controller");
const _enrollmentservice = require("./enrollment.service");
const _prismamodule = require("../prisma/prisma.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let EnrollmentModule = class EnrollmentModule {
};
EnrollmentModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _prismamodule.PrismaModule
        ],
        controllers: [
            _enrollmentcontroller.EnrollmentController
        ],
        providers: [
            _enrollmentservice.EnrollmentService
        ],
        exports: [
            _enrollmentservice.EnrollmentService
        ]
    })
], EnrollmentModule);

//# sourceMappingURL=enrollment.module.js.map