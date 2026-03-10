"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PaymentsService", {
    enumerable: true,
    get: function() {
        return PaymentsService;
    }
});
const _common = require("@nestjs/common");
const _prismaservice = require("../prisma/prisma.service");
const _usersservice = require("../users/users.service");
const _bcrypt = /*#__PURE__*/ _interop_require_wildcard(require("bcrypt"));
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
let PaymentsService = class PaymentsService {
    /** All payments with student info — for ACCOUNTS dashboard */ async findAll(studentId) {
        return this.prisma.payment.findMany({
            where: studentId ? {
                studentId
            } : undefined,
            include: {
                student: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                        enrollmentId: true,
                        batchesEnrolled: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }
    /** Create a payment record manually (by ACCOUNTS role) */ async create(data) {
        let targetStudentId = data.studentId;
        // If no studentId provided, we create a new Student record (User)
        if (!targetStudentId && data.manualName) {
            const hashedPassword = await _bcrypt.hash('adhyayan123', 10);
            const manualPhoneSerial = data.manualPhone || `MAN-${Date.now()}`;
            const newStudent = await this.usersService.create({
                name: data.manualName,
                phone: data.manualPhone,
                email: `${manualPhoneSerial}@manual.adhyayan.com`,
                password: hashedPassword,
                role: 'STUDENT',
                isManual: true
            });
            targetStudentId = newStudent.id;
        }
        if (!targetStudentId) {
            throw new Error('Cannot record payment: No student selected and no manual entry data provided.');
        }
        return this.prisma.payment.create({
            data: {
                studentId: targetStudentId,
                amount: data.amount,
                status: data.status,
                mode: data.mode,
                description: data.description || data.manualNote,
                txRef: data.txRef || `MANUAL-${Date.now()}`
            },
            include: {
                student: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        enrollmentId: true
                    }
                }
            }
        });
    }
    /** Find all payments for a specific student */ async findByStudent(studentId) {
        return this.prisma.payment.findMany({
            where: {
                studentId
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }
    /** Update payment status */ async update(id, status) {
        return this.prisma.payment.update({
            where: {
                id
            },
            data: {
                status
            }
        });
    }
    /** Delete a payment record */ async remove(id) {
        return this.prisma.payment.delete({
            where: {
                id
            }
        });
    }
    /** Summary stats per student (for StudentDetails table) */ async getStudentSummaries() {
        const students = await this.prisma.user.findMany({
            where: {
                role: 'STUDENT'
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                enrollmentId: true,
                financialStatus: true,
                batchesEnrolled: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                payments: true
            },
            orderBy: {
                name: 'asc'
            }
        });
        return students.map((s)=>{
            const totalPaid = s.payments.filter((p)=>p.status === 'SUCCESS').reduce((sum, p)=>sum + p.amount, 0);
            const totalFee = s.payments.reduce((sum, p)=>sum + p.amount, 0);
            const due = totalFee - totalPaid;
            // Use manual status if set and valid, else calculate
            let status = s.financialStatus || 'NONE';
            if (!s.financialStatus || s.financialStatus === 'NONE') {
                const hasPayments = s.payments.length > 0;
                status = !hasPayments ? 'NONE' : due <= 0 ? 'PAID' : totalPaid > 0 ? 'PARTIAL' : 'OVERDUE';
            }
            return {
                id: s.id,
                name: s.name,
                email: s.email,
                phone: s.phone,
                enrollmentId: s.enrollmentId,
                batches: s.batchesEnrolled,
                totalFee,
                totalPaid,
                due,
                status,
                manualStatus: s.financialStatus,
                payments: s.payments
            };
        });
    }
    /** Update a student's manual financial status */ async updateStudentStatus(studentId, status) {
        return this.prisma.user.update({
            where: {
                id: studentId
            },
            data: {
                financialStatus: status
            }
        });
    }
    constructor(prisma, usersService){
        this.prisma = prisma;
        this.usersService = usersService;
    }
};
PaymentsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _prismaservice.PrismaService === "undefined" ? Object : _prismaservice.PrismaService,
        typeof _usersservice.UsersService === "undefined" ? Object : _usersservice.UsersService
    ])
], PaymentsService);

//# sourceMappingURL=payments.service.js.map