import { describe, test, expect, jest } from '@jest/globals';
// process.argv = ['node', 'app.ts', '-b', '5', '-l', '10', '-s', '-n', 'table.txt', '-d', 'tables'];
// import './app';
import { ServerApp } from './presentation/server-app';

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