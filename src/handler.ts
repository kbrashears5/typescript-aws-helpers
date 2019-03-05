import { Callback, Context } from 'aws-lambda';
import { APIGatewayHelper, BaseHelper, CloudWatchHelper, DynamoDBHelper, KMSHelper, LambdaHelper, S3Helper, SESHelper, SNSHelper, SQSHelper, SSMHelper } from './helpers';
import { ILogger, Logger, LogLevel } from './logger';

/**
 * IHandler
 */
export interface IHandler {

    APIGatewayHelper: APIGatewayHelper;
    BaseHelper: BaseHelper;
    CloudWatchHelper: CloudWatchHelper;
    DynamoDBHelper: DynamoDBHelper;
    KMSHelper: KMSHelper;
    LambdaHelper: LambdaHelper;
    Logger: ILogger;
    S3Helper: S3Helper;
    SESHelper: SESHelper;
    SNSHelper: SNSHelper;
    SQSHelper: SQSHelper;
    SSMHelpler: SSMHelper;

    Execute<T>(payload: T,
               context: Context,
               callback: Callback,
               actionToExecute: () => Promise<T>): Promise<void>;
}

/**
 * Handles an incoming lambda execution request
 */
export class Handler implements IHandler {

    public APIGatewayHelper: APIGatewayHelper;
    public BaseHelper: BaseHelper;
    public CloudWatchHelper: CloudWatchHelper;
    public DynamoDBHelper: DynamoDBHelper;
    public KMSHelper: KMSHelper;
    public LambdaHelper: LambdaHelper;
    public Logger: ILogger;
    public S3Helper: S3Helper;
    public SESHelper: SESHelper;
    public SNSHelper: SNSHelper;
    public SQSHelper: SQSHelper;
    public SSMHelpler: SSMHelper;

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
        this.BaseHelper = new BaseHelper(this.Logger);
        this.CloudWatchHelper = new CloudWatchHelper(this.Logger);
        this.DynamoDBHelper = new DynamoDBHelper(this.Logger);
        this.KMSHelper = new KMSHelper(this.Logger);
        this.LambdaHelper = new LambdaHelper(this.Logger);
        this.S3Helper = new S3Helper(this.Logger);
        this.SESHelper = new SESHelper(this.Logger);
        this.SNSHelper = new SNSHelper(this.Logger);
        this.SQSHelper = new SQSHelper(this.Logger);
        this.SSMHelpler = new SSMHelper(this.Logger);
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
        this.BaseHelper.TraceInputs(action, { payload, context, callback });

        if (this.BaseHelper.IsNullOrEmpty(context)) { throw new Error(`[${action}]-Must supply context`); }

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
}
