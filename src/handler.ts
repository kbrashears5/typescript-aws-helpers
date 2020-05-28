
import { Callback, Context, SQSRecord } from 'aws-lambda';
import { APIGatewayHelper, IAPIGatewayHelper } from 'typescript-aws-apigateway-helper';
import { CloudWatchHelper, ICloudWatchHelper } from 'typescript-aws-cloudwatch-helper';
import { DynamoHelper, IDynamoHelper } from 'typescript-aws-dynamo-helper';
import { KMSHelper, IKMSHelper } from 'typescript-aws-kms-helper';
import { LambdaHelper, ILambdaHelper } from 'typescript-aws-lambda-helper';
import { S3Helper, IS3Helper } from 'typescript-aws-s3-helper';
import { SESHelper, ISESHelper } from 'typescript-aws-ses-helper';
import { SNSHelper, ISNSHelper } from 'typescript-aws-sns-helper';
import { SQSHelper, ISQSHelper } from 'typescript-aws-sqs-helper';
import { SSMHelper, ISSMHelper } from 'typescript-aws-ssm-helper';
import { STSHelper, ISTSHelper } from 'typescript-aws-sts-helper';
import { ILogger, LogLevel, Logger } from 'typescript-ilogger';
import { IHandler } from './interface';
import { LogHelper, ObjectOperations } from 'typescript-helper-functions';

/**
 * Handles an incoming lambda execution request
 */
export class Handler implements IHandler {

    // AWS helpers
    public APIGatewayHelper: IAPIGatewayHelper;
    public CloudWatchHelper: ICloudWatchHelper;
    public DynamoHelper: IDynamoHelper;
    public KMSHelper: IKMSHelper;
    public LambdaHelper: ILambdaHelper;
    public Logger: ILogger;
    public S3Helper: IS3Helper;
    public SESHelper: ISESHelper;
    public SNSHelper: ISNSHelper;
    public SQSHelper: ISQSHelper;
    public SSMHelper: ISSMHelper;
    public STSHelper: ISTSHelper;

    public LogHelper: LogHelper;
    public ObjectOperations: ObjectOperations;

    /**
     * Initialize a new instance of Handler
     * @param LogLevel {LogLevel} Log Level
     */
    // tslint:disable-next-line: no-shadowed-variable
    constructor(private LogLevel: LogLevel) {
        // initialize the Logger
        this.Logger = new Logger(this.LogLevel);

        // initialize all the helpers
        this.APIGatewayHelper = new APIGatewayHelper(this.Logger);
        this.CloudWatchHelper = new CloudWatchHelper(this.Logger);
        this.DynamoHelper = new DynamoHelper(this.Logger);
        this.KMSHelper = new KMSHelper(this.Logger);
        this.LambdaHelper = new LambdaHelper(this.Logger);
        this.S3Helper = new S3Helper(this.Logger);
        this.SESHelper = new SESHelper(this.Logger);
        this.SNSHelper = new SNSHelper(this.Logger);
        this.SQSHelper = new SQSHelper(this.Logger);
        this.SSMHelper = new SSMHelper(this.Logger);
        this.STSHelper = new STSHelper(this.Logger);

        this.LogHelper = new LogHelper(this.Logger);
        this.ObjectOperations = new ObjectOperations();
    }

    /**
     * Execute a lambda
     * @param payload {T} Payload to use
     * @param context {Context} AWS Context
     * @param callback {Callback} AWS Callback
     * @param actionToExecute {function} Action to take
     */
    public async Execute<T>(payload: T,
        context: Context,
        callback: Callback<any>,
        actionToExecute: () => Promise<T>): Promise<void> {

        const action = `${Handler.name}.${this.Execute.name}`;
        this.LogHelper.LogInputs(action, { payload, context, callback });

        if (this.ObjectOperations.IsNullOrEmpty(context)) { throw new Error(`[${action}]-Must supply context`); }

        let result: T | undefined;
        let error: Error | undefined;
        try {
            result = await actionToExecute();
            this.Logger.Trace(`[${action}]-${JSON.stringify(result)}`);
        } catch (err) {
            error = err;
            this.Logger.Error(`[${action}]-${JSON.stringify(error)}`);
        } finally {
            callback(error,
                result);
        }
    }

    /**
     * Orchestrate a function
     * @param actionToExecute {function} Action to take
     */
    public async Orchestrate<T>(actionToExecute: () => Promise<T>): Promise<T> {
        const action = `${Handler.name}.${this.Orchestrate.name}`;

        let result: T;
        try {
            this.Logger.Information(`[${action}]-Starting orchestration...`);
            result = await actionToExecute();
        } finally {
            this.Logger.Information(`[${action}]-Finished orchestration...`);
        }

        return result;
    }

    /**
     * Orchestrate function to process records off SQS queue
     * @param records {SQSRecord[]} Records to process
     * @param queueUrl {string} Queue URL of record set
     * @param actionToExecute {function} Action to perform on each record
     */
    public async OrchestrateSQS(records: SQSRecord[],
        queueUrl: string,
        actionToExecute: () => Promise<void>): Promise<void> {

        const action = `${Handler.name}.${this.OrchestrateSQS.name}`;

        if (this.ObjectOperations.IsNullOrWhitespace(queueUrl)) { throw new Error(`[${action}]-Must supply queueUrl`); }

        await this.Orchestrate<void>(async () => {
            for (const record of records) {
                this.Logger.Trace(`[${action}]-Record Body: ${record.body}`);

                // run the code
                await actionToExecute();

                // delete the message
                await this.SQSHelper.DeleteMessageAsync(queueUrl,
                    record.receiptHandle);
            }
        });
    }
}
