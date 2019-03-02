import { Logger, LogLevel } from '../logger';
import { DynamoDBMock } from '../mocks';
import { DynamoDBHelper } from '../helpers';
import { TestValuesClass } from './test-values';

const logger = new Logger(LogLevel.Off);
const mockerResolves = new DynamoDBMock(false);
const dynamoDBHelperMockResolves = new DynamoDBHelper(logger, mockerResolves.Mock);
const mockerRejects = new DynamoDBMock(true);
const dynamoDBHelperMockRejects = new DynamoDBHelper(logger, mockerRejects.Mock);
const TestValues = new TestValuesClass();

/**
 * Test the DeleteItemByKeyAsync method
 */
describe(`${DynamoDBHelper.name}.${dynamoDBHelperMockResolves.DeleteItemByKeyAsync.name}`, () => {
    // set action for this method
    const action = `${DynamoDBHelper.name}.${dynamoDBHelperMockResolves.DeleteItemByKeyAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} tableName`, () => {
        const actual = dynamoDBHelperMockResolves.DeleteItemByKeyAsync(TestValues.EmptyString,
            TestValues.Key,
            TestValues.StringValue);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} tableName`);
    });
    test(`${TestValues.ThrowsOnEmpty} keyName`, () => {
        const actual = dynamoDBHelperMockResolves.DeleteItemByKeyAsync(TestValues.Name,
            TestValues.EmptyString,
            TestValues.StringValue);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} keyName`);
    });
    test(`${TestValues.ThrowsOnEmpty} keyValue`, () => {
        const actual = dynamoDBHelperMockResolves.DeleteItemByKeyAsync(TestValues.Name,
            TestValues.Key,
            TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} keyValue`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = dynamoDBHelperMockRejects.DeleteItemByKeyAsync(TestValues.Name,
            TestValues.Key,
            TestValues.StringValue);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = dynamoDBHelperMockResolves.DeleteItemByKeyAsync(TestValues.Name,
            TestValues.Key,
            TestValues.StringValue);
        return expect(actual).resolves.toEqual(mockerResolves.DeleteItemOutput);
    });
});

/**
 * Test the GetItemByKeyAsync method
 */
describe(`${DynamoDBHelper.name}.${dynamoDBHelperMockResolves.GetItemByKeyAsync.name}`, () => {
    // set action for this method
    const action = `${DynamoDBHelper.name}.${dynamoDBHelperMockResolves.GetItemByKeyAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} tableName`, () => {
        const actual = dynamoDBHelperMockResolves.GetItemByKeyAsync(TestValues.EmptyString,
            TestValues.Key,
            TestValues.StringValue);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} tableName`);
    });
    test(`${TestValues.ThrowsOnEmpty} keyName`, () => {
        const actual = dynamoDBHelperMockResolves.GetItemByKeyAsync(TestValues.Name,
            TestValues.EmptyString,
            TestValues.StringValue);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} keyName`);
    });
    test(`${TestValues.ThrowsOnEmpty} keyValue`, () => {
        const actual = dynamoDBHelperMockResolves.GetItemByKeyAsync(TestValues.Name,
            TestValues.Key,
            TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} keyValue`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = dynamoDBHelperMockRejects.GetItemByKeyAsync(TestValues.Name,
            TestValues.Key,
            TestValues.StringValue);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = dynamoDBHelperMockResolves.GetItemByKeyAsync(TestValues.Name,
            TestValues.Key,
            TestValues.StringValue);
        return expect(actual).resolves.toEqual(mockerResolves.GetItemOutput);
    });
});

/**
 * Test the PutItemByKeyAsync method
 */
describe(`${DynamoDBHelper.name}.${dynamoDBHelperMockResolves.PutItemByKeyAsync.name}`, () => {
    // set action for this method
    const action = `${DynamoDBHelper.name}.${dynamoDBHelperMockResolves.PutItemByKeyAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} tableName`, () => {
        const actual = dynamoDBHelperMockResolves.PutItemByKeyAsync(TestValues.EmptyString,
            TestValues.Item);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} tableName`);
    });
    test(`${TestValues.ThrowsOnEmpty} item`, () => {
        const actual = dynamoDBHelperMockResolves.PutItemByKeyAsync(TestValues.Name,
            TestValues.EmptyObject);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} item`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = dynamoDBHelperMockRejects.PutItemByKeyAsync(TestValues.Name,
            TestValues.Item);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = dynamoDBHelperMockResolves.PutItemByKeyAsync(TestValues.Name,
            TestValues.Item);
        return expect(actual).resolves.toEqual(mockerResolves.GetItemOutput);
    });
});

/**
 * Test the ScanAsync method
 */
describe(`${DynamoDBHelper.name}.${dynamoDBHelperMockResolves.ScanAsync.name}`, () => {
    // set action for this method
    const action = `${DynamoDBHelper.name}.${dynamoDBHelperMockResolves.ScanAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} tableName`, () => {
        const actual = dynamoDBHelperMockResolves.ScanAsync(TestValues.EmptyString,
            TestValues.ExpressionAttributeNameMap,
            TestValues.ExpressionAttributeValueMap,
            TestValues.Expression);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} tableName`);
    });
    test(`${TestValues.ThrowsOnEmpty} attributeNames`, () => {
        const actual = dynamoDBHelperMockResolves.ScanAsync(TestValues.Name,
            TestValues.EmptyObject,
            TestValues.ExpressionAttributeValueMap,
            TestValues.Expression);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} attributeNames`);
    });
    test(`${TestValues.ThrowsOnEmpty} attributeValues`, () => {
        const actual = dynamoDBHelperMockResolves.ScanAsync(TestValues.Name,
            TestValues.ExpressionAttributeNameMap,
            TestValues.EmptyObject,
            TestValues.Expression);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} attributeValues`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = dynamoDBHelperMockRejects.ScanAsync(TestValues.Name,
            TestValues.ExpressionAttributeNameMap,
            TestValues.ExpressionAttributeValueMap,
            TestValues.Expression);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = dynamoDBHelperMockResolves.ScanAsync(TestValues.Name,
            TestValues.ExpressionAttributeNameMap,
            TestValues.ExpressionAttributeValueMap,
            TestValues.Expression);
        return expect(actual).resolves.toEqual(mockerResolves.ScanOutput);
    });
});

/**
 * Test the UpdateByKeyAsync method
 */
describe(`${DynamoDBHelper.name}.${dynamoDBHelperMockResolves.UpdateByKeyAsync.name}`, () => {
    // set action for this method
    const action = `${DynamoDBHelper.name}.${dynamoDBHelperMockResolves.UpdateByKeyAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} tableName`, () => {
        const actual = dynamoDBHelperMockResolves.UpdateByKeyAsync(TestValues.EmptyString,
            TestValues.Key,
            TestValues.StringValue,
            TestValues.ExpressionAttributeNameMap,
            TestValues.ExpressionAttributeValueMap,
            TestValues.Expression,
            TestValues.Expression);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} tableName`);
    });
    test(`${TestValues.ThrowsOnEmpty} keyName`, () => {
        const actual = dynamoDBHelperMockResolves.UpdateByKeyAsync(TestValues.Name,
            TestValues.EmptyString,
            TestValues.StringValue,
            TestValues.ExpressionAttributeNameMap,
            TestValues.ExpressionAttributeValueMap,
            TestValues.Expression,
            TestValues.Expression);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} keyName`);
    });
    test(`${TestValues.ThrowsOnEmpty} keyValue`, () => {
        const actual = dynamoDBHelperMockResolves.UpdateByKeyAsync(TestValues.Name,
            TestValues.Key,
            TestValues.EmptyString,
            TestValues.ExpressionAttributeNameMap,
            TestValues.ExpressionAttributeValueMap,
            TestValues.Expression,
            TestValues.Expression);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} keyValue`);
    });
    test(`${TestValues.ThrowsOnEmpty} attributeNames`, () => {
        const actual = dynamoDBHelperMockResolves.UpdateByKeyAsync(TestValues.Name,
            TestValues.Key,
            TestValues.StringValue,
            TestValues.EmptyObject,
            TestValues.ExpressionAttributeValueMap,
            TestValues.Expression,
            TestValues.Expression);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} attributeNames`);
    });
    test(`${TestValues.ThrowsOnEmpty} attributeValues`, () => {
        const actual = dynamoDBHelperMockResolves.UpdateByKeyAsync(TestValues.Name,
            TestValues.Key,
            TestValues.StringValue,
            TestValues.ExpressionAttributeNameMap,
            TestValues.EmptyObject,
            TestValues.Expression,
            TestValues.Expression);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} attributeValues`);
    });
    test(`${TestValues.ThrowsOnEmpty} conditionExpression`, () => {
        const actual = dynamoDBHelperMockResolves.UpdateByKeyAsync(TestValues.Name,
            TestValues.Key,
            TestValues.StringValue,
            TestValues.ExpressionAttributeNameMap,
            TestValues.ExpressionAttributeValueMap,
            TestValues.EmptyString,
            TestValues.Expression);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} conditionExpression`);
    });
    test(`${TestValues.ThrowsOnEmpty} updateExpression`, () => {
        const actual = dynamoDBHelperMockResolves.UpdateByKeyAsync(TestValues.Name,
            TestValues.Key,
            TestValues.StringValue,
            TestValues.ExpressionAttributeNameMap,
            TestValues.ExpressionAttributeValueMap,
            TestValues.Expression,
            TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} updateExpression`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = dynamoDBHelperMockRejects.UpdateByKeyAsync(TestValues.Name,
            TestValues.Key,
            TestValues.StringValue,
            TestValues.ExpressionAttributeNameMap,
            TestValues.ExpressionAttributeValueMap,
            TestValues.Expression,
            TestValues.Expression);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = dynamoDBHelperMockResolves.UpdateByKeyAsync(TestValues.Name,
            TestValues.Key,
            TestValues.StringValue,
            TestValues.ExpressionAttributeNameMap,
            TestValues.ExpressionAttributeValueMap,
            TestValues.Expression,
            TestValues.Expression);
        return expect(actual).resolves.toEqual(mockerResolves.ScanOutput);
    });
});