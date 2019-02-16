import { BaseHelper } from './base-helper';
import { ILogger } from '../logger';
import * as AWS from 'aws-sdk';

/**
 * SQS Helper
 */
export class SQSHelper extends BaseHelper {

    /**
     * AWS Repository for S3
     */
    private Repository: AWS.SQS;

    /**
     * Initializes new instance of SQSHelper
     * @param logger {ILogger} Injected logger
     * @param repository {AWS.SQS} Injected Repository. A new repository will be created if not supplied
     * @param options {AWS.SQS.ClientConfiguration} Injected configuration if a Repository is supplied
     */
    constructor(logger: ILogger,
        repository?: AWS.SQS,
        options?: AWS.SQS.ClientConfiguration) {

        super(logger);
        this.Repository = repository || new AWS.SQS(options);
    }

    /**
     * Delete a message from an SQS queue
     * @param queueUrl {string} Queue to delete a message from
     * @param receiptHandle {string} Receipt handle of message to delete
     */
    public async DeleteMessageAsync(queueUrl: string,
        receiptHandle: string): Promise<object> {

        const action = `${SQSHelper.name}.${this.DeleteMessageAsync.name}`;
        this.TraceInputs(action, { queueUrl, receiptHandle });

        // guard clauses
        if (this.IsNullOrEmpty(queueUrl)) { throw new Error(`[${action}]-Must supply queueUrl`); }
        if (this.IsNullOrEmpty(receiptHandle)) { throw new Error(`[${action}]-Must supply receiptHandle`); }

        // create params object
        const params: AWS.SQS.DeleteMessageRequest = {
            QueueUrl: queueUrl,
            ReceiptHandle: receiptHandle,
        };
        this.TraceRequest(action, params);

        // make AWS call
        const response = await this.Repository.deleteMessage(params).promise();
        this.TraceResponse(action, response);

        return response;
    }
}