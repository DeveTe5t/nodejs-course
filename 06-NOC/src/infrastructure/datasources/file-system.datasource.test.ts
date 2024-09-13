import fs from 'fs';
import path from 'path';
import { FileSystemDatasource } from './file-system.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

/** 
 * 1. Arrange (Prepare the environment)
 * In this stage, you set up the environment necessary for the 
 * test to run. This includes initializing objects, configuring 
 * variables, and preparing any resources the test requires.
 */
/**
 * 2. Act (Execute the action)
 * In this stage, you perform the action you are trying to test. 
 * This usually involves calling a method or executing a function 
 * that changes the state of the system or performs an operation 
 * you want to verify.
 */
/**
 * 3. Assert (Verify the result)
 * In this stage, you check that the action taken has produced the 
 * expected outcome. This is done through assertions that compare 
 * the actual result with the expected result.
 */
describe('file-system.datasource.test FileSystemDatasource', () => {

    // Arrange: You set up the environment by initializing 
    // logPath
    const logPath = path.join(__dirname, '../../../logs');

    beforeEach(() => {
        fs.rmSync(logPath, { recursive: true, force: true });
    });

    test('should create a log files if they not exists', async () => {
        // Arrange
        new FileSystemDatasource();

        // Act
        const files = fs.readdirSync(logPath);

        // Assert
        expect(files).toEqual(['logs-all.log', 'logs-high.log', 'logs-medium.log']);
        expect(files).toHaveLength(3);
    });

    test('should save a log in logs-all.log', async () => {
        /**         
         * Arrange: You set up the environment by initializing 
         * logDatasource and creating the log object.
         */
        const logDatasource = new FileSystemDatasource();
        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.low,
            origin: 'file-system.datasource.test.ts',
        });

        /**         
         * Act: You execute the action, which is saving the log, and then 
         * read the file to verify the result.
         */
        logDatasource.saveLog(log);
        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');

        /**         
         * Assert: You verify that the file contains the saved log as 
         * expected.
         */
        expect(allLogs).toContain(JSON.stringify(log));
    });

    test('should save a log in logs-all.log and logs-medium.log', async () => {
        // Arrange
        const logDatasource = new FileSystemDatasource();
        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.medium,
            origin: 'file-system.datasource.test.ts',
        });

        // Act
        logDatasource.saveLog(log);
        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
        const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8');

        // Assert
        expect(allLogs).toContain(JSON.stringify(log));
        expect(mediumLogs).toContain(JSON.stringify(log));
    });

    test('should save a log in logs-all.log and logs-high.log', async () => {
        // Arrange
        const logDatasource = new FileSystemDatasource();
        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.high,
            origin: 'file-system.datasource.test.ts',
        });

        // Act
        logDatasource.saveLog(log);
        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
        const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8');

        // Assert
        expect(allLogs).toContain(JSON.stringify(log));
        expect(highLogs).toContain(JSON.stringify(log));
    });

    test('should return all logs', async () => {
        // Arrange
        const logDatasource = new FileSystemDatasource();
        const logLow = new LogEntity({
            message: 'log-low',
            level: LogSeverityLevel.low,
            origin: 'file-system.datasource.test.ts',
        });
        const logMedium = new LogEntity({
            message: 'log-medium',
            level: LogSeverityLevel.medium,
            origin: 'file-system.datasource.test.ts',
        });
        const logHigh = new LogEntity({
            message: 'log-high',
            level: LogSeverityLevel.high,
            origin: 'file-system.datasource.test.ts',
        });

        await logDatasource.saveLog(logLow);
        await logDatasource.saveLog(logMedium);
        await logDatasource.saveLog(logHigh);

        // Act
        const logsLow = await logDatasource.getLogs(LogSeverityLevel.low);
        const logsMedium = await logDatasource.getLogs(LogSeverityLevel.medium);
        const logsHigh = await logDatasource.getLogs(LogSeverityLevel.high);

        // Assert
        expect(logsLow).toEqual(expect.arrayContaining([logLow, logMedium, logHigh]));
        expect(logsMedium).toEqual(expect.arrayContaining([logMedium]));
        expect(logsHigh).toEqual(expect.arrayContaining([logHigh]));
    });

    test('should not throw an error if path exists', () => {
        // Since we delete the directory in each test, we call it twice:
        // the first time it creates the directory, and the second time, 
        // since it already exists, it returns because the directory is 
        // already there.

        // Arrange
        new FileSystemDatasource();
        // Act
        new FileSystemDatasource();

        // Assert
        expect(true).toBeTruthy();
    });

    test('should not throw an error if file in path is empty', async () => {
        // Arrange
        // all file logs are empty
        const logDatasource = new FileSystemDatasource();

        // Act
        const logs = await logDatasource.getLogs(LogSeverityLevel.low);

        // Assert
        expect(logs).toEqual([]);
    });

    test('should throw an error if severity level is not defined', async () => {
        // Arrange
        const logDatasource = new FileSystemDatasource();
        const customSeverityLevel = 'SUPER_HIGH' as LogSeverityLevel;

        try {
            // Act
            await logDatasource.getLogs(customSeverityLevel);

            // Assert
            expect(true).toBeFalsy();
        } catch (error) {
            // Act
            const errorString = `${error}`;

            // Assert
            expect(errorString).toContain(`${customSeverityLevel} not implemented`);
        }
    });
});