import { Injectable } from '@nestjs/common';
import { UploadFileService } from './dto/upload-file-service';
import { config } from 'src/config/config';
import GenerateSignedUrlAI from './dto/generateSignedUrlAI';

@Injectable()
export class UploadFileGcpService implements UploadFileService {

  async generateSignedUrl(data: any): Promise<any> {
    return 'This action adds a new uploadFile';
  }

  async generateSignedUrlAI(data: GenerateSignedUrlAI): Promise<any> {
    try {
      const API_GCP = `https://generativelanguage.googleapis.com/upload/v1beta/files?key=${config().gcp.geminiApiKey}`;
      console.log('API_GCP', API_GCP);

      const params =         {
        method: 'POST',
        body: JSON.stringify({ file: { display_name: this.uuid() } }),
        headers: {
          'X-Goog-Upload-Protocol': 'resumable',
          'X-Goog-Upload-Command': 'start',
          'X-Goog-Upload-Header-Content-Length': data.fileSize.toString(),
          'X-Goog-Upload-Header-Content-Type': data.fileType,
          'Content-Type': 'application/json',
        }
      }
      console.log('params', params);
      const request = await fetch(API_GCP,params)
      return {url: request.headers.get("x-goog-upload-url") } 
    } catch (error) {
      console.log("generateSignedUrlAI", error);
      return error;
    }

  }


  uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
