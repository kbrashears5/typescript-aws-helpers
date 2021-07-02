import { Callback, Context, SQSRecord } from 'aws-lambda';
import { LogLevel } from 'typescript-ilogger';
import { Handler } from './handler';

const handler = new Handler(LogLevel.Off);

/**
 * Test the Execute method
 */
describe(`${Handler.name}.${handler.Execute.name}`, () => {
  test(`throws for null context`, async () => {
    const actual = handler.Execute(
      'payload',
      {} as Context,
      {} as Callback<any>,
      () => {
        return Promise.resolve('response');
      },
    );
    return await expect(actual).rejects.toThrow('Must supply context');
  });
});

/**
 * Test the OrchestrateSQS method
 */
describe(`${Handler.name}.${handler.OrchestrateSQS.name}`, () => {
  test(`throws for null queueUrl`, async () => {
    const actual = handler.OrchestrateSQS([] as SQSRecord[], '', () => {
      return Promise.resolve();
    });
    return await expect(actual).rejects.toThrow('Must supply queueUrl');
  });
});
