import * as s3 from "aws-cdk-lib/aws-s3";
import { AwsStack } from "../../lib/aws-stack";

export default function createExportFilesS3Bucket(awsStack: AwsStack) {
  const exportFilesS3BucketId = "exportFilesS3Bucket-query";

  new s3.Bucket(awsStack, exportFilesS3BucketId, {
    bucketName: "query-export-files-bucket",
  });
}
