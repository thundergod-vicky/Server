import { Readable } from 'stream';
export declare class SupabaseService {
    private supabase;
    private bucket;
    constructor();
    uploadFile(file: Express.Multer.File): any;
    getFileStream(fileId: string): Promise<Readable>;
    getFileMetadata(fileId: string): Promise<{
        name: string | undefined;
        mimeType: string;
    } | {
        name: string;
        mimeType: any;
    }>;
    createSignedUrl(fileId: string, expiresInSeconds?: number): Promise<{
        signedUrl: string;
    }>;
    private createBucket;
}
