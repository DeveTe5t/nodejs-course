import mongoose from "mongoose";
import { envs } from "../../config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "../../data/mongo";
import { MongoLogDatasource } from "./mongo-log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


describe('mongo-log.datasource.test MongoLogDatasource', () => {

    const mongoLogDataSource = new MongoLogDatasource();
    const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'test message',
        origin: 'mongo-log.datasource.test',
    });

    beforeAll(async () => {
        await MongoDatabase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL,
        });

        jest.clearAllMocks();
    });

    afterEach(async () => {
        await LogModel.deleteMany();
    });

    afterAll(async () => {
        mongoose.connection.close();
    });

    test('should create a log', async () => {
        // Arrange        
        const logSpy = jest.spyOn(console, 'log');

        // Act
        await mongoLogDataSource.saveLog(log);

        // Assert
        // expect(mongoLogDataSource).toBeInstanceOf(MongoLogDatasource);
        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith("Mongo log created", expect.any(String));
    });

    test('should get logs', async () => {
        // Act
        await mongoLogDataSource.saveLog(log);
        await mongoLogDataSource.saveLog(log);

        const logs = await mongoLogDataSource.getLogs(LogSeverityLevel.low);

        // Assert
        expect(logs.length).toBe(2);
        expect(logs[0].level).toBe(LogSeverityLevel.low);
        expect(logs[0]).toEqual(expect.objectContaining({
            "createdAt": expect.any(Date),
            "level": log.level,
            "message": log.message,
            "origin": log.origin
        }));
    });
});