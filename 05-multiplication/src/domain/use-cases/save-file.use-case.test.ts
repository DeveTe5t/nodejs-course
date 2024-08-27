import { describe, test, expect, /*beforeEach,*/ afterEach, jest } from '@jest/globals';
import fs from 'fs';
import { SaveFile } from './save-file.use-case';

describe('SaveFileUseCase', () => {

    const customOptions = {
        fileContent: 'custom content',
        fileDestination: 'custom-outputs',
        fileName: 'custom-table-name',
    }

    const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;

    // beforeEach(() => {
    //     // clean up
    //     // fs.rmSync('outputs', { recursive: true });

    //     jest.clearAllMocks();

    //     // Work when it is something as
    //     // const logMock = jest.fn();
    // });

    afterEach(() => {
        // clean up
        fs.existsSync('outputs')
            ? fs.rmSync('outputs', { recursive: true })
            : null;
        // fs.rmSync('outputs', { recursive: true });

        fs.existsSync('custom-outputs')
            ? fs.rmSync('custom-outputs', { recursive: true })
            : null;
        // fs.rmSync('custom-outputs', { recursive: true });
    });

    test('should save file with default values', () => {

        // 1. Arrage (Arreglar, preparación)
        const saveFile = new SaveFile();
        const filePath = 'outputs/table.txt';
        const options = {
            fileContent: 'test content'
        }

        // 2. Act (Actual, estimulo)
        const result = saveFile.execute(options);
        const fileExist = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

        // 3. Assert (Afirmar, verificación)
        expect(result).toBe(true);
        // same as obove
        expect(result).toBeTruthy();

        expect(fileExist).toBe(true);
        expect(fileContent).toBe(options.fileContent);
    });

    test('should save file with custom values', () => {

        // Arrange
        const saveFile = new SaveFile();
        // const options = {
        //     fileContent: 'custom content',
        //     fileDestination: 'custom-outputs',
        //     fileName: 'custom-table-name',
        // }
        // const filePath = `${options.fileDestination}/${options.fileName}.txt`;

        // Act
        const result = saveFile.execute(customOptions);
        // const fileExist = fs.existsSync(filePath);
        // const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
        const fileExist = fs.existsSync(customFilePath);
        const fileContent = fs.readFileSync(customFilePath, { encoding: 'utf-8' });

        // Assert
        expect(result).toBe(true);
        expect(fileExist).toBe(true);
        expect(fileContent).toBe(customOptions.fileContent);
    });

    test('should return false if directory could not be created', () => {

        // Arrange
        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
            throw new Error('This is a custom error message from testing');
        });

        // Act
        const result = saveFile.execute(customOptions);

        // Assert
        expect(result).toBe(false);

        mkdirSpy.mockRestore();
    });

    test('should return false if file could not be created', () => {

        // Arrange
        const saveFile = new SaveFile();
        const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {
            throw new Error('This is a custom writing error message');
        });

        // Act
        const result = saveFile.execute({ fileContent: 'Hey' });

        // Assert
        expect(result).toBe(false);

        writeFileSpy.mockRestore();
    });
});