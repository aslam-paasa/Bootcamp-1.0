/**
 * How many ways to copy a function?
 * - Functions ko copy karne ke multiple tarike hain:
 *   1. Direct Assignment (=)
 *   2. Function.prototype.bind()
 *   3. Arrow Functions
 *   4. Spread Operator (...)
 */




/**
 * Method 1: Direct Assignment (Shallow Copy)
 * - Sabse simple tarika hai function ko copy karne ka
 * - Original function ka reference copy hota hai
 * - Original function mein koi bhi changes dono functions mein reflect hote hain
 */

/**
 * Original Function
 */
function greet(name) {
    console.log(`Hello ${name}!`);
}

/**
 * Direct assignment se copy
 */
const greetCopy1 = greet;

/**
 * Testing the copied function
 */
console.log('Direct Assignment Example:');
greetCopy1('John');  // Hello John!

/**
 * Limitations of Direct Assignment:
 * 1. Reference Copy    : Sirf reference copy hota hai, new function create nahi hota
 * 2. Shared Changes    : Original function mein changes dono functions ko affect karte hain
 * 3. Context Issues    : 'this' binding preserve nahi hoti
 * 4. Missing Properties: Function ke properties (name, length) copy nahi hote
 * 
 * Use Case: Jab sirf simple reference copy chahiye ho aur memory efficient solution chahiye ho
 */



/**
 * Method 2: bind() ka use karna (Shallow Copy)
 * 1. bind() kya hai?
 *    a. Ye ek method hai jo function ka new copy banata hai
 *    b. Iska main kaam hai 'this' keyword ko fix karna
 * 
 * 2. bind() ki zarurat kab padti hai?
 *    a. Jab hum function ko object se alag use karna chahte hain
 *    b. Jab 'this' keyword ka context lost ho jata hai
 * 
 * 3. Context loss ka simple example:
 *    - Jab aap kisi object ke method ko direct call karte hain (obj.method()), 
 *      tab 'this' object ko 'refer' karta hai
 *    - Lekin jab aap usi method ko kisi variable mein store karke call karte hain,
 *      tab 'this' ka context lost ho jata hai aur wo 'undefined' ya 'window' ko 
 *      refer karne lagta hai
 *    - Jaise: const func = obj.method; func(); // 'this' lost ho gaya
 * 
 * 4. Real-world analogy:
 *    - Imagine kijiye ki aap ek restaurant mein waiter hain
 *    - Jab aap restaurant ke andar hain, tab aapko pata hai ki aapka boss kaun hai
 *    - Lekin agar aap restaurant se bahar nikal jayein, tab aapka boss kaun hai 
 *      ye context lost ho jayega
 *    - bind() isi tarah se 'this' ko fix karke rakhta hai, chahe function kahan 
 *      bhi use ho
 */

const student = {
    name: 'Rahul',
    rollNo: 101,
    sayHello() {
        console.log(`Hello! Main ${this.name} hoon, roll number ${this.rollNo}`);
    }
};

/**
 * 1. Normal use - sab kuch sahi chalega
 */

student.sayHello();  // "Hello! Main Rahul hoon, roll number 101"

/**
 * 2. Problem: Function ko alag variable mein store karne par
 */
const helloFunction = student.sayHello;
helloFunction();  // "Hello! Main undefined hoon, roll number undefined"

/**
 * 3. Solution: bind() use karke
 *    - bind() function ka new copy banata hai
 *    - Iska main kaam hai 'this' keyword ko fix karna
 *    - bind() function ko call karne par 'this' context fix hota hai.
 */

const boundHello = student.sayHello.bind(student);
boundHello();  // "Hello! Main Rahul hoon, roll number 101"



/**
 * Ex: Real-world example - Shopping Cart 
 */
const cart = {
    items: [],
    total: 0,

    addProduct(product) {
        this.items.push(product);
        this.total += product.price;
        console.log(`${product.name} add ho gaya. Total: ₹${this.total}`);
    }
};

/**
 * 1. Normal use - sab kuch sahi chalega
*/ 
cart.addProduct({ name: 'Laptop', price: 50000 });
// Output: "Laptop add ho gaya. Total: ₹50000"

/**
 * 2. Problem: Function ko alag variable mein store karne par
*/
try {
    const addToCart = cart.addProduct;
    addToCart({ name: 'Mouse', price: 1000 });
    // Output: "Mouse add ho gaya. Total: NaN" (this binding lost ho gayi)
} catch (error) {
    console.error('Error:', error.message);
}

/** 
 * Solution: bind() use karke
*/ 
const boundAddToCart = cart.addProduct.bind(cart);
boundAddToCart({ name: 'Mouse', price: 1000 });
// Output: "Mouse add ho gaya. Total: ₹51000"


/**
 * bind() ke fayde:
 * 1. 'this' keyword ka context preserve hota hai
 * 2. Function ko object se alag use kar sakte hain
 * 3. Original function ka behavior maintain hota hai
 * 
 * bind() kab use karein?
 * 1. Jab function ko object se alag use karna ho
 * 2. Jab 'this' keyword ka context preserve karna ho
 * 3. Jab function ko dusre function mein pass karna ho
 * 
 * Note: Direct Assessment k context issues ko 'bind' ne solve
 *       kar diya.
 */



/**
 * Method 3: Arrow Function (Deep Copy)
 * 
 * Arrow Functions kya hain?
 * - Ye ES6 mein introduce kiye gaye modern JavaScript functions hain
 * - Inka syntax traditional functions se thoda alag hota hai
 * - Ye 'this' keyword ko automatically bind karte hain
 * 
 * Arrow Function Deep Copy kaise banata hai?
 * - Jab hum kisi function ya object ki completely new copy banate hain,
 *   means new function memory m new space allocate karte hai.
 * - Original function/object se koi connection nahi hota
 * - Changes original function/object ko affect nahi karte
 * 
 * Real World Example:
 * - Shopping cart mein product add karne ka function
 * - User authentication mein login function
 * - Data processing mein transformation function
 */

/**
 * 1. Normal Use - Sab kuch sahi chalega
 */
const calculateTotal = (items) => {
    return items.reduce((sum, item) => sum + item.price, 0);
};
// Output: 51000

/** 
 * 2. Arrow function se deep copy
 */ 
const calculateTotalCopy = (items) => calculateTotal(items);

/**
 * 3. Testing
 */
const cartItems = [
    { name: 'Laptop', price: 50000 },
    { name: 'Mouse', price: 1000 }
];

console.log('\nUsing Arrow Function:');
console.log('Original Total:', calculateTotal(cartItems));      // 51000
console.log('Copied Total:', calculateTotalCopy(cartItems));    // 51000



/**
 * Method 4: Spread Operator (Shallow Copy)
 * - Function ke properties ko copy karta hai
 * - Original function ka reference maintain karta hai
 */

/**
 * 1. Original function with properties
 */
function greet(name) {
    console.log(`Hello ${name}`);
}

greet.customMessage = 'Welcome!';
greet.version = '1.0';

console.log("greet.customMessage:", greet.customMessage); // ✅ 'Welcome!'
console.log("greet.version:", greet.version);            // ✅ '1.0'


/**
 * 2. Spread operator se copy karne ki galti
 *    - Not a real function copy
 *    - Empty object bana dega
 */
const greetCopy = { ...greet };  
console.log("greetCopy:", greetCopy); // Empty object

/**
 * 3. Testing — yahan error aayega
 */
try {
    greetCopy('Charlie');  // TypeError: greetCopy is not a function
} catch (e) {
    console.log("Error:", e.message);
}

console.log("greetCopy.customMessage:", greetCopy.customMessage); // undefined
console.log("greetCopy.version:", greetCopy.version);             // undefined

/**
 * Correct Way: 
 * - Function Copy + Properties Preserve karna
 * - Function copy directly assign karke karna padta hai (reference copy)
 */
const greetClone = greet;  // ref copy

greetClone('Amit');  // Hello Amit
console.log("greetClone.customMessage:", greetClone.customMessage); // Welcome!
console.log("greetClone.version:", greetClone.version);             // 1.0

/**
 * Summary:
 * - Spread operator functions ke liye kaam nahi karta
 * - Agar aapko function + uski properties copy karni hai, toh direct assignment karo
 * - Spread sirf plain objects ke liye reliable hai
 */

/**
 * Best Practices:
 * 1. bind() use karein jab:
 *    - Function ka context change karna ho
 *    - Deep copy chahiye ho
 * 
 * 2. Arrow Functions use karein jab:
 *    - Simple function behavior copy karna ho
 *    - Modern syntax prefer karein
 * 
 * 3. Spread Operator use karein jab:
 *    - Not a function copy
 * 
 * 4. Direct Assignment use karein jab:
 *    - Simple reference copy chahiye ho
 *    - Memory efficient solution chahiye ho
 */