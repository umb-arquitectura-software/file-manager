import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UploadFileAwsService } from './upload-file-aws.service';
import { UploadFileGcpService } from './upload-file-gcp.service';
import GenerateSignedUrl from './dto/generateSignedUrl';
import GenerateSignedUrlAI from './dto/generateSignedUrlAI';

@Controller('upload-file')
export class UploadFileController {
  constructor(private readonly uploadFileServiceAws: UploadFileAwsService,
    private readonly uploadFileServiceGcp: UploadFileGcpService
  ) { }


  @Post('generate-signed-url/:provider')
  async generateSignedUrl(@Body() createUploadFileDto: GenerateSignedUrl, @Param('provider') provider: 'aws' | 'gcp') {
    if (provider !== 'aws' && provider !== 'gcp') throw 'provider not valid';
    if (provider === 'aws') return this.uploadFileServiceAws.generateSignedUrl(createUploadFileDto);
    if (provider === 'gcp') return this.uploadFileServiceGcp.generateSignedUrl(createUploadFileDto);
  }


  @Post('generate-signed-url-ai/:provider')
  async GenerateSignedUrlAI(@Body() createUploadFileDto: GenerateSignedUrlAI) {
    const provider = 'gcp';
    // if (provider !== 'aws' && provider !== 'gcp') throw 'provider not valid';
    // if (provider === 'aws') return this.uploadFileServiceAws.generateSignedUrlAI(createUploadFileDto);
    if (provider === 'gcp') return this.uploadFileServiceGcp.generateSignedUrlAI(createUploadFileDto);
  }
}
