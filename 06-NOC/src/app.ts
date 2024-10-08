import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";

(async () => {
    main();
})();

async function main() {
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    });

    // To create a collection = tables, document = row
    // const newLog = await LogModel.create({
    //     message: 'Test from Mongo',
    //     origin: 'app.ts',
    //     level: 'low',
    // });
    // console.log(newLog);

    // const logs = await LogModel.find();
    // console.log(logs);


    // const prisma = new PrismaClient();
    // const newLog = await prisma.logModel.create({
    //     data: {
    //         level: 'HIGH',
    //         message: 'Test message',
    //         origin: 'app.ts',
    //     }
    // });
    // console.log(newLog)

    // const logs = await prisma.logModel.findMany({
    //     where: {
    //         level: 'HIGH',
    //         id: 3,
    //     }
    // });
    // console.log(logs);

    Server.start();


}