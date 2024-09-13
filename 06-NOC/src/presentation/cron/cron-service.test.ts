import { CronService } from "./cron-service";


describe('cron-service.test.ts CronService', () => {

    // Arrange
    const mockTick = jest.fn();

    test('should create a job', (done) => {
        // Act
        const job = CronService.createJob('* * * * * *', mockTick);

        setTimeout(() => {
            // Assert
            expect(mockTick).toHaveBeenCalledTimes(2);
            job.stop();

            done();
        }, 2000);
    });
});