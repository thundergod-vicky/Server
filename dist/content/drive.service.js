"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DriveService", {
    enumerable: true,
    get: function() {
        return DriveService;
    }
});
const _common = require("@nestjs/common");
const _googleapis = require("googleapis");
const _fs = /*#__PURE__*/ _interop_require_wildcard(require("fs"));
const _path = /*#__PURE__*/ _interop_require_wildcard(require("path"));
const _stream = require("stream");
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
let DriveService = class DriveService {
    async uploadFile(file) {
        if (!this.drive) throw new Error('Drive not initialized');
        const media = {
            mimeType: file.mimetype,
            body: _stream.Readable.from(file.buffer)
        };
        const response = await this.drive.files.create({
            requestBody: {
                name: file.originalname,
                parents: [
                    this.folderId
                ]
            },
            media: media,
            fields: 'id, webViewLink, mimeType'
        });
        return response.data;
    }
    async getFileStream(fileId) {
        if (!this.drive) throw new Error('Drive not initialized');
        const response = await this.drive.files.get({
            fileId,
            alt: 'media'
        }, {
            responseType: 'stream'
        });
        return response.data;
    }
    async getFileMetadata(fileId) {
        if (!this.drive) throw new Error('Drive not initialized');
        const response = await this.drive.files.get({
            fileId,
            fields: 'id, name, mimeType, size'
        });
        return response.data;
    }
    constructor(){
        this.folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
        const keyPath = _path.join(process.cwd(), 'google-credentials.json');
        if (_fs.existsSync(keyPath)) {
            const auth = new _googleapis.google.auth.GoogleAuth({
                keyFile: keyPath,
                scopes: [
                    'https://www.googleapis.com/auth/drive'
                ]
            });
            this.drive = _googleapis.google.drive({
                version: 'v3',
                auth
            });
        } else {
            console.error('google-credentials.json not found!');
        }
    }
};
DriveService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [])
], DriveService);

//# sourceMappingURL=drive.service.js.map