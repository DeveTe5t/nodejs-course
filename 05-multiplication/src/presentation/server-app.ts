import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

interface RunOptions {
    base: number;
    limit: number;
    showTable: boolean;
    fileName: string;
    fileDestination: string;
}

export class ServerApp {

    // static run(options: RunOptions) {
    static run({ base, limit, showTable, fileName, fileDestination }: RunOptions) {
        console.log('ServerApp running...');

        const table = new CreateTable().execute({ base, limit });
        // const wasCreated = new SaveFile().execute({ fileContent: table, fileDestination: destination, fileName: name });
        const wasCreated = new SaveFile().execute({ fileContent: table, fileDestination, fileName });

        if (showTable) console.log(table);

        wasCreated
            ? console.log('File created!')
            : console.error('File not created!');
    }
}