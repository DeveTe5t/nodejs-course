import { describe, test, expect, jest } from '@jest/globals';
// process.argv = ['node', 'app.ts', '-b', '5', '-l', '10', '-s', '-n', 'table.txt', '-d', 'tables'];
// import './app';
import { ServerApp } from './presentation/server-app';

describe('Test App.ts', () => {

    test('should call ServerApp.run with values', async () => {

        // Arrange
        const serverRunMock = jest.fn();
        ServerApp.run = serverRunMock;
        process.argv = ['node', 'app.ts', '-b', '7', '-l', '10', '-s', '-n', 'test-file', '-d', 'test-destination'];

        // Act
        await import('./app');

        // Assert
        expect(serverRunMock).toHaveBeenCalledWith({
            base: 7,
            limit: 10,
            showTable: true,
            fileName: 'test-file',
            fileDestination: 'test-destination'
        });
    });
});