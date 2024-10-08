import { describe, test, expect, jest } from '@jest/globals';
import { getAge } from "../../src/plugins";

describe('plugins/get-age.plugin.ts', () => {

    test('getAge should return the age of a person', () => {

        const birthdate = '1980-12-12';
        const age = getAge(birthdate);

        // expect(age).toBe(44);
        expect(typeof age).toBe('number');
    });

    test('getAge should return current age', () => {

        const birthdate = '1980-12-12';
        const age = getAge(birthdate);

        const calculatedAge = new Date().getFullYear() - new Date(birthdate).getFullYear();
        expect(age).toBe(calculatedAge);
    });

    test('getAge should return 0 years', () => {

        const spy = jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(1980);

        const birthdate = '1980-12-12';
        const age = getAge(birthdate);

        expect(age).toBe(0);
        expect(spy).toHaveBeenCalled();
    });
});