"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "S3Service", {
    enumerable: true,
    get: function() {
        return S3Service;
    }
});
const _common = require("@nestjs/common");
const _clients3 = require("@aws-sdk/client-s3");
const _libstorage = require("@aws-sdk/lib-storage");
const _nodehttphandler = require("@smithy/node-http-handler");
const _s3requestpresigner = require("@aws-sdk/s3-request-presigner");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let S3Service = class S3Service {
    async uploadFile(file) {
        const timestamp = Date.now();
        const path = `uploads/${timestamp}-${file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        const region = process.env.AWS_S3_REGION;
        const bucket = this.bucket;
        const upload = new _libstorage.Upload({
            client: this.s3Client,
            params: {
                Bucket: bucket,
                Key: path,
                Body: file.buffer,
                ContentType: file.mimetype
            },
            queueSize: 4,
            partSize: 5 * 1024 * 1024
        });
        try {
            await upload.done();
            const publicUrl = `https://${bucket}.s3.${region}.amazonaws.com/${path}`;
            return {
                id: path,
                name: file.originalname,
                mimeType: file.mimetype,
                webViewLink: publicUrl
            };
        } catch (error) {
            console.error('S3 upload error:', error);
            throw new _common.InternalServerErrorException(`Upload failed: ${error.message}`);
        }
    }
    async getFileStream(fileId) {
        const command = new _clients3.GetObjectCommand({
            Bucket: this.bucket,
            Key: fileId
        });
        try {
            const response = await this.s3Client.send(command);
            return response.Body;
        } catch (error) {
            console.error('S3 download error:', {
                fileId,
                error: error
            });
            throw new _common.InternalServerErrorException(`Download failed: ${error.message}`);
        }
    }
    async getFileMetadata(fileId) {
        const command = new _clients3.HeadObjectCommand({
            Bucket: this.bucket,
            Key: fileId
        });
        try {
            const response = await this.s3Client.send(command);
            return {
                name: fileId.split('/').pop(),
                mimeType: response.ContentType || 'application/octet-stream'
            };
        } catch (error) {
            return {
                name: fileId.split('/').pop(),
                mimeType: 'application/octet-stream'
            };
        }
    }
    async createSignedUrl(fileId, expiresInSeconds = 60) {
        const command = new _clients3.GetObjectCommand({
            Bucket: this.bucket,
            Key: fileId
        });
        try {
            const signedUrl = await (0, _s3requestpresigner.getSignedUrl)(this.s3Client, command, {
                expiresIn: expiresInSeconds
            });
            return {
                signedUrl
            };
        } catch (error) {
            throw new _common.InternalServerErrorException(`Failed to create signed URL: ${error.message}`);
        }
    }
    constructor(){
        const region = process.env.AWS_S3_REGION;
        const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
        const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
        const bucketName = process.env.AWS_S3_BUCKET_NAME;
        if (!region || !accessKeyId || !secretAccessKey || !bucketName) {
            throw new Error('AWS S3 credentials missing');
        }
        this.bucket = bucketName;
        this.s3Client = new _clients3.S3Client({
            region,
            credentials: {
                accessKeyId,
                secretAccessKey
            },
            requestHandler: new _nodehttphandler.NodeHttpHandler({
                connectionTimeout: 60000,
                requestTimeout: 120000
            })
        });
    }
};
S3Service = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [])
], S3Service);

//# sourceMappingURL=s3.service.js.map