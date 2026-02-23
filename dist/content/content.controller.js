"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ContentController", {
    enumerable: true,
    get: function() {
        return ContentController;
    }
});
const _common = require("@nestjs/common");
const _platformexpress = require("@nestjs/platform-express");
const _supabaseservice = require("./supabase.service");
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
let ContentController = class ContentController {
    async uploadFile(file) {
        const result = await this.supabaseService.uploadFile(file);
        return {
            ...result,
            url: `/content/stream/${result.id}`
        };
    }
    async streamFile(req, res) {
        // Extract the file path from the URL after 'stream/'
        const fullPath = req.url; // e.g., '/content/stream/uploads/timestamp-filename.pdf'
        const fileId = fullPath.replace('/content/stream/', '');
        const decodedFileId = decodeURIComponent(fileId);
        console.log('Streaming file:', decodedFileId);
        try {
            // Get file metadata to set proper content type
            const metadata = await this.supabaseService.getFileMetadata(decodedFileId);
            // Get file stream from Supabase
            const stream = await this.supabaseService.getFileStream(decodedFileId);
            // Set headers for proper PDF/video display
            res.setHeader('Content-Type', metadata.mimeType || 'application/octet-stream');
            res.setHeader('Accept-Ranges', 'bytes');
            res.setHeader('Cache-Control', 'no-cache');
            // Stream the file
            stream.pipe(res);
        } catch (error) {
            console.error('Streaming error:', error);
            res.status(500).send('Failed to stream file');
        }
    }
    constructor(supabaseService){
        this.supabaseService = supabaseService;
    }
};
_ts_decorate([
    (0, _common.Post)('upload'),
    (0, _common.UseInterceptors)((0, _platformexpress.FileInterceptor)('file')),
    _ts_param(0, (0, _common.UploadedFile)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof Express === "undefined" || typeof Express.Multer === "undefined" || typeof Express.Multer.File === "undefined" ? Object : Express.Multer.File
    ]),
    _ts_metadata("design:returntype", Promise)
], ContentController.prototype, "uploadFile", null);
_ts_decorate([
    (0, _common.Get)('stream/*'),
    _ts_param(0, (0, _common.Req)()),
    _ts_param(1, (0, _common.Res)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object,
        typeof Response === "undefined" ? Object : Response
    ]),
    _ts_metadata("design:returntype", Promise)
], ContentController.prototype, "streamFile", null);
ContentController = _ts_decorate([
    (0, _common.Controller)('content'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _supabaseservice.SupabaseService === "undefined" ? Object : _supabaseservice.SupabaseService
    ])
], ContentController);

//# sourceMappingURL=content.controller.js.map