import { buildLogger, logger as winstonLogger } from '../../src/plugins/logger.plugin';

describe('plugins/logger.plugin.ts', () => {

    test('buildLogger should return a function logger', () => {

        const logger = buildLogger('test');

        expect(typeof logger.log).toBe('function');
        expect(typeof logger.error).toBe('function');
    });

    test('logger.log should log a message', () => {

        // 1. Arrage (Preparación)
        const winstonLoggerMock = jest.spyOn(winstonLogger, 'log');
        const message = 'test message';
        const service = 'test service';

        // 2. Act (Estimulo)
        const logger = buildLogger(service);
        logger.log(message);

        // 3. Assert (Verificación o aserción)
        expect(winstonLoggerMock).toHaveBeenCalledWith(
            'info',
            expect.objectContaining({
                level: 'info',
                message,
                service,
            }),
        );
    });

    test('logger.error should log an error message', () => {

        // 1. Arrage (Preparación)
        const winstonLoggerMock = jest.spyOn(winstonLogger, 'error');
        const message = 'test message';
        const service = 'test service';

        // 2. Act (Estimulo)
        const logger = buildLogger(service);
        logger.error(message);

        // 3. Assert (Verificación o aserción)
        expect(winstonLoggerMock).toHaveBeenCalledWith(
            'error',
            {
                message,
                service,
            }
        );
        expect(winstonLoggerMock).toHaveBeenCalledWith(
            'error',
            expect.objectContaining({
                // level: 'error',
                message,
                service,
            }),
        );
    });
});