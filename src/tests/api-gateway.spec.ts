import { Logger, LogLevel } from '../logger';
import { APIGatewayMock } from '../mocks';
import { APIGatewayHelper } from '../helpers';

const logger = new Logger(LogLevel.Off);
const mockerResolves = new APIGatewayMock(false);
const apiGatewayHelperMockResolves = new APIGatewayHelper(logger, mockerResolves.Mock);
const mockerRejects = new APIGatewayMock(true);
const apiGatewayHelperMockRejects = new APIGatewayHelper(logger, mockerRejects.Mock);

/**
 * Test the CreateApiKeyAsync method
 */
describe(`${APIGatewayHelper.name}.${apiGatewayHelperMockResolves.CreateApiKeyAsync.name}`, () => {
    // set action for this method
    const action = `${APIGatewayHelper.name}.${apiGatewayHelperMockResolves.CreateApiKeyAsync.name}`;

    test(`throws on empty name`, () => {
        const actual = apiGatewayHelperMockResolves.CreateApiKeyAsync('',
            'good-description');
        return expect(actual).rejects.toThrow(`[${action}]-Must supply name`);
    });
    test(`throws on empty description`, () => {
        const actual = apiGatewayHelperMockResolves.CreateApiKeyAsync('good-name',
            '');
        return expect(actual).rejects.toThrow(`[${action}]-Must supply description`);
    });
    test(`returns error from AWS`, () => {
        const actual = apiGatewayHelperMockRejects.CreateApiKeyAsync('good-name',
            'good-description',
            'good-value');
        return expect(actual).rejects.toThrow(`AWS Error`);
    });
    test(`returns valid response from AWS`, () => {
        const actual = apiGatewayHelperMockResolves.CreateApiKeyAsync('good-name',
            'good-description',
            'good-value');
        return expect(actual).resolves.toEqual(mockerResolves.ApiKey);
    });
});

/**
 * Test the CreateUsagePlanAsync method
 */
describe(`${APIGatewayHelper.name}.${apiGatewayHelperMockResolves.CreateUsagePlanAsync.name}`, () => {
    // set action for this method
    const action = `${APIGatewayHelper.name}.${apiGatewayHelperMockResolves.CreateUsagePlanAsync.name}`;

    test(`throws on empty name`, () => {
        const actual = apiGatewayHelperMockResolves.CreateUsagePlanAsync('',
            'good-description',
            [{ apiId: '1' }] as AWS.APIGateway.ApiStage[]);
        return expect(actual).rejects.toThrow(`[${action}]-Must supply name`);
    });
    test(`throws on empty description`, () => {
        const actual = apiGatewayHelperMockResolves.CreateUsagePlanAsync('good-name',
            '',
            [{ apiId: 'good-api-id' }] as AWS.APIGateway.ApiStage[]);
        return expect(actual).rejects.toThrow(`[${action}]-Must supply description`);
    });
    test(`throws on empty apiStages`, () => {
        const actual = apiGatewayHelperMockResolves.CreateUsagePlanAsync('good-name',
            'good-description',
            []);
        return expect(actual).rejects.toThrow(`[${action}]-Must supply at least one apiStage`);
    });
    test(`returns error from AWS`, () => {
        const actual = apiGatewayHelperMockRejects.CreateUsagePlanAsync('good-name',
            'good-description',
            [{ apiId: 'good-api-id' }] as AWS.APIGateway.ApiStage[]);
        return expect(actual).rejects.toThrow(`AWS Error`);
    });
    test(`returns valid response from AWS`, () => {
        const actual = apiGatewayHelperMockResolves.CreateUsagePlanAsync('good-name',
            'good-description',
            [{ apiId: 'good-api-id' }] as AWS.APIGateway.ApiStage[]);
        return expect(actual).resolves.toEqual(mockerResolves.UsagePlan);
    });
});

/**
 * Test the CreateUsagePlanKeyAsync method
 */
describe(`${APIGatewayHelper.name}.${apiGatewayHelperMockResolves.CreateUsagePlanKeyAsync.name}`, () => {
    // set action for this method
    const action = `${APIGatewayHelper.name}.${apiGatewayHelperMockResolves.CreateUsagePlanKeyAsync.name}`;

    test(`throws on empty keyId`, () => {
        const actual = apiGatewayHelperMockResolves.CreateUsagePlanKeyAsync('',
            'good-key-type',
            'good-usage-plan-id');
        return expect(actual).rejects.toThrow(`[${action}]-Must supply keyId`);
    });
    test(`throws on empty keyType`, () => {
        const actual = apiGatewayHelperMockResolves.CreateUsagePlanKeyAsync('good-key-id',
            '',
            'good-usage-plan-id');
        return expect(actual).rejects.toThrow(`[${action}]-Must supply keyType`);
    });
    test(`throws on empty usagePlanId`, () => {
        const actual = apiGatewayHelperMockResolves.CreateUsagePlanKeyAsync('good-name',
            'good-description',
            '');
        return expect(actual).rejects.toThrow(`[${action}]-Must supply usagePlanId`);
    });
    test(`returns error from AWS`, () => {
        const actual = apiGatewayHelperMockRejects.CreateUsagePlanKeyAsync('good-name',
            'good-description',
            'good-usage-plan-id');
        return expect(actual).rejects.toThrow(`AWS Error`);
    });
    test(`returns valid response from AWS`, () => {
        const actual = apiGatewayHelperMockResolves.CreateUsagePlanKeyAsync('good-name',
            'good-description',
            'good-usage-plan-id');
        return expect(actual).resolves.toEqual(mockerResolves.UsagePlanKey);
    });
});

/**
 * Test the DeleteApiKeyAsync method
 */
describe(`${APIGatewayHelper.name}.${apiGatewayHelperMockResolves.DeleteApiKeyAsync.name}`, () => {
    // set action for this method
    const action = `${APIGatewayHelper.name}.${apiGatewayHelperMockResolves.DeleteApiKeyAsync.name}`;

    test(`throws on empty apiKey`, () => {
        const actual = apiGatewayHelperMockResolves.DeleteApiKeyAsync('');
        return expect(actual).rejects.toThrow(`[${action}]-Must supply apiKey`);
    });
    test(`returns error from AWS`, () => {
        const actual = apiGatewayHelperMockRejects.DeleteApiKeyAsync('good-api-key');
        return expect(actual).rejects.toThrow(`AWS Error`);
    });
    test(`returns valid response from AWS`, () => {
        const actual = apiGatewayHelperMockResolves.DeleteApiKeyAsync('good-api-key');
        return expect(actual).resolves.toEqual(mockerResolves.DeleteApiKey);
    });
});

/**
 * Test the DeleteUsagePlanAsync method
 */
describe(`${APIGatewayHelper.name}.${apiGatewayHelperMockResolves.DeleteUsagePlanAsync.name}`, () => {
    // set action for this method
    const action = `${APIGatewayHelper.name}.${apiGatewayHelperMockResolves.DeleteUsagePlanAsync.name}`;

    test(`throws on empty usagePlanId`, () => {
        const actual = apiGatewayHelperMockResolves.DeleteUsagePlanAsync('');
        return expect(actual).rejects.toThrow(`[${action}]-Must supply usagePlanId`);
    });
    test(`returns error from AWS`, () => {
        const actual = apiGatewayHelperMockRejects.DeleteUsagePlanAsync('good-usage-plan-id');
        return expect(actual).rejects.toThrow(`AWS Error`);
    });
    test(`returns valid response from AWS`, () => {
        const actual = apiGatewayHelperMockResolves.DeleteUsagePlanAsync('good-usage-plan-id');
        return expect(actual).resolves.toEqual(mockerResolves.DeleteUsagePlan);
    });
});

/**
 * Test the DeleteUsagePlanKeyAsync method
 */
describe(`${APIGatewayHelper.name}.${apiGatewayHelperMockResolves.DeleteUsagePlanKeyAsync.name}`, () => {
    // set action for this method
    const action = `${APIGatewayHelper.name}.${apiGatewayHelperMockResolves.DeleteUsagePlanKeyAsync.name}`;

    test(`throws on empty keyId`, () => {
        const actual = apiGatewayHelperMockResolves.DeleteUsagePlanKeyAsync('',
            'good-usage-plan-id');
        return expect(actual).rejects.toThrow(`[${action}]-Must supply keyId`);
    });
    test(`throws on empty usagePlanId`, () => {
        const actual = apiGatewayHelperMockResolves.DeleteUsagePlanKeyAsync('good-key-id',
            '');
        return expect(actual).rejects.toThrow(`[${action}]-Must supply usagePlanId`);
    });
    test(`returns error from AWS`, () => {
        const actual = apiGatewayHelperMockRejects.DeleteUsagePlanKeyAsync('good-key-id',
            'good-usage-plan-id');
        return expect(actual).rejects.toThrow(`AWS Error`);
    });
    test(`returns valid response from AWS`, () => {
        const actual = apiGatewayHelperMockResolves.DeleteUsagePlanKeyAsync('good-key-id',
            'good-usage-plan-id');
        return expect(actual).resolves.toEqual(mockerResolves.DeleteUsagePlanKey);
    });
});