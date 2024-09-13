import { LogEntity } from '../../entities/log.entity';
// import { LogRepository } from '../../repositories/log.repository';
import { CheckServiceMultiple } from './check-service-multiple';

describe('check-service-multiple.ts UseCase', () => {

    // const mockMultipleRepository: LogRepository[] = [
    //     {
    //         saveLog: jest.fn(),
    //         getLogs: jest.fn(),
    //     }
    // ];

    const mockRepository1 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };

    const mockRepository2 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };

    const mockRepository3 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };

    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkServiceMultiple = new CheckServiceMultiple(
        [mockRepository1, mockRepository2, mockRepository3],
        successCallback,
        errorCallback
    );

    const correctUrl = 'https://google.com';
    const wrongUrl = 'https://googlebdfvsdfgv.com';

    const mockFetch = async (ok: boolean) => {
        return jest.fn().mockResolvedValue({
            ok,
        });
    }

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should call successCallback when fetch return true', async () => {
        // Act
        const wasOk = await checkServiceMultiple.execute(correctUrl);

        // Assert
        expect(wasOk).toBe(true);
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();

        // expect(mockMultipleRepository[0].saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepository1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepository3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    });

    test('should call errorCallback when fetch return true', async () => {
        // Act
        const wasOk = await checkServiceMultiple.execute(wrongUrl);

        // Assert
        expect(wasOk).toBe(false);
        expect(successCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalled();

        // expect(mockMultipleRepository[0].saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepository1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepository3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    });

    // It is not right, but it is just to show how to test fetch
    test('should call fetch with wrong url', async () => {

        // Arrange
        global.fetch = await mockFetch(false);

        // Act
        // await checkServiceMultiple.execute(correctUrl);
        await checkServiceMultiple.execute(wrongUrl);

        // Assert
        // expect(global.fetch).toHaveBeenCalledWith(correctUrl);
        expect(global.fetch).toHaveBeenCalledWith(wrongUrl);
    });
});