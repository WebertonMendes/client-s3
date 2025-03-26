import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { BadRequestException, Injectable } from "@nestjs/common";
import { FILE_EXPIRES_IN } from "src/utils/app.constants";
import { createS3Client, getS3BucketName } from "src/utils/clientS3.config";

@Injectable()
export class GetFileUrlSignedUseCase {
  constructor(
    private s3Client: S3Client = createS3Client(),
  ) {}

  async execute(key: string) {
      try {
        const command = new GetObjectCommand({
          Bucket: getS3BucketName(),
          Key: key,
        });
  
        const url = await getSignedUrl(this.s3Client, command, {
          expiresIn: FILE_EXPIRES_IN,
        });
  
        return { url };
      } catch (error) {
        throw new BadRequestException(error);
      }
    }
}
