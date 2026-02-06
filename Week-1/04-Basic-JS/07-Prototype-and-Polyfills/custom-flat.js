/**
 * flat:
*/

const sampleData = [1, 2, [3, 4, [5, 6, [7, 8, 9, [10]]]]];


/**
 * 1. Inbuilt Approach:
*/
console.log(sampleData.flat(1));
console.log(sampleData.flat(2));
console.log(sampleData.flat(Infinity));


/**
 * 2. toString Approach: Trick
 *    - Convert array to string, then split it by comma, then map it to number.
 *    - But it has no-depth control
*/
console.log(sampleData.toString().split(',').map(Number));


/**
 * 3. Custom Approach:
*/

function flatten(array, level = 100) {
    const result = [];

    array.forEach(function(element) {
        if(Array.isArray(element) && level > 0) {
            result.push(...flatten(element, level - 1)); // destructuring & push
        } else {
            result.push(element);
        }
    });

    return result;
}

console.log(flatten(sampleData, 1));
console.log(flatten(sampleData, 2));
console.log(flatten(sampleData, Infinity));