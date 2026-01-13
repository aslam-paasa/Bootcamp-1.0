/**
 * Polyfill of Map:
 * Map is used to iterate over an array, returns a new array by transforming
 * elements in original array.
 * 
 * 1. Syntax:
 *    Array.map(callbackFn, thisArg)
 *
 *    function callbackFn(element, index, array) {
 *      // transform element and return new value
 *    }
 *
 *    Parameters:
 *    - callbackFn (required): Function to execute on each element
 *      - element: Current array element being processed
 *      - index: Index of current element in array
 *      - array: Original array map() was called on
 *    - thisArg (optional): Value used as 'this' when executing callback
 *
 *    Example:
 *    const arr = [1, 2, 3];
 *    const doubled = arr.map(function(num) {
 *      return num * 2; 
 *    });
 *    
 *    Output: doubled is [2, 4, 6]
 * 
 * 
 * 2. Sample Data
 *    const sample1 = [1, 2, 3, 4];
 *    const sample2 = new Array(10);
 *    const sample3 = [1,,,,2,,,3,,,4];
 *    const sample4 = {
 *      length: 2,
 *      0: 10,
 *      1: 20,
 *      2: 30,
 *    }
 *    
 *    const result1 = sample1.map(d => d * 2);
 *    const result2 = sample2.map(d => d * 2);
 *    const result3 = sample3.map(d => d * 2);
 *    const result4 = Array.prototype.map.call(sample4, d => d * 2))
 * 
 *    console.log(result1, result2, result3, result4);
 * 
 * 3. First Attempt
 * 4. Final Attempt
 * 5. SparseArray
 * 6. Real Polyfill
 * 7. Note
*/


const sample1 = [1, 2, 3, 4];
const sample2 = new Array(10);
const sample3 = [1,,,,2,,,3,,,4];
const sample4 = {
      length: 2,
      0: 10,
      1: 20,
      2: 30,
    }
    
const result1 = sample1.map(d => d * 2);
const result2 = sample2.map(d => d * 2);
const result3 = sample3.map(d => d * 2);
const result4 = Array.prototype.map.call(sample4, d => d * 2); 

console.log(result1, result2, result3, result4);


/**
 * 1. Initialize input array
 */
const arr = [1, 2, 3, 4, 5];

/**
 * 2. Create custom map implementation to square each number
 *    Example: [1,2,3] => [1,4,9]
 */
const result = myMap(arr, transformArray);
console.log(result); // Output: [1, 4, 9, 16, 25]

/**
 * 3. Transform function that squares each element
 *    Parameters:
 *    - elem     : Current array element
 *    - index    : Current element index
 *    - meraArray: Original array reference
 */
function transformArray(elem, index, meraArray) {
   return elem * elem;
}

/**
 * 4. Custom map implementation
 *    - Create result array
 *    - Iterate through input array
 *    - Apply transformation
 *    - Store transformed value
 *    - Return new array
 */
function myMap(dataArray, callbackFn) {
    let finalArray = [];
    
    for(let i = 0; i < dataArray.length; i++) {
        const value = dataArray[i];
        
        const newValue = callbackFn(value, i, dataArray);
        finalArray.push(newValue);
    }
    
    return finalArray;
}


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

const thisIsThis = { hey: 1 };

function myMapWithThis(dataArray, callbackFn, thisIsThis) {
    let finalArray = [];
    
    for(let i = 0; i < dataArray.length; i++) {
        const value = dataArray[i];
        
        /**
         * Yha hum callback fn tko chala rhe hai lekin custom 'this' k saath
        */
        const newValue = callbackFn.call(thisIsThis, value, i, dataArray);
        finalArray.push(newValue);
    }
    
    return finalArray;
}


/**
 * Usage:
 * 1. value + this.hey = 1 + 1 = 2
 * 2. value + this.hey = 2 + 1 = 3
 * 3. value + this.hey = 3 + 1 = 4
 * 4. value + this.hey = 4 + 1 = 5
 * 5. value + this.hey = 5 + 1 = 6
*/
const arrWithThis = [1, 2, 3, 4, 5];

function transformArrayWithThis(value, index, meraArray) {
    console.log('This inside callback:', this);
    return value + this.hey;
}

const resultWithThis = myMapWithThis(arrWithThis, transformArrayWithThis, thisIsThis);
console.log(resultWithThis); // Output: [2, 3, 4, 5, 6]



/**
 * How to inject pure function in prototype chain:
 * 1. Initialize array
 * 2. Create pure function
 * 3. Inject pure function in prototype chain
 * 4. Call pure function using prototype chain
 * 5. Return new array
*/

const array = [1, 2, 3, 4, 5];

/**
 * Conditions:
 * 1. Check if callback is a function
 *    a. If yes, then proceed
 *    b. If no, then throw an error
 * 2. Use hasOwnProperty to skip empty slots
 *    a. Array can have empty slots (holes)
 *    b. Example: let arr = [1, , 3] // empty slot at index 1
 *    c. We want to skip these empty slots just like the real map() does
 *    d. hasOwnProperty checks if the index actually contains a value
 *    e. If there's no value (it's a hole), we skip it
 *    f. Output: [1, <empty>, 3]
*/
Array.prototype.myMap = function(callbackFn) {
    if(typeof callbackFn !== 'function') {
        throw new Error('Callback is not a function');
    }

    let finalArray = [];
    
    for(let i = 0; i < this.length; i++) {
        if(this.hasOwnProperty(i)) {
            const value = this[i];
            const newValue = callbackFn(value, i, this);
            finalArray.push(newValue);
        }
    }

    return finalArray;
}

function getSquareOfNumber(num) {
    return num * num;
}

const resultArr = array.myMap(getSquareOfNumber);
console.log(resultArr); // Output: [1, 4, 9, 16, 25]



