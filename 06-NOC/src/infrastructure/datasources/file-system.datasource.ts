import fs from 'fs';

import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


export class FileSystemDatasource implements LogDatasource {

    private readonly logPath: string = 'logs/';
    private readonly allLogsPath: string = 'logs/logs-low.log';
    private readonly mediumLogsPath: string = 'logs/logs-medium.log';
    private readonly heighLogsPath: string = 'logs/logs-heigh.log';

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
            this.heighLogsPath,
        ].forEach((path) => {
            if (fs.existsSync(path)) return;

            fs.writeFileSync(path, '');
        });
    }

    saveLog(log: LogEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }

    getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        throw new Error("Method not implemented.");
    }
}