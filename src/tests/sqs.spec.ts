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

    test(`throws on empty queueUrl`, () => {
        const actual = sqsHelperMockResolves.DeleteMessageAsync('',
            'good-receipt-handle');
        return expect(actual).rejects.toThrow(`[${action}]-Must supply queueUrl`);
    });
    test(`throws on empty receiptHandle`, () => {
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

/**
 * Test the DeleteMessagesAsync method
 */
describe(`${SQSHelper.name}.${sqsHelperMockResolves.DeleteMessagesAsync.name}`, () => {
    // set action for this method
    const action = `${SQSHelper.name}.${sqsHelperMockResolves.DeleteMessagesAsync.name}`;

    test(`throws on empty queueUrl`, () => {
        const actual = sqsHelperMockResolves.DeleteMessagesAsync('',
            ['good-receipt-handle']);
        return expect(actual).rejects.toThrow(`[${action}]-Must supply queueUrl`);
    });
    test(`throws on empty receiptHandles`, () => {
        const actual = sqsHelperMockResolves.DeleteMessagesAsync('good-queue-url',
            []);
        return expect(actual).rejects.toThrow(`[${action}]-Must supply at least one receiptHandle`);
    });
    test(`throws on too many receiptHandles`, () => {
        const actual = sqsHelperMockResolves.DeleteMessagesAsync('good-queue-url',
            ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']);
        return expect(actual).rejects.toThrow(`[${action}]-Can only supply up to 10 receiptHandles`);
    });
    test(`returns error from AWS`, () => {
        const actual = sqsHelperMockRejects.DeleteMessagesAsync('good-queue-url',
            ['good-receipt-handle']);
        return expect(actual).rejects.toThrow(`AWS Error`);
    });
    test(`returns valid response from AWS`, () => {
        const actual = sqsHelperMockResolves.DeleteMessagesAsync('good-queue-url',
            ['good-receipt-handle']);
        return expect(actual).resolves.toEqual(mockerResolves.DeleteMessageBatchResult);
    });
});

/**
 * Test the PurgeQueueAsync method
 */
describe(`${SQSHelper.name}.${sqsHelperMockResolves.PurgeQueueAsync.name}`, () => {
    // set action for this method
    const action = `${SQSHelper.name}.${sqsHelperMockResolves.PurgeQueueAsync.name}`;

    test(`throws on empty queueUrl`, () => {
        const actual = sqsHelperMockResolves.PurgeQueueAsync('');
        return expect(actual).rejects.toThrow(`[${action}]-Must supply queueUrl`);
    });
    test(`returns error from AWS`, () => {
        const actual = sqsHelperMockRejects.PurgeQueueAsync('good-queue-url');
        return expect(actual).rejects.toThrow(`AWS Error`);
    });
    test(`returns valid response from AWS`, () => {
        const actual = sqsHelperMockResolves.PurgeQueueAsync('good-queue-url');
        return expect(actual).resolves.toEqual(mockerResolves.PurgeQueueResult);
    });
});

/**
 * Test the ReceiveMessagesAsync method
 */
describe(`${SQSHelper.name}.${sqsHelperMockResolves.ReceiveMessagesAsync.name}`, () => {
    // set action for this method
    const action = `${SQSHelper.name}.${sqsHelperMockResolves.ReceiveMessagesAsync.name}`;

    test(`throws on empty queueUrl`, () => {
        const actual = sqsHelperMockResolves.ReceiveMessagesAsync('');
        return expect(actual).rejects.toThrow(`[${action}]-Must supply queueUrl`);
    });
    test(`returns error from AWS`, () => {
        const actual = sqsHelperMockRejects.ReceiveMessagesAsync('good-queue-url',
            10,
            10,
            ['ALL'],
            ['Name']);
        return expect(actual).rejects.toThrow(`AWS Error`);
    });
    test(`returns valid response from AWS`, () => {
        const actual = sqsHelperMockResolves.ReceiveMessagesAsync('good-queue-url',
            10,
            10,
            ['ALL'],
            ['Name']);
        return expect(actual).resolves.toEqual(mockerResolves.ReceiveMessageResult);
    });
});

/**
 * Test the SendMessageAsync method
 */
describe(`${SQSHelper.name}.${sqsHelperMockResolves.SendMessageAsync.name}`, () => {
    // set action for this method
    const action = `${SQSHelper.name}.${sqsHelperMockResolves.SendMessageAsync.name}`;

    test(`throws on empty queueUrl`, () => {
        const actual = sqsHelperMockResolves.SendMessageAsync('',
            'good-body');
        return expect(actual).rejects.toThrow(`[${action}]-Must supply queueUrl`);
    });
    test(`throws on empty messageBody`, () => {
        const actual = sqsHelperMockResolves.SendMessageAsync('good-queue-url',
            '');
        return expect(actual).rejects.toThrow(`[${action}]-Must supply messageBody`);
    });
    test(`returns error from AWS`, () => {
        const actual = sqsHelperMockRejects.SendMessageAsync('good-queue-url',
            'good-body',
            0,
            {});
        return expect(actual).rejects.toThrow(`AWS Error`);
    });
    test(`returns valid response from AWS`, () => {
        const actual = sqsHelperMockResolves.SendMessageAsync('good-queue-url',
            'good-body',
            0,
            {});
        return expect(actual).resolves.toEqual(mockerResolves.SendMessageResult);
    });
});

/**
 * Test the SendMessagesAsync method
 */
describe(`${SQSHelper.name}.${sqsHelperMockResolves.SendMessagesAsync.name}`, () => {
    // set action for this method
    const action = `${SQSHelper.name}.${sqsHelperMockResolves.SendMessagesAsync.name}`;

    test(`throws on empty queueUrl`, () => {
        const actual = sqsHelperMockResolves.SendMessagesAsync('',
            [{ Id: '1', MessageBody: 'good-body' } as AWS.SQS.SendMessageBatchRequestEntry]);
        return expect(actual).rejects.toThrow(`[${action}]-Must supply queueUrl`);
    });
    test(`throws on empty entries`, () => {
        const actual = sqsHelperMockResolves.SendMessagesAsync('good-queue-url',
            []);
        return expect(actual).rejects.toThrow(`[${action}]-Must supply at least one entry`);
    });
    test(`returns error from AWS`, () => {
        const actual = sqsHelperMockRejects.SendMessagesAsync('good-queue-url',
            [{ Id: '1', MessageBody: 'good-body' } as AWS.SQS.SendMessageBatchRequestEntry]);
        return expect(actual).rejects.toThrow(`AWS Error`);
    });
    test(`returns valid response from AWS`, () => {
        const actual = sqsHelperMockResolves.SendMessagesAsync('good-queue-url',
            [{ Id: '1', MessageBody: 'good-body' } as AWS.SQS.SendMessageBatchRequestEntry]);
        return expect(actual).resolves.toEqual(mockerResolves.SendMessageBatchResult);
    });
});
