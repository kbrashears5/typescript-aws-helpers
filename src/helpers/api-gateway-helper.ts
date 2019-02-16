import { BaseHelper } from './base-helper';
import { ILogger } from '../logger';
import * as AWS from 'aws-sdk';

/**
 * APIGateway Helper
 */
export class APIGatewayHelper extends BaseHelper {

    /**
     * AWS Repository for APIGateway
     */
    private Repository: AWS.APIGateway;

    /**
     * Initializes new instance of APIGatewayHelper
     * @param logger {ILogger} Injected logger
     * @param repository {AWS.APIGateway} Injected Repository. A new repository will be created if not supplied
     * @param options {AWS.APIGateway.ClientConfiguration} Injected configuration if a Repository is supplied
     */
    constructor(logger: ILogger,
        repository?: AWS.APIGateway,
        options?: AWS.APIGateway.ClientConfiguration) {

        super(logger);
        this.Repository = repository || new AWS.APIGateway(options);
    }

    /**
     * Create an API key
     * @param name {string} Name of new API key
     * @param description {string} Description of new API key
     * @param value {string} Value to give new API key. If not provided, will be auto generated
     */
    public async CreateApiKeyAsync(name: string,
        description: string,
        value?: string): Promise<AWS.APIGateway.ApiKey> {

        const action = `${APIGatewayHelper.name}.${this.CreateApiKeyAsync.name}`;
        this.TraceInputs(action, { name, description, value });

        // guard clauses
        if (this.IsNullOrEmpty(name)) { throw new Error(`[${action}]-Must supply name`); }
        if (this.IsNullOrEmpty(description)) { throw new Error(`[${action}]-Must supply description`); }

        // create params object
        const params: AWS.APIGateway.CreateApiKeyRequest = {
            description,
            name,
        };
        if (this.IsNullOrEmpty(value)) { params.generateDistinctId = true } else { params.value = value; }
        this.TraceRequest(action, params);

        // make AWS call
        const response = await this.Repository.createApiKey(params).promise();
        this.TraceResponse(action, response);

        return response;
    }

    /**
     * Create an usage plan
     * @param name {string} Usage plan name
     * @param description {string} Usage plan description
     * @param apiStages {AWS.APIGateway.ApiStage[]} API stages to attach this usage plan to
     * @param quota {AWS.APIGateway.QuotaSettings} Quota settings
     * @param throttle {AWS.APIGateway.ThrottleSettings} Throttle settings
     */
    public async CreateUsagePlanAsync(name: string,
        description: string,
        apiStages: AWS.APIGateway.ApiStage[],
        quota?: AWS.APIGateway.QuotaSettings,
        throttle?: AWS.APIGateway.ThrottleSettings): Promise<AWS.APIGateway.UsagePlan> {

        const action = `${APIGatewayHelper.name}.${this.CreateUsagePlanAsync.name}`;
        this.TraceInputs(action, { name, description, apiStages, quota, throttle });

        // guard clauses
        if (this.IsNullOrEmpty(name)) { throw new Error(`[${action}]-Must supply name`); }
        if (this.IsNullOrEmpty(description)) { throw new Error(`[${action}]-Must supply description`); }
        if (!apiStages || apiStages.length === 0) { throw new Error(`[${action}]-Must supply at least one apiStage`); }

        // create params object
        const params: AWS.APIGateway.CreateUsagePlanRequest = {
            apiStages,
            description,
            name,
            quota,
            throttle,
        };
        this.TraceRequest(action, params);

        // make AWS call
        const response = await this.Repository.createUsagePlan(params).promise();
        this.TraceResponse(action, response);

        return response;
    }

    /**
     * Create an usage plan key
     * @param keyId {string} ID of usage plan key
     * @param keyType {string} Type of key to create
     * @param usagePlanId {string} Usage plan id to associate with
     */
    public async CreateUsagePlanKeyAsync(keyId: string,
        keyType: string,
        usagePlanId: string): Promise<AWS.APIGateway.UsagePlanKey> {

        const action = `${APIGatewayHelper.name}.${this.CreateUsagePlanKeyAsync.name}`;
        this.TraceInputs(action, { keyId, keyType, usagePlanId });

        // guard clauses
        if (this.IsNullOrEmpty(keyId)) { throw new Error(`[${action}]-Must supply keyId`); }
        if (this.IsNullOrEmpty(keyType)) { throw new Error(`[${action}]-Must supply keyType`); }
        if (this.IsNullOrEmpty(usagePlanId)) { throw new Error(`[${action}]-Must supply usagePlanId`); }

        // create params object
        const params: AWS.APIGateway.CreateUsagePlanKeyRequest = {
            keyId,
            keyType,
            usagePlanId,
        };
        this.TraceRequest(action, params);

        // make AWS call
        const response = await this.Repository.createUsagePlanKey(params).promise();
        this.TraceResponse(action, response);

        return response;
    }
}