import { BaseMock } from './base-mock';

// tslint:disable-next-line: no-var-requires
const AWS = require('aws-sdk');

/**
 * SQS Mock class
 */
export class SQSMock extends BaseMock {

    /**
     * Mocks an AWS.SQS.DeleteMessageOutput response
     * Technically doesn't exist
     */
    public DeleteMessageOutput: object = {};

    /**
     * Mocks an AWS.SQS.DeleteMessageBatchResult response
     */
    public DeleteMessageBatchResult: AWS.SQS.DeleteMessageBatchResult = { Failed: [], Successful: [] };

    /**
     * Mocks an AWS.SQS.PurgeQueueResult response
     * Technically doesn't exist
     */
    public PurgeQueueResult: object = {};

    /**
     * Mocks an AWS.SQS.ReceiveMessageResult
     */
    public ReceiveMessageResult: AWS.SQS.ReceiveMessageResult = { Messages: [] };

    /**
     * Mocks an AWS.SQS.SendMessageResult
     */
    public SendMessageResult: AWS.SQS.SendMessageResult = {};

    /**
     * Mocks an AWS.SQS.SendMessageBatchResult
     */
    public SendMessageBatchResult: AWS.SQS.SendMessageBatchResult = { Failed: [], Successful: [] };

    /**
     * Create the SQS mock
     */
    protected CreateMock(returnError: boolean) {
        const rejectResponse = new Error(`AWS Error`);

        // implement the AWS responses
        const awsResponses = {
            // delete message response
            deleteMessage: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<{}>(this.DeleteMessageOutput);
                }),
            },
            // delete messages response
            deleteMessageBatch: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<AWS.SQS.DeleteMessageBatchResult>(this.DeleteMessageBatchResult);
                }),
            },
            // purge queue response
            purgeQueue: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<{}>(this.PurgeQueueResult);
                }),
            },
            // receive message response
            receiveMessage: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<AWS.SQS.ReceiveMessageResult>(this.ReceiveMessageResult);
                }),
            },
            // send message response
            sendMessage: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<AWS.SQS.SendMessageResult>(this.SendMessageResult);
                }),
            },
            // send messages response
            sendMessageBatch: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<AWS.SQS.SendMessageBatchResult>(this.SendMessageBatchResult);
                }),
            },
        };

        // create the functions
        let functions = new AWS.SQS();
        functions = {
            deleteMessage: () => awsResponses.deleteMessage,
            deleteMessageBatch: () => awsResponses.deleteMessageBatch,
            purgeQueue: () => awsResponses.purgeQueue,
            receiveMessage: () => awsResponses.receiveMessage,
            sendMessage: () => awsResponses.sendMessage,
            sendMessageBatch: () => awsResponses.sendMessageBatch,
        };

        return functions;
    }
}
