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
const _sharp = /*#__PURE__*/ _interop_require_default(require("sharp"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
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
let OmrService = class OmrService {
    async createTemplate(teacherId, file, name, description) {
        // 1. Upload Mother OMR to S3
        const uploadResult = await this.s3Service.uploadFile(file);
        // 2. Identify answers from Mother OMR (Computer Vision)
        const answers = await this.detectAnswers(file.buffer);
        // 3. Save to DB
        return this.prisma.omrTemplate.create({
            data: {
                name,
                description,
                motherOmrUrl: uploadResult.webViewLink,
                answers: answers,
                teacherId
            }
        });
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
        const results = [];
        for (const file of files){
            // 1. Upload student OMR to S3
            const uploadResult = await this.s3Service.uploadFile(file);
            // 2. Analyze against template
            const analysis = this.analyzeOmr(file.buffer, template.answers);
            // 3. Save result to DB
            const result = await this.prisma.omrResult.create({
                data: {
                    templateId,
                    omrImageUrl: uploadResult.webViewLink,
                    score: analysis.score,
                    total: analysis.total,
                    answers: analysis.studentAnswers,
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
    /**
   * Stub for answer detection. 
   * In a real system, this would use computer vision to find marked bubbles.
   * For this implementation, we will use a simplified grid detection.
   */ async detectAnswers(buffer) {
        const image = (0, _sharp.default)(buffer);
        const metadata = await image.metadata();
        // We expect a grid of bubbles. 
        // Let's assume a standard 20-question, 4-option OMR for now.
        // Ideally, we'd detect circles here.
        // Placeholder logic for detecting marked options:
        // We'll return a mock set of correct answers for now, 
        // but the final version should actually process the image.
        const questions = [];
        for(let i = 1; i <= 20; i++){
            questions.push({
                number: i,
                answer: String.fromCharCode(65 + Math.floor(Math.random() * 4))
            });
        }
        return questions;
    }
    /**
   * Stub for OMR analysis.
   */ analyzeOmr(buffer, correctAnswers) {
        let score = 0;
        const studentAnswers = [];
        for (const q of correctAnswers){
            const studentChoice = String.fromCharCode(65 + Math.floor(Math.random() * 4));
            if (studentChoice === q.answer) {
                score++;
            }
            studentAnswers.push({
                number: q.number,
                answer: studentChoice
            });
        }
        return {
            score,
            total: correctAnswers.length,
            studentAnswers
        };
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