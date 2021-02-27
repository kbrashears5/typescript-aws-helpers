import { Callback, Context, SQSRecord } from 'aws-lambda';
import { IAPIGatewayHelper } from 'typescript-aws-apigateway-helper';
import { ICloudWatchHelper } from 'typescript-aws-cloudwatch-helper';
import { IDynamoHelper } from 'typescript-aws-dynamo-helper';
import { IKMSHelper } from 'typescript-aws-kms-helper';
import { ILambdaHelper } from 'typescript-aws-lambda-helper';
import { IS3Helper } from 'typescript-aws-s3-helper';
import { ISESHelper } from 'typescript-aws-ses-helper';
import { ISNSHelper } from 'typescript-aws-sns-helper';
import { ISQSHelper } from 'typescript-aws-sqs-helper';
import { ISSMHelper } from 'typescript-aws-ssm-helper';
import { ISTSHelper } from 'typescript-aws-sts-helper';
import { ILogger } from 'typescript-ilogger';

/**
 * IHandler
 */
export interface IHandler {
  APIGatewayHelper: IAPIGatewayHelper;
  CloudWatchHelper: ICloudWatchHelper;
  DynamoHelper: IDynamoHelper;
  KMSHelper: IKMSHelper;
  LambdaHelper: ILambdaHelper;
  Logger: ILogger;
  S3Helper: IS3Helper;
  SESHelper: ISESHelper;
  SNSHelper: ISNSHelper;
  SQSHelper: ISQSHelper;
  SSMHelper: ISSMHelper;
  STSHelper: ISTSHelper;

  Execute<T>(
    payload: T,
    context: Context,
    callback: Callback,
    actionToExecute: () => Promise<T>,
  ): Promise<void>;

  Orchestrate<T>(actionToExecute: () => Promise<T>): Promise<T>;

  OrchestrateSQS(
    records: SQSRecord[],
    queueUrl: string,
    actionToExecute: () => Promise<void>,
  ): Promise<void>;
}
