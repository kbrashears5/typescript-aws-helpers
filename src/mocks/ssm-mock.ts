import { BaseMock } from './base-mock';

// tslint:disable-next-line: no-var-requires
const AWS = require('aws-sdk');

/**
 * SSM Mock class
 */
export class SSMMock extends BaseMock {

    /**
     * Mocks an AWS.SSM.CancelCommandResult response
     */
    public CancelCommandResult: AWS.SSM.CancelCommandResult = {};

    /**
     * Mocks an AWS.SSM.DeleteParameterResult response
     */
    public DeleteParameterResult: AWS.SSM.DeleteParameterResult = {};

    /**
     * Mocks an AWS.SSM.GetParameterResult response
     */
    public GetParameterResult: AWS.SSM.GetParameterResult = {};

    /**
     * Mocks an AWS.SSM.GetParametersByPathResult response
     */
    public GetParametersByPathResult: AWS.SSM.GetParametersByPathResult = {};

    /**
     * Mocks an AWS.SSM.PutParameterResult response
     */
    public PutParameterResult: AWS.SSM.PutParameterResult = {};

    /**
     * Mocks an AWS.SSM.SendCommandResult response
     */
    public SendCommandResult: AWS.SSM.SendCommandResult = {};

    /**
     * Create the SSM mock
     */
    protected CreateMock(returnError: boolean) {
        const rejectResponse = new Error(`AWS Error`);

        // implement the AWS responses
        const awsResponses = {
            // cancel command response
            cancelCommand: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<AWS.SSM.CancelCommandResult>(this.CancelCommandResult);
                }),
            },
            // delete parameter response
            deleteParameter: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<AWS.SSM.DeleteParameterResult>(this.DeleteParameterResult);
                }),
            },
            // get parameter response
            getParameter: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<AWS.SSM.GetParameterResult>(this.GetParameterResult);
                }),
            },
            // get parameters by path response
            getParametersByPath: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<AWS.SSM.GetParametersByPathResult>(this.GetParametersByPathResult);
                }),
            },
            // put parameter response
            putParameter: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<AWS.SSM.PutParameterResult>(this.PutParameterResult);
                }),
            },
             // send command response
             sendCommand: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<AWS.SSM.SendCommandResult>(this.SendCommandResult);
                }),
            },
        };

        // create the functions
        let functions = new AWS.SSM();
        functions = {
            cancelCommand: () => awsResponses.cancelCommand,
            deleteParameter: () => awsResponses.deleteParameter,
            getParameter: () => awsResponses.getParameter,
            getParametersByPath: () => awsResponses.getParametersByPath,
            putParameter: () => awsResponses.putParameter,
            sendCommand: () => awsResponses.sendCommand,
        };

        return functions;
    }
}
