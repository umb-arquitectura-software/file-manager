import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { config } from './config/config';
import { UploadFileModule } from './app/upload-file/upload-file.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    UploadFileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
