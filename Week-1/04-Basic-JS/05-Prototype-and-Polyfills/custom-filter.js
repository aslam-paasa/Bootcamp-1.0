
/**
 * Filter Polyfill:
 * Filter method exists on Array.prototype chain, used to remove elements 
 * that does not meet certain criteria, this method returns a new array.
 * 
 * 1. Syntax
 *    const arr = array.filter(callbackFn, thisArg);
 * 
 *    function callbackFn(element, index, array) {
 *      // return true if element meets criteria
 *    }
 * 
 *    Parameters:
 *    - callbackFn (required): Function to execute on each element
 *      - element: Current array element being processed
 *      - index  : Index of current element in array
 *      - array  : Original array filter() was called on
 *    - thisArg (optional): Value used as 'this' when executing callback
 * 
 * 2. First Attempt
 * 3. Final Attempt
 * 4. SparseArray
 * 5. Real Polyfill
 * 6. Note 
*/

const arr = [1, 2, 3, 4, 5];

function transformFunction(value, index, array) {
    return value % 2 === 0;
}

const newArrayWithFilter = filterFunction(arr, transformFunction);

function filterFunction(dataArray, callbackFn, thisArg) {
    const result = [];

    for(let i = 0; i < dataArray.length; i++) {
        const value = dataArray[i];

        const isValueValid = callbackFn(value, i, dataArray);
        if(isValueValid) {
            result.push(value);
        }
    }

    return result;
}

const resultWithFilter = filterFunction(arr, transformFunction);
console.log(resultWithFilter); // Output: [2, 4]



/**
 * How to control the value of 'this' inside callbackFn:
 * 1. We have 3 options to control the value:
 *    a. Call
 *    b. Apply
 *    c. Bind
 * 2. Jab hum kisi function ko kisi dusre function k andr callback k roop
 *    mai dete hai, toh iska 'this' galat jo jaata hai.
 * 3. Sol: .call() se control karo 'this'
 *    
*/


const obj = { hey: 'magic' };

function transformArrayWithThis(value, index, array) {
    return value % 2 === 0;
}

const newArrayWithFilterWithThis = filterFunction(arr, transformArrayWithThis, obj);

function filterFunctionWithThis(dataArray, callbackFn, thisArg) {
    const result = [];

    for(let i = 0; i < dataArray.length; i++) {
        const value = dataArray[i];

        const isValueValid = callbackFn.call(thisArg, value, i, dataArray);
        if(isValueValid) {
            result.push(value);
        }
    }

    return result;
}

const resultWithFilterWithThis = filterFunctionWithThis(arr, transformArrayWithThis, obj);
console.log(resultWithFilterWithThis); // Output: [2, 4]




/**
 * Injecting pure function into Prototype Chain:
 * 1. Handle callbackFn:
 *    a. If callbackFn is not a function, throw an error.
 *    b. If callbackFn is a function, call it with the correct arguments.
 * 
 * 2. Handle Sparse Array:
 *    A sparse array is an array that has missing(or empty) indexes.
 *    These missing indexes occur when an array has "holes" 
 *    (i.e., indices without assigned values).
*/

const arrWithFilter = [1, 2, 3, 4, 5];

Array.prototype.myFilter = function(callbackFn, thisArg) {

    if(typeof callbackFn !== 'function') {
        throw new Error('Callback is not a function');
    }

    const result = [];

    for(let i = 0; i < this.length; i++) {
        if(this.hasOwnProperty(i)) {
            const value = this[i];

            const isValueValid = callbackFn.call(thisArg, value, i, this);
            if(isValueValid) {
                result.push(value);
            }
        }
    }

    return result;
}

function transformFn(element, index, array) {
    return element % 2 === 0;
}

const resultWithMyFilter = arrWithFilter.myFilter(transformFn);
console.log(resultWithMyFilter); // Output: [2, 4]
