import { BaseHelper } from './base-helper';
import { ILogger } from '../logger';
import * as AWS from 'aws-sdk';
import { v4 } from 'uuid';

/**
 * KMS Helper
 */
export class KMSHelper extends BaseHelper {

    /**
     * AWS Repository for KMS
     */
    private Repository: AWS.KMS;

    /**
     * Initializes new instance of KMSHelper
     * @param logger {ILogger} Injected logger
     * @param repository {AWS.KMS} Injected Repository. A new repository will be created if not supplied
     * @param options {AWS.KMS.ClientConfiguration} Injected configuration if a Repository is supplied
     */
    constructor(logger: ILogger,
        repository?: AWS.KMS,
        options?: AWS.KMS.ClientConfiguration) {

        super(logger);
        this.Repository = repository || new AWS.KMS(options);
    }

    /**
     * Decrypt KMS
     * @param encryptedValue {string} Value to decrypt
     */
    public async DecryptAsync(encryptedValue: string): Promise<AWS.KMS.DecryptResponse> {

        const action = `${KMSHelper.name}.${this.DecryptAsync.name}`;
        this.TraceInputs(action, { cipherTextBlob: encryptedValue });

        // guard clauses
        if (this.IsNullOrEmpty(encryptedValue)) { throw new Error(`[${action}]-Must supply encryptedValue`); }

        // create params object
        const params: AWS.KMS.DecryptRequest = {
            CiphertextBlob: encryptedValue,
        };
        this.TraceRequest(action, params);

        // make AWS call
        const response = await this.Repository.decrypt(params).promise();
        this.TraceResponse(action, response);

        return response;
    }

    /**
     * Encrypt KMS
     * @param unencryptedValue {string} Value to encrypt
     */
    public async EncryptAsync(unencryptedValue: string): Promise<AWS.KMS.EncryptResponse> {

        const action = `${KMSHelper.name}.${this.EncryptAsync.name}`;
        this.TraceInputs(action, { cipherTextBlob: unencryptedValue });

        // guard clauses
        if (this.IsNullOrEmpty(unencryptedValue)) { throw new Error(`[${action}]-Must supply unencryptedValue`); }

        // create params object
        const params: AWS.KMS.EncryptRequest = {
            KeyId: v4(),
            Plaintext: unencryptedValue,
        };
        this.TraceRequest(action, params);

        // make AWS call
        const response = await this.Repository.encrypt(params).promise();
        this.TraceResponse(action, response);

        return response;
    }
}