"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PublicController", {
    enumerable: true,
    get: function() {
        return PublicController;
    }
});
const _common = require("@nestjs/common");
const _swagger = require("@nestjs/swagger");
const _prismaservice = require("../prisma/prisma.service");
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
let PublicController = class PublicController {
    async getPublicProfile(slug) {
        const student = await this.prisma.user.findUnique({
            where: {
                profileSlug: slug
            },
            select: {
                id: true,
                name: true,
                medal: true,
                grade: true,
                academicAssignedAt: true,
                profileSettings: true,
                assignedByTeacher: {
                    select: {
                        name: true
                    }
                },
                enrollments: {
                    include: {
                        course: {
                            select: {
                                title: true,
                                thumbnail: true
                            }
                        }
                    }
                },
                practiceTestResults: {
                    include: {
                        test: {
                            select: {
                                title: true
                            }
                        }
                    },
                    orderBy: {
                        createdAt: 'desc'
                    },
                    take: 10
                }
            }
        });
        if (!student) {
            throw new _common.NotFoundException('Profile not found');
        }
        const settings = student.profileSettings || {
            showMedals: true,
            showGrades: true,
            showCourses: true,
            showTestResults: true
        };
        const enrollments = settings.showCourses ? student.enrollments.filter((e)=>!settings.hiddenCourseIds?.includes(e.courseId)) : [];
        const practiceTestResults = settings.showTestResults ? student.practiceTestResults.filter((r)=>!settings.hiddenTestResultIds?.includes(r.id)) : [];
        return {
            id: student.id,
            name: student.name,
            profileSettings: student.profileSettings,
            medal: settings.showMedals ? student.medal : null,
            grade: settings.showGrades ? student.grade : null,
            academicAssignedAt: settings.showMedals || settings.showGrades ? student.academicAssignedAt : null,
            assignedByTeacher: settings.showMedals || settings.showGrades ? student.assignedByTeacher : null,
            enrollments,
            practiceTestResults
        };
    }
    constructor(prisma){
        this.prisma = prisma;
    }
};
_ts_decorate([
    (0, _common.Get)('profile/:slug'),
    (0, _swagger.ApiOperation)({
        summary: 'Get student public profile by slug'
    }),
    _ts_param(0, (0, _common.Param)('slug')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], PublicController.prototype, "getPublicProfile", null);
PublicController = _ts_decorate([
    (0, _swagger.ApiTags)('Public'),
    (0, _common.Controller)('public'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _prismaservice.PrismaService === "undefined" ? Object : _prismaservice.PrismaService
    ])
], PublicController);

//# sourceMappingURL=public.controller.js.map