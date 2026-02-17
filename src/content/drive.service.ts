import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import * as fs from 'fs';
import * as path from 'path';
import { Readable } from 'stream';

@Injectable()
export class DriveService {
  private drive;
  private folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

  constructor() {
    const keyPath = path.join(process.cwd(), 'google-credentials.json');
    if (fs.existsSync(keyPath)) {
      const auth = new google.auth.GoogleAuth({
        keyFile: keyPath,
        scopes: ['https://www.googleapis.com/auth/drive'],
      });
      this.drive = google.drive({ version: 'v3', auth });
    } else {
      console.error('google-credentials.json not found!');
    }
  }

  async uploadFile(
    file: Express.Multer.File,
  ): Promise<{ id: string; webViewLink: string; mimeType: string }> {
    if (!this.drive) throw new Error('Drive not initialized');

    const media = {
      mimeType: file.mimetype,
      body: Readable.from(file.buffer),
    };

    const response = await this.drive.files.create({
      requestBody: {
        name: file.originalname,
        parents: [this.folderId],
      },
      media: media,
      fields: 'id, webViewLink, mimeType',
    });

    return response.data;
  }

  async getFileStream(fileId: string): Promise<Readable> {
    if (!this.drive) throw new Error('Drive not initialized');
    const response = await this.drive.files.get(
      { fileId, alt: 'media' },
      { responseType: 'stream' },
    );
    return response.data;
  }

  async getFileMetadata(fileId: string) {
    if (!this.drive) throw new Error('Drive not initialized');
    const response = await this.drive.files.get({
      fileId,
      fields: 'id, name, mimeType, size',
    });
    return response.data;
  }
}
