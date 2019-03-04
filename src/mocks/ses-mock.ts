import { BaseMock } from './base-mock';

const AWS = require('aws-sdk');

/**
 * SES Mock class
 */
export class SESMock extends BaseMock {

    /**
     * Mocks an AWS.SES.SendEmailResponse response
     */
    public SendEmailResponse: AWS.SES.SendEmailResponse = { MessageId: 'message-id' };

    /**
     * Create the SES mock
     */
    protected CreateMock(returnError: boolean) {
        const rejectResponse = new Error(`AWS Error`);

        // implement the AWS responses
        const awsResponses = {
            // send email response
            sendEmail: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<AWS.SES.SendEmailResponse>(this.SendEmailResponse)
                })
            },
        };

        // create the functions
        let functions = new AWS.SES();
        functions = {
            sendEmail: () => awsResponses.sendEmail,
        };

        return functions;
    }
}
