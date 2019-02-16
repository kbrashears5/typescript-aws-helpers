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

    /**
     * Delete a set of messages from an SQS queue
     * @param queueUrl {string} Queue to delete messages from
     * @param receiptHandles {string[]} String array of receipt handle of messages to delete
     */
    public async DeleteMessagesAsync(queueUrl: string,
        receiptHandles: string[]): Promise<AWS.SQS.DeleteMessageBatchResult> {

        const action = `${SQSHelper.name}.${this.DeleteMessagesAsync.name}`;
        this.TraceInputs(action, { queueUrl, receiptHandles });

        // guard clauses
        if (this.IsNullOrEmpty(queueUrl)) { throw new Error(`[${action}]-Must supply queueUrl`); }
        if (!receiptHandles || receiptHandles.length === 0) { throw new Error(`[${action}]-Must supply at least one receiptHandle`); }
        if (receiptHandles.length > 10) { throw new Error(`[${action}]-Can only supply up to 10 receiptHandles`); }

        // create entries to delete
        const entries: AWS.SQS.DeleteMessageBatchRequestEntry[] = [];
        for (const handle of receiptHandles) {
            entries.push({ Id: handle, ReceiptHandle: handle });
        }

        // create params object
        const params: AWS.SQS.DeleteMessageBatchRequest = {
            Entries: entries,
            QueueUrl: queueUrl,
        };
        this.TraceRequest(action, params);

        // make AWS call
        const response = await this.Repository.deleteMessageBatch(params).promise();
        this.TraceResponse(action, response);

        return response;
    }

    /**
     * Purges all message from a queue
     * @param queueUrl {string} Queue to purge all messages from
     */
    public async PurgeQueueAsync(queueUrl: string): Promise<object> {

        const action = `${SQSHelper.name}.${this.PurgeQueueAsync.name}`;
        this.TraceInputs(action, { queueUrl });

        // guard clauses
        if (this.IsNullOrEmpty(queueUrl)) { throw new Error(`[${action}]-Must supply queueUrl`); }

        // create params object
        const params: AWS.SQS.PurgeQueueRequest = {
            QueueUrl: queueUrl,
        };
        this.TraceRequest(action, params);

        // make AWS call
        const response = await this.Repository.purgeQueue(params).promise();
        this.TraceResponse(action, response);

        return response;
    }

    /**
     * Receive up to 10 messages from a queue
     * @param queueUrl {string} Queue to receive message from
     * @param maxNumberOfMessages {number} Maximum number of messages to receive. Default and maximum is 10
     * @param visibilityTimeout {number} Time in seconds that a message is hidden from the queue. Default is 10
     * @param attributeNames {string[]} List of attribute names that need to be returned for each message. Default is 'ALL'
     * @param messageAttributeNames {string[]} List of message attributes to be returned for each message
     */
    public async ReceiveMessagesAsync(queueUrl: string,
        maxNumberOfMessages?: number,
        visibilityTimeout?: number,
        attributeNames?: string[],
        messageAttributeNames?: string[]): Promise<AWS.SQS.ReceiveMessageResult> {

        const action = `${SQSHelper.name}.${this.ReceiveMessagesAsync.name}`;
        this.TraceInputs(action, { queueUrl, maxNumberOfMessages, visibilityTimeout, attributeNames, messageAttributeNames });

        // guard clauses
        if (this.IsNullOrEmpty(queueUrl)) { throw new Error(`[${action}]-Must supply queueUrl`); }

        // set defaults
        if (!maxNumberOfMessages) { maxNumberOfMessages = 10; }
        if (!visibilityTimeout) { visibilityTimeout = 10; }
        if (!attributeNames || attributeNames.length === 0) { attributeNames = ['ALL']; }

        // create params object
        const params: AWS.SQS.ReceiveMessageRequest = {
            AttributeNames: attributeNames,
            MaxNumberOfMessages: maxNumberOfMessages,
            MessageAttributeNames: messageAttributeNames,
            QueueUrl: queueUrl,
            VisibilityTimeout: visibilityTimeout,
        };
        this.TraceRequest(action, params);

        // make AWS call
        const response = await this.Repository.receiveMessage(params).promise();
        this.TraceResponse(action, response);

        return response;
    }

    /**
     * Sends a message to a queue
     * @param queueUrl {string} Queue to send message to
     * @param messageBody {string} Body of message to send
     * @param delaySeconds {number} How long to delay sending message. Default is 0
     * @param messageAttributes {AWS.SQS.MessageBodyAttributeMap} Attributes to attach to the message
     */
    public async SendMessageAsync(queueUrl: string,
        messageBody: string,
        delaySeconds?: number,
        messageAttributes?: AWS.SQS.MessageBodyAttributeMap): Promise<AWS.SQS.SendMessageResult> {

        const action = `${SQSHelper.name}.${this.SendMessageAsync.name}`;
        this.TraceInputs(action, { queueUrl, messageBody, delaySeconds, messageAttributes });

        // guard clauses
        if (this.IsNullOrEmpty(queueUrl)) { throw new Error(`[${action}]-Must supply queueUrl`); }
        if (this.IsNullOrEmpty(messageBody)) { throw new Error(`[${action}]-Must supply messageBody`); }

        // set defaults
        if (!delaySeconds) { delaySeconds = 0; }

        // create params object
        const params: AWS.SQS.SendMessageRequest = {
            DelaySeconds: delaySeconds,
            MessageAttributes: messageAttributes,
            MessageBody: messageBody,
            QueueUrl: queueUrl,
        };
        this.TraceRequest(action, params);

        // make AWS call
        const response = await this.Repository.sendMessage(params).promise();
        this.TraceResponse(action, response);

        return response;
    }

    /**
     * Sends messages to a queue
     * @param queueUrl {string} Queue to send messages to
     * @param entries {AWS.SQS.SendMessageBatchRequestEntry[]} Messages to send
     */
    public async SendMessagesAsync(queueUrl: string,
        entries: AWS.SQS.SendMessageBatchRequestEntry[]): Promise<AWS.SQS.SendMessageBatchResult> {

        const action = `${SQSHelper.name}.${this.SendMessagesAsync.name}`;
        this.TraceInputs(action, { queueUrl });

        // guard clauses
        if (this.IsNullOrEmpty(queueUrl)) { throw new Error(`[${action}]-Must supply queueUrl`); }
        if (!entries || entries.length === 0) { throw new Error(`[${action}]-Must supply at least one entry`); }

        // create params object
        const params: AWS.SQS.SendMessageBatchRequest = {
            Entries: entries,
            QueueUrl: queueUrl,
        };
        this.TraceRequest(action, params);

        // make AWS call
        const response = await this.Repository.sendMessageBatch(params).promise();
        this.TraceResponse(action, response);

        return response;
    }
}