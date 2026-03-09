/**
 * Jest Testing Guide for Beginners:
 * 
 * Jest is a popular testing framework that helps us write and run tests.
 * Here are the main building blocks of a Jest test:
 * 
 * 1. describe():
 *    - Works like a container to group related tests together
 *    - Makes tests more organized and readable
 *    - Example: describe('Calculator tests', () => { ... })
 * 
 * 2. test() or it():
 *    - Used to write individual test cases
 *    - Should clearly describe what you're testing
 *    - Example: test('should add two numbers correctly', () => { ... })
 * 
 * 3. expect():
 *    - Used to make assertions about your code
 *    - Checks if your code behaves as expected
 *    - Example: expect(sum(2, 3)).toBe(5)
 * 
 * 4. Matchers (like toBe()):
 *    - Used with expect() to check different types of conditions
 *    - toBe(): Checks exact equality (===)
 *    - toEqual(): For deep equality of objects
 *    - toContain(): For arrays/strings
 *    - And many more!
 */

import { describe, expect, test } from '@jest/globals';
import { sum, multiply } from '../index';


/**
 * Test suite 1:
 * > TestCase 1: add 1 + 2 to equal 3
 * > TestCase 2: should return the sum of negative numbers correctly
*/
describe('Testing sum function', () => {

  /**
   * Test case 1:
  */
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });

  /**
   * Test case 2:
  */
  test('should return the sum of negative numbers correctly', () => {
    const finalAnswer = sum(-1, -2);
    expect(finalAnswer).toBe(-3);
  })
});


/**
 * Test suite 2:
 * > TestCase 1: multiply 1 and 2 to equal 2
 * > TestCase 2: multiply negative numbers correctly
*/

describe('Testing multiply function', () => {

  /**
   * Test case 1:
  */
  test('should multiply 1 and 2 correctly', () => {
    const finalAnswer = multiply(1, 2);
    expect(finalAnswer).toBe(2);
  })

  /**
   * Test case 2:
  */
  test('should multiply negative numbers correctly', () => {
    const finalAnswer = multiply(-1, -2);
    expect(finalAnswer).toBe(2);
  })
})