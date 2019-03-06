import { BaseMock } from './base-mock';

// tslint:disable-next-line: no-var-requires
const AWS = require('aws-sdk');

/**
 * STS Mock class
 */
export class STSMock extends BaseMock {

    /**
     * Mocks an AWS.STS.AssumeRoleResponse response
     */
    public AssumeRoleResponse: AWS.STS.AssumeRoleResponse = {};

    /**
     * Create the STS mock
     */
    protected CreateMock(returnError: boolean) {
        const rejectResponse = new Error(`AWS Error`);

        // implement the AWS responses
        const awsResponses = {
            // assume role response
            assumeRole: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<AWS.STS.AssumeRoleResponse>(this.AssumeRoleResponse);
                }),
            },
        };

        // create the functions
        let functions = new AWS.STS();
        functions = {
            assumeRole: () => awsResponses.assumeRole,
        };

        return functions;
    }
}
