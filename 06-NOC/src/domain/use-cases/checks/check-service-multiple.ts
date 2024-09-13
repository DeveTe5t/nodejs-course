import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repositories/log.repository";

interface CheckServiceMultipleUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {

    constructor(
        private readonly logRepositories: LogRepository[],
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ) { }

    private callLosgRepository(log: LogEntity) {
        this.logRepositories.forEach(logRepository =>
            logRepository.saveLog(log)
        );
    }

    public async execute(url: string): Promise<boolean> {
        try {
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`Error on check service: ${url}`);
            }

            // const log = new LogEntity(LogSeverityLevel.low, `Service ${url} working`);
            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: `Service ${url} working`,
                // createdAt: new Date(),
                origin: 'check-service.ts',
            });
            this.callLosgRepository(log);
            // this.successCallback && similt to if(this.successCallback)
            this.successCallback && this.successCallback();

            return true;
        } catch (error) {
            const errorMessage = `${url} is not ok. ${error}`;
            // const log = new LogEntity(LogSeverityLevel.heigh, errorMessage);
            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: errorMessage,
                // createdAt: new Date(),
                origin: 'check-service.ts',
            });
            this.callLosgRepository(log);
            this.errorCallback && this.errorCallback(errorMessage);

            return false;
        }
    }
}