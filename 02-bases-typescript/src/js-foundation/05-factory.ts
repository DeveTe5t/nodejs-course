// From api node
// const { randomUUID } = require('node:crypto');
// External package
// const { v4: uuidv4 } = require('uuid');
// const getAge = require('get-age');
// const { getAge } = require('../plugins/get-age.plugin');
// const { getUUID } = require('../plugins/get-id.plugin');
// const { getAge, getUUID } = require('../plugins');
interface BuildMakePersonOptions {
    // getUUID: () => string;
    // getAge: (birthdate: string) => number;
    getUUID: () => { id1: string, id2: string },
    getAge: (birthdate: string) => number,
}

interface PersonOptions {
    name: string;
    birthdate: string;
}

export const buildMakePerson = ({ getUUID, getAge }: BuildMakePersonOptions) => {
    return ({ name, birthdate }: PersonOptions) => {

        return {
            // id1: uuidv4(), // new Date().getTime(),
            // id2: randomUUID(),
            id1: getUUID().id1,
            id2: getUUID().id2,
            name: name,
            birthdate: birthdate,
            age: getAge(birthdate), // new Date().getFullYear() - new Date(birthdate).getFullYear(),
        }
    }
}


// const obj = { name: 'John', birthdate: '1980-05-13' };

// const john = buildPerson(obj);

// console.log(john);