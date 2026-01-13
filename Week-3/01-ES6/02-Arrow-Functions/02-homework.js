/**
 * Difference between == and ===?
 * In JavaScript, === and == are both used to compare values, but they 
 * behave differently:
 * 1. == (Loose Equality):
 *    - Converts values to the same type before comparing.
 *    - Example: '5' == 5 is true because JavaScript converts '5' (a 
 *      string) to a number.
 * 2. === (Strict Equality):
 *    - No type conversion. Both value and type must match.
 *    - Example: '5' === 5 is false because one is a string and the other
 *      is a number.
 * 
 * Note: Always use === for clearer and more predictable comparisons!
*/