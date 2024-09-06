import { log } from "console";
import { LogEntity, LogSeverityLevel } from "./log.entity";


describe('log.entity.ts', () => {

    const logDataObject = {
        message: 'test-message',
        level: LogSeverityLevel.high,
        origin: 'log.entity.test.ts'
    }

    test('should create a LogEntity instance', () => {
        // Act
        const log = new LogEntity(logDataObject)

        // Assert
        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(logDataObject.message);
        expect(log.level).toBe(logDataObject.level);
        expect(log.origin).toBe(logDataObject.origin);
        expect(log.createdAt).toBeInstanceOf(Date);
    });

    test('should create a LogEntity instance from JSON', () => {
        // Arrange
        const logJson = `{"message":"Service https://google.com working","level":"low","createdAt":"2024-09-06T19:48:30.417Z","origin":"check-service.ts"}`;

        // Act
        const log = LogEntity.fromJson(logJson);

        // Assert
        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe('Service https://google.com working');
        expect(log.level).toBe(LogSeverityLevel.low);
        expect(log.origin).toBe('check-service.ts');
        expect(log.createdAt).toBeInstanceOf(Date);
    });

    test('should create a LogEntity instance from Object', () => {
        // Act
        const log = LogEntity.fromObject(logDataObject);

        // Assert
        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(logDataObject.message);
        expect(log.level).toBe(logDataObject.level);
        expect(log.origin).toBe(logDataObject.origin);
        expect(log.createdAt).toBeInstanceOf(Date);
    });
});