import { Any } from '../interfaces';

export class TestValuesClass {
    // descriptions
    public AWSError: string = 'AWS Error';
    public InvalidTest: string = 'returns error from AWS';
    public MustSupply: string = 'Must supply';
    public ThrowsOnEmpty: string = 'throws on empty';
    public ThrowsOnTooMany: string = 'throws on too many';
    public ValidTest: string = 'returns valid response from AWS';

    // empty values
    public EmptyArray = [];
    public EmptyObject = {};
    public EmptyString: string = '';

    // strings
    public ApiId: string = 'api-id';
    public Arn: string = 'arn';
    public Body: string = 'body';
    public Description: string = 'description';
    public Expression: string = 'expression';
    public Key: string = 'key';
    public Name: string = 'name';
    public Namespace: string = 'namespace';
    public ReceiptHandle: string = 'receipt-handle';
    public StringValue: string = 'value';
    public Subject: string = 'string';
    public Url: string = 'url';
    public UsagePlanId: string = 'usage-plan-id';

    // numbers
    public NumberValue: number = 1;

    // objects
    public ApiStageArray: AWS.APIGateway.ApiStage[] = [{ apiId: this.StringValue }];
    public Entries: AWS.SQS.SendMessageBatchRequestEntry[] = [{ Id: this.StringValue, MessageBody: this.Body }]
    public ExpressionAttributeNameMap: AWS.DynamoDB.DocumentClient.ExpressionAttributeNameMap = { Key: this.Key };
    public ExpressionAttributeValueMap: AWS.DynamoDB.DocumentClient.ExpressionAttributeValueMap = { Key: this.Key };
    public Item: Any = { Key: this.StringValue };
    public MetricDatum: AWS.CloudWatch.MetricDatum[] = [{ MetricName: this.Name }];
}
