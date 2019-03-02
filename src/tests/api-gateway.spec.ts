import { Logger, LogLevel } from '../logger';
import { APIGatewayMock } from '../mocks';
import { APIGatewayHelper } from '../helpers';
import { TestValuesClass } from './test-values';

const logger = new Logger(LogLevel.Off);
const mockerResolves = new APIGatewayMock(false);
const apiGatewayHelperMockResolves = new APIGatewayHelper(logger, mockerResolves.Mock);
const mockerRejects = new APIGatewayMock(true);
const apiGatewayHelperMockRejects = new APIGatewayHelper(logger, mockerRejects.Mock);
const TestValues = new TestValuesClass();

/**
 * Test the CreateApiKeyAsync method
 */
describe(`${APIGatewayHelper.name}.${apiGatewayHelperMockResolves.CreateApiKeyAsync.name}`, () => {
    // set action for this method
    const action = `${APIGatewayHelper.name}.${apiGatewayHelperMockResolves.CreateApiKeyAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} name`, () => {
        const actual = apiGatewayHelperMockResolves.CreateApiKeyAsync(TestValues.EmptyString,
            TestValues.Description);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} name`);
    });
    test(`${TestValues.ThrowsOnEmpty} description`, () => {
        const actual = apiGatewayHelperMockResolves.CreateApiKeyAsync(TestValues.Name,
            TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} description`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = apiGatewayHelperMockRejects.CreateApiKeyAsync(TestValues.Name,
            TestValues.Description,
            TestValues.StringValue);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = apiGatewayHelperMockResolves.CreateApiKeyAsync(TestValues.Name,
            TestValues.Description,
            TestValues.StringValue);
        return expect(actual).resolves.toEqual(mockerResolves.ApiKey);
    });
});

/**
 * Test the CreateUsagePlanAsync method
 */
describe(`${APIGatewayHelper.name}.${apiGatewayHelperMockResolves.CreateUsagePlanAsync.name}`, () => {
    // set action for this method
    const action = `${APIGatewayHelper.name}.${apiGatewayHelperMockResolves.CreateUsagePlanAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} name`, () => {
        const actual = apiGatewayHelperMockResolves.CreateUsagePlanAsync(TestValues.EmptyString,
            TestValues.Description,
            TestValues.ApiStageArray);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} name`);
    });
    test(`${TestValues.ThrowsOnEmpty} description`, () => {
        const actual = apiGatewayHelperMockResolves.CreateUsagePlanAsync(TestValues.Name,
            TestValues.EmptyString,
            TestValues.ApiStageArray);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} description`);
    });
    test(`${TestValues.ThrowsOnEmpty} apiStages`, () => {
        const actual = apiGatewayHelperMockResolves.CreateUsagePlanAsync(TestValues.Name,
            TestValues.Description,
            TestValues.EmptyArray);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} at least one apiStage`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = apiGatewayHelperMockRejects.CreateUsagePlanAsync(TestValues.Name,
            TestValues.Description,
            TestValues.ApiStageArray);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = apiGatewayHelperMockResolves.CreateUsagePlanAsync(TestValues.Name,
            TestValues.Description,
            TestValues.ApiStageArray);
        return expect(actual).resolves.toEqual(mockerResolves.UsagePlan);
    });
});

/**
 * Test the CreateUsagePlanKeyAsync method
 */
describe(`${APIGatewayHelper.name}.${apiGatewayHelperMockResolves.CreateUsagePlanKeyAsync.name}`, () => {
    // set action for this method
    const action = `${APIGatewayHelper.name}.${apiGatewayHelperMockResolves.CreateUsagePlanKeyAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} keyId`, () => {
        const actual = apiGatewayHelperMockResolves.CreateUsagePlanKeyAsync(TestValues.EmptyString,
            TestValues.Key,
            TestValues.UsagePlanId);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} keyId`);
    });
    test(`${TestValues.ThrowsOnEmpty} keyType`, () => {
        const actual = apiGatewayHelperMockResolves.CreateUsagePlanKeyAsync(TestValues.Key,
            TestValues.EmptyString,
            TestValues.UsagePlanId);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} keyType`);
    });
    test(`${TestValues.ThrowsOnEmpty} usagePlanId`, () => {
        const actual = apiGatewayHelperMockResolves.CreateUsagePlanKeyAsync(TestValues.Name,
            TestValues.Description,
            TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} usagePlanId`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = apiGatewayHelperMockRejects.CreateUsagePlanKeyAsync(TestValues.Name,
            TestValues.Description,
            TestValues.UsagePlanId);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = apiGatewayHelperMockResolves.CreateUsagePlanKeyAsync(TestValues.Name,
            TestValues.Description,
            TestValues.UsagePlanId);
        return expect(actual).resolves.toEqual(mockerResolves.UsagePlanKey);
    });
});

/**
 * Test the DeleteApiKeyAsync method
 */
describe(`${APIGatewayHelper.name}.${apiGatewayHelperMockResolves.DeleteApiKeyAsync.name}`, () => {
    // set action for this method
    const action = `${APIGatewayHelper.name}.${apiGatewayHelperMockResolves.DeleteApiKeyAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} apiKey`, () => {
        const actual = apiGatewayHelperMockResolves.DeleteApiKeyAsync(TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} apiKey`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = apiGatewayHelperMockRejects.DeleteApiKeyAsync(TestValues.Key);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = apiGatewayHelperMockResolves.DeleteApiKeyAsync(TestValues.Key);
        return expect(actual).resolves.toEqual(mockerResolves.DeleteApiKey);
    });
});

/**
 * Test the DeleteUsagePlanAsync method
 */
describe(`${APIGatewayHelper.name}.${apiGatewayHelperMockResolves.DeleteUsagePlanAsync.name}`, () => {
    // set action for this method
    const action = `${APIGatewayHelper.name}.${apiGatewayHelperMockResolves.DeleteUsagePlanAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} usagePlanId`, () => {
        const actual = apiGatewayHelperMockResolves.DeleteUsagePlanAsync(TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} usagePlanId`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = apiGatewayHelperMockRejects.DeleteUsagePlanAsync(TestValues.UsagePlanId);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = apiGatewayHelperMockResolves.DeleteUsagePlanAsync(TestValues.UsagePlanId);
        return expect(actual).resolves.toEqual(mockerResolves.DeleteUsagePlan);
    });
});

/**
 * Test the DeleteUsagePlanKeyAsync method
 */
describe(`${APIGatewayHelper.name}.${apiGatewayHelperMockResolves.DeleteUsagePlanKeyAsync.name}`, () => {
    // set action for this method
    const action = `${APIGatewayHelper.name}.${apiGatewayHelperMockResolves.DeleteUsagePlanKeyAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} keyId`, () => {
        const actual = apiGatewayHelperMockResolves.DeleteUsagePlanKeyAsync(TestValues.EmptyString,
            TestValues.UsagePlanId);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} keyId`);
    });
    test(`${TestValues.ThrowsOnEmpty} usagePlanId`, () => {
        const actual = apiGatewayHelperMockResolves.DeleteUsagePlanKeyAsync(TestValues.Key,
            TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} usagePlanId`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = apiGatewayHelperMockRejects.DeleteUsagePlanKeyAsync(TestValues.Key,
            TestValues.UsagePlanId);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = apiGatewayHelperMockResolves.DeleteUsagePlanKeyAsync(TestValues.Key,
            TestValues.UsagePlanId);
        return expect(actual).resolves.toEqual(mockerResolves.DeleteUsagePlanKey);
    });
});

/**
 * Test the GetApiKeyAsync method
 */
describe(`${APIGatewayHelper.name}.${apiGatewayHelperMockResolves.GetApiKeyAsync.name}`, () => {
    // set action for this method
    const action = `${APIGatewayHelper.name}.${apiGatewayHelperMockResolves.GetApiKeyAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} apiKey`, () => {
        const actual = apiGatewayHelperMockResolves.GetApiKeyAsync(TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} apiKey`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = apiGatewayHelperMockRejects.GetApiKeyAsync(TestValues.Key);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = apiGatewayHelperMockResolves.GetApiKeyAsync(TestValues.Key);
        return expect(actual).resolves.toEqual(mockerResolves.DeleteUsagePlanKey);
    });
});