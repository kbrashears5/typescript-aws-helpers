export enum LogLevel {
    Off = 0,
    Information = 1,
    Warning = 2,
    Error = 3,
    Debug = 4,
    Trace = 5,
}

export interface ILogger {
    LogLevel: LogLevel;
    Debug(log?: any): void;
    Error(log?: any): void;
    Information(log?: any): void;
    Trace(log?: any): void;
    Warning(log?: any): void;
    Log(level: LogLevel, log?: any): void;
}

/**
 * Logging class
 */
export class Logger implements ILogger {

    /**
     * Logging level
     */
    public LogLevel: LogLevel;

    /**
     * Initialize new instance of Logger
     * @param logLevel {LogLevel} Logging level
     */
    constructor(logLevel: LogLevel = LogLevel.Information) {
        this.LogLevel = logLevel;
    }

    /**
     * Logs with Debug LogLevel
     * @param log {any} Message to log
     */
    public Debug(log?: any): void {
        this.Log(LogLevel.Debug, log);
    }

    /**
     * Logs with Error LogLevel
     * @param log {any} Message to log
     */
    public Error(log?: any): void {
        this.Log(LogLevel.Error, log);
    }

    /**
     * Logs with Information LogLevel
     * @param log {any} Message to log
     */
    public Information(log?: any): void {
        this.Log(LogLevel.Information, log);
    }

    /**
     * Logs with Trace LogLevel
     * @param log {any} Message to log
     */
    public Trace(log?: any): void {
        this.Log(LogLevel.Trace, log);
    }

    /**
     * Logs with Warning LogLevel
     * @param log {any} Message to log
     */
    public Warning(log?: any): void {
        this.Log(LogLevel.Warning, log);
    }

    /**
     * Logs with given LogLevel
     * @param level {LogLevel} Logging level to log at
     * @param log {any} Message to log
     */
    public Log(level: LogLevel, log?: any): void {
        if (this.LogLevel > LogLevel.Off && this.LogLevel >= level) {

            // create the message to log
            const message = `[${LogLevel[level].toUpperCase()}]-${log}`;
            switch (level) {
                case LogLevel.Error:
                    console.error(message);
                    break;
                case LogLevel.Warning:
                    console.warn(message);
                    break;
                default:
                    console.log(message);
                    break;
            }
        }
    }
}
