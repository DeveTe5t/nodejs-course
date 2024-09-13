// import { EmailService } from "../../../presentation/email/email.service";
import { envs } from "../../../config/plugins/envs.plugin";
import { LogEntity } from "../../entities/log.entity";
import { LogRepository } from "../../repositories/log.repository";
import { SendEmailLogs } from "./send-email-logs";


describe('send-email-logs.test', () => {

    const mockEmailService = {
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),
    }

    const mockLogRepository: LogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }

    const sendEmailLogs = new SendEmailLogs(
        mockEmailService as any,
        mockLogRepository,
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should sendEmail and saveLog', async () => {

        const result = await sendEmailLogs.execute(envs.MAILER_EMAIL);

        expect(result).toBe(true);
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
            "createdAt": expect.any(Date),
            "level": "low",
            "message": "Log email sent",
            "origin": "send-email-logs.ts",
        });
    });

    test('should sendEmail in case of error', async () => {

        mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false);

        const result = await sendEmailLogs.execute('email-notvalid-domain.invalid');

        expect(result).toBe(false);
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
            "createdAt": expect.any(Date),
            "level": "high",
            "message": "Error: Email log not sent",
            "origin": "send-email-logs.ts",
        });
    });

});