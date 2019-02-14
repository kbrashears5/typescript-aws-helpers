import { BaseHelper } from './base-helper';
import { ILogger } from '../logger';

export class S3Helper extends BaseHelper {

    /**
     * AWS Repository for S3
     */
    private Repository: AWS.S3;

    /**
     * 
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
}