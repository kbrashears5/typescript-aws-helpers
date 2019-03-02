import { BaseMock } from './base-mock';

const AWS = require('aws-sdk');

/**
 * CloudWatch Mock class
 */
export class CloudWatchMock extends BaseMock {

    /**
     * Mocks an AWS.CloudWatch.PutMetricDataResponse response
     * Technically doesn't exist
     */
    public PutMetricDataResponse: object = {};

    /**
     * Create the CloudWatch mock
     */
    protected CreateMock(returnError: boolean) {
        const rejectResponse = new Error(`AWS Error`);

        // implement the AWS responses
        const awsResponses = {
            // put metric data response
            putMetricData: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<{}>(this.PutMetricDataResponse)
                })
            },
        };

        // create the functions
        let functions = new AWS.CloudWatch();
        functions = {
            putMetricData: () => awsResponses.putMetricData,
        };

        return functions;
    }
}
