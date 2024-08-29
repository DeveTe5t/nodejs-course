import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';

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

            return true;
        } catch (error) {

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
        const attachments = [
            { filename: 'logs-all.log', path: './logs/logs-all.log' },
            { filename: 'logs-heigh.log', path: './logs/logs-heigh.log' },
            { filename: 'logs-medium.log', path: './logs/logs-medium.log' }
        ];

        this.sendEmail({ to, subject, htmlBody, attachments });
    }
}
