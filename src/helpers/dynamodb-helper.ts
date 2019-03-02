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
    private Repository: AWS.DynamoDB.DocumentClient;

    /**
     * Initializes new instance of DynamoDBHelper
     * @param logger {ILogger} Injected logger
     * @param repository {AWS.DynamoDB.DocumentClient} Injected Repository. A new repository will be created if not supplied
     * @param options {AWS.DynamoDB.ClientConfiguration} Injected configuration if a Repository is supplied
     */
    constructor(logger: ILogger,
        repository?: AWS.DynamoDB.DocumentClient,
        options?: AWS.DynamoDB.ClientConfiguration) {

        super(logger);
        this.Repository = repository || new AWS.DynamoDB.DocumentClient(options);
    }

    /**
     * Delete an item by key
     * @param tableName {string} Table name to delete from
     * @param keyName {string} Name of key column
     * @param keyValue {string | number} Value of key column
     */
    public async DeleteItemByKeyAsync(tableName: string,
        keyName: string,
        keyValue: string | number): Promise<AWS.DynamoDB.DocumentClient.DeleteItemOutput> {

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
        const params: AWS.DynamoDB.DocumentClient.DeleteItemInput = {
            Key: attributeMap,
            TableName: tableName,
        };
        this.TraceRequest(action, params);

        // make AWS call
        const response = await this.Repository.delete(params).promise();
        this.TraceResponse(action, response);

        return response;
    }

    // /**
    //  * Delete an item by condition expression
    //  * @param tableName {string} Table name to delete from
    //  * @param expression 
    //  * @param attributeNames 
    //  * @param attributeValues 
    //  */
    // public async DeleteItemByConditionAsync(tableName: string,
    //     expression: string,
    //     attributeNames: AWS.DynamoDB.DocumentClient.ExpressionAttributeNameMap,
    //     attributeValues: AWS.DynamoDB.DocumentClient.ExpressionAttributeValueMap): Promise<AWS.DynamoDB.DocumentClient.DeleteItemOutput> {

    //     const action = `${DynamoDBHelper.name}.${this.DeleteItemByKeyAsync.name}`;
    //     this.TraceInputs(action, { tableName, expression, attributeNames, attributeValues });

    //     // guard clauses
    //     if (this.IsNullOrEmpty(tableName)) { throw new Error(`[${action}]-Must supply tableName`); }
    //     if (this.IsNullOrEmpty(expression)) { throw new Error(`[${action}]-Must supply expression`); }
    //     if (this.IsNullOrEmpty(attributeNames)) { throw new Error(`[${action}]-Must supply attributeNames`); }
    //     if (this.IsNullOrEmpty(attributeValues)) { throw new Error(`[${action}]-Must supply attributeValues`); }

    //     // create params object
    //     const params: AWS.DynamoDB.DocumentClient.DeleteItemInput = {
    //         ConditionExpression: expression,
    //         ExpressionAttributeNames: attributeNames,
    //         ExpressionAttributeValues: attributeValues,
    //         TableName: tableName,
    //     };
    //     this.TraceRequest(action, params);

    //     // make AWS call
    //     const response = await this.Repository.delete(params).promise();
    //     this.TraceResponse(action, response);

    //     return response;
    // }

    /**
    * Get an item by key
    * @param tableName {string} Table name to get from
    * @param keyName {string} Name of key column
    * @param keyValue {string | number} Value of key column
    */
    public async GetItemByKeyAsync(tableName: string,
        keyName: string,
        keyValue: string | number): Promise<AWS.DynamoDB.DocumentClient.GetItemOutput> {

        const action = `${DynamoDBHelper.name}.${this.GetItemByKeyAsync.name}`;
        this.TraceInputs(action, { tableName, keyName, keyValue });

        // guard clauses
        if (this.IsNullOrEmpty(tableName)) { throw new Error(`[${action}]-Must supply tableName`); }
        if (this.IsNullOrEmpty(keyName)) { throw new Error(`[${action}]-Must supply keyName`); }
        if (this.IsNullOrEmpty(keyValue.toString())) { throw new Error(`[${action}]-Must supply keyValue`); }

        // create attribute map
        const attributeMap: Any = {};
        attributeMap[keyName] = keyValue;

        // create params object
        const params: AWS.DynamoDB.DocumentClient.GetItemInput = {
            Key: attributeMap,
            TableName: tableName,
        };
        this.TraceRequest(action, params);

        // make AWS call
        const response = await this.Repository.get(params).promise();
        this.TraceResponse(action, response);

        return response;
    }

    /**
     * Put an item
     * @param tableName {string} Table name to put item in
     * @param item {T extends object} Item to put
     */
    public async PutItemByKeyAsync<T extends object>(tableName: string,
        item: T): Promise<AWS.DynamoDB.DocumentClient.GetItemOutput> {

        const action = `${DynamoDBHelper.name}.${this.PutItemByKeyAsync.name}`;
        this.TraceInputs(action, { tableName, item });

        // guard clauses
        if (this.IsNullOrEmpty(tableName)) { throw new Error(`[${action}]-Must supply tableName`); }
        if (!item || Object.keys(item).length === 0) { throw new Error(`[${action}]-Must supply item`); }

        // create params object
        const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
            Item: item,
            TableName: tableName,
        };
        this.TraceRequest(action, params);

        // make AWS call
        const response = await this.Repository.put(params).promise();
        this.TraceResponse(action, response);

        return response;
    }

    /**
     * Scan a table
     * @param tableName {string} Table name to scan from
     * @param attributeNames {AWS.DynamoDB.DocumentClient.ExpressionAttributeNameMap} Map of attribute names
     * @param attributeValues {AWS.DynamoDB.DocumentClient.ExpressionAttributeValueMap} Map of attribute values
     * @param expression {string} Filter expression
     * @param attributesToReturn {string} Attributes to return. Default is ALL_ATTRIBUTES
     */
    public async ScanAsync(tableName: string,
        attributeNames: AWS.DynamoDB.DocumentClient.ExpressionAttributeNameMap,
        attributeValues: AWS.DynamoDB.DocumentClient.ExpressionAttributeValueMap,
        expression: string,
        attributesToReturn?: string): Promise<AWS.DynamoDB.DocumentClient.ScanOutput> {

        const action = `${DynamoDBHelper.name}.${this.ScanAsync.name}`;
        this.TraceInputs(action, { tableName, attributeNames, attributeValues, expression, attributesToReturn });

        // guard clauses
        if (this.IsNullOrEmpty(tableName)) { throw new Error(`[${action}]-Must supply tableName`); }
        if (this.IsNullOrEmpty(attributeNames)) { throw new Error(`[${action}]-Must supply attributeNames`); }
        if (this.IsNullOrEmpty(attributeValues)) { throw new Error(`[${action}]-Must supply attributeValues`); }
        if (this.IsNullOrEmpty(expression)) { throw new Error(`[${action}]-Must supply expression`); }

        // set defaults
        if (this.IsNullOrEmpty(attributesToReturn)) { attributesToReturn = 'ALL_ATTRIBUTES' }

        // create params object
        const params: AWS.DynamoDB.DocumentClient.ScanInput = {
            ExpressionAttributeNames: attributeNames,
            ExpressionAttributeValues: attributeValues,
            FilterExpression: expression,
            Select: attributesToReturn,
            TableName: tableName,
        };
        this.TraceRequest(action, params);

        // make AWS call
        const response = await this.Repository.scan(params).promise();
        this.TraceResponse(action, response);

        return response;
    }

    /**
     * Update an item by key
     * @param tableName {string} Table name to update in
     * @param keyName {string} Name of key column
     * @param keyValue {string | number} Value of key column
     * @param attributeNames {AWS.DynamoDB.DocumentClient.ExpressionAttributeNameMap} Map of attribute names
     * @param attributeValues {AWS.DynamoDB.DocumentClient.ExpressionAttributeValueMap} Map of attribute values
     * @param conditionExpression {string} Condition expression
     * @param updateExpression {string} Update expression
     */
    public async UpdateByKeyAsync(tableName: string,
        keyName: string,
        keyValue: string | number,
        attributeNames: AWS.DynamoDB.DocumentClient.ExpressionAttributeNameMap,
        attributeValues: AWS.DynamoDB.DocumentClient.ExpressionAttributeValueMap,
        conditionExpression: string,
        updateExpression: string): Promise<AWS.DynamoDB.DocumentClient.ScanOutput> {

        const action = `${DynamoDBHelper.name}.${this.UpdateByKeyAsync.name}`;
        this.TraceInputs(action, { tableName, keyName, keyValue, attributeNames, attributeValues, conditionExpression, updateExpression});

        // guard clauses
        if (this.IsNullOrEmpty(tableName)) { throw new Error(`[${action}]-Must supply tableName`); }
        if (this.IsNullOrEmpty(keyName)) { throw new Error(`[${action}]-Must supply keyName`); }
        if (this.IsNullOrEmpty(keyValue.toString())) { throw new Error(`[${action}]-Must supply keyValue`); }
        if (this.IsNullOrEmpty(attributeNames)) { throw new Error(`[${action}]-Must supply attributeNames`); }
        if (this.IsNullOrEmpty(attributeValues)) { throw new Error(`[${action}]-Must supply attributeValues`); }
        if (this.IsNullOrEmpty(conditionExpression)) { throw new Error(`[${action}]-Must supply conditionExpression`); }
        if (this.IsNullOrEmpty(updateExpression)) { throw new Error(`[${action}]-Must supply updateExpression`); }

        // create attribute map
        const attributeMap: Any = {};
        attributeMap[keyName] = keyValue;

        // create params object
        const params: AWS.DynamoDB.DocumentClient.UpdateItemInput = {
            ConditionExpression: conditionExpression,
            ExpressionAttributeNames: attributeNames,
            ExpressionAttributeValues: attributeValues,
            Key: attributeMap,
            TableName: tableName,
            UpdateExpression: updateExpression,
        };
        this.TraceRequest(action, params);

        // make AWS call
        const response = await this.Repository.update(params).promise();
        this.TraceResponse(action, response);

        return response;
    }
}