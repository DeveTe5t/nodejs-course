import { describe, test, expect } from '@jest/globals';
import { characters } from "../../src/js-foundation/02-destructuring";

describe('js-foundation/02-destructuring.ts', () => {

    test('characters should be contain Flash, Superman', () => {

        expect(characters).toContain('Flash');
        expect(characters).toContain('Superman');

        expect(characters).toEqual(expect.arrayContaining(['Flash', 'Superman']));
    });

    test('first character should be Flash and second Superman', () => {

        const [flash, superman] = characters;

        expect(flash).toBe('Flash');
        expect(superman).toBe('Superman');
    });
});