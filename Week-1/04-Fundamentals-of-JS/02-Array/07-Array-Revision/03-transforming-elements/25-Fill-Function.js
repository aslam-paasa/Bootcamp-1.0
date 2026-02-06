/**
 * fill():
 * - This method is used to fill the array with a static value.
 * - It takes three arguments: the value to fill, the start index, and the end index.
 * - The end index is not included in the filled range.
*/

/**
 * Q. Ek array hai, aur uss array mai sirf 5 se fill karo.
 *    a. index - '1' to '4-1' tk 5 fill kr do
 *    b. index - '2' se '7' fill kr do lekin end ni btaenge to end tk kr dega
*/

let arr = [10, 20, 30, 40, 50, 60];

arr.fill(5, 1, 4); 
console.log(arr);

arr.fill(7, 2); 
console.log(arr);



