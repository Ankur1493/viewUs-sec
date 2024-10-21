import { S3Client } from "@aws-sdk/client-s3";

const bucketRegion = process.env.AWS_BUCKET_REGION!
const accessKey = process.env.ACCESS_KEY!
const secretAccessKey = process.env.SECRET_ACCESS_KEY!

export const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey
  },
  region: bucketRegion
})
