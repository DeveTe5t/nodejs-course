import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { PostgresLogDatasource } from "./postgres-log.datasource";

describe('postgres-log.datasource.test PostgresLogDatasource', () => {

    const prismaClient = new PrismaClient();
    const postgresLogDatasource = new PostgresLogDatasource();
    const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'test message',
        origin: 'postgres-log.datasource.test.ts',
    });

    const severityEnum = {
        low: SeverityLevel.LOW,
        medium: SeverityLevel.MEDIUM,
        high: SeverityLevel.HIGH,
    }

    beforeAll(async () => {
        // await prismaClient.logModel.create({
        //     data: {
        //         ...log,
        //         level: severityEnum[log.level],
        //     }
        // });
        // await prismaClient.logModel.createMany({        
        //     data: [            
        //         { level: severityEnum['low'], message: 'test message', origin: 'postgres-log.datasource.test.ts', },
        //         { level: 'MEDIUM', message: 'test message 2', origin: 'postgres-log.datasource.test.ts', },
        //     ],
        // });
    });

    afterEach(async () => {
        await prismaClient.logModel.deleteMany({});
    });

    afterAll(async () => {
        await prismaClient.$disconnect();
    });

    test('should create a log', async () => {
        // Act
        await postgresLogDatasource.saveLog(log);

        const logs = await postgresLogDatasource.getLogs(LogSeverityLevel.low);

        // Assert
        expect(logs).toHaveLength(1);
        expect(logs[0].message).toBe(log.message);
        expect(logs[0].level).toBe(severityEnum[log.level]);
        expect(logs[0].origin).toBe(log.origin);
    });

    test('should get logs', async () => {
        // Act
        await postgresLogDatasource.saveLog(log);
        await postgresLogDatasource.saveLog(log);

        const logs = await postgresLogDatasource.getLogs(LogSeverityLevel.low);

        // Assert
        expect(logs).toHaveLength(2);
        expect(logs.length).toBe(2);
        expect(logs[0].message).toBe(log.message);
        expect(logs[0].level).toBe(severityEnum[log.level]);
        expect(logs[0].origin).toBe(log.origin);
        expect(logs[0]).toEqual(expect.objectContaining({
            "createdAt": expect.any(Date),
            "level": logs[0].level,
            "message": logs[0].message,
            "origin": logs[0].origin
        }));
    });
});