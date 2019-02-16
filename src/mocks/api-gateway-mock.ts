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
        };

        // create the functions
        let functions = new AWS.APIGateway();
        functions = {
            createApiKey: () => awsResponses.createApiKey,
            createUsagePlan: () => awsResponses.createUsagePlan,
            createUsagePlanKey: () => awsResponses.createUsagePlanKey,
        };

        return functions;
    }
}
