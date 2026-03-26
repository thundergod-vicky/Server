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
const _crypto = /*#__PURE__*/ _interop_require_wildcard(require("crypto"));
const _prismaservice = require("../prisma/prisma.service");
const _notificationsservice = require("../notifications/notifications.service");
const _client = require("@prisma/client");
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
let UsersService = class UsersService {
    async findOne(email) {
        const user = await this.prisma.user.findUnique({
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
                                medal: true,
                                role: true,
                                enrollmentId: true,
                                profileSlug: true
                            }
                        }
                    }
                },
                studentOf: {
                    include: {
                        parent: {
                            select: {
                                id: true,
                                name: true,
                                email: true
                            }
                        }
                    }
                },
                parentRequests: {
                    orderBy: {
                        createdAt: 'desc'
                    }
                },
                admission: true
            }
        });
        if (user) {
            const updateData = {};
            let needsUpdate = false;
            // Fix main user if needed
            if (!user.isManual) {
                if (!user.profileSlug) {
                    updateData.profileSlug = _crypto.randomUUID();
                    needsUpdate = true;
                }
                if (!user.enrollmentId) {
                    updateData.enrollmentId = await this.generateEnrollmentId(user.role);
                    needsUpdate = true;
                }
                if (!user.profileSettings) {
                    updateData.profileSettings = {
                        showMedals: true,
                        showGrades: true,
                        showCourses: true,
                        showTestResults: true
                    };
                    needsUpdate = true;
                }
            }
            // Fix linked students if needed
            if (user.parentOf?.length > 0) {
                for (const link of user.parentOf){
                    if (!link.student.enrollmentId) {
                        const newStudentId = await this.generateEnrollmentId(link.student.role);
                        await this.prisma.user.update({
                            where: {
                                id: link.student.id
                            },
                            data: {
                                enrollmentId: newStudentId
                            }
                        });
                        console.log(`Auto-fixed missing enrollmentId (findOne) for student: ${link.student.email} -> ${newStudentId}`);
                    }
                }
            }
            if (needsUpdate) {
                return this.prisma.user.update({
                    where: {
                        id: user.id
                    },
                    data: updateData,
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
                                        medal: true,
                                        role: true,
                                        enrollmentId: true,
                                        profileSlug: true
                                    }
                                }
                            }
                        },
                        studentOf: {
                            include: {
                                parent: {
                                    select: {
                                        id: true,
                                        name: true,
                                        email: true
                                    }
                                }
                            }
                        },
                        parentRequests: {
                            orderBy: {
                                createdAt: 'desc'
                            }
                        },
                        admission: true
                    }
                });
            }
        }
        return user;
    }
    async findById(id) {
        const user = await this.prisma.user.findUnique({
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
                                medal: true,
                                role: true,
                                enrollmentId: true,
                                profileSlug: true
                            }
                        }
                    }
                },
                parentRequests: {
                    orderBy: {
                        createdAt: 'desc'
                    }
                },
                studentOf: {
                    include: {
                        parent: {
                            select: {
                                id: true,
                                name: true,
                                email: true
                            }
                        }
                    }
                },
                enrollments: {
                    include: {
                        course: {
                            select: {
                                id: true,
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
                                id: true,
                                title: true
                            }
                        }
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                },
                admission: true
            }
        });
        if (user) {
            const updateData = {};
            let needsUpdate = false;
            // Fix main user if needed
            if (!user.isManual) {
                if (!user.profileSlug) {
                    updateData.profileSlug = _crypto.randomUUID();
                    needsUpdate = true;
                }
                if (!user.enrollmentId) {
                    updateData.enrollmentId = await this.generateEnrollmentId(user.role);
                    needsUpdate = true;
                }
            }
            // Fix linked students if needed
            if (user.parentOf?.length > 0) {
                for (const link of user.parentOf){
                    if (!link.student.enrollmentId) {
                        const newStudentId = await this.generateEnrollmentId(link.student.role);
                        await this.prisma.user.update({
                            where: {
                                id: link.student.id
                            },
                            data: {
                                enrollmentId: newStudentId
                            }
                        });
                        console.log(`Auto-fixed missing enrollmentId for student: ${link.student.email} -> ${newStudentId}`);
                    }
                }
            }
            if (needsUpdate) {
                return this.prisma.user.update({
                    where: {
                        id: user.id
                    },
                    data: updateData,
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
                                        medal: true,
                                        role: true,
                                        enrollmentId: true,
                                        profileSlug: true
                                    }
                                }
                            }
                        },
                        studentOf: {
                            include: {
                                parent: {
                                    select: {
                                        id: true,
                                        name: true,
                                        email: true
                                    }
                                }
                            }
                        },
                        parentRequests: {
                            orderBy: {
                                createdAt: 'desc'
                            }
                        },
                        enrollments: {
                            include: {
                                course: {
                                    select: {
                                        id: true,
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
                                        id: true,
                                        title: true
                                    }
                                }
                            },
                            orderBy: {
                                createdAt: 'desc'
                            }
                        },
                        admission: true
                    }
                });
            }
        }
        return user;
    }
    async findAllStudents() {
        return await this.prisma.user.findMany({
            where: {
                role: 'STUDENT',
                isManual: {
                    not: true
                }
            },
            select: {
                id: true,
                name: true,
                email: true,
                medal: true,
                grade: true,
                enrollmentId: true,
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
                assignedByTeacher: {
                    connect: {
                        id: teacherId
                    }
                },
                academicAssignedAt: new Date()
            }
        });
    }
    getRandomAvatar() {
        const styles = [
            'fun-emoji',
            'bottts',
            'pixel-art',
            'adventurer',
            'notionists'
        ];
        const randomStyle = styles[Math.floor(Math.random() * styles.length)];
        const randomSeed = _crypto.randomBytes(8).toString('hex');
        return `https://api.dicebear.com/7.x/${randomStyle}/svg?seed=${randomSeed}`;
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
        const prefix = prefixMap[role] || 'USER';
        const currentYear = new Date().getFullYear().toString().slice(-2);
        // Find the highest serial for this prefix to avoid collision on delete/recreate
        const existing = await this.prisma.user.findMany({
            where: {
                enrollmentId: {
                    startsWith: prefix
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
    async create(data) {
        const profileImage = data.profileImage || this.getRandomAvatar();
        // Skip enrollment ID generation if it's a manual record
        const enrollmentId = data.isManual ? data.enrollmentId || null : data.enrollmentId || await this.generateEnrollmentId(data.role);
        return this.prisma.user.create({
            data: {
                ...data,
                profileImage,
                enrollmentId
            }
        });
    }
    async resetProfileImage(id) {
        const randomAvatar = this.getRandomAvatar();
        return this.prisma.user.update({
            where: {
                id
            },
            data: {
                profileImage: randomAvatar
            }
        });
    }
    async update(id, data) {
        // If enrollmentId is being updated, validate no spaces
        if (data.enrollmentId && typeof data.enrollmentId === 'string') {
            data.enrollmentId = data.enrollmentId.replace(/\s+/g, '');
        }
        return this.prisma.user.update({
            where: {
                id
            },
            data,
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
                                medal: true,
                                enrollmentId: true,
                                profileSlug: true
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
    async findAllTeachers() {
        return this.prisma.user.findMany({
            where: {
                role: 'TEACHER'
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                profileImage: true,
                createdAt: true,
                coursesOwned: {
                    select: {
                        title: true
                    },
                    take: 1
                },
                batchesTaught: {
                    select: {
                        id: true
                    },
                    take: 1
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }
    async findAllParents() {
        return this.prisma.user.findMany({
            where: {
                role: 'PARENT'
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                parentOf: {
                    include: {
                        student: {
                            select: {
                                name: true
                            }
                        }
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