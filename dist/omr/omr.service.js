"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "OmrService", {
    enumerable: true,
    get: function() {
        return OmrService;
    }
});
const _common = require("@nestjs/common");
const _prismaservice = require("../prisma/prisma.service");
const _s3service = require("../content/s3.service");
const _omrcv = require("./omr.cv");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let OmrService = class OmrService {
    async createTemplate(teacherId, file, name, totalQuestions, description) {
        console.log(`[OMR Service] Creating template: "${name}" for teacher ${teacherId}`);
        // 1. Upload Mother OMR to S3
        const uploadResult = await this.s3Service.uploadFile(file);
        // 2. Analyze Mother OMR image dynamically with local OpenCV
        const answers = await (0, _omrcv.analyzeOmrImageLocal)(file.buffer, totalQuestions);
        // 3. Save to DB
        return this.prisma.omrTemplate.create({
            data: {
                name,
                description,
                motherOmrUrl: uploadResult.webViewLink,
                answers: answers,
                totalQuestions,
                teacherId
            }
        });
    }
    async deleteTemplate(id, teacherId) {
        const template = await this.prisma.omrTemplate.findUnique({
            where: {
                id
            }
        });
        if (!template) throw new _common.NotFoundException('Template not found');
        if (template.teacherId !== teacherId) throw new _common.NotFoundException('Not authorized');
        await this.prisma.omrTemplate.delete({
            where: {
                id
            }
        });
        return {
            success: true
        };
    }
    async getTemplates(teacherId) {
        return this.prisma.omrTemplate.findMany({
            where: {
                teacherId
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }
    async scanOmrs(templateId, files) {
        const template = await this.prisma.omrTemplate.findUnique({
            where: {
                id: templateId
            }
        });
        if (!template) {
            throw new _common.NotFoundException('Template not found');
        }
        const correctAnswers = template.answers;
        const totalQuestions = template.totalQuestions;
        const results = [];
        for (const file of files){
            // 1. Upload student OMR to S3
            const uploadResult = await this.s3Service.uploadFile(file);
            // 2. Detect student's answers using local OpenCV
            const studentAnswers = await (0, _omrcv.analyzeOmrImageLocal)(file.buffer, totalQuestions);
            // 3. Compare against answer key and score
            let score = 0;
            studentAnswers.forEach((sa)=>{
                const ca = correctAnswers.find((ca)=>ca.number === sa.number);
                if (!ca) return;
                const correctOptions = ca.answer.split(',').filter(Boolean);
                const studentOptions = sa.answer.split(',').filter(Boolean);
                if (studentOptions.length === 0 || sa.answer === '-') {
                    // Unanswered: 0 marks
                    return;
                }
                const isExactMatch = correctOptions.length === studentOptions.length && correctOptions.every((opt)=>studentOptions.includes(opt));
                if (isExactMatch) {
                    // Full +4 Match
                    score += 4;
                } else {
                    // Check for partial vs absolute wrong
                    const hasWrongOption = studentOptions.some((opt)=>!correctOptions.includes(opt));
                    if (hasWrongOption) {
                        // Any incorrect bubble marked means entirely wrong
                        score -= 1;
                    } else {
                        // They marked correct bubbles, but didn't mark all of them
                        // E.g. marked 1 out of 2 correct answers
                        score += 2; // Half marks according to partial marking rules
                    }
                }
            });
            // 4. Save result to DB
            const result = await this.prisma.omrResult.create({
                data: {
                    templateId,
                    omrImageUrl: uploadResult.webViewLink,
                    score,
                    total: totalQuestions * 4,
                    answers: studentAnswers,
                    studentName: file.originalname.split('.')[0]
                }
            });
            results.push(result);
        }
        return results;
    }
    async getResults(templateId) {
        return this.prisma.omrResult.findMany({
            where: {
                templateId
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }
    async getFileStream(key) {
        return this.s3Service.getFileStream(key);
    }
    async getFileMetadata(key) {
        return this.s3Service.getFileMetadata(key);
    }
    constructor(prisma, s3Service){
        this.prisma = prisma;
        this.s3Service = s3Service;
    }
};
OmrService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _prismaservice.PrismaService === "undefined" ? Object : _prismaservice.PrismaService,
        typeof _s3service.S3Service === "undefined" ? Object : _s3service.S3Service
    ])
], OmrService);

//# sourceMappingURL=omr.service.js.map