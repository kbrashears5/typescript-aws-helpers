import { BaseMock } from './base-mock';
import { GetObjectOutput, PutObjectOutput, CopyObjectOutput } from 'aws-sdk/clients/s3';

const AWS = require('aws-sdk');

/**
 * S3 Mock class
 */
export class S3Mock extends BaseMock {

    /**
     * Mock an AWS.S3.CopyObjectOutput response
     */
    public CopyObjectOutput: CopyObjectOutput = {};

    /**
     * Mock an AWS.S3.GetObjectOutput response
     */
    public GetObjectOutput: GetObjectOutput = { Body: 'mock-body' };

    /**
     * Mocks an AWS.S3.PutOjbectOutput response
     */
    public PutObjectOutput: PutObjectOutput = {};

    /**
     * Create the S3 mock
     */
    protected CreateMock(returnError: boolean) {
        const rejectResponse = new Error(`AWS Error`);

        // implement the AWS responses
        const awsResponses = {
            copyObject: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<CopyObjectOutput>(this.CopyObjectOutput)
                })
            },
            getObject: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<GetObjectOutput>(this.GetObjectOutput)
                })
            },
            putObject: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<PutObjectOutput>(this.PutObjectOutput)
                })
            }
        };

        // create the functions
        let functions = new AWS.S3();
        functions = {
            copyObject: () => awsResponses.copyObject,
            getObject: () => awsResponses.getObject,
            putObject: () => awsResponses.putObject,
        };

        return functions;
    }
}
