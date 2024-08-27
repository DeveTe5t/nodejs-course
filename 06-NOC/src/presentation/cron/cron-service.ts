import { CronJob } from 'cron';

type CronTime = string | Date;
type OnTick = () => void;

export class CronService {

    static createJob(cronTime: CronTime, onTick: OnTick): CronJob {

        // const job = new CronJob(
        //     '*/3 * * * * *', // cronTime
        //     function () {
        //         const date = new Date();
        //         console.log('3 second', date);
        //     }, // onTick
        //     // null, // onComplete
        //     // true, // start
        //     // 'America/Los_Angeles' // timeZone
        // );
        const job = new CronJob(cronTime, onTick);

        job.start(); // is optional here because of the fourth parameter set to true.

        return job;
    }
}