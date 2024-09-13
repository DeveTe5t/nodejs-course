import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImpl } from "./log.repository.impl";

describe('log.repository.impl.test', () => {

    const mockLogDatasource = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }

    const logRepositoryImpl = new LogRepositoryImpl(mockLogDatasource);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should saveLog call from datasource with arguments', async () => {
        // Arrange
        // const log = { level: 'low', message: 'test-message' } as LogEntity;
        const log = { level: LogSeverityLevel.low, message: 'test-message' } as LogEntity;

        // Act
        await logRepositoryImpl.saveLog(log);

        // Assert
        expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(log);
    });

    test('should getLogs call from datasource with arguments', async () => {
        // Arrange
        const logSeverity = LogSeverityLevel.low;

        // Act        
        await logRepositoryImpl.getLogs(logSeverity);

        // Assert
        expect(mockLogDatasource.getLogs).toHaveBeenCalledWith(logSeverity);
    });
});