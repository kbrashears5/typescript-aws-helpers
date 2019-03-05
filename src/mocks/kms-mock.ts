import { BaseMock } from './base-mock';

// tslint:disable-next-line: no-var-requires
const AWS = require('aws-sdk');

/**
 * KMS Mock class
 */
export class KMSMock extends BaseMock {

    /**
     * Mocks an AWS.KMS.DecryptResponse response
     */
    public DecryptResponse: AWS.KMS.DecryptResponse = {};

    /**
     * Mocks an AWS.KMS.EncryptResponse response
     */
    public EncryptResponse: AWS.KMS.EncryptResponse = {};

    /**
     * Create the KMS mock
     */
    protected CreateMock(returnError: boolean) {
        const rejectResponse = new Error(`AWS Error`);

        // implement the AWS responses
        const awsResponses = {
            // decrypt response
            decrypt: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<AWS.KMS.DecryptResponse>(this.DecryptResponse);
                }),
            },
            // encrypt response
            encrypt: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<AWS.KMS.EncryptResponse>(this.EncryptResponse);
                }),
            },
        };

        // create the functions
        let functions = new AWS.KMS();
        functions = {
            decrypt: () => awsResponses.decrypt,
            encrypt: () => awsResponses.encrypt,
        };

        return functions;
    }
}
