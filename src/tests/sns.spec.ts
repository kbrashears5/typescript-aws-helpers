import { Logger, LogLevel } from '../logger';
import { SNSMock } from '../mocks/sns-mock';
import { SNSHelper } from '../helpers/sns-helper';

const logger = new Logger(LogLevel.Off);
const mockerResolves = new SNSMock(false);
const snsHelperMockResolves = new SNSHelper(logger, mockerResolves.Mock);
const mockerRejects = new SNSMock(true);
const snsHelperMockRejects = new SNSHelper(logger, mockerRejects.Mock);

/**
 * Test the PublishAsync method
 */
describe(`${SNSHelper.name}.${snsHelperMockResolves.PublishAsync.name}`, () => {
    // set action for this method
    const action = `${SNSHelper.name}.${snsHelperMockResolves.PublishAsync.name}`;

    test(`throws on empty topicArn`, () => {
        const actual = snsHelperMockResolves.PublishAsync('',
            'good-subject',
            'good-message');
        return expect(actual).rejects.toThrow(`[${action}]-Must supply topicArn`);
    });
    test(`throws on empty subject`, () => {
        const actual = snsHelperMockResolves.PublishAsync('good-topic-arn',
            '',
            'good-message');
        return expect(actual).rejects.toThrow(`[${action}]-Must supply subject`);
    });
    test(`throws on empty message`, () => {
        const actual = snsHelperMockResolves.PublishAsync('good-topic-arn',
            'good-subject',
            '');
        return expect(actual).rejects.toThrow(`[${action}]-Must supply message`);
    });
    test(`returns error from AWS`, () => {
        const actual = snsHelperMockRejects.PublishAsync('good-topic-arn',
            'good-subject',
            'good-message',
            {});
        return expect(actual).rejects.toThrow(`AWS Error`);
    });
    test(`returns valid response from AWS`, () => {
        const actual = snsHelperMockResolves.PublishAsync('good-queue-url',
            'good-subject',
            'good-message',
            {});
        return expect(actual).resolves.toEqual(mockerResolves.PublishResponse);
    });
});
