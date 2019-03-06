import { STSHelper } from '../helpers';
import { Logger, LogLevel } from '../logger';
import { STSMock } from '../mocks';
import { TestValuesClass } from './test-values';

const logger = new Logger(LogLevel.Off);
const mockerResolves = new STSMock(false);
const stsHelperMockResolves = new STSHelper(logger, mockerResolves.Mock);
const mockerRejects = new STSMock(true);
const stsHelperMockRejects = new STSHelper(logger, mockerRejects.Mock);
const TestValues = new TestValuesClass();

/**
 * Test the AssumeRoleAsync method
 */
describe(`${STSHelper.name}.${stsHelperMockResolves.AssumeRoleAsync.name}`, () => {
    // set action for this method
    const action = `${STSHelper.name}.${stsHelperMockResolves.AssumeRoleAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} roleArn`, () => {
        const actual = stsHelperMockResolves.AssumeRoleAsync(TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} roleArn`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = stsHelperMockRejects.AssumeRoleAsync(TestValues.Arn);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = stsHelperMockResolves.AssumeRoleAsync(TestValues.Arn);
        return expect(actual).resolves.toEqual(mockerResolves.AssumeRoleResponse);
    });
});
