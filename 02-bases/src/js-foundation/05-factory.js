// From api node
const { randomUUID } = require('node:crypto');
// External package
const { v4: uuidv4 } = require('uuid');
const getAge = require('get-age')

const buildPerson = ({ name, birthdate }) => {

    return {
        id1: uuidv4(), // new Date().getTime(),
        id2: randomUUID(),
        name: name,
        birthdate: birthdate,
        age: getAge(birthdate), // new Date().getFullYear() - new Date(birthdate).getFullYear(),
    }
}

const obj = { name: 'John', birthdate: '1980-05-13' };

const john = buildPerson(obj);

console.log(john);