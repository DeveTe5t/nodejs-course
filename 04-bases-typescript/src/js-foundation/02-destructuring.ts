

// console.log(process.env);

const { SHELL, LOGNAME } = process.env;
// console.table({ SHELL, LOGNAME });

const characters = ['Flash', 'Superman', 'Green Lantern', 'Batman'];
const [flash, , , batman] = characters;
// console.log(flash, batman);