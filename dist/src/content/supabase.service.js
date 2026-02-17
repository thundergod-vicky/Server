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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const stream_1 = require("stream");
let SupabaseService = class SupabaseService {
    supabase;
    bucket = 'course-content';
    constructor() {
        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        if (!supabaseUrl || !supabaseKey) {
            throw new Error('Supabase credentials missing');
        }
        this.supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
    }
    async uploadFile(file) {
        const timestamp = Date.now();
        const path = `uploads/${timestamp}-${file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        const { data, error } = await this.supabase.storage
            .from(this.bucket)
            .upload(path, file.buffer, {
            contentType: file.mimetype,
            upsert: false,
        });
        if (error) {
            if (error.message.includes('Bucket not found')) {
                await this.createBucket();
                return this.uploadFile(file);
            }
            throw new common_1.InternalServerErrorException(`Upload failed: ${error.message}`);
        }
        return {
            id: data.path,
            name: file.originalname,
            mimeType: file.mimetype,
            webViewLink: null,
        };
    }
    async getFileStream(fileId) {
        const { data, error } = await this.supabase.storage
            .from(this.bucket)
            .download(fileId);
        if (error) {
            console.error('Supabase download error:', {
                fileId,
                error: error,
                message: error.message,
                statusCode: error.statusCode,
            });
            throw new common_1.InternalServerErrorException(`Download failed: ${error.message || JSON.stringify(error)}`);
        }
        const buffer = Buffer.from(await data.arrayBuffer());
        const stream = new stream_1.Readable();
        stream.push(buffer);
        stream.push(null);
        return stream;
    }
    async getFileMetadata(fileId) {
        const folder = fileId.split('/').slice(0, -1).join('/');
        const fileName = fileId.split('/').pop();
        const { data, error } = await this.supabase.storage
            .from(this.bucket)
            .list(folder, {
            search: fileName,
            limit: 1,
        });
        if (error || !data || data.length === 0) {
            return {
                name: fileName,
                mimeType: 'application/octet-stream',
            };
        }
        return {
            name: data[0].name,
            mimeType: data[0].metadata?.mimetype || 'application/octet-stream',
        };
    }
    async createSignedUrl(fileId, expiresInSeconds = 60) {
        const { data, error } = await this.supabase.storage
            .from(this.bucket)
            .createSignedUrl(fileId, expiresInSeconds);
        if (error) {
            throw new common_1.InternalServerErrorException(`Failed to create signed URL: ${error.message}`);
        }
        return { signedUrl: data.signedUrl };
    }
    async createBucket() {
        const { data, error } = await this.supabase.storage.createBucket(this.bucket, {
            public: false,
        });
        if (error) {
            console.error('Failed to create bucket:', error);
        }
    }
};
exports.SupabaseService = SupabaseService;
exports.SupabaseService = SupabaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SupabaseService);
//# sourceMappingURL=supabase.service.js.map