import { Module } from '@nestjs/common';
import { DeleteFileController } from './usecases/deleteFile/deleteFile.controller';
import { DeleteFileUseCase } from './usecases/deleteFile/deleteFile.usecase';
import { GetFileUrlController } from './usecases/getFileUrl/getFileUrl.controller';
import { GetFileUrlUseCase } from './usecases/getFileUrl/getFileUrl.usecase';
import { GetFileUrlSignedController } from './usecases/getFileUrlSigned/getFileUrlSigned.controller';
import { GetFileUrlSignedUseCase } from './usecases/getFileUrlSigned/getFileUrlSigned.usecase';
import { UploadFileController } from './usecases/uploadFile/uploadFile.controller';
import { UploadFileUseCase } from './usecases/uploadFile/uploadFile.usecase';
import { S3Client } from '@aws-sdk/client-s3';
import { createS3Client } from './utils/clientS3.config';

@Module({
  imports: [],
  controllers: [
    DeleteFileController,
    GetFileUrlController,
    GetFileUrlSignedController,
    UploadFileController,
  ],
  providers: [
    DeleteFileUseCase,
    GetFileUrlUseCase,
    GetFileUrlSignedUseCase,
    UploadFileUseCase,
    {
      provide: S3Client,
      useFactory: createS3Client,
    },
  ],
})
export class AppModule {}
