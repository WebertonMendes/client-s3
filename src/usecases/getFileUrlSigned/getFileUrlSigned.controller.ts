import { Controller, Get, Query } from '@nestjs/common';
import { GetFileUrlSignedUseCase } from './getFileUrlSigned.usecase';

@Controller('files/signed')
export class GetFileUrlSignedController {
  constructor(private readonly getFileUrlSigned: GetFileUrlSignedUseCase) {}

  @Get()
  async handler(@Query('key') key: string) {
    return this.getFileUrlSigned.execute(key);
  }
}
