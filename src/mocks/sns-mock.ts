import { BaseMock } from './base-mock';

// tslint:disable-next-line: no-var-requires
const AWS = require('aws-sdk');

/**
 * SNS Mock class
 */
export class SNSMock extends BaseMock {

    /**
     * Mocks an AWS.SNS.PublishResponse response
     */
    public PublishResponse: AWS.SNS.PublishResponse = {};

    /**
     * Create the SNS mock
     */
    protected CreateMock(returnError: boolean) {
        const rejectResponse = new Error(`AWS Error`);

        // implement the AWS responses
        const awsResponses = {
            // publish response
            publish: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<AWS.SNS.PublishResponse>(this.PublishResponse);
                }),
            },
        };

        // create the functions
        let functions = new AWS.SNS();
        functions = {
            publish: () => awsResponses.publish,
        };

        return functions;
    }
}
