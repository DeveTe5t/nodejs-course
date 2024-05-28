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

let outputMessage = '';
const base = 9;
const headerMessage = `
=================================
            Table of ${base}
=================================\n
`;

for (let i = 1; i <= 10; i++) {
    (i < 10)
        ? outputMessage += `${base} x ${i}  = ${base * i}\n`
        : outputMessage += `${base} x ${i} = ${base * i}`;
}

outputMessage = headerMessage + outputMessage;
console.log(outputMessage);

const outputPath = 'outputs';

fs.mkdirSync(outputPath, { recursive: true });
fs.writeFileSync(`${outputPath}/table-${base}.txt`, outputMessage);
console.log('File created!');