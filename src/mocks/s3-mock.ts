import { BaseMock } from './base-mock';
import { GetObjectOutput, PutObjectOutput, CopyObjectOutput, CreateBucketOutput, DeleteObjectOutput, DeleteObjectsOutput } from 'aws-sdk/clients/s3';

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
     * Mock an AWS.S3.CreateBucketOutput response
     */
    public CreateBucketOutput: CreateBucketOutput = {};

    /**
     * Mock an AWS.S3.DeleteBucketOutput response
     * Technically does not exist
     */
    public DeleteBucketOutput: object = {};

    /**
     * Mock an AWS.S3.DeleteObjectOutput response
     */
    public DeleteObjectOutput: DeleteObjectOutput = {};

    /**
     * Mock an AWS.S3.DeleteObjectsOutput response
     */
    public DeleteObjectsOutput: DeleteObjectsOutput = {};

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
            // copy object response
            copyObject: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<CopyObjectOutput>(this.CopyObjectOutput)
                })
            },
            // create bucket response
            createBucket: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<CreateBucketOutput>(this.CreateBucketOutput)
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
                        Promise.resolve<DeleteObjectOutput>(this.DeleteObjectOutput)
                })
            },
            // delete objects response
            deleteObjects: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<DeleteObjectsOutput>(this.DeleteObjectsOutput)
                })
            },
            // get object response
            getObject: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<GetObjectOutput>(this.GetObjectOutput)
                })
            },
            // put object response
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
