"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PracticeTestsModule", {
    enumerable: true,
    get: function() {
        return PracticeTestsModule;
    }
});
const _common = require("@nestjs/common");
const _practicetestscontroller = require("./practice-tests.controller");
const _practicetestsservice = require("./practice-tests.service");
const _prismamodule = require("../prisma/prisma.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let PracticeTestsModule = class PracticeTestsModule {
};
PracticeTestsModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _prismamodule.PrismaModule
        ],
        controllers: [
            _practicetestscontroller.PracticeTestsController
        ],
        providers: [
            _practicetestsservice.PracticeTestsService
        ],
        exports: [
            _practicetestsservice.PracticeTestsService
        ]
    })
], PracticeTestsModule);

//# sourceMappingURL=practice-tests.module.js.map