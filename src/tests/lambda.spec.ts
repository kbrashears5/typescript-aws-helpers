import { LambdaHelper } from '../helpers';
import { Logger, LogLevel } from '../logger';
import { LambdaMock } from '../mocks';
import { TestValuesClass } from './test-values';

const logger = new Logger(LogLevel.Off);
const mockerResolves = new LambdaMock(false);
const lambdaHelperMockResolves = new LambdaHelper(logger, mockerResolves.Mock);
const mockerRejects = new LambdaMock(true);
const lambdaHelperMockRejects = new LambdaHelper(logger, mockerRejects.Mock);
const TestValues = new TestValuesClass();

/**
 * Test the DisableDynamoEventSourceMappingAsync method
 */
describe(`${LambdaHelper.name}.${lambdaHelperMockResolves.DisableDynamoEventSourceMappingAsync.name}`, () => {
    // set action for this method
    const action = `${LambdaHelper.name}.${lambdaHelperMockResolves.UpdateEventSourceMappingAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} functionName`, () => {
        const actual = lambdaHelperMockResolves.DisableDynamoEventSourceMappingAsync(TestValues.EmptyString,
            TestValues.Uuid);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} functionName`);
    });
    test(`${TestValues.ThrowsOnEmpty} uuid`, () => {
        const actual = lambdaHelperMockResolves.DisableDynamoEventSourceMappingAsync(TestValues.Name,
            TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} uuid`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = lambdaHelperMockRejects.DisableDynamoEventSourceMappingAsync(TestValues.Name,
            TestValues.Uuid);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = lambdaHelperMockResolves.DisableDynamoEventSourceMappingAsync(TestValues.Name,
            TestValues.Uuid);
        return expect(actual).resolves.toEqual(mockerResolves.EventSourceMappingConfiguration);
    });
});

/**
 * Test the DisableKinesisEventSourceMappingAsync method
 */
describe(`${LambdaHelper.name}.${lambdaHelperMockResolves.DisableKinesisEventSourceMappingAsync.name}`, () => {
    // set action for this method
    const action = `${LambdaHelper.name}.${lambdaHelperMockResolves.UpdateEventSourceMappingAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} functionName`, () => {
        const actual = lambdaHelperMockResolves.DisableKinesisEventSourceMappingAsync(TestValues.EmptyString,
            TestValues.Uuid);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} functionName`);
    });
    test(`${TestValues.ThrowsOnEmpty} uuid`, () => {
        const actual = lambdaHelperMockResolves.DisableKinesisEventSourceMappingAsync(TestValues.Name,
            TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} uuid`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = lambdaHelperMockRejects.DisableKinesisEventSourceMappingAsync(TestValues.Name,
            TestValues.Uuid);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = lambdaHelperMockResolves.DisableKinesisEventSourceMappingAsync(TestValues.Name,
            TestValues.Uuid);
        return expect(actual).resolves.toEqual(mockerResolves.EventSourceMappingConfiguration);
    });
});

/**
 * Test the DisableSQSEventSourceMappingAsync method
 */
describe(`${LambdaHelper.name}.${lambdaHelperMockResolves.DisableSQSEventSourceMappingAsync.name}`, () => {
    // set action for this method
    const action = `${LambdaHelper.name}.${lambdaHelperMockResolves.UpdateEventSourceMappingAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} functionName`, () => {
        const actual = lambdaHelperMockResolves.DisableSQSEventSourceMappingAsync(TestValues.EmptyString,
            TestValues.Uuid);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} functionName`);
    });
    test(`${TestValues.ThrowsOnEmpty} uuid`, () => {
        const actual = lambdaHelperMockResolves.DisableSQSEventSourceMappingAsync(TestValues.Name,
            TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} uuid`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = lambdaHelperMockRejects.DisableSQSEventSourceMappingAsync(TestValues.Name,
            TestValues.Uuid);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = lambdaHelperMockResolves.DisableSQSEventSourceMappingAsync(TestValues.Name,
            TestValues.Uuid);
        return expect(actual).resolves.toEqual(mockerResolves.EventSourceMappingConfiguration);
    });
});

/**
 * Test the EnableDynamoEventSourceMappingAsync method
 */
describe(`${LambdaHelper.name}.${lambdaHelperMockResolves.EnableDynamoEventSourceMappingAsync.name}`, () => {
    // set action for this method
    const action = `${LambdaHelper.name}.${lambdaHelperMockResolves.UpdateEventSourceMappingAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} functionName`, () => {
        const actual = lambdaHelperMockResolves.EnableDynamoEventSourceMappingAsync(TestValues.EmptyString,
            TestValues.Uuid);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} functionName`);
    });
    test(`${TestValues.ThrowsOnEmpty} uuid`, () => {
        const actual = lambdaHelperMockResolves.EnableDynamoEventSourceMappingAsync(TestValues.Name,
            TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} uuid`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = lambdaHelperMockRejects.EnableDynamoEventSourceMappingAsync(TestValues.Name,
            TestValues.Uuid);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = lambdaHelperMockResolves.EnableDynamoEventSourceMappingAsync(TestValues.Name,
            TestValues.Uuid);
        return expect(actual).resolves.toEqual(mockerResolves.EventSourceMappingConfiguration);
    });
});

/**
 * Test the EnableKinesisEventSourceMappingAsync method
 */
describe(`${LambdaHelper.name}.${lambdaHelperMockResolves.EnableKinesisEventSourceMappingAsync.name}`, () => {
    // set action for this method
    const action = `${LambdaHelper.name}.${lambdaHelperMockResolves.UpdateEventSourceMappingAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} functionName`, () => {
        const actual = lambdaHelperMockResolves.EnableKinesisEventSourceMappingAsync(TestValues.EmptyString,
            TestValues.Uuid);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} functionName`);
    });
    test(`${TestValues.ThrowsOnEmpty} uuid`, () => {
        const actual = lambdaHelperMockResolves.EnableKinesisEventSourceMappingAsync(TestValues.Name,
            TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} uuid`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = lambdaHelperMockRejects.EnableKinesisEventSourceMappingAsync(TestValues.Name,
            TestValues.Uuid);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = lambdaHelperMockResolves.EnableKinesisEventSourceMappingAsync(TestValues.Name,
            TestValues.Uuid);
        return expect(actual).resolves.toEqual(mockerResolves.EventSourceMappingConfiguration);
    });
});

/**
 * Test the EnableSQSEventSourceMappingAsync method
 */
describe(`${LambdaHelper.name}.${lambdaHelperMockResolves.EnableSQSEventSourceMappingAsync.name}`, () => {
    // set action for this method
    const action = `${LambdaHelper.name}.${lambdaHelperMockResolves.UpdateEventSourceMappingAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} functionName`, () => {
        const actual = lambdaHelperMockResolves.EnableSQSEventSourceMappingAsync(TestValues.EmptyString,
            TestValues.Uuid);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} functionName`);
    });
    test(`${TestValues.ThrowsOnEmpty} uuid`, () => {
        const actual = lambdaHelperMockResolves.EnableSQSEventSourceMappingAsync(TestValues.Name,
            TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} uuid`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = lambdaHelperMockRejects.EnableSQSEventSourceMappingAsync(TestValues.Name,
            TestValues.Uuid);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = lambdaHelperMockResolves.EnableSQSEventSourceMappingAsync(TestValues.Name,
            TestValues.Uuid);
        return expect(actual).resolves.toEqual(mockerResolves.EventSourceMappingConfiguration);
    });
});

/**
 * Test the GetEventSourceMappingAsync method
 */
describe(`${LambdaHelper.name}.${lambdaHelperMockResolves.GetEventSourceMappingAsync.name}`, () => {
    // set action for this method
    const action = `${LambdaHelper.name}.${lambdaHelperMockResolves.GetEventSourceMappingAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} uuid`, () => {
        const actual = lambdaHelperMockResolves.GetEventSourceMappingAsync(TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} uuid`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = lambdaHelperMockRejects.GetEventSourceMappingAsync(TestValues.Uuid);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = lambdaHelperMockResolves.GetEventSourceMappingAsync(TestValues.Uuid);
        return expect(actual).resolves.toEqual(mockerResolves.EventSourceMappingConfiguration);
    });
});

/**
 * Test the ListEventSourceMappingsAsync method
 */
describe(`${LambdaHelper.name}.${lambdaHelperMockResolves.ListEventSourceMappingsAsync.name}`, () => {
    // set action for this method
    const action = `${LambdaHelper.name}.${lambdaHelperMockResolves.ListEventSourceMappingsAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} functionName`, () => {
        const actual = lambdaHelperMockResolves.ListEventSourceMappingsAsync(TestValues.EmptyString,
            TestValues.Arn);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} functionName`);
    });
    test(`${TestValues.ThrowsOnEmpty} eventSourceArn`, () => {
        const actual = lambdaHelperMockResolves.ListEventSourceMappingsAsync(TestValues.Name,
            TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} eventSourceArn`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = lambdaHelperMockRejects.ListEventSourceMappingsAsync(TestValues.Name,
            TestValues.Arn);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = lambdaHelperMockResolves.ListEventSourceMappingsAsync(TestValues.Name,
            TestValues.Arn);
        return expect(actual).resolves.toEqual(mockerResolves.ListEventSourceMappingsResponse);
    });
});

/**
 * Test the InvokeSync method
 */
describe(`${LambdaHelper.name}.${lambdaHelperMockResolves.InvokeSync.name}`, () => {
    // set action for this method
    const action = `${LambdaHelper.name}.${lambdaHelperMockResolves.InvokeSync.name}`;

    test(`${TestValues.ThrowsOnEmpty} functionName`, () => {
        const actual = lambdaHelperMockResolves.InvokeSync<string>(TestValues.EmptyString,
            TestValues.Body);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} functionName`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = lambdaHelperMockRejects.InvokeSync<string>(TestValues.Name,
            TestValues.Body);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = lambdaHelperMockResolves.InvokeSync<string>(TestValues.Name,
            TestValues.Body);
        return expect(actual).resolves.toEqual(mockerResolves.InvocationResponse);
    });
});

/**
 * Test the InvokeAsync method
 */
describe(`${LambdaHelper.name}.${lambdaHelperMockResolves.InvokeAsync.name}`, () => {
    // set action for this method
    const action = `${LambdaHelper.name}.${lambdaHelperMockResolves.InvokeAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} functionName`, () => {
        const actual = lambdaHelperMockResolves.InvokeAsync<string>(TestValues.EmptyString,
            TestValues.Body);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} functionName`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = lambdaHelperMockRejects.InvokeAsync<string>(TestValues.Name,
            TestValues.Body);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = lambdaHelperMockResolves.InvokeAsync<string>(TestValues.Name,
            TestValues.Body);
        return expect(actual).resolves.toEqual(mockerResolves.InvocationResponse);
    });
});

/**
 * Test the UpdateEventSourceMappingAsync method
 */
describe(`${LambdaHelper.name}.${lambdaHelperMockResolves.UpdateEventSourceMappingAsync.name}`, () => {
    // set action for this method
    const action = `${LambdaHelper.name}.${lambdaHelperMockResolves.UpdateEventSourceMappingAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} functionName`, () => {
        const actual = lambdaHelperMockResolves.UpdateEventSourceMappingAsync(TestValues.EmptyString,
            TestValues.BooleanValue,
            TestValues.Uuid,
            TestValues.NumberValue);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} functionName`);
    });
    test(`${TestValues.ThrowsOnEmpty} uuid`, () => {
        const actual = lambdaHelperMockResolves.UpdateEventSourceMappingAsync(TestValues.Name,
            TestValues.BooleanValue,
            TestValues.EmptyString,
            TestValues.NumberValue);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} uuid`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = lambdaHelperMockRejects.UpdateEventSourceMappingAsync(TestValues.Name,
            TestValues.BooleanValue,
            TestValues.Uuid,
            TestValues.NumberValue);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = lambdaHelperMockResolves.UpdateEventSourceMappingAsync(TestValues.Name,
            TestValues.BooleanValue,
            TestValues.Uuid,
            TestValues.NumberValue);
        return expect(actual).resolves.toEqual(mockerResolves.EventSourceMappingConfiguration);
    });
});
