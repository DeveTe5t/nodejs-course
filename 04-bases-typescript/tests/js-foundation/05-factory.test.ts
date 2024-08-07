import { describe, test, expect } from '@jest/globals';
import { buildMakePerson } from "../../src/js-foundation/05-factory";

describe('js-foundation/05-factory.ts', () => {

    const getUUID = () => ({ id1: '1234', id2: '5678' });
    const getAge = () => 40;

    // if code is sync not need done
    test('buildMakePerson should return a function', () => {

        const makePerson = buildMakePerson({ getUUID, getAge });
        expect(typeof makePerson).toBe('function');
    });

    test('buildMakePerson should return a person', () => {

        const makePerson = buildMakePerson({ getUUID, getAge });
        const johnDoe = makePerson({ name: 'John Doe', birthdate: '1980-12-12' });

        expect(johnDoe).toEqual({
            id1: '1234',
            id2: '5678',
            name: 'John Doe',
            birthdate: '1980-12-12',
            age: 40,
        });
    });
});