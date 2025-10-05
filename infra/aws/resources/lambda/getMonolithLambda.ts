import * as lambda from "aws-cdk-lib/aws-lambda";
import * as api from "aws-cdk-lib/aws-apigateway";
import { join } from "path";
import { AwsStack } from "../../lib/aws-stack";

export default function createMonolithLambda(awsStack: AwsStack) {
  const monolithLambdaId = "monolithLambda";
  const monolithDockerAssetPath = join(
    __dirname,
    "../../../../back_end/query-back-end"
  );

  const monolithDockerCode = lambda.DockerImageCode.fromImageAsset(
    monolithDockerAssetPath,
    {
      file: "Dockerfile",
    }
  );

  const monolithLambda = new lambda.DockerImageFunction(
    awsStack,
    monolithLambdaId,
    {
      code: monolithDockerCode,
      architecture: lambda.Architecture.X86_64,
    }
  );

  const monolithLambdaApiId = "monolithLambdaApiGateway-scaffold";

  new api.LambdaRestApi(awsStack, monolithLambdaApiId, {
    handler: monolithLambda,
  });
}
