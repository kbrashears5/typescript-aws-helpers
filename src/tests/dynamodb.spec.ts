import { Logger, LogLevel } from '../logger';
import { DynamoDBMock } from '../mocks';
import { DynamoDBHelper } from '../helpers';

const logger = new Logger(LogLevel.Off);
const mockerResolves = new DynamoDBMock(false);
const dynamoDBHelperMockResolves = new DynamoDBHelper(logger, mockerResolves.Mock);
const mockerRejects = new DynamoDBMock(true);
const dynamoDBHelperMockRejects = new DynamoDBHelper(logger, mockerRejects.Mock);

/**
 * Test the DeleteItemByKeyAsync method
 */
describe(`${DynamoDBHelper.name}.${dynamoDBHelperMockResolves.DeleteItemByKeyAsync.name}`, () => {
    // set action for this method
    const action = `${DynamoDBHelper.name}.${dynamoDBHelperMockResolves.DeleteItemByKeyAsync.name}`;

    test(`throws on empty tableName`, () => {
        const actual = dynamoDBHelperMockResolves.DeleteItemByKeyAsync('',
            'good-key-name',
            'good-key-value');
        return expect(actual).rejects.toThrow(`[${action}]-Must supply tableName`);
    });
    test(`throws on empty keyName`, () => {
        const actual = dynamoDBHelperMockResolves.DeleteItemByKeyAsync('good-table-name',
            '',
            'good-key-value');
        return expect(actual).rejects.toThrow(`[${action}]-Must supply keyName`);
    });
    test(`throws on empty keyValue`, () => {
        const actual = dynamoDBHelperMockResolves.DeleteItemByKeyAsync('good-table-name',
            'good-key-name',
            '');
        return expect(actual).rejects.toThrow(`[${action}]-Must supply keyValue`);
    });
    test(`returns error from AWS`, () => {
        const actual = dynamoDBHelperMockRejects.DeleteItemByKeyAsync('good-table-name',
            'good-key-name',
            'good-key-value');
        return expect(actual).rejects.toThrow(`AWS Error`);
    });
    test(`returns valid response from AWS`, () => {
        const actual = dynamoDBHelperMockResolves.DeleteItemByKeyAsync('good-table-name',
            'good-key-name',
            'good-key-value');
        return expect(actual).resolves.toEqual(mockerResolves.DeleteItemOutput);
    });
});

/**
 * Test the GetItemByKeyAsync method
 */
describe(`${DynamoDBHelper.name}.${dynamoDBHelperMockResolves.GetItemByKeyAsync.name}`, () => {
    // set action for this method
    const action = `${DynamoDBHelper.name}.${dynamoDBHelperMockResolves.GetItemByKeyAsync.name}`;

    test(`throws on empty tableName`, () => {
        const actual = dynamoDBHelperMockResolves.GetItemByKeyAsync('',
            'good-key-name',
            'good-key-value');
        return expect(actual).rejects.toThrow(`[${action}]-Must supply tableName`);
    });
    test(`throws on empty keyName`, () => {
        const actual = dynamoDBHelperMockResolves.GetItemByKeyAsync('good-table-name',
            '',
            'good-key-value');
        return expect(actual).rejects.toThrow(`[${action}]-Must supply keyName`);
    });
    test(`throws on empty keyValue`, () => {
        const actual = dynamoDBHelperMockResolves.GetItemByKeyAsync('good-table-name',
            'good-key-name',
            '');
        return expect(actual).rejects.toThrow(`[${action}]-Must supply keyValue`);
    });
    test(`returns error from AWS`, () => {
        const actual = dynamoDBHelperMockRejects.GetItemByKeyAsync('good-table-name',
            'good-key-name',
            'good-key-value');
        return expect(actual).rejects.toThrow(`AWS Error`);
    });
    test(`returns valid response from AWS`, () => {
        const actual = dynamoDBHelperMockResolves.GetItemByKeyAsync('good-table-name',
            'good-key-name',
            'good-key-value');
        return expect(actual).resolves.toEqual(mockerResolves.GetItemOutput);
    });
});

/**
 * Test the PutItemByKeyAsync method
 */
describe(`${DynamoDBHelper.name}.${dynamoDBHelperMockResolves.PutItemByKeyAsync.name}`, () => {
    // set action for this method
    const action = `${DynamoDBHelper.name}.${dynamoDBHelperMockResolves.PutItemByKeyAsync.name}`;

    test(`throws on empty tableName`, () => {
        const actual = dynamoDBHelperMockResolves.PutItemByKeyAsync('',
            { Key: 'good-key-value' });
        return expect(actual).rejects.toThrow(`[${action}]-Must supply tableName`);
    });
    test(`throws on empty item`, () => {
        const actual = dynamoDBHelperMockResolves.PutItemByKeyAsync('good-table-name',
            {});
        return expect(actual).rejects.toThrow(`[${action}]-Must supply item`);
    });
    test(`returns error from AWS`, () => {
        const actual = dynamoDBHelperMockRejects.PutItemByKeyAsync('good-table-name',
            { Key: 'good-key-value' });
        return expect(actual).rejects.toThrow(`AWS Error`);
    });
    test(`returns valid response from AWS`, () => {
        const actual = dynamoDBHelperMockResolves.PutItemByKeyAsync('good-table-name',
            { Key: 'good-key-value' });
        return expect(actual).resolves.toEqual(mockerResolves.GetItemOutput);
    });
});

/**
 * Test the ScanAsync method
 */
describe(`${DynamoDBHelper.name}.${dynamoDBHelperMockResolves.ScanAsync.name}`, () => {
    // set action for this method
    const action = `${DynamoDBHelper.name}.${dynamoDBHelperMockResolves.ScanAsync.name}`;

    test(`throws on empty tableName`, () => {
        const actual = dynamoDBHelperMockResolves.ScanAsync('',
            { Key: 'good-key' } as AWS.DynamoDB.DocumentClient.ExpressionAttributeNameMap,
            { Key: 'good-key' } as AWS.DynamoDB.DocumentClient.ExpressionAttributeValueMap,
            'good-expression');
        return expect(actual).rejects.toThrow(`[${action}]-Must supply tableName`);
    });
    test(`throws on empty attributeNames`, () => {
        const actual = dynamoDBHelperMockResolves.ScanAsync('good-table-name',
            {},
            { Key: 'good-key' } as AWS.DynamoDB.DocumentClient.ExpressionAttributeValueMap,
            'good-expression');
        return expect(actual).rejects.toThrow(`[${action}]-Must supply attributeNames`);
    });
    test(`throws on empty attributeValues`, () => {
        const actual = dynamoDBHelperMockResolves.ScanAsync('good-table-name',
            { Key: 'good-key' } as AWS.DynamoDB.DocumentClient.ExpressionAttributeNameMap,
            {},
            'good-expression');
        return expect(actual).rejects.toThrow(`[${action}]-Must supply attributeValues`);
    });
    test(`returns error from AWS`, () => {
        const actual = dynamoDBHelperMockRejects.ScanAsync('good-table-name',
            { Key: 'good-key' } as AWS.DynamoDB.DocumentClient.ExpressionAttributeNameMap,
            { Key: 'good-key' } as AWS.DynamoDB.DocumentClient.ExpressionAttributeValueMap,
            'good-expression');
        return expect(actual).rejects.toThrow(`AWS Error`);
    });
    test(`returns valid response from AWS`, () => {
        const actual = dynamoDBHelperMockResolves.ScanAsync('good-table-name',
            { Key: 'good-key' } as AWS.DynamoDB.DocumentClient.ExpressionAttributeNameMap,
            { Key: 'good-key' } as AWS.DynamoDB.DocumentClient.ExpressionAttributeValueMap,
            'good-expression');
        return expect(actual).resolves.toEqual(mockerResolves.ScanOutput);
    });
});