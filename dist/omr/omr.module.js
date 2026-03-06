"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "OmrModule", {
    enumerable: true,
    get: function() {
        return OmrModule;
    }
});
const _common = require("@nestjs/common");
const _omrservice = require("./omr.service");
const _omrcontroller = require("./omr.controller");
const _prismaservice = require("../prisma/prisma.service");
const _s3service = require("../content/s3.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let OmrModule = class OmrModule {
};
OmrModule = _ts_decorate([
    (0, _common.Module)({
        controllers: [
            _omrcontroller.OmrController
        ],
        providers: [
            _omrservice.OmrService,
            _prismaservice.PrismaService,
            _s3service.S3Service
        ]
    })
], OmrModule);

//# sourceMappingURL=omr.module.js.map