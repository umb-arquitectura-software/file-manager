import { Injectable } from '@nestjs/common';
import { UploadFileService } from './dto/upload-file-service';
import GenerateSignedUrl from './dto/generateSignedUrl';
import awsS3UploadFileCoreService from 'src/services/aws/S3/aws.S3.upload.file.core.service';

@Injectable()
export class UploadFileAwsService implements UploadFileService {

  async generateSignedUrl(data: GenerateSignedUrl): Promise<any> {
    const response = await awsS3UploadFileCoreService.generatePresignedFiles(data);
    return response;
  }

  async generateSignedUrlAI(data: any): Promise<any> {
    return 'This action adds a new uploadFile';
  }
}
