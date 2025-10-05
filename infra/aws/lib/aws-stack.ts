import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import createGetPresignedUrlLambda from "../resources/lambda/getPresignedUrlLambda";
import createExportFilesS3Bucket from "../resources/s3/exportFilesS3Bucket";
import createCloudDeliveryNetworkForBookImages from "../resources/cdn/getCloudDeliveryNetworkForBookImages";
import createMonolithLambda from "../resources/lambda/getMonolithLambda";

export class AwsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Deploy AWS Resources
    createGetPresignedUrlLambda(this);
    createExportFilesS3Bucket(this);
    createCloudDeliveryNetworkForBookImages(this);
    createMonolithLambda(this);
  }
}
