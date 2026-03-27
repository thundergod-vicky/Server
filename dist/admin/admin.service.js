"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AdminService", {
    enumerable: true,
    get: function() {
        return AdminService;
    }
});
const _common = require("@nestjs/common");
const _client = require("@prisma/client");
const _prismaservice = require("../prisma/prisma.service");
const _bcrypt = /*#__PURE__*/ _interop_require_wildcard(require("bcrypt"));
const _crypto = /*#__PURE__*/ _interop_require_wildcard(require("crypto"));
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let AdminService = class AdminService {
    async getGlobalStats() {
        const [totalUsers, totalStudents, totalTeachers, totalCourses, totalRevenue] = await Promise.all([
            this.prisma.user.count(),
            this.prisma.user.count({
                where: {
                    role: 'STUDENT'
                }
            }),
            this.prisma.user.count({
                where: {
                    role: 'TEACHER'
                }
            }),
            this.prisma.course.count(),
            this.prisma.payment.aggregate({
                where: {
                    status: 'SUCCESS'
                },
                _sum: {
                    amount: true
                }
            })
        ]);
        return {
            users: {
                total: totalUsers,
                students: totalStudents,
                teachers: totalTeachers
            },
            courses: {
                total: totalCourses
            },
            revenue: {
                total: totalRevenue._sum.amount || 0
            },
            systemStatus: 'Stable',
            uptime: '99.9%'
        };
    }
    async getAllUsers() {
        return this.prisma.user.findMany({
            include: {
                _count: {
                    select: {
                        enrollments: true,
                        practiceTestResults: true,
                        coursesOwned: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }
    async updateUserRole(userId, role) {
        const enrollmentId = await this.generateEnrollmentId(role);
        return this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                role,
                enrollmentId
            }
        });
    }
    async generateEnrollmentId(role) {
        const prefixMap = {
            [_client.Role.TEACHER]: 'TEAC',
            [_client.Role.STUDENT]: 'STUD',
            [_client.Role.PARENT]: 'PARE',
            [_client.Role.ADMIN]: 'ADMI',
            [_client.Role.ACADEMIC_OPERATIONS]: 'ACAD',
            [_client.Role.ACCOUNTS]: 'ACCT'
        };
        const prefix = prefixMap[role] ?? 'USER';
        const currentYear = new Date().getFullYear().toString().slice(-2);
        const existing = await this.prisma.user.findMany({
            where: {
                enrollmentId: {
                    startsWith: prefix
                },
                id: {
                    not: ''
                }
            },
            select: {
                enrollmentId: true
            }
        });
        let maxSerial = 0;
        for (const u of existing){
            const match = u.enrollmentId?.match(/(\d{4})\//);
            if (match) {
                const num = parseInt(match[1], 10);
                if (num > maxSerial) maxSerial = num;
            }
        }
        const serial = (maxSerial + 1).toString().padStart(4, '0');
        return `${prefix}-${serial}/${currentYear}`;
    }
    async updateUser(userId, data) {
        // Sanitize enrollmentId if present
        if (data.enrollmentId && typeof data.enrollmentId === 'string') {
            data.enrollmentId = data.enrollmentId.replace(/\s+/g, '');
        }
        return this.prisma.user.update({
            where: {
                id: userId
            },
            data
        });
    }
    async getAllCourses() {
        return this.prisma.course.findMany({
            include: {
                teacher: {
                    select: {
                        name: true,
                        email: true
                    }
                },
                _count: {
                    select: {
                        enrollments: true,
                        chapters: true
                    }
                }
            }
        });
    }
    async deleteCourse(courseId) {
        return this.prisma.course.delete({
            where: {
                id: courseId
            }
        });
    }
    async updateCourse(courseId, data) {
        return this.prisma.course.update({
            where: {
                id: courseId
            },
            data
        });
    }
    // Practice Test Management
    async getAllPracticeTests() {
        return this.prisma.practiceTest.findMany({
            include: {
                teacher: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                _count: {
                    select: {
                        results: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }
    async getTestAnalytics(testId) {
        const test = await this.prisma.practiceTest.findUnique({
            where: {
                id: testId
            },
            include: {
                teacher: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                results: {
                    include: {
                        student: {
                            select: {
                                id: true,
                                name: true,
                                email: true
                            }
                        }
                    }
                }
            }
        });
        if (!test) {
            return null;
        }
        // Calculate analytics
        const totalAttempts = test.results.length;
        const completedAttempts = test.results.filter((r)=>r.status === 'COMPLETED').length;
        const cheatedAttempts = test.results.filter((r)=>r.status === 'CHEATED').length;
        const averageScore = totalAttempts > 0 ? test.results.reduce((sum, r)=>sum + r.score, 0) / totalAttempts : 0;
        const averagePercentage = totalAttempts > 0 ? test.results.reduce((sum, r)=>sum + r.score / r.total * 100, 0) / totalAttempts : 0;
        const averageRating = totalAttempts > 0 ? test.results.reduce((sum, r)=>sum + (r.rating || 0), 0) / totalAttempts : 0;
        const passRate = totalAttempts > 0 ? test.results.filter((r)=>r.score / r.total >= 0.6).length / totalAttempts * 100 : 0;
        // Calculate average time taken (only for completed tests)
        const completedResults = test.results.filter((r)=>r.status === 'COMPLETED' && r.timeTaken);
        const averageTimeTaken = completedResults.length > 0 ? completedResults.reduce((sum, r)=>sum + (r.timeTaken || 0), 0) / completedResults.length : 0;
        // Get unique students who attempted
        const uniqueStudents = new Set(test.results.map((r)=>r.studentId)).size;
        return {
            test,
            analytics: {
                totalAttempts,
                uniqueStudents,
                completedAttempts,
                cheatedAttempts,
                averageScore: parseFloat(averageScore.toFixed(2)),
                averagePercentage: parseFloat(averagePercentage.toFixed(2)),
                averageRating: parseFloat(averageRating.toFixed(2)),
                passRate: parseFloat(passRate.toFixed(2)),
                averageTimeTaken: Math.round(averageTimeTaken),
                cheatingRate: totalAttempts > 0 ? parseFloat((cheatedAttempts / totalAttempts * 100).toFixed(2)) : 0
            }
        };
    }
    async getTestResults(testId) {
        return this.prisma.practiceTestResult.findMany({
            where: {
                testId
            },
            include: {
                student: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }
    async getAcademicStats() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const [todayClassesCount, pendingDoubtsCount, activeTeachersCount, upcomingMilestones] = await Promise.all([
            this.prisma.classSession.count({
                where: {
                    date: {
                        gte: today,
                        lt: tomorrow
                    }
                }
            }),
            this.prisma.chatRequest.count({
                where: {
                    status: 'PENDING'
                }
            }),
            this.prisma.user.count({
                where: {
                    role: 'TEACHER'
                }
            }),
            this.prisma.classSession.findMany({
                where: {
                    date: {
                        gte: today
                    }
                },
                take: 3,
                orderBy: {
                    date: 'asc'
                },
                select: {
                    title: true,
                    date: true,
                    type: true
                }
            })
        ]);
        return {
            todayClasses: todayClassesCount,
            pendingDoubts: pendingDoubtsCount,
            activeTeachers: activeTeachersCount,
            avgResolveTime: '14m',
            studentEngagement: '94%',
            systemHealth: 'Optimum',
            milestones: upcomingMilestones.map((m)=>({
                    title: m.title,
                    date: m.date.toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                    }),
                    type: m.type,
                    color: m.type === 'LECTURE' ? 'blue' : 'purple'
                })),
            batchHealth: [
                {
                    name: 'Batch Alpha (Medical)',
                    percentage: 94,
                    color: 'blue'
                },
                {
                    name: 'Batch Beta (Engineering)',
                    percentage: 88,
                    color: 'indigo'
                },
                {
                    name: 'Batch Delta (Foundation)',
                    percentage: 76,
                    color: 'amber'
                }
            ]
        };
    }
    async deletePracticeTest(testId) {
        // First delete all results
        await this.prisma.practiceTestResult.deleteMany({
            where: {
                testId
            }
        });
        // Then delete the test
        return this.prisma.practiceTest.delete({
            where: {
                id: testId
            }
        });
    }
    async deleteUser(userId) {
        // Basic cleanup - for production this should be more robust or use Cascade
        await Promise.all([
            this.prisma.enrollment.deleteMany({
                where: {
                    studentId: userId
                }
            }),
            this.prisma.studentProgress.deleteMany({
                where: {
                    studentId: userId
                }
            }),
            this.prisma.testResult.deleteMany({
                where: {
                    studentId: userId
                }
            }),
            this.prisma.payment.deleteMany({
                where: {
                    studentId: userId
                }
            }),
            this.prisma.parentStudent.deleteMany({
                where: {
                    OR: [
                        {
                            parentId: userId
                        },
                        {
                            studentId: userId
                        }
                    ]
                }
            }),
            this.prisma.practiceTestResult.deleteMany({
                where: {
                    studentId: userId
                }
            }),
            this.prisma.chatMessage.deleteMany({
                where: {
                    OR: [
                        {
                            senderId: userId
                        },
                        {
                            receiverId: userId
                        }
                    ]
                }
            }),
            this.prisma.chatRequest.deleteMany({
                where: {
                    OR: [
                        {
                            senderId: userId
                        },
                        {
                            receiverId: userId
                        }
                    ]
                }
            }),
            this.prisma.courseAssignment.deleteMany({
                where: {
                    studentId: userId
                }
            }),
            this.prisma.parentRequest.deleteMany({
                where: {
                    parentId: userId
                }
            }),
            this.prisma.loginHistory.deleteMany({
                where: {
                    userId
                }
            }),
            this.prisma.notification.deleteMany({
                where: {
                    userId
                }
            }),
            this.prisma.invoice.deleteMany({
                where: {
                    studentId: userId
                }
            })
        ]);
        return this.prisma.user.delete({
            where: {
                id: userId
            }
        });
    }
    async createUser(data) {
        const hashedPassword = await _bcrypt.hash(data.password, 10);
        const enrollmentId = data.enrollmentId || await this.generateEnrollmentId(data.role);
        return this.prisma.user.create({
            data: {
                ...data,
                password: hashedPassword,
                enrollmentId,
                profileSlug: _crypto.randomUUID()
            }
        });
    }
    async getUserFullDetails(userId) {
        return this.prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                admission: true,
                enrollments: {
                    include: {
                        course: true
                    }
                },
                payments: true,
                batchesEnrolled: {
                    include: {
                        _count: {
                            select: {
                                sessions: true
                            }
                        }
                    }
                },
                batchesTaught: true,
                coursesOwned: {
                    include: {
                        _count: {
                            select: {
                                enrollments: true
                            }
                        }
                    }
                },
                parentOf: {
                    include: {
                        student: true
                    }
                },
                studentOf: {
                    include: {
                        parent: true
                    }
                },
                _count: {
                    select: {
                        enrollments: true,
                        practiceTestResults: true,
                        coursesOwned: true
                    }
                }
            }
        });
    }
    constructor(prisma){
        this.prisma = prisma;
    }
};
AdminService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _prismaservice.PrismaService === "undefined" ? Object : _prismaservice.PrismaService
    ])
], AdminService);

//# sourceMappingURL=admin.service.js.map