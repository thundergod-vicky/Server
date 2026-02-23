"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UsersService", {
    enumerable: true,
    get: function() {
        return UsersService;
    }
});
const _common = require("@nestjs/common");
const _prismaservice = require("../prisma/prisma.service");
const _notificationsservice = require("../notifications/notifications.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let UsersService = class UsersService {
    async findOne(email) {
        return this.prisma.user.findUnique({
            where: {
                email
            },
            include: {
                assignedByTeacher: {
                    select: {
                        name: true
                    }
                },
                parentOf: {
                    include: {
                        student: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                grade: true,
                                medal: true
                            }
                        }
                    }
                }
            }
        });
    }
    async findById(id) {
        return this.prisma.user.findUnique({
            where: {
                id
            },
            include: {
                assignedByTeacher: {
                    select: {
                        name: true
                    }
                },
                parentOf: {
                    include: {
                        student: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                grade: true,
                                medal: true
                            }
                        }
                    }
                },
                parentRequests: {
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
        });
    }
    async findAllStudents() {
        return await this.prisma.user.findMany({
            where: {
                role: 'STUDENT'
            },
            select: {
                id: true,
                name: true,
                email: true,
                medal: true,
                grade: true,
                academicAssignedAt: true,
                assignedByTeacher: {
                    select: {
                        name: true
                    }
                },
                _count: {
                    select: {
                        enrollments: true,
                        practiceTestResults: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }
    async updateAcademicStatus(studentId, teacherId, data) {
        return await this.prisma.user.update({
            where: {
                id: studentId
            },
            data: {
                medal: data.medal,
                grade: data.grade,
                assignedByTeacherId: teacherId,
                academicAssignedAt: new Date()
            }
        });
    }
    async create(data) {
        return this.prisma.user.create({
            data
        });
    }
    async update(id, data) {
        return this.prisma.user.update({
            where: {
                id
            },
            data
        });
    }
    // Parent Portal Methods
    async createParentRequest(parentId, studentEmail) {
        // Check if already linked
        const student = await this.prisma.user.findUnique({
            where: {
                email: studentEmail
            }
        });
        if (student) {
            const existingLink = await this.prisma.parentStudent.findUnique({
                where: {
                    parentId_studentId: {
                        parentId,
                        studentId: student.id
                    }
                }
            });
            if (existingLink) throw new Error('Student is already linked to your account');
        }
        // Check for pending request
        const existingRequest = await this.prisma.parentRequest.findFirst({
            where: {
                parentId,
                studentEmail,
                status: 'PENDING'
            }
        });
        if (existingRequest) {
            throw new Error('A pending request already exists for this student');
        }
        return this.prisma.parentRequest.create({
            data: {
                parentId,
                studentEmail,
                status: 'PENDING'
            }
        });
    }
    async getPendingRequests() {
        return this.prisma.parentRequest.findMany({
            where: {
                status: 'PENDING'
            },
            include: {
                parent: {
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
    async approveRequest(requestId) {
        const request = await this.prisma.parentRequest.findUnique({
            where: {
                id: requestId
            },
            include: {
                parent: true
            }
        });
        if (!request) throw new Error('Request not found');
        // Find student by email
        const student = await this.prisma.user.findUnique({
            where: {
                email: request.studentEmail
            }
        });
        if (!student) throw new Error('Student not found');
        // Create link
        await this.prisma.parentStudent.create({
            data: {
                parentId: request.parentId,
                studentId: student.id
            }
        });
        // Update request
        await this.prisma.parentRequest.update({
            where: {
                id: requestId
            },
            data: {
                status: 'APPROVED'
            }
        });
        // Notify Student
        await this.notificationsService.create(student.id, 'Parent Linked', `${request.parent.name} has been linked as your parent. If this is incorrect, please report to admin.`, 'ALERT');
        return {
            success: true
        };
    }
    async rejectRequest(requestId) {
        return this.prisma.parentRequest.update({
            where: {
                id: requestId
            },
            data: {
                status: 'REJECTED'
            }
        });
    }
    async manualLinkParentStudent(parentId, studentEmail) {
        const student = await this.prisma.user.findUnique({
            where: {
                email: studentEmail
            }
        });
        const parent = await this.prisma.user.findUnique({
            where: {
                id: parentId
            }
        });
        if (!student || !parent) throw new Error('User not found');
        // Create link
        await this.prisma.parentStudent.create({
            data: {
                parentId,
                studentId: student.id
            }
        });
        // Notify Student
        await this.notificationsService.create(student.id, 'Parent Linked', `${parent.name} has been linked as your parent by Admin. If this is incorrect, please report.`, 'ALERT');
        // Notify Parent
        await this.notificationsService.create(parent.id, 'Student Linked', `You have been linked to student ${student.name} by Admin.`, 'INFO');
        return {
            success: true
        };
    }
    async getStudentData(parentId, studentId) {
        // Verify parent-student link
        const link = await this.prisma.parentStudent.findUnique({
            where: {
                parentId_studentId: {
                    parentId,
                    studentId
                }
            }
        });
        if (!link) {
            throw new Error('Not authorized to view this student data');
        }
        return this.prisma.user.findUnique({
            where: {
                id: studentId
            },
            include: {
                enrollments: {
                    include: {
                        course: true
                    }
                },
                assignedCourses: {
                    include: {
                        course: true
                    }
                },
                practiceTestResults: {
                    include: {
                        test: true
                    },
                    take: 20,
                    orderBy: {
                        createdAt: 'desc'
                    }
                },
                loginHistory: {
                    take: 10,
                    orderBy: {
                        loginTime: 'desc'
                    }
                },
                assignedByTeacher: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        });
    }
    constructor(prisma, notificationsService){
        this.prisma = prisma;
        this.notificationsService = notificationsService;
    }
};
UsersService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _prismaservice.PrismaService === "undefined" ? Object : _prismaservice.PrismaService,
        typeof _notificationsservice.NotificationsService === "undefined" ? Object : _notificationsservice.NotificationsService
    ])
], UsersService);

//# sourceMappingURL=users.service.js.map