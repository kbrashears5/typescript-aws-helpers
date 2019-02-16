import { BaseMock } from './base-mock';

const AWS = require('aws-sdk');

/**
 * S3 Mock class
 */
export class SQSMock extends BaseMock {

    /**
     * Mocks an AWS.SQS.DeleteMessageOutput response
     * Technically doesn't exist
     */
    public DeleteMessageOutput: object = {};

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
                        Promise.resolve<{}>(this.DeleteMessageOutput)
                })
            },
        };

        // create the functions
        let functions = new AWS.S3();
        functions = {
            deleteMessage: () => awsResponses.deleteMessage,
        };

        return functions;
    }
}
