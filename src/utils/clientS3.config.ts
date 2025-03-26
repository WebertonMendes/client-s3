import { S3Client } from '@aws-sdk/client-s3';

export function createS3Client(): S3Client {
  return new S3Client({
    region: `${process.env.S3_REGION}`,
    credentials: {
      accessKeyId: `${process.env.S3_ACCESS_KEY}`,
      secretAccessKey: `${process.env.S3_SECRET_ACCESS_KEY}`,
    },
    forcePathStyle: true,
  });
}

export function getS3BucketName(): string {
  return `${process.env.S3_BUCKET_NAME}`;
}
