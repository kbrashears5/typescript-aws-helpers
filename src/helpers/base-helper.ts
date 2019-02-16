import { ILogger } from "../logger";

export class BaseHelper {

    /**
     * Logger
     */
    public Logger: ILogger;

    /**
     * Initialize new instance of BaseHelper
     * @param logger {ILogger} Logger
     */
    constructor(logger: ILogger) {
        this.Logger = logger;
    }

    /**
     * Determines whether or not the given value is null or empty
     * @param value {object | string | undefined | null} Value to check if null or empty
     */
    public IsNullOrEmpty(value: object | string | undefined | null): boolean {
        switch (typeof (value)) {
            case 'object':
                const o: object = (value || {});
                return Object.keys(o).length === 0;
            case 'string':
                const s: string = (value || '');
                return s.length < 1;
            default:
                return true;
        }
    }

    /**
     * Determines whether or not the given value is null or whitespace
     * @param value {string | undefined | null} Value to check if null or whitespace
     */
    public IsNullOrWhitespace(value: string | undefined | null): boolean {
        return this.IsNullOrEmpty((value || '').trim());
    }

    /**
     * Converts variables to strings
     * @param value {any} Value to convert to string
     */
    public ToString(value: any): string {
        switch (typeof (value)) {
            case 'boolean':
            case 'number':
            case 'string':
                return value.toString();
            case 'object':
                return JSON.stringify(value);
            default:
                return value || '';
        }
    }

    /**
     * Logs the inputs to a function
     * @param action {string} Action method currently in
     * @param inputs {object} Inputs to log
     */
    public TraceInputs(action: string, inputs: object): void {
        this.Logger.Trace(`[${action}]-Inputs: ${JSON.stringify({ inputs })}`);
    }

    /**
     * Logs the request to an AWS function call
     * @param action {string} Action method currently in
     * @param inputs {object} Inputs to log
     */
    public TraceRequest(action: string, request: object): void {
        this.Logger.Trace(`[${action}]-Request: ${JSON.stringify({ request })}`);
    }

    /**
     * Logs the response to an AWS function call
     * @param action {string} Action method currently in
     * @param inputs {object} Inputs to log
     */
    public TraceResponse(action: string, response: object): void {
        this.Logger.Trace(`[${action}]-Response: ${JSON.stringify({ response })}`);

    }
}