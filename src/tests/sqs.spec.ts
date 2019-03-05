import { Logger, LogLevel } from '../logger';
import { TestValuesClass } from './test-values';
import { SQSMock } from '../mocks';
import { SQSHelper } from '../helpers';

const logger = new Logger(LogLevel.Off);
const mockerResolves = new SQSMock(false);
const sqsHelperMockResolves = new SQSHelper(logger, mockerResolves.Mock);
const mockerRejects = new SQSMock(true);
const sqsHelperMockRejects = new SQSHelper(logger, mockerRejects.Mock);
const TestValues = new TestValuesClass();

/**
 * Test the DeleteMessageAsync method
 */
describe(`${SQSHelper.name}.${sqsHelperMockResolves.DeleteMessageAsync.name}`, () => {
    // set action for this method
    const action = `${SQSHelper.name}.${sqsHelperMockResolves.DeleteMessageAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} queueUrl`, () => {
        const actual = sqsHelperMockResolves.DeleteMessageAsync(TestValues.EmptyString,
            TestValues.ReceiptHandle);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} queueUrl`);
    });
    test(`${TestValues.ThrowsOnEmpty} receiptHandle`, () => {
        const actual = sqsHelperMockResolves.DeleteMessageAsync(TestValues.Url,
            TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} receiptHandle`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = sqsHelperMockRejects.DeleteMessageAsync(TestValues.Url,
            TestValues.ReceiptHandle);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = sqsHelperMockResolves.DeleteMessageAsync(TestValues.Url,
            TestValues.ReceiptHandle);
        return expect(actual).resolves.toEqual(mockerResolves.DeleteMessageOutput);
    });
});

/**
 * Test the DeleteMessagesAsync method
 */
describe(`${SQSHelper.name}.${sqsHelperMockResolves.DeleteMessagesAsync.name}`, () => {
    // set action for this method
    const action = `${SQSHelper.name}.${sqsHelperMockResolves.DeleteMessagesAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} queueUrl`, () => {
        const actual = sqsHelperMockResolves.DeleteMessagesAsync(TestValues.EmptyString,
            [TestValues.ReceiptHandle]);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} queueUrl`);
    });
    test(`${TestValues.ThrowsOnEmpty} receiptHandles`, () => {
        const actual = sqsHelperMockResolves.DeleteMessagesAsync(TestValues.Url,
            TestValues.EmptyArray);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} at least one receiptHandle`);
    });
    test(`${TestValues.ThrowsOnTooMany} receiptHandles`, () => {
        const actual = sqsHelperMockResolves.DeleteMessagesAsync(TestValues.Url,
            [TestValues.StringValue, TestValues.StringValue, TestValues.StringValue, TestValues.StringValue, TestValues.StringValue, TestValues.StringValue, TestValues.StringValue, TestValues.StringValue, TestValues.StringValue, TestValues.StringValue, TestValues.StringValue]);
        return expect(actual).rejects.toThrow(`[${action}]-Can only supply up to 10 receiptHandles`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = sqsHelperMockRejects.DeleteMessagesAsync(TestValues.Url,
            [TestValues.ReceiptHandle]);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = sqsHelperMockResolves.DeleteMessagesAsync(TestValues.Url,
            [TestValues.ReceiptHandle]);
        return expect(actual).resolves.toEqual(mockerResolves.DeleteMessageBatchResult);
    });
});

/**
 * Test the PurgeQueueAsync method
 */
describe(`${SQSHelper.name}.${sqsHelperMockResolves.PurgeQueueAsync.name}`, () => {
    // set action for this method
    const action = `${SQSHelper.name}.${sqsHelperMockResolves.PurgeQueueAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} queueUrl`, () => {
        const actual = sqsHelperMockResolves.PurgeQueueAsync(TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} queueUrl`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = sqsHelperMockRejects.PurgeQueueAsync(TestValues.Url);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = sqsHelperMockResolves.PurgeQueueAsync(TestValues.Url);
        return expect(actual).resolves.toEqual(mockerResolves.PurgeQueueResult);
    });
});

/**
 * Test the ReceiveMessagesAsync method
 */
describe(`${SQSHelper.name}.${sqsHelperMockResolves.ReceiveMessagesAsync.name}`, () => {
    // set action for this method
    const action = `${SQSHelper.name}.${sqsHelperMockResolves.ReceiveMessagesAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} queueUrl`, () => {
        const actual = sqsHelperMockResolves.ReceiveMessagesAsync(TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} queueUrl`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = sqsHelperMockRejects.ReceiveMessagesAsync(TestValues.Url);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = sqsHelperMockResolves.ReceiveMessagesAsync(TestValues.Url);
        return expect(actual).resolves.toEqual(mockerResolves.ReceiveMessageResult);
    });
});

/**
 * Test the SendMessageAsync method
 */
describe(`${SQSHelper.name}.${sqsHelperMockResolves.SendMessageAsync.name}`, () => {
    // set action for this method
    const action = `${SQSHelper.name}.${sqsHelperMockResolves.SendMessageAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} queueUrl`, () => {
        const actual = sqsHelperMockResolves.SendMessageAsync(TestValues.EmptyString,
            TestValues.Body);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} queueUrl`);
    });
    test(`${TestValues.ThrowsOnEmpty} messageBody`, () => {
        const actual = sqsHelperMockResolves.SendMessageAsync(TestValues.Url,
            TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} messageBody`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = sqsHelperMockRejects.SendMessageAsync(TestValues.Url,
            TestValues.Body);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = sqsHelperMockResolves.SendMessageAsync(TestValues.Url,
            TestValues.Body);
        return expect(actual).resolves.toEqual(mockerResolves.SendMessageResult);
    });
});

/**
 * Test the SendMessagesAsync method
 */
describe(`${SQSHelper.name}.${sqsHelperMockResolves.SendMessagesAsync.name}`, () => {
    // set action for this method
    const action = `${SQSHelper.name}.${sqsHelperMockResolves.SendMessagesAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} queueUrl`, () => {
        const actual = sqsHelperMockResolves.SendMessagesAsync(TestValues.EmptyString,
            TestValues.Entries);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} queueUrl`);
    });
    test(`${TestValues.ThrowsOnEmpty} entries`, () => {
        const actual = sqsHelperMockResolves.SendMessagesAsync(TestValues.Url,
            TestValues.EmptyArray);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} at least one entry`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = sqsHelperMockRejects.SendMessagesAsync(TestValues.Url,
            TestValues.Entries);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = sqsHelperMockResolves.SendMessagesAsync(TestValues.Url,
            TestValues.Entries);
        return expect(actual).resolves.toEqual(mockerResolves.SendMessageBatchResult);
    });
});
