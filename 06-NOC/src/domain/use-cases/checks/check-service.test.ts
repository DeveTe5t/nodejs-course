import { LogEntity } from "../../entities/log.entity";
import { CheckService } from "./check-service";

describe('check-service.ts UseCase', () => {

    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkService = new CheckService(
        mockRepository,
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

    test('should call successCallback when fetch retun true', async () => {
        // Act
        const wasOk = await checkService.execute(correctUrl);

        // Assert
        expect(wasOk).toBe(true);
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();

        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
    });

    test('should call errorCallback when fetch retun false', async () => {
        // Act
        const wasOk = await checkService.execute(wrongUrl);

        // Assert
        expect(wasOk).toBe(false);
        expect(successCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalled();

        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
    });

    // It is not right, but it is just to show how to test fetch
    test('should call fetch with the wrong url', async () => {
        // Arrange
        global.fetch = await mockFetch(false);

        // Act
        // await checkService.execute(correctUrl);
        await checkService.execute(wrongUrl);

        // Assert
        // expect(fetch).toHaveBeenCalledWith(correctUrl);
        expect(fetch).toHaveBeenCalledWith(wrongUrl);
    });
});