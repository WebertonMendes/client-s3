import { Controller, Get, Query } from '@nestjs/common';
import { GetFileUrlUseCase } from './getFileUrl.usecase';

@Controller('files')
export class GetFileUrlController {
  constructor(private readonly getFileUrl: GetFileUrlUseCase) {}

  @Get()
  async handler(@Query('key') key: string) {
    return this.getFileUrl.execute(key);
  }
}
