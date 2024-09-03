
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
}

interface LogEntityOptions {
    message: string;
    level: LogSeverityLevel;
    createdAt?: Date;
    origin: string;
}

export class LogEntity {

    public message: string;
    public level: LogSeverityLevel;
    public createdAt: Date;
    public origin: string;

    // more three arguments pass as object
    constructor(options: LogEntityOptions) {
        const { message, level, createdAt = new Date(), origin } = options;

        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
        this.origin = origin;
    }

    static fromJson = (json: string): LogEntity => {
        // json = (json === '') ? '{}' : json;
        const { message, level, createdAt, origin } = JSON.parse(json);
        // Here validation could be added
        // if (!message) throw new Error('message is required');

        // const log = new LogEntity({
        //     level: level,
        //     message: message,
        //     createdAt: createdAt,
        //     origin: origin
        // });
        const log = new LogEntity({
            message,
            level,
            createdAt,
            origin,
        });

        return log;
    }

    static fromObject = (object: { [key: string]: any }): LogEntity => {
        const { message, level, createdAt, origin } = object;
        // if (!message) throw new Error('message is required');
        const log = new LogEntity({
            message,
            level,
            createdAt,
            origin,
        });

        return log;
    }
}