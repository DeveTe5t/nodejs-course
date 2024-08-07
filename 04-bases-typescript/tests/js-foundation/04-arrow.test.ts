import { describe, test, expect } from '@jest/globals';
import { getUserById, getUserByIdArrow } from "../../src/js-foundation/04-arrow";

describe('js-foundation/04-arrow.ts', () => {

    test('getUserById should return an error if user does not exist', (done) => {

        const id = 12;
        getUserById(id, (error, user) => {
            expect(error).toBe(`User not found with id ${id}`);
            expect(user).toBeUndefined();

            done();
        });
    });

    test('getUserById should return Jane Doe with id 2', (done) => {

        const id = 2;
        getUserById(id, (error, user) => {
            expect(error).toBeUndefined();
            expect(user).toEqual({
                id: 2,
                name: 'Jane Doe',
            });

            done();
        });
    });

    test('getUserByIdArrow should return an error if user does not exist', (done) => {

        const id = 12;
        getUserByIdArrow(id, (error, user) => {
            expect(error).toBe(`User not found with id ${id}`);
            expect(user).toBeUndefined();

            done();
        });
    });

    test('getUserByIdArrow should return Jane Doe with id 2', (done) => {

        const id = 2;
        getUserByIdArrow(id, (error, user) => {
            expect(error).toBeUndefined();
            expect(user).toEqual({
                id: 2,
                name: 'Jane Doe',
            });

            done();
        });
    });
});