import { BaseMock } from './base-mock';

const AWS = require('aws-sdk');

/**
 * DynamoDB Mock class
 */
export class DynamoDBMock extends BaseMock {

    /**
     * Mocks an AWS.DynamoDB.DeleteItemOutput response
     */
    public DeleteItemOutput: AWS.DynamoDB.DeleteItemOutput = {};

    /**
     * Create the DynamoDB mock
     */
    protected CreateMock(returnError: boolean) {
        const rejectResponse = new Error(`AWS Error`);

        // implement the AWS responses
        const awsResponses = {
            // delete item response
            deleteItem: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<AWS.DynamoDB.DeleteItemOutput>(this.DeleteItemOutput)
                })
            },
        };

        // create the functions
        let functions = new AWS.DynamoDB();
        functions = {
            deleteItem: () => awsResponses.deleteItem,
        };

        return functions;
    }
}
