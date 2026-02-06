/**
 * Prototype:
 * - JavaScript m jb hm ek array bnate hai to uss array k andr kuch functions
 *   already defined hai.
 * - Ex: push(), pop(), shift(), unshift(), etc. 
 * - Aur jb ek array bnate hai to uske particular array k andr ye sabhi
 *   same fns available hote hai, because JS k andr there is something
 *   known as Prototype.
 * 
 *   const arr = [1, 2, 3];
 *                   .map()
 *                   .filter()
 *                   .reduce()
 *                    etc
 * 
 * - Prototype is an object
 * - When an array is created, JS adds a .prototype object
 * - This prototype object contains copies of all array methods
 * - These methods are shared across all array instances.
 * 
 *   arr.prototype = {
 *      .map()
 *      .filter()
 *      .reduce()
 *      etc
 *   }
 * 
 * - Jb v hum kuch v array banaenge to jo v variable hoga, uske prototype m
 *   wo saare functions available honge. And that is the reason ki jb hum
 *   'arr.' krte hai to wo dot humare prototype object k andr check krta hai
 *   ki kon kon se functions yha pe available hai.  
 * 
 * - Similarly, JS k andr ek built-in chij hai called String. Aur jb v
 *   string type k variable create krnge to uske prototype k andr ye 
 *   saare functions available honge.
 * 
 *   const str = "Hello";
 *   str.prototype = {
 *      .toUpperCase()
 *      .toLowerCase()
 *      etc
 * 
*/

/**
 * Parent(Base) Class k andr ek prototype hai [Array.prototype], aur iss
 * prototype k andr sabhi properties available hai.
 * 
 * Jb hum iss array ka ek object bnate hai i.e. const arr = [1, 2, 3, 4];
 * To JS iss object k andr arr.__proto__ naam ki property bnati hai jisko
 * wo equal kr deti hai Array.prototype k.
 * - arr.__proto__ = Array.prototype
 * So, it means that arr is an object of Array.prototype, and Array k andr
 * jitni v property hai wo sb arr k andr available hai.
 * 
 * Ex: Prototype Inheritance 
 * Father {skin, height, eyeColor}
 *     - Child.__proto__ = Father.prototype
 *     - Child {skin, height, eyeColor, hairColor}
 * 
 * Ex: String Prototype Inheritance
 * String.prototype = {
 *      .toUpperCase()
 *      .toLowerCase()
 *      etc
 * }
 * 
 * - const str = "PIY"
 * - str.__proto__ = String.prototype
 * - str.length() 
 *   a. First it will check ki Kya str.length() property ko humne define
 *      kiya hai? 
 *   b. If not, then it will check ki Kya str.__proto__.length k andr 
 *      defined hai? If yes, then it will return output.
 * 
 * Q. Prototype k andr ye saari functionality kisne likha?
 *    - These fns are provided by browser.
 *    - For example, Chrome ka JS Engine k developers ne ye saari fns likha.
 * 
 * Q. How can we create our own property? 
 * -  Object.prototype.chai = function() {
 *       console.log('Chai');
 *    }
 * 
 * - const obj = { x: 1, length: 1 }
 * - obj.chai();   => Custom Property Chai
 * 
*/


/**
 * Polyfills:
 * - Using the Prototype, we write custom properties like myMap, myFilter etc.,
 *   because every browser perform differently. And we want to use the same
 *   function in all browsers.
 * - Browsers like outdated Internet Explorer doesn't have in-built properties
 *   like map, filter etc. So, we need to write our own implementation for
 *   those properties so that our application works in all browsers.
 * 
 * Why do we need polyfills (backup functions)?
 * - Suppose koi customer hai aur usse Razorpay se payment karna hai but
 *   uske browser outdated hai, so Razpay usme support nhi kar rha.
 * - Razorpay ka customer loose naa ho isliye usne khud k custom properties
 *   apne website m define kr diya jiske wajah se Razorpay ab Internet Explorer
 *   v support krta hai.
 * 
 * - if(!Array.prototype.map) {
 *      Array.prototype.map = function() {
 *          // Implementation
 *      }
 *   }
 * 
 * - Now razorpay is also supported in Internet Explorer, and will not have
 *   any issue.
*/



/**
 * Polyfill method:
 * 1. forEach()
 * 2. map()
 * 3. filter()
 * 4. reduce()
 * 5. find()
 * 6. includes()
 * 7. flat()
 * 8. findIndex()
 * 9. from()
*/

/**
 * Step-1: Array banao
*/
const arr = [1, 2, 3, 4, 5, 6];

/**
 * Step-2: Use In-built forEach() method
 * - Understand the signature of forEach() method:
 *   - Input   : function input: Value, Index
 *   - Output  : No return (Check the return value of forEach())
 *   - Behavior: Calls my fn for every value
*/
const ret = arr.forEach(function(value, index) {
    console.log(`forEach function: Value at Index ${index} is ${value}`);
})

/**
 * Checking the return value of forEach():
*/
console.log(`Returned value is ${ret}`); // undefined 


/**
 * Step-3: Create our own forEach() method:
 * a. Create a custom method
 * b. Use the custom method
*/

/**
 * 3.a. Custom forEach() method:
 * - Jo v input aaega to hum 'userFn' m daal denge.
 * - Ab 'userFn' ki value humein fn k andr pass krni hai, and for that we
 *   will use 'this' keyword. Ye userFn se value lega aur originalArr m daal
 *   dega.
 * - Now we will use 'for' loop to iterate over the originalArr. 
*/
if(!Array.prototype.myForEach) {
    Array.prototype.myForEach = function(userFn) {
        if(typeof userFn !== "function") {
            throw new Error("User function is not a function");
        }

        const originalArr = this; // current object k taraf point krta hai

        for(let i = 0; i < originalArr.length; i++) {
            if(this.hasOwnProperty(i)) {
                userFn(originalArr[i], i); 
            }
        }
    }
}

/**
 * 3.b. Using our custom forEach() method:
*/
const ret2 = arr.myForEach(function(value, index) {
    console.log(`myForEach function: Value at Index ${index} is ${value}`);
})




/**
 * 2. In-built map() method:
 * Understanding Signature of map():
 * - Input   : function input: Value, Index
 * - Output  : Returns a new array
 * - Behavior: Iterate each element 
*/

const inbuiltMap = arr.map((e) => e * 2);
console.log(inbuiltMap);

/**
 * 3. Create our own map() method:
 *    a. Create a custom method
 *    b. Use the custom method
*/

/**
 * 3.a. Custom map() method:
 *      - Create a new array: newArr
 *      - Iterate over the original array
 *      - Apply the userFn for every value
 *      - Push the result in newArr
 *      - Return the newArr
*/
if(!Array.prototype.myMap) {
    Array.prototype.myMap = function(userFn) {
        if(typeof userFn !== "function") {
            throw new Error("User function is not a function");
        }

        const originalArr = this;
        const newArr = [];

        for(let i = 0; i < originalArr.length; i++) {
            if(this.hasOwnProperty(i)) {    
                const newValue = userFn(originalArr[i], i);
                newArr.push(newValue);
            }
        }

        return newArr;
    }
}

/**
 * 3.b. Using our custom map() method:
*/
const returnCustomMap = arr.myMap((e) => e * 3);
console.log(returnCustomMap);

const returnCustomMap2 = arr.myMap((e, index) => index == 5 ? e * 3 : e);
console.log(returnCustomMap2);


/**
 * 2. In-built filter() method:
 *    - Understand the signature of filter():
 *      - Input   : function input: Value, Index
 *      - Output  : Returns a new array
 *      - Behavior: Iterate each element 
 *    - Agar user ka fn true return krta hai to current value ko new array
 *      mai add kr dete hai.
*/

const inbuiltFilter = arr.filter((e) => e % 2 === 0);
console.log(inbuiltFilter);


/**
 * 3. Create our own filter() method:
 * a. Create a custom method
 * b. Use the custom method
*/

/**
 * 3.a. Custom filter() method:
 *      - Create a new array: newArr
 *      - Iterate over the original array
 *      - Apply the userFn for every value
 *      - If userFn returns true then push the value in newArr
 *      - Return the newArr
*/

if(!Array.prototype.myFilter) {
    Array.prototype.myFilter = function(userFn) {
        const originalArr = this;
        const newArr = [];

        for(let i = 0; i < originalArr.length; i++) {
            const isTrue = userFn(originalArr[i], i);
            if(isTrue) {
                newArr.push(originalArr[i]);
            }
        }

        return newArr;
    }
}

/**
 * 3.b. Using our custom filter() method:
*/
const returnCustomFilter = arr.myFilter((e) => e % 2 === 0);
console.log(returnCustomFilter);


/**
 * 4. Create our own reduce() method:
 * a. Create a custom method
 * b. Use the custom method
*/

/**
 * 4.a. Custom reduce() method:
 *      - Create a new array: newArr
 *      - Iterate over the original array
 *      - Apply the userFn for every value
 *      - Return the newArr
*/

if(!Array.prototype.myReduce) {
    Array.prototype.myReduce = function(userFn, initialValue) {
        const originalArr = this;
        let accumulator = initialValue;

        for(let i = 0; i < originalArr.length; i++) {
            const newValue = userFn(accumulator, originalArr[i], i);
            accumulator = newValue;
        }

        return accumulator;
    }
}

/**
 * 4.b. Using our custom reduce() method:
*/

const inbuiltReduce = arr.reduce((acc, curr, index) => acc + curr, 0);
console.log(inbuiltReduce);

const returnCustomReduce = arr.myReduce((acc, curr, index) => acc + curr, 0);
console.log(returnCustomReduce);


/**
 * 5. Create our own find() method:
 * a. Create a custom method
 * b. Use the custom method
*/

/**
 * 5.a. Custom find() method:
 *      - Iterate over the original array
 *      - Apply the userFn for every value
 *      - If userFn returns true then return the value
 *      - Return the value
*/

if(!Array.prototype.myFind) {
    Array.prototype.myFind = function(userFn) {
        const originalArr = this;

        for(let i = 0; i < originalArr.length; i++) {
            const isTrue = userFn(originalArr[i], i);
            if(isTrue) {
                return originalArr[i];
            }
        }

        return "Element not found";
    }
}

/**
 * 5.b. Using our custom find() method:
*/

const inbuiltFind = arr.find((e) => e % 2 === 0);
console.log(inbuiltFind);

const returnCustomFind = arr.myFind((e) => e % 2 === 0);
console.log(returnCustomFind);


/**
 * 6. Create our own includes() method:
 *    a. Create a custom method
 *    b. Use the custom method
*/

/**
 * 6.a. Custom includes() method:
 *      - Iterate over the original array
 *      - Apply the userFn for every value
 *      - If userFn returns true then return the value
 *      - Return the value
*/

if(!Array.prototype.myIncludes) {
    Array.prototype.myIncludes = function(searchElement, fromIndex = 0) {
        const originalArr = this;

        for(let i = fromIndex; i < originalArr.length; i++) {
            if(originalArr[i] === searchElement) {
                return true;
            }
        }

        return false;
    }
}

/**
 * 6.b. Using our custom includes() method:
 * 
 * Includes() method check karta hai ki koi element array mein hai ya nahi
 * Agar element mil jata hai to true return karta hai, nahi to false
 * 
 * Example:
 * [1,2,3].includes(2) => true
 * [1,2,3].includes(4) => false
*/

if (!Array.prototype.myIncludes) {
    Array.prototype.myIncludes = function (searchElement, fromIndex = 0) {
      
      if (this == null) {
        throw new TypeError('Array null ya undefined hai');
      }
  
      const arr = Object(this);
      const length = arr.length;
  
      if (length === 0) return false;
  
      let startIndex = Math.floor(fromIndex);
      
      if (startIndex < 0) {
        startIndex = Math.max(length + startIndex, 0);
      }
  
      for (let i = startIndex; i < length; i++) {
        const currentElement = arr[i];
        if (isNaN(searchElement) && isNaN(currentElement)) {
          return true;
        }
  
        if (currentElement === searchElement) {
          return true;
        }
      }
  
      return false;
    };
}
  

const inbuiltIncludes = arr.includes(3);
console.log(inbuiltIncludes);

const returnCustomIncludes = arr.myIncludes(3);
console.log(returnCustomIncludes);




/**
 * 6. Create our own call() method:
 * a. Create a custom method
 * b. Use the custom method
*/

/**
 * 6.a. Custom call() method:
 *      - Create a new array: newArr
 *      - Iterate over the original array
 *      - Apply the userFn for every value
 *      - Return the newArr
*/

if(!Function.prototype.myCall) {
    Function.prototype.myCall = function(context = {}, ...args) {
        context.fn = this;
        context.fn(...args);

        delete context.fn;
    }
}

/**
 * 6.b. Using our custom call() method:
*/

const obj = {
    name: "John",
    age: 20
}

function purchaseCar(currency, price) {
    console.log(`I have purchased ${this.name} car for ${currency}${price}`);
}

purchaseCar.myCall(obj, "$", 100000);



/**
 * 7. Create our own apply() method:
 * a. Create a custom method
 * b. Use the custom method
*/

/**
 * 7.a. Custom apply() method:
 *      - Create a new array: newArr
 *      - Iterate over the original array
 *      - Apply the userFn for every value
 *      - Return the newArr
*/

if(!Function.prototype.myApply) {
    Function.prototype.myApply = function(context = {}, args) {
        context.fn = this;
        context.fn(...args);

        delete context.fn;
    }
}

/**
 * 7.b. Using our custom apply() method:
*/

const obj2 = {
    name: "John",
    age: 20
}

function purchaseCar2(currency, price) {
    console.log(`I have purchased ${this.name} car for ${currency}${price}`);
}

purchaseCar2.myApply(obj2, ["$", 100000]);


/**
 * 8. Create our own bind() method:
 * a. Create a custom method
 * b. Use the custom method
*/

/**
 * 8.a. Custom bind() method:
 *      - Create a new array: newArr
 *      - Iterate over the original array
 *      - Apply the userFn for every value
 *      - Return the newArr
*/

if(!Function.prototype.myBind) {
    Function.prototype.myBind = function(context = {}, ...args) {
        context.fn = this;
        return function() {
            context.fn(...args);
        }
    }
}


/**
 * 8.b. Using our custom bind() method:
*/

const returnCustomBind = purchaseCar2.myBind(obj2, "$", 100000);
console.log(returnCustomBind);



/**
 * 9. Create our own flat() method:
 * a. Create a custom method
 * b. Use the custom method
*/

/**
 * 9.a. Custom flat() method:
 *      - Create a new array: newArr
 *      - Iterate over the original array
 *      - Apply the userFn for every value
 *      - Return the newArr
*/

if(!Array.prototype.myFlat) {
    Array.prototype.myFlat = function() {
        const originalArr = this;
        const newArr = [];

        for(let i = 0; i < originalArr.length; i++) {
            if(Array.isArray(originalArr[i])) {
                newArr.push(...originalArr[i]);
            } else {
                newArr.push(originalArr[i]);
            }
        }

        return newArr;
    }
}

/**
 * 9.b. Using our custom flat() method:
*/

const arr2 = [1, 2, 3, [4, 5, 6], 7, 8, 9];

const inbuiltFlat = arr2.flat();
console.log(inbuiltFlat);

const returnCustomFlat = arr2.myFlat();
console.log(returnCustomFlat);



/**
 * 10. Create our own findIndex() method:
 * a. Create a custom method
 * b. Use the custom method
*/

/**
 * 10.a. Custom findIndex() method:
 *      - Iterate over the original array
 *      - Apply the userFn for every value
 *      - If userFn returns true then return the value
 *      - Return the value
*/

if(!Array.prototype.myFindIndex) {
    Array.prototype.myFindIndex = function(userFn) {
        const originalArr = this;

        for(let i = 0; i < originalArr.length; i++) {
            const isTrue = userFn(originalArr[i], i);
            if(isTrue) {
                return i;
            }
        }

        return -1;
    }
}


/**
 * 10.b. Using our custom findIndex() method:
*/

const inbuiltFindIndex = arr.findIndex((e) => e % 2 === 0);
console.log(inbuiltFindIndex);

const returnCustomFindIndex = arr.myFindIndex((e) => e % 2 === 0);
console.log(returnCustomFindIndex);


/**
 * 11. Create our own from() method:    
 * a. Create a custom method
 * b. Use the custom method
*/

/**
 * 11.a. Custom from() method:
 *      - Create a new array: newArr
 *      - Iterate over the original array
 *      - Apply the userFn for every value
 *      - Return the newArr
*/

if(!Array.prototype.myFrom) {
    Array.prototype.myFrom = function(arrayLike, mapFn, thisArg) {
        const originalArr = this;
        const newArr = [];

        for(let i = 0; i < originalArr.length; i++) {
            const newValue = mapFn(originalArr[i], i);
            newArr.push(newValue);
        }   

        return newArr;
    }
}

/**
 * 11.b. Using our custom from() method:
*/

const inbuiltFrom = Array.from(arr);
console.log(inbuiltFrom);

const returnCustomFrom = Array.from(arr);
console.log(returnCustomFrom);

