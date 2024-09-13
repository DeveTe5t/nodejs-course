import nodemailer from 'nodemailer';
import { EmailService, SendEmailOptions } from "./email.service";
import { envs } from '../../config/plugins/envs.plugin';

describe('email-service.test.ts EmailService', () => {

    const mockSendMail = jest.fn();

    // Mock createTransport
    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail
    });

    // Arrange
    const emailService = new EmailService();

    const options: SendEmailOptions = {
        to: 'fulanemail@fulanmail.com',
        subject: 'Test',
        htmlBody: '<h1>Test</h1>'
    }

    const email = 'fulanemail@fulanmail.com';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should send email', async () => {
        // Act        
        await emailService.sendEmail(options);

        // Assert
        expect(mockSendMail).toHaveBeenCalledWith({
            "attachments": expect.any(Array),
            "from": envs.MAILER_EMAIL,
            "html": options.htmlBody,
            "subject": options.subject,
            "to": email,
        });
    });

    test('should send email with attachements', async () => {
        // Act
        await emailService.sendEmailWithFileSystemLogs(email);

        // Assert
        expect(mockSendMail).toHaveBeenCalledWith({
            to: email,
            subject: "Server's logs",
            from: envs.MAILER_EMAIL,
            html: expect.any(String),
            attachments: expect.arrayContaining([
                { filename: 'logs-all.log', path: './logs/logs-all.log' },
                { filename: 'logs-heigh.log', path: './logs/logs-heigh.log' },
                { filename: 'logs-medium.log', path: './logs/logs-medium.log' }
            ])
        });
    });

    test('should not sent email', async () => {
        // Arrange
        mockSendMail.mockRejectedValueOnce(new Error('Failed to send email'));

        // Act
        const emailSent = await emailService.sendEmail(options);

        // Assert
        expect(emailSent).toBe(false);
        expect(mockSendMail).toHaveBeenCalledWith({
            "attachments": expect.any(Array),
            "from": envs.MAILER_EMAIL,
            "html": options.htmlBody,
            "subject": options.subject,
            "to": email,
        });
    });
});