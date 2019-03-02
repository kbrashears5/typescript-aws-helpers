import { BaseMock } from './base-mock';

const AWS = require('aws-sdk');

/**
 * DynamoDB Mock class
 */
export class DynamoDBMock extends BaseMock {

    /**
     * Mocks an AWS.DynamoDB.DocumentClient.DeleteItemOutput response
     */
    public DeleteItemOutput: AWS.DynamoDB.DocumentClient.DeleteItemOutput = {};

    /**
     * Mocks an AWS.DynamoDB.DocumentClient.GetItemOutput response
     */
    public GetItemOutput: AWS.DynamoDB.DocumentClient.GetItemOutput = {};

    /**
     * Mocks an AWS.DynamoDB.DocumentClient.PutItemOutput response
     */
    public PutItemOutput: AWS.DynamoDB.DocumentClient.PutItemOutput = {};

    /**
     * Mocks an AWS.DynamoDB.DocumentClient.ScanOutput response
     */
    public ScanOutput: AWS.DynamoDB.DocumentClient.ScanOutput = {};

    /**
     * Create the DynamoDB mock
     */
    protected CreateMock(returnError: boolean) {
        const rejectResponse = new Error(`AWS Error`);

        // implement the AWS responses
        const awsResponses = {
            // delete response
            delete: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<AWS.DynamoDB.DocumentClient.DeleteItemOutput>(this.DeleteItemOutput)
                })
            },
            // get response
            get: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<AWS.DynamoDB.DocumentClient.GetItemOutput>(this.GetItemOutput)
                })
            },
            // put response
            put: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<AWS.DynamoDB.DocumentClient.PutItemOutput>(this.PutItemOutput)
                })
            },
            // scan response
            scan: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<AWS.DynamoDB.DocumentClient.ScanOutput>(this.ScanOutput)
                })
            },
        };

        // create the functions
        let functions = new AWS.DynamoDB.DocumentClient();
        functions = {
            delete: () => awsResponses.delete,
            get: () => awsResponses.get,
            put: () => awsResponses.put,
            scan: () => awsResponses.scan,
        };

        return functions;
    }
}
