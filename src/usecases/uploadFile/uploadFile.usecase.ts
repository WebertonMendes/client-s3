import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { BadRequestException, Injectable } from "@nestjs/common";
import { createS3Client, getS3BucketName } from "src/utils/clientS3.config";
import { v4 as uuidV4 } from 'uuid';
import { GetFileUrlUseCase } from "../getFileUrl/getFileUrl.usecase";
import { GetFileUrlSignedUseCase } from "../getFileUrlSigned/getFileUrlSigned.usecase";

@Injectable()
export class UploadFileUseCase {
  constructor(
    private s3Client: S3Client = createS3Client(),
    private getFileUrlSigned: GetFileUrlSignedUseCase,
    private getFileUrl: GetFileUrlUseCase,
  ) {}

  async execute(files: Express.Multer.File[], isPublic: boolean) {
    try {
      const uploadResults = await Promise.all(
        files.map(async (file) => {
          const key = `crm-integration/hubspot/export/${uuidV4()} - ${file.originalname}`;
          const command = new PutObjectCommand({
            Bucket: getS3BucketName(),
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: isPublic ? 'public-read' : 'private',
            Metadata: {
              originalName: file.originalname,
            },
          });

          const uploadResult = await this.s3Client.send(command);
          console.info(
            `INFO - upload '${file.originalname}' | statusCode: `,
            uploadResult.$metadata.httpStatusCode,
          );

          return {
            url: isPublic
              ? this.getFileUrl.execute(key).url
              : (await this.getFileUrlSigned.execute(key)).url,
            key,
            isPublic,
          };
        }),
      );

      return uploadResults;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
