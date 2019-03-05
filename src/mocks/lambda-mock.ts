import { BaseMock } from './base-mock';

// tslint:disable-next-line: no-var-requires
const AWS = require('aws-sdk');

/**
 * Lambda Mock class
 */
export class LambdaMock extends BaseMock {

    /**
     * Mocks an AWS.Lambda.EventSourceMappingConfiguration response
     */
    public EventSourceMappingConfiguration: AWS.Lambda.EventSourceMappingConfiguration = {};

    /**
     * Mocks an AWS.Lambda.InvocationResponse response
     */
    public InvocationResponse: AWS.Lambda.InvocationResponse = {};

    /**
     * Mocks an AWS.Lambda.InvokeAsyncResponse response
     */
    public InvokeAsyncResponse: AWS.Lambda.InvokeAsyncResponse = {};

    /**
     * Mocks an AWS.Lambda.ListEventSourceMappingsResponse response
     */
    public ListEventSourceMappingsResponse: AWS.Lambda.ListEventSourceMappingsResponse = {};

    /**
     * Create the Lambda mock
     */
    protected CreateMock(returnError: boolean) {
        const rejectResponse = new Error(`AWS Error`);

        // implement the AWS responses
        const awsResponses = {
            // invoke sync response
            invoke: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<AWS.Lambda.InvocationResponse>(this.InvocationResponse);
                }),
            },
            // invoke async response
            invokeAsync: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<AWS.Lambda.InvokeAsyncResponse>(this.InvokeAsyncResponse);
                }),
            },
            // get event source mapping response
            getEventSourceMapping: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<AWS.Lambda.EventSourceMappingConfiguration>(this.EventSourceMappingConfiguration);
                }),
            },
             // list event source mappings response
             listEventSourceMappings: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<AWS.Lambda.ListEventSourceMappingsResponse>(this.ListEventSourceMappingsResponse);
                }),
            },
            // update event source mapping response
            updateEventSourceMapping: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<AWS.Lambda.EventSourceMappingConfiguration>(this.EventSourceMappingConfiguration);
                }),
            },
        };

        // create the functions
        let functions = new AWS.Lambda();
        functions = {
            invoke: () => awsResponses.invoke,
            invokeAsync: () => awsResponses.invokeAsync,
            getEventSourceMapping: () => awsResponses.getEventSourceMapping,
            listEventSourceMappings: () => awsResponses.listEventSourceMappings,
            updateEventSourceMapping: () => awsResponses.updateEventSourceMapping,
        };

        return functions;
    }
}
