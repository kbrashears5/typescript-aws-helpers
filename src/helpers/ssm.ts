import * as AWS from 'aws-sdk';
import { ILogger } from '../logger';
import { BaseHelper } from './base';

/**
 * SSM Helper
 */
export class SSMHelper extends BaseHelper {

    /**
     * AWS Repository for SSM
     */
    private Repository: AWS.SSM;

    /**
     * Initializes new instance of SSMHelper
     * @param logger {ILogger} Injected logger
     * @param repository {AWS.SSM} Injected Repository. A new repository will be created if not supplied
     * @param options {AWS.SSM.ClientConfiguration} Injected configuration if a Repository is supplied
     */
    constructor(logger: ILogger,
                repository?: AWS.SSM,
                options?: AWS.SSM.ClientConfiguration) {

        super(logger);
        this.Repository = repository || new AWS.SSM(options);
    }

    /**
     * Cancel document command
     * @param commandId {string} Command id to cancel
     */
    public async CancelCommandAsync(commandId: string): Promise<AWS.SSM.CancelCommandResult> {

        const action = `${SSMHelper.name}.${this.CancelCommandAsync.name}`;
        this.TraceInputs(action, { commandId });

        // guard clauses
        if (this.IsNullOrEmpty(commandId)) { throw new Error(`[${action}]-Must supply commandId`); }

        // create params object
        const params: AWS.SSM.CancelCommandRequest = {
            CommandId: commandId,
        };
        this.TraceRequest(action, params);

        // make AWS call
        const response = await this.Repository.cancelCommand(params).promise();
        this.TraceResponse(action, response);

        return response;
    }

    /**
     * Delete parameter from Parameter Store
     * @param name {string} Parameter name to delete
     */
    public async DeleteParameterAsync(name: string): Promise<AWS.SSM.DeleteParameterResult> {

        const action = `${SSMHelper.name}.${this.DeleteParameterAsync.name}`;
        this.TraceInputs(action, { name });

        // guard clauses
        if (this.IsNullOrEmpty(name)) { throw new Error(`[${action}]-Must supply name`); }

        // create params object
        const params: AWS.SSM.DeleteParameterRequest = {
            Name: name,
        };
        this.TraceRequest(action, params);

        // make AWS call
        const response = await this.Repository.deleteParameter(params).promise();
        this.TraceResponse(action, response);

        return response;
    }

    /**
     * Get parameter from Parameter Store
     * @param name {string} Parameter name to get
     */
    public async GetParameterAsync(name: string): Promise<AWS.SSM.GetParameterResult> {

        const action = `${SSMHelper.name}.${this.GetParameterAsync.name}`;
        this.TraceInputs(action, { name });

        // guard clauses
        if (this.IsNullOrEmpty(name)) { throw new Error(`[${action}]-Must supply name`); }

        // create params object
        const params: AWS.SSM.GetParameterRequest = {
            Name: name,
        };
        this.TraceRequest(action, params);

        // make AWS call
        const response = await this.Repository.getParameter(params).promise();
        this.TraceResponse(action, response);

        return response;
    }

    /**
     * Recursively gets all parameters by path
     * @param path {string} Path hierarchy of parameters to get
     * @param nextToken {string} NextToken of response. Supplied by recursion
     */
    public async GetParametersByPathAsync(path: string,
                                          nextToken?: string): Promise<AWS.SSM.GetParametersByPathResult> {

        const action = `${SSMHelper.name}.${this.GetParametersByPathAsync.name}`;
        this.TraceInputs(action, { path });

        // guard clauses
        if (this.IsNullOrEmpty(path)) { throw new Error(`[${action}]-Must supply path`); }

        // create params object
        const params: AWS.SSM.GetParametersByPathRequest = {
            Path: path,
            Recursive: true,
            WithDecryption: true,
        };
        if (this.IsNullOrEmpty(nextToken)) { params.NextToken = nextToken; }
        this.TraceRequest(action, params);

        // make AWS call
        const response = await this.Repository.getParametersByPath(params).promise();
        this.TraceResponse(action, response);

        // recursively call the function if NextToken is present
        if (response.NextToken && response.Parameters) {
            const nextParameters = await this.GetParametersByPathAsync(path,
                response.NextToken);

            if (nextParameters.Parameters) {
                for (const parameter of nextParameters.Parameters) {
                    response.Parameters.push(parameter);
                }
            }
        }

        return response;
    }

    /**
     * Put a parameter into Parameter Store
     * @param name {string} Parameter name
     * @param value {string} Value to give parameter
     * @param type {string} Type to give parameter
     * @param description {string} Description to give value
     * @param kmsKeyId {string} KMS Key ID to encrypt Secure Strings with
     */
    public async PutParameterAsync(name: string,
                                   value: string,
                                   type: string,
                                   description: string,
                                   kmsKeyId?: string): Promise<AWS.SSM.PutParameterResult> {

        const action = `${SSMHelper.name}.${this.PutParameterAsync.name}`;
        this.TraceInputs(action, { name, value, type, description, kmsKeyId });

        // guard clauses
        if (this.IsNullOrEmpty(name)) { throw new Error(`[${action}]-Must supply name`); }
        if (this.IsNullOrEmpty(value)) { throw new Error(`[${action}]-Must supply value`); }
        if (this.IsNullOrEmpty(type)) { throw new Error(`[${action}]-Must supply type`); }

        // create params object
        const params: AWS.SSM.PutParameterRequest = {
            Description: description,
            KeyId: kmsKeyId,
            Name: name,
            Type: type,
            Value: value,
        };
        this.TraceRequest(action, params);

        // make AWS call
        const response = await this.Repository.putParameter(params).promise();
        this.TraceResponse(action, response);

        return response;
    }

    /**
     * Send command to execute a document on list of instances
     * @param documentName {string} Document name to execute
     * @param parameters {AWS.SSM.Parameters} Parameters to send to document
     * @param instanceIds {string[]} Array of instance ids to execute command on
     * @param logGroupName {string} Optional name of CloudWatch Log Group
     */
    public async SendCommandAsync(documentName: string,
                                  parameters: AWS.SSM.Parameters,
                                  instanceIds: string[],
                                  logGroupName?: string): Promise<AWS.SSM.SendCommandResult> {

        const action = `${SSMHelper.name}.${this.SendCommandAsync.name}`;
        this.TraceInputs(action, { documentName, parameters, instanceIds, logGroupName });

        // guard clauses
        if (this.IsNullOrEmpty(documentName)) { throw new Error(`[${action}]-Must supply documentName`); }
        if (this.IsNullOrEmpty(parameters)) { throw new Error(`[${action}]-Must supply parameters`); }
        if (this.IsNullOrEmpty(instanceIds)) { throw new Error(`[${action}]-Must supply at least one instanceId`); }

        // create params object
        const params: AWS.SSM.SendCommandRequest = {
            DocumentName: documentName,
            InstanceIds: instanceIds,
            Parameters: parameters,
        };
        if (this.IsNullOrEmpty(logGroupName)) { params.CloudWatchOutputConfig = { CloudWatchLogGroupName: logGroupName, CloudWatchOutputEnabled: true }; }
        this.TraceRequest(action, params);

        // make AWS call
        const response = await this.Repository.sendCommand(params).promise();
        this.TraceResponse(action, response);

        return response;
    }
}
