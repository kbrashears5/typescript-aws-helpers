import { BaseMock } from './base-mock';

const AWS = require('aws-sdk');

/**
 * S3 Mock class
 */
export class S3Mock extends BaseMock {

    /**
     * Mock an AWS.S3.CopyObjectOutput response
     */
    public CopyObjectOutput: AWS.S3.CopyObjectOutput = {};

    /**
     * Mock an AWS.S3.CreateBucketOutput response
     */
    public CreateBucketOutput: AWS.S3.CreateBucketOutput = {};

    /**
     * Mock an AWS.S3.DeleteBucketOutput response
     * Technically does not exist
     */
    public DeleteBucketOutput: object = {};

    /**
     * Mock an AWS.S3.DeleteObjectOutput response
     */
    public DeleteObjectOutput: AWS.S3.DeleteObjectOutput = {};

    /**
     * Mock an AWS.S3.DeleteObjectsOutput response
     */
    public DeleteObjectsOutput: AWS.S3.DeleteObjectsOutput = {};

    /**
     * Mock an AWS.S3.GetObjectOutput response
     */
    public GetObjectOutput: AWS.S3.GetObjectOutput = { Body: 'mock-body' };

    /**
     * Mocks an AWS.S3.PutOjbectOutput response
     */
    public PutObjectOutput: AWS.S3.PutObjectOutput = {};

    /**
     * Create the S3 mock
     */
    protected CreateMock(returnError: boolean) {
        const rejectResponse = new Error(`AWS Error`);

        // implement the AWS responses
        const awsResponses = {
            // copy object response
            copyObject: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<AWS.S3.CopyObjectOutput>(this.CopyObjectOutput)
                })
            },
            // create bucket response
            createBucket: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<AWS.S3.CreateBucketOutput>(this.CreateBucketOutput)
                })
            },
            // delete bucket response
            deleteBucket: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<{}>(this.DeleteBucketOutput)
                })
            },
            // delete object response
            deleteObject: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<AWS.S3.DeleteObjectOutput>(this.DeleteObjectOutput)
                })
            },
            // delete objects response
            deleteObjects: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<AWS.S3.DeleteObjectsOutput>(this.DeleteObjectsOutput)
                })
            },
            // get object response
            getObject: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<AWS.S3.GetObjectOutput>(this.GetObjectOutput)
                })
            },
            // put object response
            putObject: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<AWS.S3.PutObjectOutput>(this.PutObjectOutput)
                })
            }
        };

        // create the functions
        let functions = new AWS.S3();
        functions = {
            copyObject: () => awsResponses.copyObject,
            createBucket: () => awsResponses.createBucket,
            deleteBucket: () => awsResponses.deleteBucket,
            deleteObject: () => awsResponses.deleteObject,
            deleteObjects: () => awsResponses.deleteObjects,
            getObject: () => awsResponses.getObject,
            putObject: () => awsResponses.putObject,
        };

        return functions;
    }
}
