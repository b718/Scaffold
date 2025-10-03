import { AwsStack } from "../../lib/aws-stack";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as s3 from "aws-cdk-lib/aws-s3";

function createBucketForStaticImages(awsStack: AwsStack) {
  const staticBookImagesBucketId = "staticBookImagesBucket-query";

  return new s3.Bucket(awsStack, staticBookImagesBucketId, {
    bucketName: "query-static-book-images-bucket",
  });
}
export default function createCloudDeliveryNetworkForBookImages(
  awsStack: AwsStack
) {
  const cloudDeliveryNetworkId = "cloudDeliveryNetworkForBookImages-query";
  const imageBucket = createBucketForStaticImages(awsStack);

  new cloudfront.Distribution(awsStack, cloudDeliveryNetworkId, {
    defaultBehavior: {
      origin: origins.S3BucketOrigin.withOriginAccessControl(imageBucket),
    },
  });
}
