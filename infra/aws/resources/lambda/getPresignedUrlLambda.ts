import * as lambda from "aws-cdk-lib/aws-lambda";
import * as iam from "aws-cdk-lib/aws-iam";
import { AwsStack } from "../../lib/aws-stack";

export default function createGetPresignedUrlLambda(awsStack: AwsStack) {
  const getPresignedUrlLambdaId = "getPresignedUrlLambda-query";
  const getPresignedUrlLambdaPath = lambda.Code.fromAsset(
    "../../scripts/get-presigned-url-lambda"
  );

  const getPresignedUrlLambdaFunction = new lambda.Function(
    awsStack,
    getPresignedUrlLambdaId,
    {
      runtime: lambda.Runtime.PYTHON_3_12,
      code: getPresignedUrlLambdaPath,
      handler: "main.lambda_handler",
    }
  );

  const bucketArn = "arn:aws:s3:::query-export-files-bucket";
  const bucketObjectsArn = `${bucketArn}/*`;

  getPresignedUrlLambdaFunction.addToRolePolicy(
    new iam.PolicyStatement({
      actions: ["s3:ListBucket"],
      resources: [bucketArn],
    })
  );

  getPresignedUrlLambdaFunction.addToRolePolicy(
    new iam.PolicyStatement({
      actions: ["s3:GetObject", "s3:GetObjectVersion"],
      resources: [bucketObjectsArn],
    })
  );

  const getPresignedUrlLambdaFunctionUrlId = "getPresignedUrlLambdaFunctionUrl";

  new lambda.FunctionUrl(awsStack, getPresignedUrlLambdaFunctionUrlId, {
    function: getPresignedUrlLambdaFunction,
    authType: lambda.FunctionUrlAuthType.NONE,
    cors: {
      allowedOrigins: ["*"],
      allowedMethods: [lambda.HttpMethod.POST],
      allowedHeaders: ["*"],
    },
  });
}
