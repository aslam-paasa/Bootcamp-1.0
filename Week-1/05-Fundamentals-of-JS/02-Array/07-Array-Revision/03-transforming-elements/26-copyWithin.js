/**
 * copyWithin():
 * - This method is used to copy the elements of an array to another array.
 * - It takes three arguments: 
 *   a. target index
 *   b. start index
 *   c. end index
 * - The end index is not included in the copied range.
*/

/**
 * Q. Ek array hai [10, 20, 30, 40, 50, 60], aur isme:
 *    a. index 2 se start krke index 4 tk k elements ko index 0 pe copy kr do
 *    b. index 3 se start krke end tk k elements ko index 1 pe copy kr do
*/

let arr = [10, 20, 30, 40, 50, 60];

arr.copyWithin(0, 2, 4);
console.log(arr); // [30, 40, 30, 40, 50, 60]

arr.copyWithin(1, 3);
console.log(arr); // [30, 40, 50, 60, 50, 60]