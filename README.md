# typescript-aws-helpers

## Install
```
npm install typescript-aws-helpers@latest
```

## Lambda Handlers
Example of a handler for a lambda:

`Execute`:
``` javascript
const handler = new Handler(LogLevel.Information);

export async function lambdaHandler(event: S3Event,
    context: Context,
    callback: Callback) {

    return await handler.Execute<S3Event>(event,
        context,
        callback,
        async () => {
            this.Logger.Information('Executed')
        })
}
```

## Orchestrators
Examples of how to use orchestrators:

`Orchestrate`:
```javascript
const handler = new Handler(LogLevel.Information);

const response = await handler.Orchestrate<string>(async () => {
    // do stuff
    this.Logger.Information(`Stuff was done`);
    return `Done`;
});
```

`OrchestrateSQS`:
```javascript
const handler = new Handler(LogLevel.Information);
const sqsEvent: SQSEvent = { Records: [{ body: 'body', receiptHandle: 'receipt-handle' }] };

const response = await handler.OrchestrateSQS(sqsEvent.Records,
    'queue-url',
    async () => {
        // do stuff
        this.Logger.Information(`Stuff was done`);
    });
```