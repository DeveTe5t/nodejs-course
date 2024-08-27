export interface CreateTableUseCase {
    execute: (options: CreateTableOptions) => string;
}

export interface CreateTableOptions {
    base: number;
    limit?: number;
}

// interface spaceBeforeEqualSignOptions {
//     iteration: number;
//     limit?: number;
// }

export class CreateTable implements CreateTableUseCase {

    constructor(
        /**
        * DI - Dependency Injection
        */
    ) { }

    execute({ base, limit = 10 }: CreateTableOptions) {

        let outputMessage = '';
        for (let i = 1; i <= limit; i++) {
            // outputMessage += `${base} x ${i}${this.spaceBeforeEqualSign({ iteration: i, limit })} = ${base * i}\n`;
            // outputMessage += `${base} x ${i}${this.spaceBeforeEqualSign({ iteration: i, limit })} = ${base * i}`;
            outputMessage += `${base} x ${i} = ${base * i}`;

            if (i < limit) outputMessage += '\n';
        }

        return outputMessage;
    }

    // spaceBeforeEqualSign({ iteration, limit = 10 }: spaceBeforeEqualSignOptions) {

    //     let space = '';
    //     for (let i = iteration.toString().length; i < limit.toString().length; i++) {
    //         space += ' ';
    //     }

    //     return space;
    // };
}