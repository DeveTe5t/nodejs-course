import fs from 'fs';

import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { log } from 'console';


export class FileSystemDatasource implements LogDatasource {

    private readonly logPath: string = 'logs/';
    private readonly allLogsPath: string = 'logs/logs-all.log';
    private readonly mediumLogsPath: string = 'logs/logs-medium.log';
    private readonly highLogsPath: string = 'logs/logs-high.log';

    constructor() {
        this.createLogsFile();
    }

    private createLogsFile = () => {
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath);
        }

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath,
        ].forEach((path) => {
            if (fs.existsSync(path)) return;

            fs.writeFileSync(path, '');
        });
    }

    async saveLog(newLog: LogEntity): Promise<void> {
        // const contentAllLogs = fs.readFileSync(this.allLogsPath, 'utf-8');
        // const logAsJson = (contentAllLogs === '') ? `${JSON.stringify(newLog)}` : `\n${JSON.stringify(newLog)}`;
        const logAsJson = `${JSON.stringify(newLog)}\n`;

        fs.appendFileSync(this.allLogsPath, logAsJson);

        console.log('FS log created', newLog.createdAt);

        if (newLog.level === LogSeverityLevel.low) return;

        if (newLog.level === LogSeverityLevel.medium) {
            fs.appendFileSync(this.mediumLogsPath, logAsJson);
        } else {
            fs.appendFileSync(this.highLogsPath, logAsJson);
        }
    }

    private getLogsFromFile = (path: string): LogEntity[] => {
        const content = fs.readFileSync(path, 'utf-8');
        if (content === '') return [];

        // Because each log saved there is new line at the end of the file
        const contentRemoveLastLineBreak = content.replace(/\n$/, '');

        // const logs = content.split('\n').map(
        //     (log) => {
        //         return LogEntity.fromJson(log);
        //     }
        // );
        // similar to the code commented above.
        // let logs = content.split('\n').map(LogEntity.fromJson);
        let logs = contentRemoveLastLineBreak.split('\n').map(LogEntity.fromJson);

        // console.log(logs);
        return logs;
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        switch (severityLevel) {
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogsPath);

            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath);

            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highLogsPath);

            default:
                throw new Error(`${severityLevel} not implemented`);
        }
    }
}