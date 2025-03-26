import { Injectable } from "@nestjs/common";
import { getS3BucketName } from "src/utils/clientS3.config";

@Injectable()
export class GetFileUrlUseCase {
  execute(key: string) {
    const bucketName = getS3BucketName();
    return { url: `https://${bucketName}.s3.amazonaws.com/${key}` };
  }
}
