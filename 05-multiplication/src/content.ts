
export const contentBody = (factor: number): string => {
    let result: string = '';

    for (let i = 1; i <= 10; i++) {
        (i < 10)
            ? result += `${factor} x ${i}  = ${factor * i}\n`
            : result += `${factor} x ${i} = ${factor * i}`;
    }

    return result;
}