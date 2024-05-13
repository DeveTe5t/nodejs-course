// From api node
const { randomUUID } = require('node:crypto');
// External package
const { v4: uuidv4 } = require('uuid');

const getUUID = () => {
    // return uuidv4();
    return {
        id1: uuidv4(),
        id2: randomUUID(),
    }
}

module.exports = {
    getUUID,
}