import { Logger, LogLevel } from '../logger';
import { TestValuesClass } from './test-values';
import { SNSHelper } from '../helpers';
import { SNSMock } from '../mocks';

const logger = new Logger(LogLevel.Off);
const mockerResolves = new SNSMock(false);
const snsHelperMockResolves = new SNSHelper(logger, mockerResolves.Mock);
const mockerRejects = new SNSMock(true);
const snsHelperMockRejects = new SNSHelper(logger, mockerRejects.Mock);
const TestValues = new TestValuesClass();

/**
 * Test the PublishAsync method
 */
describe(`${SNSHelper.name}.${snsHelperMockResolves.PublishAsync.name}`, () => {
    // set action for this method
    const action = `${SNSHelper.name}.${snsHelperMockResolves.PublishAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} topicArn`, () => {
        const actual = snsHelperMockResolves.PublishAsync(TestValues.EmptyString,
            TestValues.Subject,
            TestValues.Body);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} topicArn`);
    });
    test(`${TestValues.ThrowsOnEmpty} subject`, () => {
        const actual = snsHelperMockResolves.PublishAsync(TestValues.Arn,
            TestValues.EmptyString,
            TestValues.Body);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} subject`);
    });
    test(`${TestValues.ThrowsOnEmpty} message`, () => {
        const actual = snsHelperMockResolves.PublishAsync(TestValues.Arn,
            TestValues.Subject,
            TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} message`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = snsHelperMockRejects.PublishAsync(TestValues.Arn,
            TestValues.Subject,
            TestValues.Body);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = snsHelperMockResolves.PublishAsync(TestValues.Arn,
            TestValues.Subject,
            TestValues.Body);
        return expect(actual).resolves.toEqual(mockerResolves.PublishResponse);
    });
});
