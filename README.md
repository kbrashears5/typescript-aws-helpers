<h1 align="center">typescript-aws-helpers</h1>

<div align="center">
    
<b>Collection of different AWS service helpers</b>
    
[![CI/CD](https://github.com/kbrashears5/typescript-aws-helpers/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/kbrashears5/typescript-aws-helpers/actions/workflows/ci-cd.yml)

[![NPM Version](https://img.shields.io/npm/v/typescript-aws-helpers)](https://img.shields.io/npm/v/typescript-aws-helpers)
[![Downloads](https://img.shields.io/npm/dt/typescript-aws-helpers)](https://img.shields.io/npm/dt/typescript-aws-helpers)

## Associated Helpers

| Helper                                                                              | CI/CD                                                                                                                                                                                                          | Version                                                                                                                                        | Downloads                                                                                                                                      |
| ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| [APIGatewayHelper](https://github.com/kbrashears5/typescript-aws-apigateway-helper) | [![CI/CD](https://github.com/kbrashears5/typescript-aws-apigateway-helper/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/kbrashears5/typescript-aws-apigateway-helper/actions/workflows/ci-cd.yml) | [![NPM Version](https://img.shields.io/npm/v/typescript-aws-apigateway-helper)](https://img.shields.io/npm/v/typescript-aws-apigateway-helper) | [![Downloads](https://img.shields.io/npm/dt/typescript-aws-apigateway-helper)](https://img.shields.io/npm/dt/typescript-aws-apigateway-helper) |
| [CloudWatchHelper](https://github.com/kbrashears5/typescript-aws-cloudwatch-helper) | [![CI/CD](https://github.com/kbrashears5/typescript-aws-cloudwatch-helper/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/kbrashears5/typescript-aws-cloudwatch-helper/actions/workflows/ci-cd.yml) | [![NPM Version](https://img.shields.io/npm/v/typescript-aws-cloudwatch-helper)](https://img.shields.io/npm/v/typescript-aws-cloudwatch-helper) | [![Downloads](https://img.shields.io/npm/dt/typescript-aws-cloudwatch-helper)](https://img.shields.io/npm/dt/typescript-aws-cloudwatch-helper) |
| [DynamoHelper](https://github.com/kbrashears5/typescript-aws-dynamo-helper)         | [![CI/CD](https://github.com/kbrashears5/typescript-aws-dynamo-helper/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/kbrashears5/typescript-aws-dynamo-helper/actions/workflows/ci-cd.yml)         | [![NPM Version](https://img.shields.io/npm/v/typescript-aws-dynamo-helper)](https://img.shields.io/npm/v/typescript-aws-dynamo-helper)         | [![Downloads](https://img.shields.io/npm/dt/typescript-aws-dynamo-helper)](https://img.shields.io/npm/dt/typescript-aws-dynamo-helper)         |
| [KMSHelper](https://github.com/kbrashears5/typescript-aws-kms-helper)               | [![CI/CD](https://github.com/kbrashears5/typescript-aws-kms-helper/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/kbrashears5/typescript-aws-kms-helper/actions/workflows/ci-cd.yml)               | [![NPM Version](https://img.shields.io/npm/v/typescript-aws-kms-helper)](https://img.shields.io/npm/v/typescript-aws-kms-helper)               | [![Downloads](https://img.shields.io/npm/dt/typescript-aws-kms-helper)](https://img.shields.io/npm/dt/typescript-aws-kms-helper)               |
| [LambdaHelper](https://github.com/kbrashears5/typescript-aws-lambda-helper)         | [![CI/CD](https://github.com/kbrashears5/typescript-aws-lambda-helper/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/kbrashears5/typescript-aws-lambda-helper/actions/workflows/ci-cd.yml)         | [![NPM Version](https://img.shields.io/npm/v/typescript-aws-lambda-helper)](https://img.shields.io/npm/v/typescript-aws-lambda-helper)         | [![Downloads](https://img.shields.io/npm/dt/typescript-aws-lambda-helper)](https://img.shields.io/npm/dt/typescript-aws-lambda-helper)         |
| [S3Helper](https://github.com/kbrashears5/typescript-aws-s3-helper)                 | [![CI/CD](https://github.com/kbrashears5/typescript-aws-s3-helper/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/kbrashears5/typescript-aws-s3-helper/actions/workflows/ci-cd.yml)                 | [![NPM Version](https://img.shields.io/npm/v/typescript-aws-s3-helper)](https://img.shields.io/npm/v/typescript-aws-s3-helper)                 | [![Downloads](https://img.shields.io/npm/dt/typescript-aws-s3-helper)](https://img.shields.io/npm/dt/typescript-aws-s3-helper)                 |
| [SESHelper](https://github.com/kbrashears5/typescript-aws-ses-helper)               | [![CI/CD](https://github.com/kbrashears5/typescript-aws-ses-helper/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/kbrashears5/typescript-aws-ses-helper/actions/workflows/ci-cd.yml)               | [![NPM Version](https://img.shields.io/npm/v/typescript-aws-ses-helper)](https://img.shields.io/npm/v/typescript-aws-ses-helper)               | [![Downloads](https://img.shields.io/npm/dt/typescript-aws-ses-helper)](https://img.shields.io/npm/dt/typescript-aws-ses-helper)               |
| [SNSHelper](https://github.com/kbrashears5/typescript-aws-sns-helper)               | [![CI/CD](https://github.com/kbrashears5/typescript-aws-sns-helper/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/kbrashears5/typescript-aws-sns-helper/actions/workflows/ci-cd.yml)               | [![NPM Version](https://img.shields.io/npm/v/typescript-aws-sns-helper)](https://img.shields.io/npm/v/typescript-aws-sns-helper)               | [![Downloads](https://img.shields.io/npm/dt/typescript-aws-sns-helper)](https://img.shields.io/npm/dt/typescript-aws-sns-helper)               |
| [SQSHelper](https://github.com/kbrashears5/typescript-aws-sqs-helper)               | [![CI/CD](https://github.com/kbrashears5/typescript-aws-sqs-helper/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/kbrashears5/typescript-aws-sqs-helper/actions/workflows/ci-cd.yml)               | [![NPM Version](https://img.shields.io/npm/v/typescript-aws-sqs-helper)](https://img.shields.io/npm/v/typescript-aws-sqs-helper)               | [![Downloads](https://img.shields.io/npm/dt/typescript-aws-sqs-helper)](https://img.shields.io/npm/dt/typescript-aws-sqs-helper)               |
| [SSMHelper](https://github.com/kbrashears5/typescript-aws-ssm-helper)               | [![CI/CD](https://github.com/kbrashears5/typescript-aws-ssm-helper/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/kbrashears5/typescript-aws-ssm-helper/actions/workflows/ci-cd.yml)               | [![NPM Version](https://img.shields.io/npm/v/typescript-aws-ssm-helper)](https://img.shields.io/npm/v/typescript-aws-ssm-helper)               | [![Downloads](https://img.shields.io/npm/dt/typescript-aws-ssm-helper)](https://img.shields.io/npm/dt/typescript-aws-ssm-helper)               |
| [STSHelper](https://github.com/kbrashears5/typescript-aws-sts-helper)               | [![CI/CD](https://github.com/kbrashears5/typescript-aws-sts-helper/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/kbrashears5/typescript-aws-sts-helper/actions/workflows/ci-cd.yml)               | [![NPM Version](https://img.shields.io/npm/v/typescript-aws-sts-helper)](https://img.shields.io/npm/v/typescript-aws-sts-helper)               | [![Downloads](https://img.shields.io/npm/dt/typescript-aws-sts-helper)](https://img.shields.io/npm/dt/typescript-aws-sts-helper)               |

</div>

## Install

```
npm install typescript-aws-helpers@latest
```

## Lambda Handlers

Example of a handler for a lambda:

`Execute`:

```javascript
const handler = new Handler(LogLevel.Information);

export async function lambdaHandler(
  event: S3Event,
  context: Context,
  callback: Callback,
) {
  return (
    (await handler.Execute) <
    S3Event >
    (event,
    context,
    callback,
    async () => {
      this.Logger.Information('Executed');
    })
  );
}
```

## Orchestrators

Examples of how to use orchestrators:

`Orchestrate`:

```javascript
const handler = new Handler(LogLevel.Information);

const response =
  (await handler.Orchestrate) <
  string >
  (async () => {
    // do stuff
    this.Logger.Information(`Stuff was done`);
    return `Done`;
  });
```

`OrchestrateSQS`:

```javascript
const handler = new Handler(LogLevel.Information);
const sqsEvent: SQSEvent = {
  Records: [{ body: 'body', receiptHandle: 'receipt-handle' }],
};

const response = await handler.OrchestrateSQS(
  sqsEvent.Records,
  'queue-url',
  async () => {
    // do stuff
    this.Logger.Information(`Stuff was done`);
  },
);
```

## Helpers

See the appropriate helper repo for documentation on how to use them from the links in `Associated Helpers`

## Development

Clone the latest and run

```npm
npm run prep
```

to install packages and prep the git hooks
