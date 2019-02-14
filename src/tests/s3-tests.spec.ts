import { S3Helper } from "../helpers";
import { Logger, LogLevel } from "../logger";
import { S3Mock } from "../mocks/s3-mock";

const logger = new Logger(LogLevel.Off);
const mockerResolves = new S3Mock(false);
const s3HelperMockResolves = new S3Helper(logger, mockerResolves.Mock);
const mockerRejects = new S3Mock(true);
const s3HelperMockRejects = new S3Helper(logger, mockerRejects.Mock);

/**
 * Test the CopyObjectAsync method
 */
describe(`${S3Helper.name}.${s3HelperMockResolves.CopyObjectAsync.name}`, () => {
    // set action for this method
    const action = `${S3Helper.name}.${s3HelperMockResolves.CopyObjectAsync.name}`;

    test(`throws on empty sourceBucket`, () => {
        const actual = s3HelperMockResolves.CopyObjectAsync('',
            'good-source-key',
            'good-destination-bucket',
            'good-destination-key');
        return expect(actual).rejects.toThrow(`[${action}]-Must supply sourceBucket`);
    });
    test(`throws on empty sourceKey`, () => {
        const actual = s3HelperMockResolves.CopyObjectAsync('good-source-bucket',
            '',
            'good-destination-bucket',
            'good-destination-key');
        return expect(actual).rejects.toThrow(`[${action}]-Must supply sourceKey`);
    });
    test(`throws on empty destinationBucket`, () => {
        const actual = s3HelperMockResolves.CopyObjectAsync('good-source-bucket',
            'good-source-key',
            '',
            'good-destination-key');
        return expect(actual).rejects.toThrow(`[${action}]-Must supply destinationBucket`);
    });
    test(`throws on empty destinationKey`, () => {
        const actual = s3HelperMockResolves.CopyObjectAsync('good-source-bucket',
            'good-source-key',
            'good-destination-bucket',
            '');
        return expect(actual).rejects.toThrow(`[${action}]-Must supply destinationKey`);
    });
    test(`returns error from AWS`, () => {
        const actual = s3HelperMockRejects.CopyObjectAsync('good-bucket',
            'good-key',
            'good-destination-bucket',
            'good-destination-key');
        return expect(actual).rejects.toThrow(`AWS Error`);
    });
    test(`returns valid response from AWS`, () => {
        const actual = s3HelperMockResolves.CopyObjectAsync('good-bucket',
            'good-key',
            'good-destination-bucket',
            'good-destination-key');
        return expect(actual).resolves.toEqual(mockerRejects.CopyObjectOutput);
    });
});

/**
 * Test the GetObjectAsync method
 */
describe(`${S3Helper.name}.${s3HelperMockResolves.GetObjectAsync.name}`, () => {
    // set action for this method
    const action = `${S3Helper.name}.${s3HelperMockResolves.GetObjectAsync.name}`;

    test(`throws on empty bucket`, () => {
        const actual = s3HelperMockResolves.GetObjectAsync('',
            'good-key');
        return expect(actual).rejects.toThrow(`[${action}]-Must supply bucket`);
    });
    test(`throws on empty key`, () => {
        const actual = s3HelperMockResolves.GetObjectAsync('good-bucket',
            '');
        return expect(actual).rejects.toThrow(`[${action}]-Must supply key`);
    });
    test(`returns error from AWS`, () => {
        const actual = s3HelperMockRejects.GetObjectAsync('good-bucket',
            'good-key');
        return expect(actual).rejects.toThrow(`AWS Error`);
    });
    test(`returns valid response from AWS`, () => {
        const actual = s3HelperMockResolves.GetObjectAsync('good-bucket',
            'good-key');
        return expect(actual).resolves.toEqual(mockerRejects.GetObjectOutput);
    });
});

/**
 * Test the PutObjectAsync method
 */
describe(`${S3Helper.name}.${s3HelperMockResolves.PutObjectAsync.name}`, () => {
    // set action for this method
    const action = `${S3Helper.name}.${s3HelperMockResolves.PutObjectAsync.name}`;

    test(`throws on empty bucket`, () => {
        const actual = s3HelperMockResolves.PutObjectAsync('',
            'good-key',
            'good-body');
        return expect(actual).rejects.toThrow(`[${action}]-Must supply bucket`);
    });
    test(`throws on empty key`, () => {
        const actual = s3HelperMockResolves.PutObjectAsync('good-bucket',
            '',
            'good-body');
        return expect(actual).rejects.toThrow(`[${action}]-Must supply key`);
    });
    test(`returns error from AWS`, () => {
        const actual = s3HelperMockRejects.PutObjectAsync('good-bucket',
            'good-key',
            'good-body');
        return expect(actual).rejects.toThrow(`AWS Error`);
    });
    test(`returns valid response from AWS`, () => {
        const actual = s3HelperMockResolves.PutObjectAsync('good-bucket',
            'good-key',
            'good-body');
        return expect(actual).resolves.toEqual(mockerRejects.PutObjectOutput);
    });
});