import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { BadRequestException, Injectable } from "@nestjs/common";
import { createS3Client, getS3BucketName } from "src/utils/clientS3.config";

@Injectable()
export class DeleteFileUseCase {
  constructor(
    private s3Client: S3Client = createS3Client(),
  ) {}

  async execute(key: string) {
      try {
        const command = new DeleteObjectCommand({
          Bucket: getS3BucketName(),
          Key: key,
        });
  
        const deleteResult = await this.s3Client.send(command);
        console.info(
          `INFO - delete '${key}' | statusCode: `,
          deleteResult.$metadata.httpStatusCode,
        );
  
        return { message: 'File deleted successfully' };
      } catch (error) {
        throw new BadRequestException(error);
      }
    }
}
