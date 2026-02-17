"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const supabase_service_1 = require("./supabase.service");
let ContentController = class ContentController {
    supabaseService;
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
    }
    async uploadFile(file) {
        return this.supabaseService.uploadFile(file);
    }
    async streamFile(req, res) {
        const fullPath = req.url;
        const fileId = fullPath.replace('/content/stream/', '');
        const decodedFileId = decodeURIComponent(fileId);
        console.log('Streaming file:', decodedFileId);
        try {
            const metadata = await this.supabaseService.getFileMetadata(decodedFileId);
            const stream = await this.supabaseService.getFileStream(decodedFileId);
            res.setHeader('Content-Type', metadata.mimeType || 'application/octet-stream');
            res.setHeader('Accept-Ranges', 'bytes');
            res.setHeader('Cache-Control', 'no-cache');
            stream.pipe(res);
        }
        catch (error) {
            console.error('Streaming error:', error);
            res.status(500).send('Failed to stream file');
        }
    }
};
exports.ContentController = ContentController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)('stream/*'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "streamFile", null);
exports.ContentController = ContentController = __decorate([
    (0, common_1.Controller)('content'),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], ContentController);
//# sourceMappingURL=content.controller.js.map