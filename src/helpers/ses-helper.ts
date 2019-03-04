import { BaseHelper } from './base-helper';
import { ILogger } from '../logger';
import * as AWS from 'aws-sdk';

/**
 * SES Helper
 */
export class SESHelper extends BaseHelper {

    /**
     * AWS Repository for SES
     */
    private Repository: AWS.SES;

    /**
     * Initializes new instance of SESHelper
     * @param logger {ILogger} Injected logger
     * @param repository {AWS.SES} Injected Repository. A new repository will be created if not supplied
     * @param options {AWS.SES.ClientConfiguration} Injected configuration if a Repository is supplied
     */
    constructor(logger: ILogger,
        repository?: AWS.SES,
        options?: AWS.SES.ClientConfiguration) {

        super(logger);
        this.Repository = repository || new AWS.SES(options);
    }

    /**
     * Send an email
     * @param subject {string} Subject of email
     * @param toAddresses {string[]} Array of addresses to send to
     * @param fromAddress {string} Address to send from
     * @param body {string | Buffer} HTML body of message
     */
    public async SendEmailAsync(subject: string,
        toAddresses: string[],
        fromAddress: string,
        body: string | Buffer): Promise<AWS.SES.SendEmailResponse> {

        const action = `${SESHelper.name}.${this.SendEmailAsync.name}`;
        this.TraceInputs(action, { subject, toAddresses, fromAddress, body });

        // guard clauses
        if (this.IsNullOrEmpty(subject)) { throw new Error(`[${action}]-Must supply subject`); }
        if (this.IsNullOrEmpty(toAddresses)) { throw new Error(`[${action}]-Must supply toAddresses`); }
        if (this.IsNullOrEmpty(fromAddress)) { throw new Error(`[${action}]-Must supply fromAddress`); }

        // create params object
        const params: AWS.SES.SendEmailRequest = {
            Destination: {
                ToAddresses: toAddresses,
            },
            Message: {
                Body: {
                    Html: {
                        Data: body.toString(),
                    },
                },
                Subject: {
                    Data: subject,
                },
            },
            Source: fromAddress,
        };
        this.TraceRequest(action, params);

        // make AWS call
        const response = await this.Repository.sendEmail(params).promise();
        this.TraceResponse(action, response);

        return response;
    }
}
