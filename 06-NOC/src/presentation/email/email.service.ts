import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
// import { LogRepository } from '../../domain/repositories/log.repository';
// import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface SendEmailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[];
}

interface Attachment {
    filename: string;
    path: string;
}

export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        }
    });

    // constructor(
    //     private readonly logRepository: LogRepository,
    // ) { }
    constructor() { }

    async sendEmail(options: SendEmailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachments = [] } = options;

        try {
            const sentInformation = await this.transporter.sendMail({
                from: envs.MAILER_EMAIL,
                to,
                subject,
                html: htmlBody,
                attachments: attachments,
            });

            console.log(sentInformation);
            // const log = new LogEntity({
            //     level: LogSeverityLevel.low,
            //     message: 'Email sent',
            //     origin: 'email.service.ts',
            // });
            // this.logRepository.saveLog(log);

            return true;
        } catch (error) {
            // const log = new LogEntity({
            //     level: LogSeverityLevel.heigh,
            //     message: 'Email not sent',
            //     origin: 'email.service.ts',
            // });
            // this.logRepository.saveLog(log);
            return false;
        }
    }

    async sendEmailWithFileSystemLogs(to: string | string[]) {
        const subject = "Server's logs";
        const htmlBody = `
            <h3>System logs NOC</h3>
            <p>In tristique tellus turpis, nec iaculis nibh placerat non. Quisque maximus, elit ut pharetra fermentum, massa dolor semper dui, consequat condimentum ipsum sapien nec enim. Maecenas condimentum magna at finibus sollicitudin. Proin facilisis diam neque, at finibus felis lobortis ac. Vestibulum posuere nulla non felis semper porta. Duis sodales tincidunt nisi.</p>
            <p>See attached logs</p>
        `;
        const attachments: Attachment[] = [
            { filename: 'logs-all.log', path: './logs/logs-all.log' },
            { filename: 'logs-heigh.log', path: './logs/logs-heigh.log' },
            { filename: 'logs-medium.log', path: './logs/logs-medium.log' }
        ];

        return this.sendEmail({ to, subject, htmlBody, attachments });
    }
}
