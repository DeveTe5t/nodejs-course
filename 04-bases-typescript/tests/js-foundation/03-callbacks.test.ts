import { describe, test, expect } from '@jest/globals';
import { getUserById } from "../../src/js-foundation/03-callbacks";

describe('js-foundation/03-callbacks.ts', () => {

    test('getUserById should return an error if user does not exist', (done) => {

        const id = 10;
        getUserById(id, (error, user) => {
            expect(error).toBe(`User not found with id ${id}`);
            expect(user).toBeUndefined();

            // throw new Error('Test not implemented');
            done();
        });

    });

    test('getUserById should return John Doe with id 1', (done) => {

        const id = 1;
        getUserById(id, (error, user) => {
            expect(error).toBeUndefined();
            // way 1
            expect(user).toEqual({
                id: 1,
                name: 'John Doe',
            });

            // way 2
            // const { id, name } = user!;
            // expect(id).toBe(1);
            // expect(name).toBe('John Doe');

            done();
        });
    });
});