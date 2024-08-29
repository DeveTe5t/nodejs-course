
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    heigh = 'heigh'
}

interface LogEntityOptions {
    level: LogSeverityLevel;
    message: string;
    createdAt?: Date;
    origin: string;
}

export class LogEntity {

    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;

    // more three arguments pass as object
    constructor(options: LogEntityOptions) {
        const { level, message, origin, createdAt = new Date() } = options;

        this.level = level;
        this.message = message;
        this.createdAt = createdAt;
        this.origin = origin;
    }

    static fromJson = (json: string): LogEntity => {
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
            level,
            message,
            createdAt,
            origin
        });

        return log;
    }
}