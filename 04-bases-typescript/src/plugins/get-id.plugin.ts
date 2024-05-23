// From api node
// const { randomUUID } = require('node:crypto');
import { randomUUID } from 'node:crypto';
// External package
// const { v4: uuidv4 } = require('uuid');
import { v4 as uuidv4 } from 'uuid';

export const getUUID = () => {
    // return uuidv4();
    return {
        id1: uuidv4(),
        id2: randomUUID(),
    }
}