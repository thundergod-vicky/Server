"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AdmissionsService", {
    enumerable: true,
    get: function() {
        return AdmissionsService;
    }
});
const _common = require("@nestjs/common");
const _prismaservice = require("../prisma/prisma.service");
const _s3service = require("../content/s3.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let AdmissionsService = class AdmissionsService {
    async getNextNumbers() {
        const count = await this.prisma.admission.count();
        const nextId = count + 1;
        const formNumber = `ADH-${String(nextId).padStart(2, '0')}`;
        const enrollmentNumber = String(nextId).padStart(3, '0');
        return {
            formNumber,
            enrollmentNumber
        };
    }
    async submitAdmission(userId, data, photo) {
        let photoUrl = null;
        if (photo) {
            const uploadResult = await this.s3Service.uploadFile(photo);
            photoUrl = uploadResult.webViewLink;
        }
        const { formNumber, enrollmentNumber } = await this.getNextNumbers();
        return this.prisma.admission.create({
            data: {
                studentId: userId,
                studentName: data.studentName,
                fatherName: data.fatherName,
                motherName: data.motherName,
                email: data.email,
                address: data.address,
                dateOfBirth: new Date(data.dateOfBirth),
                contactNumber: data.contactNumber,
                alternateContact: data.alternateContact,
                studentClass: data.studentClass,
                stream: data.stream.toUpperCase(),
                course: data.course,
                batchCode: data.batchCode,
                schoolName: data.schoolName,
                board: data.board,
                caste: data.caste,
                photoUrl: photoUrl,
                formNumber: formNumber,
                enrollmentNumber: data.enrollmentNumber || enrollmentNumber,
                status: 'PENDING',
                admissionDate: new Date()
            }
        });
    }
    async getMyAdmission(userId) {
        return this.prisma.admission.findUnique({
            where: {
                studentId: userId
            }
        });
    }
    async getAllAdmissions() {
        return this.prisma.admission.findMany({
            include: {
                student: true
            }
        });
    }
    async approveAdmission(id, approvedBy) {
        return this.prisma.admission.update({
            where: {
                id
            },
            data: {
                status: 'APPROVED',
                approvedById: approvedBy,
                approvedAt: new Date()
            }
        });
    }
    constructor(prisma, s3Service){
        this.prisma = prisma;
        this.s3Service = s3Service;
    }
};
AdmissionsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _prismaservice.PrismaService === "undefined" ? Object : _prismaservice.PrismaService,
        typeof _s3service.S3Service === "undefined" ? Object : _s3service.S3Service
    ])
], AdmissionsService);

//# sourceMappingURL=admissions.service.js.map