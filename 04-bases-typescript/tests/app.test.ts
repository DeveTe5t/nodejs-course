// import "@types/jest"
import { describe, test, expect } from '@jest/globals';
// A A A

describe('Test in the App File', () => {
    // it('should be true', () => {
    test('should be 30', () => {

        // 1. Arrage: initialization variables, etc.
        const number1 = 10;
        const number2 = 20;

        // 2. Act: call variables, functions, etc.
        const result = number1 + number2;

        // 3. Assert: verify results
        expect(result).toBe(30);
    });
});