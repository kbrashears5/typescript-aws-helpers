import { BaseHelper } from './base-helper';
import { ILogger } from '../logger';
import * as AWS from 'aws-sdk';
import { Any } from '../interfaces';

/**
 * DynamoDB Helper
 */
export class DynamoDBHelper extends BaseHelper {

    /**
     * AWS Repository for DynamoDB
     */
    private Repository: AWS.DynamoDB;

    /**
     * Initializes new instance of DynamoDBHelper
     * @param logger {ILogger} Injected logger
     * @param repository {AWS.DynamoDB} Injected Repository. A new repository will be created if not supplied
     * @param options {AWS.DynamoDB.ClientConfiguration} Injected configuration if a Repository is supplied
     */
    constructor(logger: ILogger,
        repository?: AWS.DynamoDB,
        options?: AWS.DynamoDB.ClientConfiguration) {

        super(logger);
        this.Repository = repository || new AWS.DynamoDB(options);
    }

    /**
     * Delete an item
     * @param tableName {string} Table name to delete from
     * @param key {AWS.DynamoDB.AttributeMap} Key of item to delete
     */
    public async DeleteItemByKeyAsync(tableName: string,
        keyName: string,
        keyValue: string | number): Promise<AWS.DynamoDB.DeleteItemOutput> {

        const action = `${DynamoDBHelper.name}.${this.DeleteItemByKeyAsync.name}`;
        this.TraceInputs(action, { tableName, keyName, keyValue });

        // guard clauses
        if (this.IsNullOrEmpty(tableName)) { throw new Error(`[${action}]-Must supply tableName`); }
        if (this.IsNullOrEmpty(keyName)) { throw new Error(`[${action}]-Must supply keyName`); }
        if (this.IsNullOrEmpty(keyValue.toString())) { throw new Error(`[${action}]-Must supply keyValue`); }

        // create attribute map
        const attributeMap: Any = {};
        attributeMap[keyName] = keyValue;

        // create params object
        const params: AWS.DynamoDB.DeleteItemInput = {
            Key: attributeMap,
            TableName: tableName,
        };
        this.TraceRequest(action, params);

        // make AWS call
        const response = await this.Repository.deleteItem(params).promise();
        this.TraceResponse(action, response);

        return response;
    }

}