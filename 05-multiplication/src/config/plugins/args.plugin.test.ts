import { describe, test, expect, beforeEach, jest } from '@jest/globals';
import { before } from 'node:test';
// import { yarg } from './args.plugin';

const runCommand = async (args: string[]) => {

    process.argv = [...process.argv, ...args];

    const { yarg } = await import('./args.plugin');

    return yarg;
}

describe('ArgsPlugin', () => {

    const originalArgv = process.argv;

    beforeEach(() => {
        process.argv = originalArgv;
        jest.resetModules();
    });

    test('should return default values', async () => {

        // Arrange and Act
        const argv = await runCommand(['-b', '7']);
        // console.log(yarg);
        // console.log(argv);

        // Assert
        expect(argv).toEqual(expect.objectContaining({
            b: 7,
            l: 10,
            s: false,
            n: 'multiplication-table',
            d: 'outputs',
        }));
    });

    test('should return configuration with custom values', async () => {

        // Arrange and Act
        const argv = await runCommand(['-b', '3', '-l', '20', '-s', '-n', 'custom-table', '-d', 'custom-dir']);

        // Assert
        expect(argv).toEqual(expect.objectContaining({
            b: 3,
            l: 20,
            s: true,
            n: 'custom-table',
            d: 'custom-dir',
        }));
    });
});