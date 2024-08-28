import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";

export class Server {

    public static start() {

        console.log('Server started...');

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                // const date = new Date();
                // console.log('5 second', date);
                const url = 'https://google.com';
                new CheckService(
                    () => console.log(`${url} is ok`),
                    (error) => console.log(`Error: ${error}`)
                ).execute(url);
                // new CheckService().execute('http://localhost:3000/posts');
            }
        );
    }
}