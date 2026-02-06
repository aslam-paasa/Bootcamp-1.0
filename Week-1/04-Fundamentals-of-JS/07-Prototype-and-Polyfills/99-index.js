/**
 *  Prototype
 * Class Array { ---------------> const arr = [1, 2, 3, 4]
 *   filter
 *   map         
 *   forEach
 * }
 * 
 * Jab v hum const arr = [1, 2, 3, 4] likhte hai to browser arr k andr ek
 * special variable banata hai called __proto__ or [[Prototype]], aur isko
 * wo 'class Array' k equal kar deta hai.
 *  
 *   arr.__proto__ = Array.prototype
 * 
 * Jb v hum arr.map() use krte hai to pehle check krta hai ki map() mere
 * arr variable k andr defined hai ya nahi. Agar defined nahi hai to wo
 * __proto__ k andr jaega aur check karega ki __proto__ k andr map() defined
 * hai ya nhi i.e. __proto__ = { .map = function() { ... } }. Agar defined hai
 * to wo call kr dega.
 * 
 * Note: Agar browser mai arr.__proto__ kare to hum saari built-in methods
 *       dekh payenge. Aur agar hum Array.prototype k andr jaega to hum
 *       wahi saari methods dekh payenge. That means both are same.
*/

/**
 * Agar arr.__proto__ = null kare to mera link break ho jayega. Aur ab agar
 * map function ko call krte hai to type error: arr.map is not a function
 * aaega. Aur puraane browser m yahi error aati hai.
 * 
 * a. class Array = Prototype
 * b. Object property inside Array class = __proto__
 * 
 * So, first we have to check that link is broken or not. If it is broken 
 * then we can write our own method called Polyfills.
 * 
 * if(!Array.prototype.hululu) {
 *   Array.prototype.hululu = function() { 
 *     console.log("I am inside hululu")
 *   }
 * }
*/

/**
 * Polyfills Steps:
 * 1. Understand signature of the method
 *    - Name of the method
 *    - Inputs
 *    - Output
 *    - Overall working of the method
 * 
 * 2. Ex: forEach method
 *    - Name of the method: forEach
 *    - Inputs: callback function(currentValue, index)
 *    - Array k har element k liye callback fn ko run karta hai.
 *              
*/

const nums = [1, 2, 3, 4, 5]

console.log("Using forEach");
nums.forEach((element, index) =>
    console.log(`At index ${index} the value is ${element}`)
);

if (!Array.prototype.myForEach) {
    Array.prototype.myForEach = function (cb) {
        for (let i = 0; i < this.length; i++) {
            cb(this[i], i);
        }
    }
}

console.log("Using myForEach");
nums.myForEach((element, index) =>
    console.log(`At index ${index} the value is ${element}`)
);

/**
 * Ex: map method
 *    - Name of the method: map
 *    - Inputs: callback function(currentValue, index)
 *    - Output: new array
 *    - Overall working of the method: Array k har element k liye callback fn
 *      ko run karta hai.
*/

const arr = [2, 4, 6, 8, 10]
if (!Array.prototype.myMap) {
    Array.prototype.myMap = function (cb) {
        const result = [];
        for (let i = 0; i < this.length; i++) {
            result.push(cb(this[i], i));
        }
        return result;
    }
}

console.log("Using myMap");
const myMapResult = arr.myMap((element, index) => element * 2);
console.log(`My Map Result: ${myMapResult}`);

/**
 * Ex: reduce method
 *    - Name of the method: reduce
 *    - Inputs: callback function(accumulator, currentValue)
 *    - Output: single value
 *    - Overall working of the method: Array k har element k liye callback fn
 *      ko run karta hai.
*/
if (!Array.prototype.myReduce) {
    Array.prototype.myReduce = function (cb, initialValue = undefined) {
        let accumulator = initialValue || this[0];
        let startIndex = initialValue ? 0 : 1;

        for (let i = startIndex; i < this.length; i++) {
            accumulator = cb(accumulator, this[i]);
        }
        return accumulator;
    }
}

console.log("Using myReduce");
const myReduceResult = arr.myReduce((accumulator, element) => accumulator + element, 4);
console.log(`My Reduce Result: ${myReduceResult}`);


/**
 * Slice:
 * - Used to extract range of elements from an existing array.
 * - It returns a new array, does not modify the new array.
 * - The returned array contains shallow copy of elements, that means if
 *   array has nested elements, same reference of nested elements are used.
 * 
 * We can use it in 3-ways:
 * 1. Slice() : Returns whole array by creating shallow copy
 * 2. Slice(start) : Returns new array by copying elements from start idx 
 *    to length of array.
 * 3. slice(start, end) : Range selection. End not included.
 * 4. slice(-ve) : Negative index is used to count from the end of the array.
*/

const arrayEle = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


Array.prototype.mySlice = function (start, end) {
     const length = this.length;

     /**
      * Start:
     */
     if (start === undefined) {
          start = 0;
     } else if (start < 0) {
          const newIdx = length + start;
          start = Math.max(newIdx, 0);
     } else {
          start = Math.min(start, length);
     }

     /**
      * End:
      */
     if (end === undefined) {
          end = length;
     } else if (end < 0) {
          const newIdx = length + end;
          end = Math.max(newIdx, 0);
     } else {
          end = Math.min(end, length);
     }

     /**
      * Result:
      */
     const result = [];
     for (let i = start; i < end; i++) {
          result.push(this[i]);
     }

     return result;
}


console.log(arrayEle.mySlice()); // Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]




/**
 * Built-in Promise:
*/

function wait(seconds) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, seconds * 1000);
    });
}

wait(10)
    .then(() => console.log('Promise resolved after 10 seconds'))
    .catch(() => console.log('Promise rejected after 10 seconds'))
    .finally(() => console.log('Mai to har baar chalunga'))

/**
 * Custom Promise:
 * 1. Signature:
 *    - Hum promise ka object bana rhe hai i.e., new Promise(cb).
 *    - Jab hum promise class ka object banate hai to hum as a parameter
 *      callback pass krte hai jo usko execute karega. 
 *    - Iss executor k paas 2 chijo ka access hai:
 *      a. resolve fn: resolve ko call karne par:
 *         - promise fulfill ho jaata hai
 *         - jitne v .then fn hai wo run kar jate hai
 *      b. reject fn: reject ko call karne par:
 *         - promise reject ho jaata hai
 *         - sabhi .catch fn run ho jaate hai
 *      c. finally fn: toh har baar chalega
*/

/**
 * Jaise hi user object banaega, to wo humein parameter mai executor fn dega.
 * Aur jaise hi user object banega state ko 'pending' set kar dega aur user
 * k executorFn() ko call kar dega. Aur jab iss user ko call karte hai to
 * humein first parameter dena hai jo poore fn ko resolve kar de aur iske
 * liye hum ek helper fn likhnge called resolverFunction().
 * Aur second parameter dena hai jo poore fn ko reject kar de aur iske
 * liye hum ek helper fn likhnge called rejectorFunction().
 * 
 * resolverFunction() ka state change kar do i.e. 'fulfilled'. And same
 * for rejectorFunction() state change kar do i.e. 'rejected'.
 * 
 * Now, lets create .then() fn. It takes callback as a parameter, and user
 * ne agar multiple times promise call kiya to uske callback ko hum 
 * _successCallbacks array k andr push kar denge aur ye usko apne andr
 * register kar lega. Similary, catch(cb) v yahi karega jisse hum 
 * _errorCallback array k andr push kar denge.
 * 
 * Ab inn functions ko run kab karna hai?
 * Jitne v successCallbacks hai unke upar loop karnge aur har callback ko
 * run kar denge.
 * 
 * In case of reject, _state ko 'rejected' mark kar do aur jitne v error
 * callbacks hai unn sab ko run kar do.
 * 
 * resolverFunction and rejectorFunction bahar se run hoga iss liye hum
 * bind() use karenge.
 * 
 * Ab chaining issue ho rhi, to then() k baad object ko hai return kar denge
 * so it can chain further.
*/

class MyPromise {
    constructor(executorFn) {
        this._state = 'pending';
        this._successCallbacks = [];
        this._errorCallbacks = [];
        this._finallyCallbacks = [];
        executorFn(this.resolverFunction.bind(this), this.rejectorFunction.bind(this));
    }

    then(cb) {
        this._successCallbacks.push(cb);
        return this;
    }

    catch(cb) {
        this._errorCallbacks.push(cb);
        return this;
    }

    finally(cb) {
        this._finallyCallbacks.push(cb);
        return this;
    }

    resolverFunction(value) {
        this._state = 'fulfilled';
        this._successCallbacks.forEach(cb => cb(value));
        this._finallyCallbacks.forEach(cb => cb());
    }

    rejectorFunction(error) {
        this._state = 'rejected';
        this._errorCallbacks.forEach(cb => cb(error));
        this._finallyCallbacks.forEach(cb => cb());
    }
}

function myPromise(seconds) {
    const user = new MyPromise((resolve, reject) => {
        setTimeout(() => {
            resolve('Done!');
        }, seconds * 1000);
    });
    return user;
}

myPromise(10).then((result) => console.log('V1 Promise resolved:', result))
    .catch((error) => console.log('V1 Promise rejected:', error))
    .finally(() => console.log('V1 Mai to har baar chalunga'));


myPromise(10).then((result) => console.log('V2 Promise resolved:', result))
    .catch((error) => console.log('V2 Promise rejected:', error))
    .finally(() => console.log('V2 Mai to har baar chalunga'));

    // Incomplete polyfill, but it works.

/**
 * Note: https://cdnjs.cloudflare.com/ajax/libs/js-polyfills/0.1.43/polyfill.js
 *       is a library which provides polyfills for all the methods. Companies
 *       like google, facebook, etc. use this library to provide polyfills for
 *       all the methods.
*/