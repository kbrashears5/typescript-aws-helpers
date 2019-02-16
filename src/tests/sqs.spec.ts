import { SQSHelper } from '../helpers/sqs-helper';
import { Logger, LogLevel } from '../logger';
import { SQSMock } from '../mocks/sqs-mock';

const logger = new Logger(LogLevel.Off);
const mockerResolves = new SQSMock(false);
const sqsHelperMockResolves = new SQSHelper(logger, mockerResolves.Mock);
const mockerRejects = new SQSMock(true);
const sqsHelperMockRejects = new SQSHelper(logger, mockerRejects.Mock);

/**
 * Test the DeleteMessageAsync method
 */
describe(`${SQSHelper.name}.${sqsHelperMockResolves.DeleteMessageAsync.name}`, () => {
    // set action for this method
    const action = `${SQSHelper.name}.${sqsHelperMockResolves.DeleteMessageAsync.name}`;

    test(`throws on empty sourceBucket`, () => {
        const actual = sqsHelperMockResolves.DeleteMessageAsync('',
            'good-receipt-handle');
        return expect(actual).rejects.toThrow(`[${action}]-Must supply queueUrl`);
    });
    test(`throws on empty sourceKey`, () => {
        const actual = sqsHelperMockResolves.DeleteMessageAsync('good-queue-url',
            '');
        return expect(actual).rejects.toThrow(`[${action}]-Must supply receiptHandle`);
    });
    test(`returns error from AWS`, () => {
        const actual = sqsHelperMockRejects.DeleteMessageAsync('good-queue-url',
            'good-receipt-handle');
        return expect(actual).rejects.toThrow(`AWS Error`);
    });
    test(`returns valid response from AWS`, () => {
        const actual = sqsHelperMockResolves.DeleteMessageAsync('good-queue-url',
            'good-receipt-handle');
        return expect(actual).resolves.toEqual(mockerResolves.DeleteMessageOutput);
    });
});
