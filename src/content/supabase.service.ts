import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Readable } from 'stream';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;
  private bucket = 'course-content';

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase credentials missing');
    }

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async uploadFile(file: Express.Multer.File) {
    const timestamp = Date.now();
    const path = `uploads/${timestamp}-${file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

    const { data, error } = await this.supabase.storage
      .from(this.bucket)
      .upload(path, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (error) {
      // Check if bucket exists, if not try to create (Service role can)
      if (error.message.includes('Bucket not found')) {
        await this.createBucket();
        // Retry
        return this.uploadFile(file);
      }
      throw new InternalServerErrorException(`Upload failed: ${error.message}`);
    }

    return {
      id: data.path, // We use the path as the ID
      name: file.originalname,
      mimeType: file.mimetype,
      webViewLink: null,
    };
  }

  async getFileStream(fileId: string): Promise<Readable> {
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
      throw new InternalServerErrorException(
        `Download failed: ${error.message || JSON.stringify(error)}`,
      );
    }

    // Convert Blob/ArrayBuffer to Readable Stream
    const buffer = Buffer.from(await data.arrayBuffer());
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream;
  }

  async getFileMetadata(fileId: string) {
    // fileId is 'uploads/timestamp-name.ext'
    // We can get public URL or just parse path
    // To get mimeType, we can list the folder
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

  async createSignedUrl(fileId: string, expiresInSeconds: number = 60) {
    const { data, error } = await this.supabase.storage
      .from(this.bucket)
      .createSignedUrl(fileId, expiresInSeconds);

    if (error) {
      throw new InternalServerErrorException(
        `Failed to create signed URL: ${error.message}`,
      );
    }

    return { signedUrl: data.signedUrl };
  }

  private async createBucket() {
    const { data, error } = await this.supabase.storage.createBucket(
      this.bucket,
      {
        public: false, // Private bucket
      },
    );
    if (error) {
      console.error('Failed to create bucket:', error);
    }
  }
}
