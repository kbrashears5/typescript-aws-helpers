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
