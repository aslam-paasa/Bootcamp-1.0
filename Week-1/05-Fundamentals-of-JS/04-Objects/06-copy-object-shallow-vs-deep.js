/**
 * Use Case-1: Copying Objects
 * - Objects aur Arrays ke liye deep copy karne ke liye 
 *   special methods use karne padte hain jaise:
 *   a. JSON.parse(JSON.stringify()) or structuredClone() in-built method
 *   b. Object.assign()
 *   c. Spread Operator (...), 
 *   d. Nested Spread Operator (...), 
*/ 


/**
 * Approach-1: Deep Copy using JSON Methods
 * 1. JSON.stringify() - Object ko string mein convert karta hai
 * 2. JSON.parse()     - String ko wapas object mein convert karta hai
 * 
 * Note: Isse ek completely new object create hota hai jo original se koi 
 *       reference nahi rakhta
 */

/**
 * Advantages:
 * 1. Simple aur easy to use
 * 2. Nested objects aur arrays ko bhi deep copy kar deta hai
 * 3. Original object se completely independent copy create karta hai
 * 4. Memory efficient hai kyunki new memory location par copy create hota hai
 */

/**
 * Ex-1: Simple Object Copy (Advantage)
*/
const simpleObject = {
    name: 'John',
    age: 20
};

const simpleCopy = JSON.parse(JSON.stringify(simpleObject));

console.log('Simple Object Example:');
console.log('Original:', simpleObject);  // { name: 'John', age: 20 }
console.log('Copy:', simpleCopy);        // { name: 'John', age: 20 }

/**
 * Copy ko modify karke dekhte hain:
 */
simpleCopy.name = 'Peter';
console.log('\nAfter Modification:');
console.log('Original:', simpleObject);  // { name: 'John', age: 20 }
console.log('Copy:', simpleCopy);        // { name: 'Peter', age: 20 }



/**
 * Disadvantages:
 * 1. Functions ko copy nahi kar paata
 * 2. Date objects ko string mein convert kar deta hai
 * 3. undefined values ko ignore kar deta hai
 * 4. Circular references ko handle nahi kar paata
 * 5. Performance wise thoda slow ho sakta hai bade objects ke liye
 */


/**
 * Issue: Object with Function (Disadvantage)
 * - JSON methods functions ko copy nahi kar paate
 */
const objectWithFunction = {
    name: 'John',
    age: 20,
    getName: function() {
        return this.name;
    }
};

const functionCopy = JSON.parse(JSON.stringify(objectWithFunction));

console.log('\nObject with Function Example:');
console.log('Original:', objectWithFunction);  // { name: 'John', age: 20, getName: [Function: getName] }
console.log('Copy:', functionCopy);            // { name: 'John', age: 20 }

/**
 * Copy ko modify karke dekhte hain:
 * - Isme functionCopy.name = 'Peter'; nahi hoga kyunki 
 *   functionCopy.name = 'Peter';
 */
functionCopy.name = 'Peter';
console.log('\nAfter Modification:');
console.log('Original:', objectWithFunction);  // { name: 'John', age: 20, getName: [Function: getName] }
console.log('Copy:', functionCopy);            // { name: 'Peter', age: 20 }

/**
 * Alternative Shallow Copy Methods for Deep Copy:
 * 1. Spread Operator (...)
 *    - Simple objects ke liye use kar sakte hain
 *    - Nested objects mein shallow copy create karta hai
 * 
 * 2. Object.assign()
 *    - Properties ko merge karne ke liye use karte hain
 *    - Nested objects mein shallow copy create karta hai
 * 
 * 3. Custom Deep Clone Function
 *    - Complex objects ke liye best option
 *    - Functions aur circular references ko handle kar sakta hai
 */



/**
 * Approach 2: Object.assign() Method
 * - JavaScript mein objects ko copy karne ka ek common method hai
 * - Ye ek partial deep copy provide karta hai
 */

// Original object with properties and method
let originalObject = {
    name: 'John',
    age: 20,
    getName: function() {
        return this.name;
    }
}

/**
 * Object.assign() ka use karke copy karna
 * Parameters:
 * 1. {} - Empty object as destination
 * 2. nestedObject - Source object to copy from
 */

/**
 * Nested Object Data:
*/
const nestedObject = {
    name: 'John',
    age: 20,
    address: {
        city: 'New York',
        country: 'USA'
    },
    getFullAddress: function() {
        return `${this.address.city}, ${this.address.country}`;
    }
}

/**
 * 1. Copy karein:
*/
let copiedObject = Object.assign({}, nestedObject);

/**
 * 2. Original aur copied object ko compare karein
*/
console.log('Original Object:', nestedObject);  
console.log('Copied Object:', copiedObject);    

/**
 * 3. Copied object mein changes karein:
 *    a. Check function copy ho raha hai ya nahi
 *    b. Check nested object mein deep copy ho raha hai ya nahi
*/

console.log('Original Function:', nestedObject.getFullAddress());  // New York, USA
console.log('Copied Function:', copiedObject.getFullAddress());    // New York, USA

copiedObject.name = "Peter";
copiedObject.address.city = "London";  // Nested object mein change


/**
 * 4. Function ko phir se test karein (Issue solved)
*/
console.log('\nFunction Test After Changes:');
console.log('Original Function:', nestedObject.getFullAddress());  // London, USA
console.log('Copied Function:', copiedObject.getFullAddress());    // London, USA

/**
 * 5. Changes ke baad dono objects ko check karein (Issue created):
 *   - Original object bhi change ho gaya hai kyunki Object.assign()
 *     nested object ke liye shallow copy create karta hai.
*/
console.log('\nAfter Modification:');
console.log('Original Object:', nestedObject);  
console.log('Copied Object:', copiedObject);    



/**
 * Advantages:
 * 1. Simple aur easy to use
 * 2. Functions ko copy kar sakta hai (JSON.stringify() ki problem solve ho gayi)
 * 
 * Disadvantages:
 * 1. Object.assign() complete deep copy nahi deta hai
 * 2. Ye sirf first level ki properties ko deep copy karta hai
 * 3. Nested objects aur arrays ke liye shallow copy create karta hai (problem)
 * 
 * Note: 
 * 1. Dekha ja sakta hai ki nested object (address) mein change karne par
 *    original object bhi change ho gaya. Ye shallow copy ka example hai.
 * 2. Lekin function copy ho gaya hai, jo JSON.stringify() se nahi ho pa raha tha
 */



/**
 * Approach-3: Spread Operator (ES6)
 * 
 * Spread operator (...) ka use karke bhi hum objects ko copy kar sakte hain
 */

let finalObject = {
    name: 'John',
    age: 30,
    getFullAddress: function() {
        return `${this.address.city}, ${this.address.country}`;
    },
    address: {
        city: 'New York',
        country: 'USA'
    }
};

/**
 * 1. Spread operator ka use karke copy karna
*/
let copiedSpreadObject = {...finalObject};

console.log('Original Object:', finalObject);
console.log('Copied Object:', copiedSpreadObject);

/**
 * 2. Copied object mein changes karein:
 *    a. Check function copy ho raha hai ya nahi
 *    b. Check nested object mein deep copy ho raha hai ya nahi
*/

console.log('Original Function:', finalObject.getFullAddress());  // New York, USA
console.log('Copied Function:', copiedSpreadObject.getFullAddress());      // New York, USA

copiedSpreadObject.name = "Peter";
copiedSpreadObject.address.city = "London";  // Nested object mein change

/**
 * 3. Function ko phir se test karein (Issue solved)
*/
console.log('\nFunction Test After Changes:');
console.log('Original Function:', finalObject.getFullAddress());  // London, USA
console.log('Copied Function:', copiedSpreadObject.getFullAddress());      // London, USA

/**
 * 4. Changes ke baad dono objects ko check karein (Issue created):
 *   - Original object bhi change ho gaya hai kyunki spread operator
 *     nested object ke liye shallow copy create karta hai
*/
console.log('\nAfter Modification:');
console.log('Original Object:', finalObject);  
console.log('Copied Object:', copiedSpreadObject);    

/**
 * Advantages:
 * 1. Modern aur clean syntax
 * 2. Functions ko copy kar sakta hai
 * 3. Object.assign() se zyada readable hai
 * 
 * Disadvantages:
 * 1. Spread operator bhi complete deep copy nahi deta hai
 * 2. Ye bhi sirf first level ki properties ko deep copy karta hai
 * 3. Nested objects aur arrays ke liye shallow copy create karta hai
 * 
 * Note: 
 * 1. Spread operator bhi Object.assign() ki tarah hi kaam karta hai
 * 2. Nested objects mein changes original object ko affect karte hain
 * 3. Functions copy ho jate hain, jo JSON.stringify() se nahi ho pa rahe the
 */


/**
 * Approach-4: Nested Object ko Modify karne ka Best Approach
 * - Spread Operator ka use karke nested objects ko bhi deep copy kar sakte hain
 *   Iske liye har level par spread operator ka use karna padta hai.
 */

/**
 * Original Object with nested structure:
*/
let personObject = {
    name: 'John',
    age: 20,
    getName: function() {
        return this.name;
    },
    address: {
        city: 'Delhi',
        country: 'India',
    }
}

/**
 * 1. First level copy using spread operator:
*/
let personCopy = {...personObject}

console.log('Original Object:', personObject);
console.log('Copied Object:', personCopy);

/**
 * 2. Nested object ko modify karne ke liye:
 *    a. Outer object ke liye spread operator
 *    b. Nested object ke liye bhi spread operator
 *    c. Changes ko new object mein assign karna
 */
personCopy = {
    ...personCopy,              // Outer object ka spread
    name: 'Alisha',             // Direct property change
    address: {                  // Nested object
        ...personCopy.address,  // Nested object ka spread
        city: 'Goa'             // Nested property change
    }
};

console.log('Original Object After Changes:', personObject);
console.log('Copied Object After Changes:', personCopy);

/**
 * Advantages:
 * 1. Complete deep copy milta hai
 * 2. Functions bhi copy ho jate hain
 * 3. Original object safe rehta hai
 * 
 * Disadvantages:
 * 1. Code thoda complex ho jata hai
 * 2. Har nested level ke liye spread operator use karna padta hai
 * 3. Performance thodi kam ho sakti hai
 * 
 * Note: But this is the best approach to modify the nested object.
 */
