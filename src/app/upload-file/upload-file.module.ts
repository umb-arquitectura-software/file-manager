import { Module } from '@nestjs/common';
import { UploadFileController } from './upload-file.controller';
import { UploadFileAwsService } from './upload-file-aws.service';
import { UploadFileGcpService } from './upload-file-gcp.service';

@Module({
  controllers: [UploadFileController],
  providers: [UploadFileAwsService, UploadFileGcpService],
})
export class UploadFileModule {}
