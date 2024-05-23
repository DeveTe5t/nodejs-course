
// A A A

describe('Test in the App File', () => {
    // it('should be true', () => {
    test('should be 30', () => {

        // 1. Arrage
        const number1 = 10;
        const number2 = 20;

        // 2. Act
        const result = number1 + number2;

        // 3. Assert
        expect(result).toBe(30);
    });
});