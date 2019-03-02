import { Logger, LogLevel } from '../logger';
import { CloudWatchHelper } from '../helpers/cloudwatch-helper';
import { CloudWatchMock } from '../mocks/cloudwatch-mock';

const logger = new Logger(LogLevel.Off);
const mockerResolves = new CloudWatchMock(false);
const cloudWatchHelperMockResolves = new CloudWatchHelper(logger, mockerResolves.Mock);
const mockerRejects = new CloudWatchMock(true);
const cloudWatchHelperMockRejects = new CloudWatchHelper(logger, mockerRejects.Mock);

/**
 * Test the PutMetricDataAsync method
 */
describe(`${CloudWatchHelper.name}.${cloudWatchHelperMockResolves.PutMetricDataAsync.name}`, () => {
    // set action for this method
    const action = `${CloudWatchHelper.name}.${cloudWatchHelperMockResolves.PutMetricDataAsync.name}`;

    test(`throws on empty namespace`, () => {
        const actual = cloudWatchHelperMockResolves.PutMetricDataAsync('',
            [{ MetricName: 'good-metric-name' } as AWS.CloudWatch.MetricDatum]);
        return expect(actual).rejects.toThrow(`[${action}]-Must supply namespace`);
    });
    test(`throws on empty metricData`, () => {
        const actual = cloudWatchHelperMockResolves.PutMetricDataAsync('good-namespace',
            []);
        return expect(actual).rejects.toThrow(`[${action}]-Must supply metricData`);
    });
    test(`returns error from AWS`, () => {
        const actual = cloudWatchHelperMockRejects.PutMetricDataAsync('good-namespace',
            [{ MetricName: 'good-metric-name' } as AWS.CloudWatch.MetricDatum]);
        return expect(actual).rejects.toThrow(`AWS Error`);
    });
    test(`returns valid response from AWS`, () => {
        const actual = cloudWatchHelperMockResolves.PutMetricDataAsync('good-queue-url',
            [{ MetricName: 'good-metric-name' } as AWS.CloudWatch.MetricDatum]);
        return expect(actual).resolves.toEqual(mockerResolves.PutMetricDataResponse);
    });
});
