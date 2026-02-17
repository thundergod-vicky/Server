import { SupabaseService } from './supabase.service';
import type { Response } from 'express';
export declare class ContentController {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    uploadFile(file: Express.Multer.File): Promise<any>;
    streamFile(req: any, res: Response): Promise<void>;
}
