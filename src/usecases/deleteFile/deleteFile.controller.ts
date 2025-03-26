import { Controller, Delete, Query } from '@nestjs/common';
import { DeleteFileUseCase } from './deleteFile.usecase';

@Controller('files')
export class DeleteFileController {
  constructor(private readonly deleteFile: DeleteFileUseCase) {}

  @Delete()
  async handler(@Query('key') key: string) {
    return await this.deleteFile.execute(key);
  }
}
