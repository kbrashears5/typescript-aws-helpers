import { BaseMock } from './base-mock';

const AWS = require('aws-sdk');

/**
 * APIGateway Mock class
 */
export class APIGatewayMock extends BaseMock {

    /**
     * Mocks an AWS.APIGateway.ApiKey response
     */
    public ApiKey: AWS.APIGateway.ApiKey = {};

    /**
     * Mocks an AWS.APIGateway.DeleteApiKey response
     * Technically does not exist
     */
    public DeleteApiKey: object = {};

    /**
     * Mocks an AWS.APIGateway.DeleteUsagePlan response
     * Technically does not exist
     */
    public DeleteUsagePlan: object = {};

    /**
     * Mocks an AWS.APIGateway.DeleteUsagePlanKey response
     * Technically does not exist
     */
    public DeleteUsagePlanKey: object = {};

    /**
     * Mocks an AWS.APIGateway.UsagePlan response
     */
    public UsagePlan: AWS.APIGateway.UsagePlan = {};

    /**
     * Mocks an AWS.APIGateway.UsagePlanKey response
     */
    public UsagePlanKey: AWS.APIGateway.UsagePlanKey = {};



    /**
     * Create the APIGateway mock
     */
    protected CreateMock(returnError: boolean) {
        const rejectResponse = new Error(`AWS Error`);

        // implement the AWS responses
        const awsResponses = {
            // create api key response
            createApiKey: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<AWS.APIGateway.ApiKey>(this.ApiKey)
                })
            },
            // create usage plan response
            createUsagePlan: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<AWS.APIGateway.UsagePlan>(this.UsagePlan)
                })
            },
            // create usage plan key response
            createUsagePlanKey: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<AWS.APIGateway.UsagePlanKey>(this.UsagePlanKey)
                })
            },
            // delete api key response
            deleteApiKey: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<{}>(this.DeleteApiKey)
                })
            },
            // delete usage plan response
            deleteUsagePlan: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<{}>(this.DeleteUsagePlan)
                })
            },
            // delete usage plan key response
            deleteUsagePlanKey: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<{}>(this.DeleteUsagePlanKey)
                })
            },
        };

        // create the functions
        let functions = new AWS.APIGateway();
        functions = {
            createApiKey: () => awsResponses.createApiKey,
            createUsagePlan: () => awsResponses.createUsagePlan,
            createUsagePlanKey: () => awsResponses.createUsagePlanKey,
            deleteApiKey: () => awsResponses.deleteApiKey,
            deleteUsagePlan: () => awsResponses.deleteUsagePlan,
            deleteUsagePlanKey: () => awsResponses.deleteUsagePlanKey,
        };

        return functions;
    }
}
