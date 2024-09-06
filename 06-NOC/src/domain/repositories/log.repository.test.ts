import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
import { LogRepository } from "./log.repository";


describe('log.respository.ts', () => {

    const newLog = new LogEntity({
        origin: 'log.repository.test.ts',
        message: 'test-message',
        level: LogSeverityLevel.low
    });

    class MockLogRepository implements LogRepository {

        async saveLog(log: LogEntity): Promise<void> {
            return;
        }

        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [newLog];
        }

    }

    test('should test the abstract class', async () => {
        // Arrange and Act
        const mockLogRepository = new MockLogRepository();

        // Assert
        expect(mockLogRepository).toBeInstanceOf(MockLogRepository);
        expect(typeof mockLogRepository.saveLog).toBe('function');
        expect(typeof mockLogRepository.getLogs).toBe('function');
        expect(mockLogRepository).toHaveProperty('saveLog');
        expect(mockLogRepository).toHaveProperty('getLogs');

        await mockLogRepository.saveLog(newLog);
        const logs = await mockLogRepository.getLogs(LogSeverityLevel.high);
        expect(logs).toHaveLength(1);
        expect(logs[0]).toBeInstanceOf
    });
})