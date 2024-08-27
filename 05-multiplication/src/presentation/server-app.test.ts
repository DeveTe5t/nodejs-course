import { describe, test, expect, jest } from '@jest/globals';
import { ServerApp } from './server-app';
// import { Server } from 'http';
import { CreateTable, CreateTableOptions } from '../domain/use-cases/create-table.use-case';
// import { SaveFile } from '../domain/use-cases/save-file.use-case';
import { beforeEach } from 'node:test';
import { SaveFile } from '../domain/use-cases/save-file.use-case';

describe('ServerApp', () => {

    // Arrange
    const options = {
        base: 3,
        limit: 10,
        showTable: true,
        fileDestination: 'test-destination',
        fileName: 'test-filename',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should create ServerApp instance', () => {

        // Arrange and Act
        const serverApp = new ServerApp();

        // Assert
        expect(serverApp).toBeInstanceOf(ServerApp);
        expect(typeof ServerApp.run).toBe('function');
    });

    test('should run ServerApp with options', () => {

        // Arrange
        const logSpy = jest.spyOn(console, 'log');
        const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
        const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');

        // Act
        ServerApp.run(options);

        // Assert
        options.showTable
            ? expect(logSpy).toHaveBeenCalledTimes(3)
            : expect(logSpy).toHaveBeenCalledTimes(2);
        // expect(logSpy).toHaveBeenCalledTimes(2); // showTable: true, is 3 times
        expect(logSpy).toHaveBeenCalledWith('ServerApp running...');
        expect(logSpy).toHaveBeenCalledWith('File created!');
        expect(logSpy).toHaveBeenLastCalledWith('File created!');

        expect(createTableSpy).toHaveBeenCalledTimes(1);
        expect(createTableSpy).toHaveBeenCalledWith({
            base: options.base, limit: options.limit
        });

        expect(saveFileSpy).toHaveBeenCalledTimes(1);
        expect(saveFileSpy).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            fileDestination: options.fileDestination,
            fileName: options.fileName,
        });
    });

    test('should run ServerApp with custom values mocked', () => {

        // Arrange
        const tableMockReturnValue = `1 x ${options.base} = ${options.base}`;
        const logMock = jest.fn();
        const logErrorMock = jest.fn();
        const createMock = jest.fn().mockReturnValue(tableMockReturnValue);
        const saveFileMock = jest.fn().mockReturnValue(true);

        // Act
        console.log = logMock;
        console.error = logErrorMock;
        // CreateTable.prototype.execute = createMock; // Not working
        CreateTable.prototype.execute = createMock as ({ base, limit }: CreateTableOptions) => string;
        // SaveFile.prototype.execute = saveFileMock; // Not working
        SaveFile.prototype.execute = saveFileMock as ({ fileContent, fileDestination, fileName }:
            { fileContent: string, fileDestination: string, fileName: string }) => boolean;

        ServerApp.run(options);

        // Assert
        expect(logMock).toHaveBeenCalledWith('ServerApp running...');
        expect(createMock).toHaveBeenCalledWith({ base: options.base, limit: options.limit });
        expect(saveFileMock).toHaveBeenCalledWith({
            fileContent: tableMockReturnValue,
            fileDestination: options.fileDestination,
            fileName: options.fileName
        });
        expect(logMock).toHaveBeenCalledWith('File created!');
        expect(logErrorMock).not.toBeCalledWith();
    });
});