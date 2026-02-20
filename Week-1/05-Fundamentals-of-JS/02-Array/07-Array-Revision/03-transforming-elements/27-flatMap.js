/**
 * flatMap():
 * - This method maps each element using a function, then flattens the result 
 *   into a new array.
*/

/**
 * Q. Ek array hai, aur uss array ko map karo aur fir flat karo.
*/
const arr = [1, 2, 3];
const result = arr.flatMap(x => [x * 2]);
console.log(result); // Output: [2, 4, 6]   