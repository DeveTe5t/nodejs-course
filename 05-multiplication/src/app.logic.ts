// way 1 mine
// import { header } from './header';
// import { contentBody } from './content';
// import { createFile } from './create-file';

// const base = 5;

// const title = header(`Table of ${base}`);
// const multiplication = contentBody(base);
// createFile(`table-${base}.txt`, `${title}\r${multiplication}`);

// console.log(title);
// console.log(multiplication);

// way 2
import fs from 'fs';
import { yarg } from './config/plugins/args.plugin';

const { b: baseMultiplication, l: limitMultiplication, s: showTableMultiplication } = yarg;

let outputMessage = '';
// const base = 9;
// const base = yarg.b;
// const limit = yarg.l;
// const show = yarg.s;
const headerMessage = `
=================================
            Table of ${baseMultiplication}
=================================\n
`;

const spaceBaseBetweenEqual = (iteration: number) => {

    let space = '';
    for (let i = iteration.toString().length; i < limitMultiplication.toString().length; i++) {
        space += ' ';
    }

    return space;
};

// for (let i = 1; i <= 10; i++) {
for (let i = 1; i <= limitMultiplication; i++) {
    // (i < 10)
    // (i < limit)    
    //     ? outputMessage += `${base} x ${i}  = ${base * i}\n`
    //     : outputMessage += `${base} x ${i} = ${base * i}`;

    outputMessage += `${baseMultiplication} x ${i}${spaceBaseBetweenEqual(i)} = ${baseMultiplication * i}\n`;
}

outputMessage = headerMessage + outputMessage;
if (showTableMultiplication) {
    console.log(outputMessage);
}

const outputPath = 'outputs';

fs.mkdirSync(outputPath, { recursive: true });
fs.writeFileSync(`${outputPath}/table-${baseMultiplication}.txt`, outputMessage);
console.log('File created!');