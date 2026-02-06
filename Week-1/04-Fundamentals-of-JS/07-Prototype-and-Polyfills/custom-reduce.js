/**
 * Reduce:
 * 
*/

const arr = [1, 2, 3, 4, 5, 6, 6, 7];

/**
 * 1. Normal Approach:
*/
let sum = 0
for(let i = 0; i < arr.length; i++) {
    sum += arr[i];
}
console.log(sum); // Output: 34


/**
 * 2. Reduce Approach:
*/
let result = arr.reduce(function(acc, curr) {
    return acc + curr;
}, 0);

console.log(result); // Output: 34



/**
 * 3. Custom Reduce Approach:
*/

Array.prototype.myReduce = function(callbackFn, initialValue) {

    if(typeof callbackFn !== 'function') {
        throw new Error('Callback is not a function');
    }

    if(this == null) {
        throw new Error('Invalid data');
    }

    if(!this.length && !initialValue) {
        throw new Error('Reduce of empty array with no initial value');
    }

    let accumulator = initialValue ? initialValue : this[0];
    const startIndex = initialValue ? 0 : 1;
    
    for(let i = startIndex; i < this.length; i++) {
        const nextValue = this[i];
        accumulator = callbackFn(accumulator, nextValue, i, this);
    }   

    return accumulator;
}

const resultWithMyReduce = arr.myReduce(function(acc, curr, i, array) {
    return acc + curr;  
}, 10);

console.log(resultWithMyReduce); // Output: 44
