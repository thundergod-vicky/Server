"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SupabaseService", {
    enumerable: true,
    get: function() {
        return SupabaseService;
    }
});
const _common = require("@nestjs/common");
const _supabasejs = require("@supabase/supabase-js");
const _stream = require("stream");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let SupabaseService = class SupabaseService {
    async uploadFile(file) {
        const timestamp = Date.now();
        const path = `uploads/${timestamp}-${file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        const { data, error } = await this.supabase.storage.from(this.bucket).upload(path, file.buffer, {
            contentType: file.mimetype,
            upsert: false
        });
        if (error) {
            // Check if bucket exists, if not try to create (Service role can)
            if (error.message.includes('Bucket not found')) {
                await this.createBucket();
                // Retry
                return this.uploadFile(file);
            }
            throw new _common.InternalServerErrorException(`Upload failed: ${error.message}`);
        }
        return {
            id: data.path,
            name: file.originalname,
            mimeType: file.mimetype,
            webViewLink: null
        };
    }
    async getFileStream(fileId) {
        const { data, error } = await this.supabase.storage.from(this.bucket).download(fileId);
        if (error) {
            console.error('Supabase download error:', {
                fileId,
                error: error,
                message: error.message,
                statusCode: error.statusCode
            });
            throw new _common.InternalServerErrorException(`Download failed: ${error.message || JSON.stringify(error)}`);
        }
        // Convert Blob/ArrayBuffer to Readable Stream
        const buffer = Buffer.from(await data.arrayBuffer());
        const stream = new _stream.Readable();
        stream.push(buffer);
        stream.push(null);
        return stream;
    }
    async getFileMetadata(fileId) {
        // fileId is 'uploads/timestamp-name.ext'
        // We can get public URL or just parse path
        // To get mimeType, we can list the folder
        const folder = fileId.split('/').slice(0, -1).join('/');
        const fileName = fileId.split('/').pop();
        const { data, error } = await this.supabase.storage.from(this.bucket).list(folder, {
            search: fileName,
            limit: 1
        });
        if (error || !data || data.length === 0) {
            return {
                name: fileName,
                mimeType: 'application/octet-stream'
            };
        }
        return {
            name: data[0].name,
            mimeType: data[0].metadata?.mimetype || 'application/octet-stream'
        };
    }
    async createSignedUrl(fileId, expiresInSeconds = 60) {
        const { data, error } = await this.supabase.storage.from(this.bucket).createSignedUrl(fileId, expiresInSeconds);
        if (error) {
            throw new _common.InternalServerErrorException(`Failed to create signed URL: ${error.message}`);
        }
        return {
            signedUrl: data.signedUrl
        };
    }
    async createBucket() {
        const { data, error } = await this.supabase.storage.createBucket(this.bucket, {
            public: false
        });
        if (error) {
            console.error('Failed to create bucket:', error);
        }
    }
    constructor(){
        this.bucket = 'course-content';
        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        if (!supabaseUrl || !supabaseKey) {
            throw new Error('Supabase credentials missing');
        }
        this.supabase = (0, _supabasejs.createClient)(supabaseUrl, supabaseKey);
    }
};
SupabaseService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [])
], SupabaseService);

//# sourceMappingURL=supabase.service.js.map