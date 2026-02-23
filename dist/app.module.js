"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AppModule", {
    enumerable: true,
    get: function() {
        return AppModule;
    }
});
const _common = require("@nestjs/common");
const _appcontroller = require("./app.controller");
const _appservice = require("./app.service");
const _prismamodule = require("./prisma/prisma.module");
const _authmodule = require("./auth/auth.module");
const _usersmodule = require("./users/users.module");
const _contentmodule = require("./content/content.module");
const _coursesmodule = require("./courses/courses.module");
const _practicetestsmodule = require("./practice-tests/practice-tests.module");
const _paymentsmodule = require("./payments/payments.module");
const _chatmodule = require("./chat/chat.module");
const _notificationsmodule = require("./notifications/notifications.module");
const _enrollmentmodule = require("./enrollment/enrollment.module");
const _progressmodule = require("./progress/progress.module");
const _adminmodule = require("./admin/admin.module");
const _batchesmodule = require("./batches/batches.module");
const _publicmodule = require("./public/public.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AppModule = class AppModule {
};
AppModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _prismamodule.PrismaModule,
            _authmodule.AuthModule,
            _usersmodule.UsersModule,
            _contentmodule.ContentModule,
            _coursesmodule.CoursesModule,
            _practicetestsmodule.PracticeTestsModule,
            _paymentsmodule.PaymentsModule,
            _chatmodule.ChatModule,
            _notificationsmodule.NotificationsModule,
            _enrollmentmodule.EnrollmentModule,
            _progressmodule.ProgressModule,
            _adminmodule.AdminModule,
            _batchesmodule.BatchesModule,
            _publicmodule.PublicModule
        ],
        controllers: [
            _appcontroller.AppController
        ],
        providers: [
            _appservice.AppService
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map