import { FileTypeValidator, MaxFileSizeValidator, ParseFilePipe } from '@nestjs/common';
import { MAX_FILE_SIZE } from './app.constants';

export const fileUploadValidator = new ParseFilePipe({
  validators: [
    new FileTypeValidator({ fileType: '.(csv|xls|xlsx)' }),
    new MaxFileSizeValidator({
      maxSize: MAX_FILE_SIZE,
      message: 'File is too large. Max file size is 10MB',
    }),
  ],
  fileIsRequired: true,
});
