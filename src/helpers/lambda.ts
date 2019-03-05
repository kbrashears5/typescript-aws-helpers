import * as AWS from 'aws-sdk';
import { ILogger } from '../logger';
import { BaseHelper } from './base';

/**
 * Lambda Helper
 */
export class LambdaHelper extends BaseHelper {

    /**
     * AWS Repository for Lambda
     */
    private Repository: AWS.Lambda;

    /**
     * Default batch size for Dynamo Event Source Mapping
     */
    private DefaultDynamoBatchSize: number = 100;

    /**
     * Default batch size for Kinesis Event Source Mapping
     */
    private DefaultKinesisBatchSize: number = 100;

    /**
     * Default batch size for SQS Event Source Mapping
     */
    private DefaultSQSBatchSize: number = 10;

    /**
     * Initializes new instance of LambdaHelper
     * @param logger {ILogger} Injected logger
     * @param repository {AWS.Lambda} Injected Repository. A new repository will be created if not supplied
     * @param options {AWS.Lambda.ClientConfiguration} Injected configuration if a Repository is supplied
     */
    constructor(logger: ILogger,
                repository?: AWS.Lambda,
                options?: AWS.Lambda.ClientConfiguration) {

        super(logger);
        this.Repository = repository || new AWS.Lambda(options);
    }

    /**
     * Disable event source mapping for a Dynamo stream
     * @param functionName {string} Function name to update. Best to use the full ARN
     * @param uuid {string} Event source mapping uuid
     * @param batchSize {number} Batch size for the event source mapping. Default 100
     */
    public async DisableDynamoEventSourceMappingAsync(functionName: string,
                                                      uuid: string,
                                                      batchSize?: number): Promise<AWS.Lambda.EventSourceMappingConfiguration> {

        return await this.UpdateEventSourceMappingAsync(functionName,
            false,
            uuid,
            batchSize || this.DefaultDynamoBatchSize);
    }

    /**
     * Disable event source mapping for a Kinesis stream
     * @param functionName {string} Function name to update. Best to use the full ARN
     * @param uuid {string} Event source mapping uuid
     * @param batchSize {number} Batch size for the event source mapping. Default 100
     */
    public async DisableKinesisEventSourceMappingAsync(functionName: string,
                                                       uuid: string,
                                                       batchSize?: number): Promise<AWS.Lambda.EventSourceMappingConfiguration> {

        return await this.UpdateEventSourceMappingAsync(functionName,
            false,
            uuid,
            batchSize || this.DefaultKinesisBatchSize);
    }

    /**
     * Disable event source mapping for a SQS queue
     * @param functionName {string} Function name to update. Best to use the full ARN
     * @param uuid {string} Event source mapping uuid
     * @param batchSize {number} Batch size for the event source mapping. Default 10
     */
    public async DisableSQSEventSourceMappingAsync(functionName: string,
                                                   uuid: string,
                                                   batchSize?: number): Promise<AWS.Lambda.EventSourceMappingConfiguration> {

        return await this.UpdateEventSourceMappingAsync(functionName,
            false,
            uuid,
            batchSize || this.DefaultSQSBatchSize);
    }

    /**
     * Enable event source mapping for a Dynamo stream
     * @param functionName {string} Function name to update. Best to use the full ARN
     * @param uuid {string} Event source mapping uuid
     * @param batchSize {number} Batch size for the event source mapping. Default 100
     */
    public async EnableDynamoEventSourceMappingAsync(functionName: string,
                                                     uuid: string,
                                                     batchSize?: number): Promise<AWS.Lambda.EventSourceMappingConfiguration> {

        return await this.UpdateEventSourceMappingAsync(functionName,
            true,
            uuid,
            batchSize || this.DefaultDynamoBatchSize);
    }

    /**
     * Enable event source mapping for a Kinesis stream
     * @param functionName {string} Function name to update. Best to use the full ARN
     * @param uuid {string} Event source mapping uuid
     * @param batchSize {number} Batch size for the event source mapping. Default 100
     */
    public async EnableKinesisEventSourceMappingAsync(functionName: string,
                                                      uuid: string,
                                                      batchSize?: number): Promise<AWS.Lambda.EventSourceMappingConfiguration> {

        return await this.UpdateEventSourceMappingAsync(functionName,
            true,
            uuid,
            batchSize || this.DefaultKinesisBatchSize);
    }

    /**
     * Enable event source mapping for a SQS queue
     * @param functionName {string} Function name to update. Best to use the full ARN
     * @param uuid {string} Event source mapping uuid
     * @param batchSize {number} Batch size for the event source mapping. Default 10
     */
    public async EnableSQSEventSourceMappingAsync(functionName: string,
                                                  uuid: string,
                                                  batchSize?: number): Promise<AWS.Lambda.EventSourceMappingConfiguration> {

        return await this.UpdateEventSourceMappingAsync(functionName,
            true,
            uuid,
            batchSize || this.DefaultSQSBatchSize);
    }

    /**
     * Get an Event Source Mapping
     * @param uuid {string} Uuid of Event Source Mapping
     */
    public async GetEventSourceMappingAsync(uuid: string): Promise<AWS.Lambda.EventSourceMappingConfiguration> {

        const action = `${LambdaHelper.name}.${this.GetEventSourceMappingAsync.name}`;
        this.TraceInputs(action, { uuid });

        // guard clauses
        if (this.IsNullOrEmpty(uuid)) { throw new Error(`[${action}]-Must supply uuid`); }

        // create params object
        const params: AWS.Lambda.GetEventSourceMappingRequest = {
            UUID: uuid,
        };
        this.TraceRequest(action, params);

        // make AWS call
        const response = await this.Repository.getEventSourceMapping(params).promise();
        this.TraceResponse(action, response);

        return response;
    }

    /**
     * List Event Source Mappings
     * @param functionName {string} Function name to get event source mappings for. Best to use the full ARN
     * @param eventSourceArn {string} Event Source ARN
     */
    public async ListEventSourceMappingsAsync(functionName: string,
                                              eventSourceArn: string): Promise<AWS.Lambda.ListEventSourceMappingsResponse> {

        const action = `${LambdaHelper.name}.${this.ListEventSourceMappingsAsync.name}`;
        this.TraceInputs(action, { functionName, eventSourceArn });

        // guard clauses
        if (this.IsNullOrEmpty(functionName)) { throw new Error(`[${action}]-Must supply functionName`); }
        if (this.IsNullOrEmpty(eventSourceArn)) { throw new Error(`[${action}]-Must supply eventSourceArn`); }

        // create params object
        const params: AWS.Lambda.ListEventSourceMappingsRequest = {
            EventSourceArn: eventSourceArn,
            FunctionName: functionName,
        };
        this.TraceRequest(action, params);

        // make AWS call
        const response = await this.Repository.listEventSourceMappings(params).promise();
        this.TraceResponse(action, response);

        return response;
    }

    /**
     * Invoke lambda async
     * @param functionName {string} Function name to invoke
     * @param payload {T} Payload to pass to function
     */
    public async InvokeAsync<T>(functionName: string,
                                payload: T): Promise<AWS.Lambda.InvokeAsyncResponse> {

        const action = `${LambdaHelper.name}.${this.InvokeAsync.name}`;
        this.TraceInputs(action, { functionName, payload });

        // guard clauses
        if (this.IsNullOrEmpty(functionName)) { throw new Error(`[${action}]-Must supply functionName`); }

        // create params object
        const params: AWS.Lambda.InvokeAsyncRequest = {
            FunctionName: functionName,
            InvokeArgs: payload,
        };
        this.TraceRequest(action, params);

        // make AWS call
        const response = await this.Repository.invokeAsync(params).promise();
        this.TraceResponse(action, response);

        return response;
    }

    /**
     * Invoke lambda sync
     * @param functionName {string} Function name to invoke
     * @param payload {T} Payload to pass to function
     */
    public async InvokeSync<T>(functionName: string,
                               payload: T): Promise<AWS.Lambda.InvocationResponse> {

        const action = `${LambdaHelper.name}.${this.InvokeSync.name}`;
        this.TraceInputs(action, { functionName, payload });

        // guard clauses
        if (this.IsNullOrEmpty(functionName)) { throw new Error(`[${action}]-Must supply functionName`); }

        // create params object
        const params: AWS.Lambda.InvocationRequest = {
            FunctionName: functionName,
            Payload: payload,
        };
        this.TraceRequest(action, params);

        // make AWS call
        const response = await this.Repository.invoke(params).promise();
        this.TraceResponse(action, response);

        return response;
    }

    /**
     * Update an event source mapping
     * @param functionName {string} Function name to update. Best to use the full ARN
     * @param enabled {boolean} Turn the event source mapping on or off
     * @param uuid {string} Event source mapping uuid
     * @param batchSize {number} Batch size for the event source mapping
     */
    public async UpdateEventSourceMappingAsync(functionName: string,
                                               enabled: boolean,
                                               uuid: string,
                                               batchSize: number): Promise<AWS.Lambda.EventSourceMappingConfiguration> {

        const action = `${LambdaHelper.name}.${this.UpdateEventSourceMappingAsync.name}`;
        this.TraceInputs(action, { functionName, enabled, uuid, batchSize });

        // guard clauses
        if (this.IsNullOrEmpty(functionName)) { throw new Error(`[${action}]-Must supply functionName`); }
        if (this.IsNullOrEmpty(uuid)) { throw new Error(`[${action}]-Must supply uuid`); }

        // create params object
        const params: AWS.Lambda.UpdateEventSourceMappingRequest = {
            BatchSize: batchSize,
            Enabled: enabled,
            FunctionName: functionName,
            UUID: uuid,
        };
        this.TraceRequest(action, params);

        // make AWS call
        const response = await this.Repository.updateEventSourceMapping(params).promise();
        this.TraceResponse(action, response);

        return response;
    }
}
