import * as AWS from 'aws-sdk';
import {v4} from 'uuid';
import { ILogger } from '../logger';
import { BaseHelper } from './base';

/**
 * STS Helper
 */
export class STSHelper extends BaseHelper {

    /**
     * AWS Repository for STS
     */
    private Repository: AWS.STS;

    /**
     * Initializes new instance of STSHelper
     * @param logger {ILogger} Injected logger
     * @param repository {AWS.STS} Injected Repository. A new repository will be created if not supplied
     * @param options {AWS.STS.ClientConfiguration} Injected configuration if a Repository is supplied
     */
    constructor(logger: ILogger,
                repository?: AWS.STS,
                options?: AWS.STS.ClientConfiguration) {

        super(logger);
        this.Repository = repository || new AWS.STS(options);
    }

    /**
     * Assume role in your account or another
     * @param roleArn {string} Role ARN to assume
     */
    public async AssumeRoleAsync(roleArn: string): Promise<AWS.STS.AssumeRoleResponse> {

        const action = `${STSHelper.name}.${this.AssumeRoleAsync.name}`;
        this.TraceInputs(action, { roleArn });

        // guard clauses
        if (this.IsNullOrEmpty(roleArn)) { throw new Error(`[${action}]-Must supply roleArn`); }

        // create params object
        const params: AWS.STS.AssumeRoleRequest = {
            RoleArn: roleArn,
            RoleSessionName: v4(),
        };
        this.TraceRequest(action, params);

        // make AWS call
        const response = await this.Repository.assumeRole(params).promise();
        this.TraceResponse(action, response);

        return response;
    }
}
