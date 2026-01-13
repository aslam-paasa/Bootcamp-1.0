/**
 * Get all unique values from an array:
*/

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 2, 3, 67, 5, 3];

const uniqueValues = [...new Set(arr)];
console.log(uniqueValues); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 67]