<h1 align="center">typescript-aws-helpers</h1>

<div align="center">
    
<b>Collection of different AWS service helpers</b>
    
[![CI/CD](https://github.com/kbrashears5/typescript-aws-helpers/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/kbrashears5/typescript-aws-helpers/actions/workflows/ci-cd.yml)
[![codecov](https://codecov.io/gh/kbrashears5/typescript-aws-helpers/branch/master/graph/badge.svg?token=4NBNZ5PM70)](https://codecov.io/gh/kbrashears5/typescript-aws-helpers)
[![NPM Version](https://img.shields.io/npm/v/typescript-aws-helpers)](https://img.shields.io/npm/v/typescript-aws-helpers)
[![Downloads](https://img.shields.io/npm/dt/typescript-aws-helpers)](https://img.shields.io/npm/dt/typescript-aws-helpers)

## Associated Helpers

| Helper                                                                              | CI/CD                                                                                                                                                                                                          | Code Coverage                                                                                                                                                                                       | Version                                                                                                                                        | Downloads                                                                                                                                      |
| ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| [APIGatewayHelper](https://github.com/kbrashears5/typescript-aws-apigateway-helper) | [![CI/CD](https://github.com/kbrashears5/typescript-aws-apigateway-helper/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/kbrashears5/typescript-aws-apigateway-helper/actions/workflows/ci-cd.yml) | [![codecov](https://codecov.io/gh/kbrashears5/typescript-aws-apigateway-helper/branch/master/graph/badge.svg?token=N94B7YD0N4)](https://codecov.io/gh/kbrashears5/typescript-aws-apigateway-helper) | [![NPM Version](https://img.shields.io/npm/v/typescript-aws-apigateway-helper)](https://img.shields.io/npm/v/typescript-aws-apigateway-helper) | [![Downloads](https://img.shields.io/npm/dt/typescript-aws-apigateway-helper)](https://img.shields.io/npm/dt/typescript-aws-apigateway-helper) |
| [CloudWatchHelper](https://github.com/kbrashears5/typescript-aws-cloudwatch-helper) | [![CI/CD](https://github.com/kbrashears5/typescript-aws-cloudwatch-helper/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/kbrashears5/typescript-aws-cloudwatch-helper/actions/workflows/ci-cd.yml) | [![codecov](https://codecov.io/gh/kbrashears5/typescript-aws-cloudwatch-helper/branch/master/graph/badge.svg?token=PTFOKRDWVN)](https://codecov.io/gh/kbrashears5/typescript-aws-cloudwatch-helper) | [![NPM Version](https://img.shields.io/npm/v/typescript-aws-cloudwatch-helper)](https://img.shields.io/npm/v/typescript-aws-cloudwatch-helper) | [![Downloads](https://img.shields.io/npm/dt/typescript-aws-cloudwatch-helper)](https://img.shields.io/npm/dt/typescript-aws-cloudwatch-helper) |
| [DynamoHelper](https://github.com/kbrashears5/typescript-aws-dynamo-helper)         | [![CI/CD](https://github.com/kbrashears5/typescript-aws-dynamo-helper/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/kbrashears5/typescript-aws-dynamo-helper/actions/workflows/ci-cd.yml)         | [![codecov](https://codecov.io/gh/kbrashears5/typescript-aws-dynamo-helper/branch/master/graph/badge.svg?token=T6OZM1I750)](https://codecov.io/gh/kbrashears5/typescript-aws-dynamo-helper)         | [![NPM Version](https://img.shields.io/npm/v/typescript-aws-dynamo-helper)](https://img.shields.io/npm/v/typescript-aws-dynamo-helper)         | [![Downloads](https://img.shields.io/npm/dt/typescript-aws-dynamo-helper)](https://img.shields.io/npm/dt/typescript-aws-dynamo-helper)         |
| [KMSHelper](https://github.com/kbrashears5/typescript-aws-kms-helper)               | [![CI/CD](https://github.com/kbrashears5/typescript-aws-kms-helper/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/kbrashears5/typescript-aws-kms-helper/actions/workflows/ci-cd.yml)               | [![codecov](https://codecov.io/gh/kbrashears5/typescript-aws-kms-helper/branch/master/graph/badge.svg?token=4PIRJTDG3K)](https://codecov.io/gh/kbrashears5/typescript-aws-kms-helper)               | [![NPM Version](https://img.shields.io/npm/v/typescript-aws-kms-helper)](https://img.shields.io/npm/v/typescript-aws-kms-helper)               | [![Downloads](https://img.shields.io/npm/dt/typescript-aws-kms-helper)](https://img.shields.io/npm/dt/typescript-aws-kms-helper)               |
| [LambdaHelper](https://github.com/kbrashears5/typescript-aws-lambda-helper)         | [![CI/CD](https://github.com/kbrashears5/typescript-aws-lambda-helper/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/kbrashears5/typescript-aws-lambda-helper/actions/workflows/ci-cd.yml)         | [![codecov](https://codecov.io/gh/kbrashears5/typescript-aws-lambda-helper/branch/master/graph/badge.svg?token=OYCTKMEXYN)](https://codecov.io/gh/kbrashears5/typescript-aws-lambda-helper)         | [![NPM Version](https://img.shields.io/npm/v/typescript-aws-lambda-helper)](https://img.shields.io/npm/v/typescript-aws-lambda-helper)         | [![Downloads](https://img.shields.io/npm/dt/typescript-aws-lambda-helper)](https://img.shields.io/npm/dt/typescript-aws-lambda-helper)         |
| [S3Helper](https://github.com/kbrashears5/typescript-aws-s3-helper)                 | [![CI/CD](https://github.com/kbrashears5/typescript-aws-s3-helper/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/kbrashears5/typescript-aws-s3-helper/actions/workflows/ci-cd.yml)                 | [![codecov](https://codecov.io/gh/kbrashears5/typescript-aws-s3-helper/branch/master/graph/badge.svg?token=6VXT4QLN5U)](https://codecov.io/gh/kbrashears5/typescript-aws-s3-helper)                 | [![NPM Version](https://img.shields.io/npm/v/typescript-aws-s3-helper)](https://img.shields.io/npm/v/typescript-aws-s3-helper)                 | [![Downloads](https://img.shields.io/npm/dt/typescript-aws-s3-helper)](https://img.shields.io/npm/dt/typescript-aws-s3-helper)                 |
| [SESHelper](https://github.com/kbrashears5/typescript-aws-ses-helper)               | [![CI/CD](https://github.com/kbrashears5/typescript-aws-ses-helper/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/kbrashears5/typescript-aws-ses-helper/actions/workflows/ci-cd.yml)               | [![codecov](https://codecov.io/gh/kbrashears5/typescript-aws-ses-helper/branch/master/graph/badge.svg?token=QOSDQA1FDU)](https://codecov.io/gh/kbrashears5/typescript-aws-ses-helper)               | [![NPM Version](https://img.shields.io/npm/v/typescript-aws-ses-helper)](https://img.shields.io/npm/v/typescript-aws-ses-helper)               | [![Downloads](https://img.shields.io/npm/dt/typescript-aws-ses-helper)](https://img.shields.io/npm/dt/typescript-aws-ses-helper)               |
| [SNSHelper](https://github.com/kbrashears5/typescript-aws-sns-helper)               | [![CI/CD](https://github.com/kbrashears5/typescript-aws-sns-helper/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/kbrashears5/typescript-aws-sns-helper/actions/workflows/ci-cd.yml)               | [![codecov](https://codecov.io/gh/kbrashears5/typescript-aws-sns-helper/branch/master/graph/badge.svg?token=EAGFPWYZB0)](https://codecov.io/gh/kbrashears5/typescript-aws-sns-helper)               | [![NPM Version](https://img.shields.io/npm/v/typescript-aws-sns-helper)](https://img.shields.io/npm/v/typescript-aws-sns-helper)               | [![Downloads](https://img.shields.io/npm/dt/typescript-aws-sns-helper)](https://img.shields.io/npm/dt/typescript-aws-sns-helper)               |
| [SQSHelper](https://github.com/kbrashears5/typescript-aws-sqs-helper)               | [![CI/CD](https://github.com/kbrashears5/typescript-aws-sqs-helper/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/kbrashears5/typescript-aws-sqs-helper/actions/workflows/ci-cd.yml)               | [![codecov](https://codecov.io/gh/kbrashears5/typescript-aws-sqs-helper/branch/master/graph/badge.svg?token=KA021SKDXO)](https://codecov.io/gh/kbrashears5/typescript-aws-sqs-helper)               | [![NPM Version](https://img.shields.io/npm/v/typescript-aws-sqs-helper)](https://img.shields.io/npm/v/typescript-aws-sqs-helper)               | [![Downloads](https://img.shields.io/npm/dt/typescript-aws-sqs-helper)](https://img.shields.io/npm/dt/typescript-aws-sqs-helper)               |
| [SSMHelper](https://github.com/kbrashears5/typescript-aws-ssm-helper)               | [![CI/CD](https://github.com/kbrashears5/typescript-aws-ssm-helper/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/kbrashears5/typescript-aws-ssm-helper/actions/workflows/ci-cd.yml)               | [![codecov](https://codecov.io/gh/kbrashears5/typescript-aws-ssm-helper/branch/master/graph/badge.svg?token=5WVHWVKSSS)](https://codecov.io/gh/kbrashears5/typescript-aws-ssm-helper)               | [![NPM Version](https://img.shields.io/npm/v/typescript-aws-ssm-helper)](https://img.shields.io/npm/v/typescript-aws-ssm-helper)               | [![Downloads](https://img.shields.io/npm/dt/typescript-aws-ssm-helper)](https://img.shields.io/npm/dt/typescript-aws-ssm-helper)               |
| [STSHelper](https://github.com/kbrashears5/typescript-aws-sts-helper)               | [![CI/CD](https://github.com/kbrashears5/typescript-aws-sts-helper/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/kbrashears5/typescript-aws-sts-helper/actions/workflows/ci-cd.yml)               | [![codecov](https://codecov.io/gh/kbrashears5/typescript-aws-sts-helper/branch/master/graph/badge.svg?token=PTMIUSG9N9)](https://codecov.io/gh/kbrashears5/typescript-aws-sts-helper)               | [![NPM Version](https://img.shields.io/npm/v/typescript-aws-sts-helper)](https://img.shields.io/npm/v/typescript-aws-sts-helper)               | [![Downloads](https://img.shields.io/npm/dt/typescript-aws-sts-helper)](https://img.shields.io/npm/dt/typescript-aws-sts-helper)               |

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
