import fs from 'fs';

export const createFile = (fileName: string, content: string) => {

    const outputPath = 'outputs';
    fs.mkdirSync(outputPath, { recursive: true });
    fs.writeFileSync(`${outputPath}/${fileName}`, content);
}