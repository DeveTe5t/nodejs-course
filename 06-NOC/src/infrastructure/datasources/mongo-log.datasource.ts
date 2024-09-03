import { LogModel } from "../../data/mongo";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class MongoLogDatasource implements LogDatasource {

    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await LogModel.create(log);
        // more secure for save
        // await newLog.save();
        console.log('Mongo log created', newLog.id);
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await LogModel.find({ level: severityLevel });

        // return logs.map(mongoLog => LogEntity.fromObject(mongoLog));
        // how to return only one line or instruction, it is simplified
        return logs.map(LogEntity.fromObject);
    }
}