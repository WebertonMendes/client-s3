import { Body, Controller, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadFileUseCase } from './uploadFile.usecase';
import { fileUploadValidator } from 'src/utils/fileUpload.validator';

@Controller('files/upload')
export class UploadFileController {
  constructor(private readonly uploadFile: UploadFileUseCase) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async handler(
    @UploadedFiles(fileUploadValidator)
    files: Express.Multer.File[],
    @Body('isPublic') isPublic: string,
  ) {
    const isPublicValue = isPublic === 'true' ? true : false;
    return this.uploadFile.execute(files, isPublicValue);
  }
}
