
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    heigh = 'heigh'
}

export class LogEntity {

    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;

    constructor(level: LogSeverityLevel, message: string) {
        this.level = level;
        this.message = message;
        this.createdAt = new Date();
    }

    static fromJson = (json: string): LogEntity => {
        const { message, level, createdAt } = JSON.parse(json);
        // Here validation could be added
        // if (!message) throw new Error('message is required');

        const log = new LogEntity(level, message);
        log.createdAt = new Date(createdAt);

        return log;
    }
}