import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const prismaClient = new PrismaClient();
// enum Severity {
//     low = 'LOW',
//     medium = 'MEDIUM',
//     high = 'HIGH',
// }
const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH,
}

export class PostgresLogDatasource implements LogDatasource {

    async saveLog(log: LogEntity): Promise<void> {

        const level = severityEnum[log.level];
        const newLog = await prismaClient.logModel.create({
            // way 1                        
            // data: {
            //     ...log,
            //     level: Severity[log.level],
            // }
            // way 2
            data: {
                ...log,
                level: level,
            }
        });

        console.log('Postgres log created', newLog.id);
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const level = severityEnum[severityLevel];
        const logs = await prismaClient.logModel.findMany({
            // where: {level: level}
            where: { level }
        });

        // return logs.map(postgresLog => LogEntity.fromObject(postgresLog));
        return logs.map(LogEntity.fromObject);
    }

}