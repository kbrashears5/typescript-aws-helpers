import { Logger, LogLevel } from '../logger';
import { TestValuesClass } from './test-values';
import { SSMMock } from '../mocks/ssm-mock';
import { SSMHelper } from '../helpers/ssm-helper';

const logger = new Logger(LogLevel.Off);
const mockerResolves = new SSMMock(false);
const ssmHelperMockResolves = new SSMHelper(logger, mockerResolves.Mock);
const mockerRejects = new SSMMock(true);
const ssmHelperMockRejects = new SSMHelper(logger, mockerRejects.Mock);
const TestValues = new TestValuesClass();

/**
 * Test the CancelCommandAsync method
 */
describe(`${SSMHelper.name}.${ssmHelperMockResolves.CancelCommandAsync.name}`, () => {
    // set action for this method
    const action = `${SSMHelper.name}.${ssmHelperMockResolves.CancelCommandAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} commandId`, () => {
        const actual = ssmHelperMockResolves.CancelCommandAsync(TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} commandId`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = ssmHelperMockRejects.CancelCommandAsync(TestValues.Id);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = ssmHelperMockResolves.CancelCommandAsync(TestValues.Id);
        return expect(actual).resolves.toEqual(mockerResolves.CancelCommandResult);
    });
});

/**
 * Test the DeleteParameterAsync method
 */
describe(`${SSMHelper.name}.${ssmHelperMockResolves.DeleteParameterAsync.name}`, () => {
    // set action for this method
    const action = `${SSMHelper.name}.${ssmHelperMockResolves.DeleteParameterAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} name`, () => {
        const actual = ssmHelperMockResolves.DeleteParameterAsync(TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} name`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = ssmHelperMockRejects.DeleteParameterAsync(TestValues.Name);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = ssmHelperMockResolves.DeleteParameterAsync(TestValues.Name);
        return expect(actual).resolves.toEqual(mockerResolves.DeleteParameterResult);
    });
});

/**
 * Test the GetParameterAsync method
 */
describe(`${SSMHelper.name}.${ssmHelperMockResolves.GetParameterAsync.name}`, () => {
    // set action for this method
    const action = `${SSMHelper.name}.${ssmHelperMockResolves.GetParameterAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} name`, () => {
        const actual = ssmHelperMockResolves.GetParameterAsync(TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} name`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = ssmHelperMockRejects.GetParameterAsync(TestValues.Name);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = ssmHelperMockResolves.GetParameterAsync(TestValues.Name);
        return expect(actual).resolves.toEqual(mockerResolves.GetParameterResult);
    });
});

/**
 * Test the GetParametersByPathAsync method
 */
describe(`${SSMHelper.name}.${ssmHelperMockResolves.GetParametersByPathAsync.name}`, () => {
    // set action for this method
    const action = `${SSMHelper.name}.${ssmHelperMockResolves.GetParametersByPathAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} path`, () => {
        const actual = ssmHelperMockResolves.GetParametersByPathAsync(TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} path`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = ssmHelperMockRejects.GetParametersByPathAsync(TestValues.Path);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = ssmHelperMockResolves.GetParametersByPathAsync(TestValues.Path);
        return expect(actual).resolves.toEqual(mockerResolves.GetParametersByPathResult);
    });
});

/**
 * Test the PutParameterAsync method
 */
describe(`${SSMHelper.name}.${ssmHelperMockResolves.PutParameterAsync.name}`, () => {
    // set action for this method
    const action = `${SSMHelper.name}.${ssmHelperMockResolves.PutParameterAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} name`, () => {
        const actual = ssmHelperMockResolves.PutParameterAsync(TestValues.EmptyString,
            TestValues.StringValue,
            TestValues.Type,
            TestValues.Description);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} name`);
    });
    test(`${TestValues.ThrowsOnEmpty} value`, () => {
        const actual = ssmHelperMockResolves.PutParameterAsync(TestValues.Name,
            TestValues.EmptyString,
            TestValues.Type,
            TestValues.Description);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} value`);
    });
    test(`${TestValues.ThrowsOnEmpty} type`, () => {
        const actual = ssmHelperMockResolves.PutParameterAsync(TestValues.Name,
            TestValues.StringValue,
            TestValues.EmptyString,
            TestValues.Description);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} type`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = ssmHelperMockRejects.PutParameterAsync(TestValues.Name,
            TestValues.StringValue,
            TestValues.Type,
            TestValues.Description);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = ssmHelperMockResolves.PutParameterAsync(TestValues.Name,
            TestValues.StringValue,
            TestValues.Type,
            TestValues.Description);
        return expect(actual).resolves.toEqual(mockerResolves.PutParameterResult);
    });
});

/**
 * Test the SendCommandAsync method
 */
describe(`${SSMHelper.name}.${ssmHelperMockResolves.SendCommandAsync.name}`, () => {
    // set action for this method
    const action = `${SSMHelper.name}.${ssmHelperMockResolves.SendCommandAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} documentName`, () => {
        const actual = ssmHelperMockResolves.SendCommandAsync(TestValues.EmptyString,
            TestValues.Parameters,
            [TestValues.Id]);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} documentName`);
    });
    test(`${TestValues.ThrowsOnEmpty} parameters`, () => {
        const actual = ssmHelperMockResolves.SendCommandAsync(TestValues.Name,
            TestValues.EmptyObject,
            [TestValues.Id]);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} parameters`);
    });
    test(`${TestValues.ThrowsOnEmpty} instanceIds`, () => {
        const actual = ssmHelperMockResolves.SendCommandAsync(TestValues.Name,
            TestValues.Parameters,
            TestValues.EmptyArray);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} at least one instanceId`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = ssmHelperMockRejects.SendCommandAsync(TestValues.Name,
            TestValues.Parameters,
            [TestValues.Id]);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = ssmHelperMockResolves.SendCommandAsync(TestValues.Name,
            TestValues.Parameters,
            [TestValues.Id]);
        return expect(actual).resolves.toEqual(mockerResolves.SendCommandResult);
    });
});