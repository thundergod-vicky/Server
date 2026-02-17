import { Readable } from 'stream';
export declare class DriveService {
    private drive;
    private folderId;
    constructor();
    uploadFile(file: Express.Multer.File): Promise<{
        id: string;
        webViewLink: string;
        mimeType: string;
    }>;
    getFileStream(fileId: string): Promise<Readable>;
    getFileMetadata(fileId: string): Promise<any>;
}
