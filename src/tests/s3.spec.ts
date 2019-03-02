import { S3Helper } from "../helpers";
import { Logger, LogLevel } from "../logger";
import { S3Mock } from "../mocks/s3-mock";
import { TestValuesClass } from "./test-values";

const logger = new Logger(LogLevel.Off);
const mockerResolves = new S3Mock(false);
const s3HelperMockResolves = new S3Helper(logger, mockerResolves.Mock);
const mockerRejects = new S3Mock(true);
const s3HelperMockRejects = new S3Helper(logger, mockerRejects.Mock);
const TestValues = new TestValuesClass();

/**
 * Test the CopyObjectAsync method
 */
describe(`${S3Helper.name}.${s3HelperMockResolves.CopyObjectAsync.name}`, () => {
    // set action for this method
    const action = `${S3Helper.name}.${s3HelperMockResolves.CopyObjectAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} sourceBucket`, () => {
        const actual = s3HelperMockResolves.CopyObjectAsync(TestValues.EmptyString,
            TestValues.Key,
            TestValues.Name,
            TestValues.Key);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} sourceBucket`);
    });
    test(`${TestValues.ThrowsOnEmpty} sourceKey`, () => {
        const actual = s3HelperMockResolves.CopyObjectAsync(TestValues.Name,
            TestValues.EmptyString,
            TestValues.Name,
            TestValues.Key);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} sourceKey`);
    });
    test(`${TestValues.ThrowsOnEmpty} destinationBucket`, () => {
        const actual = s3HelperMockResolves.CopyObjectAsync(TestValues.Name,
            TestValues.Key,
            TestValues.EmptyString,
            TestValues.Key);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} destinationBucket`);
    });
    test(`${TestValues.ThrowsOnEmpty} destinationKey`, () => {
        const actual = s3HelperMockResolves.CopyObjectAsync(TestValues.Name,
            TestValues.Key,
            TestValues.Name,
            TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} destinationKey`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = s3HelperMockRejects.CopyObjectAsync(TestValues.Name,
            TestValues.Key,
            TestValues.Name,
            TestValues.Key);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = s3HelperMockResolves.CopyObjectAsync(TestValues.Name,
            TestValues.Key,
            TestValues.Name,
            TestValues.Key);
        return expect(actual).resolves.toEqual(mockerResolves.CopyObjectOutput);
    });
});

/**
 * Test the CreateBucketAsync method
 */
describe(`${S3Helper.name}.${s3HelperMockResolves.CreateBucketAsync.name}`, () => {
    // set action for this method
    const action = `${S3Helper.name}.${s3HelperMockResolves.CreateBucketAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} bucket`, () => {
        const actual = s3HelperMockResolves.CreateBucketAsync(TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} name`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = s3HelperMockRejects.CreateBucketAsync(TestValues.Name);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = s3HelperMockResolves.CreateBucketAsync(TestValues.Name);
        return expect(actual).resolves.toEqual(mockerResolves.CreateBucketOutput);
    });
});

/**
 * Test the DeleteBucketAsync method
 */
describe(`${S3Helper.name}.${s3HelperMockResolves.DeleteBucketAsync.name}`, () => {
    // set action for this method
    const action = `${S3Helper.name}.${s3HelperMockResolves.DeleteBucketAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} bucket`, () => {
        const actual = s3HelperMockResolves.DeleteBucketAsync(TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} name`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = s3HelperMockRejects.DeleteBucketAsync(TestValues.Name);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = s3HelperMockResolves.DeleteBucketAsync(TestValues.Name);
        return expect(actual).resolves.toEqual(mockerResolves.CreateBucketOutput);
    });
});

/**
 * Test the DeleteObjectAsync method
 */
describe(`${S3Helper.name}.${s3HelperMockResolves.DeleteObjectAsync.name}`, () => {
    // set action for this method
    const action = `${S3Helper.name}.${s3HelperMockResolves.DeleteObjectAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} bucket`, () => {
        const actual = s3HelperMockResolves.DeleteObjectAsync(TestValues.EmptyString,
            TestValues.Key);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} bucket`);
    });
    test(`${TestValues.ThrowsOnEmpty} key`, () => {
        const actual = s3HelperMockResolves.DeleteObjectAsync(TestValues.Name,
            TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} key`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = s3HelperMockRejects.DeleteObjectAsync(TestValues.Name,
            TestValues.Key);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = s3HelperMockResolves.DeleteObjectAsync(TestValues.Name,
            TestValues.Key);
        return expect(actual).resolves.toEqual(mockerResolves.CreateBucketOutput);
    });
});

/**
 * Test the DeleteObjectsAsync method
 */
describe(`${S3Helper.name}.${s3HelperMockResolves.DeleteObjectsAsync.name}`, () => {
    // set action for this method
    const action = `${S3Helper.name}.${s3HelperMockResolves.DeleteObjectsAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} bucket`, () => {
        const actual = s3HelperMockResolves.DeleteObjectsAsync(TestValues.EmptyString,
            [TestValues.Key]);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} bucket`);
    });
    test(`${TestValues.ThrowsOnEmpty} key array`, () => {
        const actual = s3HelperMockResolves.DeleteObjectsAsync(TestValues.Name,
            TestValues.EmptyArray);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} at least one key`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = s3HelperMockRejects.DeleteObjectsAsync(TestValues.Name,
            [TestValues.Key]);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = s3HelperMockResolves.DeleteObjectsAsync(TestValues.Name,
            [TestValues.Key]);
        return expect(actual).resolves.toEqual(mockerResolves.CreateBucketOutput);
    });
});

/**
 * Test the GetObjectAsync method
 */
describe(`${S3Helper.name}.${s3HelperMockResolves.GetObjectAsync.name}`, () => {
    // set action for this method
    const action = `${S3Helper.name}.${s3HelperMockResolves.GetObjectAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} bucket`, () => {
        const actual = s3HelperMockResolves.GetObjectAsync(TestValues.EmptyString,
            TestValues.Key);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} bucket`);
    });
    test(`${TestValues.ThrowsOnEmpty} key`, () => {
        const actual = s3HelperMockResolves.GetObjectAsync(TestValues.Name,
            TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} key`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = s3HelperMockRejects.GetObjectAsync(TestValues.Name,
            TestValues.Key);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = s3HelperMockResolves.GetObjectAsync(TestValues.Name,
            TestValues.Key);
        return expect(actual).resolves.toEqual(mockerResolves.GetObjectOutput);
    });
});

/**
 * Test the PutObjectAsync method
 */
describe(`${S3Helper.name}.${s3HelperMockResolves.PutObjectAsync.name}`, () => {
    // set action for this method
    const action = `${S3Helper.name}.${s3HelperMockResolves.PutObjectAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} bucket`, () => {
        const actual = s3HelperMockResolves.PutObjectAsync(TestValues.EmptyString,
            TestValues.Key,
            TestValues.Body);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} bucket`);
    });
    test(`${TestValues.ThrowsOnEmpty} key`, () => {
        const actual = s3HelperMockResolves.PutObjectAsync(TestValues.Name,
            TestValues.EmptyString,
            TestValues.Body);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} key`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = s3HelperMockRejects.PutObjectAsync(TestValues.Name,
            TestValues.Key,
            TestValues.Body);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = s3HelperMockResolves.PutObjectAsync(TestValues.Name,
            TestValues.Key,
            TestValues.Body);
        return expect(actual).resolves.toEqual(mockerResolves.PutObjectOutput);
    });
});