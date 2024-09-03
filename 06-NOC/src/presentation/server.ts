// import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { PostgresLogDatasource } from '../infrastructure/datasources/postgres-log.datasource';
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";

// const logRepository = new LogRepositoryImpl(
//     // new FileSystemDatasource(),
//     // new MongoLogDatasource(),
//     new PostgresLogDatasource(),
// );

const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource(),
);

const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource(),
);

const postgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource(),
);

const emailService = new EmailService();

export class Server {

    public static async start() {
        console.log('Server started...');

        // send email
        // new SendEmailLogs(emailService, fileSystemLogRepository).execute(
        //     ['mail@gmail.com', 'mail2@gmail.com']
        // );
        // const emailService = new EmailService(fileSystemLogRepository);
        // emailService.sendEmailWithFileSystemLogs(
        //     ['mail@gmail.com', 'email2@gmail.com']
        // );
        // emailService.sendEmail({
        //     to: 'mail@gmail.com',
        //     subject: 'System logs',
        //     htmlBody: `
        //         <h3>System logs NOC</h3>
        //         <p>In tristique tellus turpis, nec iaculis nibh placerat non. Quisque maximus, elit ut pharetra fermentum, massa dolor semper dui, consequat condimentum ipsum sapien nec enim. Maecenas condimentum magna at finibus sollicitudin. Proin facilisis diam neque, at finibus felis lobortis ac. Vestibulum posuere nulla non felis semper porta. Duis sodales tincidunt nisi. Phasellus ultricies purus fringilla urna dictum, vel maximus diam pellentesque. Aliquam ipsum nisl, vulputate pulvinar sapien at, pellentesque accumsan urna. Fusce pretium tellus quis nulla vestibulum eleifend. Nam quis consequat nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi iaculis elementum dolor et tincidunt. Morbi ipsum tellus, elementum eget nibh quis, mollis tincidunt urna. Quisque porta elit nec eros mattis pellentesque.</p>
        //         <p>See attached logs</p>
        //     `
        // });

        // const logs = await logRepository.getLogs(LogSeverityLevel.low);
        // console.log(logs);

        // const fsLogs = await fsLogRepository.getLogs(LogSeverityLevel.medium);
        // console.log(fsLogs);
        // const mongoLogs = await mongoLogRepository.getLogs(LogSeverityLevel.medium);
        // console.log(mongoLogs);
        // const postgresLogs = await postgresLogRepository.getLogs(LogSeverityLevel.medium);
        // console.log(postgresLogs);

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                // const date = new Date();
                // console.log('5 second', date);
                const url = 'https://google.com';
                // new CheckService(
                new CheckServiceMultiple(
                    [fsLogRepository,
                        mongoLogRepository,
                        postgresLogRepository],
                    () => console.log(`${url} is ok`),
                    (error) => console.log(`Error: ${error}`)
                    // It could be used as below
                    // undefined,
                    // undefined,
                ).execute(url);
                // new CheckService().execute('http://localhost:3000/posts');
            }
        );
    }
}