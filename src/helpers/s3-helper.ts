import { BaseHelper } from './base-helper';
import { ILogger } from '../logger';
import * as AWS from 'aws-sdk';

/**
 * S3 Helper
 */
export class S3Helper extends BaseHelper {

    /**
     * AWS Repository for S3
     */
    private Repository: AWS.S3;

    /**
     * Initializes new instance of S3Helper
     * @param logger {ILogger} Injected logger
     * @param repository {AWS.S3} Injected Repository. A new repository will be created if not supplied
     * @param options {AWS.S3.ClientConfiguration} Injected configuration if a Repository is supplied
     */
    constructor(logger: ILogger,
        repository?: AWS.S3,
        options?: AWS.S3.ClientConfiguration) {

        super(logger);
        this.Repository = repository || new AWS.S3(options);
    }

    /**
     * Uploads a file to S3 Bucket
     * @param bucket {string} Bucket to upload to
     * @param key {string} File prefix and name
     * @param body {string} File contents
     * @param acl {S3CannedACL} S3Canned ACL. Default is 'bucket-owner-full-control'
     * @param encoding {string} File encoding. Default is 'utf-8'
     * @returns Promise<string> - URL of uploaded file
     */
    public async UploadAsync(bucket: string,
        key: string,
        body: string,
        acl?: AWS.S3.ObjectCannedACL,
        encoding?: string): Promise<string> {

        const action = `${S3Helper.name}.${this.UploadAsync.name}`;
        this.TraceInputs(action, { bucket, key, body, acl });

        // guard clauses
        if (this.IsNullOrEmpty(bucket)) { throw new Error(`[${action}] bucket cannot be undefined`); }
        if (this.IsNullOrEmpty(key)) { throw new Error(`[${action}] key cannot be undefined`); }

        // set defaults
        if (this.IsNullOrEmpty(acl)) { acl = 'bucket-owner-full-control'; }
        if (this.IsNullOrEmpty(encoding)) { encoding = 'utf-8'; }

        // create params object
        const params: AWS.S3.PutObjectRequest = {
            ACL: acl,
            Body: body,
            Bucket: bucket,
            ContentEncoding: encoding,
            Key: key,
        };
        this.TraceRequest(action, params);

        // make AWS call
        const response = await this.Repository.upload(params).promise();
        this.TraceResponse(action, response);

        return response.Location;
    }
}