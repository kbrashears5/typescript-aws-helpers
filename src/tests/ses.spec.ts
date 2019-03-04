import { Logger, LogLevel } from '../logger';
import { TestValuesClass } from './test-values';
import { SESMock } from '../mocks';
import { SESHelper } from '../helpers';

const logger = new Logger(LogLevel.Off);
const mockerResolves = new SESMock(false);
const sesHelperMockResolves = new SESHelper(logger, mockerResolves.Mock);
const mockerRejects = new SESMock(true);
const sesHelperMockRejects = new SESHelper(logger, mockerRejects.Mock);
const TestValues = new TestValuesClass();

/**
 * Test the SendEmailAsync method
 */
describe(`${SESHelper.name}.${sesHelperMockResolves.SendEmailAsync.name}`, () => {
    // set action for this method
    const action = `${SESHelper.name}.${sesHelperMockResolves.SendEmailAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} subject`, () => {
        const actual = sesHelperMockResolves.SendEmailAsync(TestValues.EmptyString,
            [TestValues.EmailAddress],
            TestValues.EmailAddress,
            TestValues.Body);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} subject`);
    });
    test(`${TestValues.ThrowsOnEmpty} toAddresses`, () => {
        const actual = sesHelperMockResolves.SendEmailAsync(TestValues.Subject,
            TestValues.EmptyArray,
            TestValues.EmailAddress,
            TestValues.Body);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} toAddresses`);
    });
    test(`${TestValues.ThrowsOnEmpty} fromAddress`, () => {
        const actual = sesHelperMockResolves.SendEmailAsync(TestValues.Subject,
            [TestValues.EmailAddress],
            TestValues.EmptyString,
            TestValues.Body);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} fromAddress`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = sesHelperMockRejects.SendEmailAsync(TestValues.Subject,
            [TestValues.EmailAddress],
            TestValues.EmailAddress,
            TestValues.Body);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = sesHelperMockResolves.SendEmailAsync(TestValues.Subject,
            [TestValues.EmailAddress],
            TestValues.EmailAddress,
            TestValues.Body);
        return expect(actual).resolves.toEqual(mockerResolves.SendEmailResponse);
    });
});
