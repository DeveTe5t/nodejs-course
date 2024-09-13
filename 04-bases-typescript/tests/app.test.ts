// import "@types/jest"
import { describe, test, expect } from '@jest/globals';
// A A A

/** 
 * 1. Arrange (Prepare the environment)
 * In this stage, you set up the environment necessary for the 
 * test to run. This includes initializing objects, configuring 
 * variables, and preparing any resources the test requires.
 */
/**
* 2. Act (Execute the action)
* In this stage, you perform the action you are trying to test. 
* This usually involves calling a method or executing a function 
* that changes the state of the system or performs an operation 
* you want to verify.
*/
/**
 * 3. Assert (Verify the result)
 * In this stage, you check that the action taken has produced the 
 * expected outcome. This is done through assertions that compare 
 * the actual result with the expected result.
 */
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