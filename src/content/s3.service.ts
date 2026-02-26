import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { S3Client, GetObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { NodeHttpHandler } from '@smithy/node-http-handler';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Readable } from 'stream';

@Injectable()
export class S3Service {
  private s3Client: S3Client;
  private bucket: string;

  constructor() {
    const region = process.env.AWS_S3_REGION;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    const bucketName = process.env.AWS_S3_BUCKET_NAME;

    if (!region || !accessKeyId || !secretAccessKey || !bucketName) {
      throw new Error('AWS S3 credentials missing');
    }

    this.bucket = bucketName;

    this.s3Client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      requestHandler: new NodeHttpHandler({
        connectionTimeout: 60000,
        requestTimeout: 120000,
      }),
    });
  }

  async uploadFile(file: Express.Multer.File) {
    const timestamp = Date.now();
    const path = `uploads/${timestamp}-${file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const region = process.env.AWS_S3_REGION;
    const bucket = this.bucket;

    const upload = new Upload({
      client: this.s3Client,
      params: {
        Bucket: bucket,
        Key: path,
        Body: file.buffer,
        ContentType: file.mimetype,
      },
      queueSize: 4,
      partSize: 5 * 1024 * 1024,
    });

    try {
      await upload.done();
      const publicUrl = `https://${bucket}.s3.${region}.amazonaws.com/${path}`;
      return {
        id: path,
        name: file.originalname,
        mimeType: file.mimetype,
        webViewLink: publicUrl,
      };
    } catch (error) {
      console.error('S3 upload error:', error);
      throw new InternalServerErrorException(
        `Upload failed: ${(error as Error).message}`,
      );
    }
  }

  async getFileStream(fileId: string): Promise<Readable> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: fileId,
    });

    try {
      const response = await this.s3Client.send(command);
      return response.Body as Readable;
    } catch (error) {
      console.error('S3 download error:', {
        fileId,
        error: error,
      });
      throw new InternalServerErrorException(`Download failed: ${error.message}`);
    }
  }

  async getFileMetadata(fileId: string) {
    const command = new HeadObjectCommand({
      Bucket: this.bucket,
      Key: fileId,
    });

    try {
      const response = await this.s3Client.send(command);
      return {
        name: fileId.split('/').pop(),
        mimeType: response.ContentType || 'application/octet-stream',
      };
    } catch (error) {
      return {
        name: fileId.split('/').pop(),
        mimeType: 'application/octet-stream',
      };
    }
  }

  async createSignedUrl(fileId: string, expiresInSeconds: number = 60) {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: fileId,
    });

    try {
      const signedUrl = await getSignedUrl(this.s3Client, command, {
        expiresIn: expiresInSeconds,
      });
      return { signedUrl };
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to create signed URL: ${error.message}`,
      );
    }
  }
}
