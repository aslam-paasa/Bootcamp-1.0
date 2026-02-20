/**
 * Two ways to do currying in JS :
 * a. Bind Method
 * b. Closure Method
*/


/**
 * Basic Bind Usage:
 * - bind() method se hum function ka first parameter fix kar sakte hain
 */

let multiplyByTwo = multiply.bind(this, 2);
multiplyByTwo(5);  // Output: 10 (2 * 5 = 10)

/**
 * Another Bind Example:
 * - Isi tarah se kisi bhi number ke saath multiply kar sakte hain
 */

let multiplyByThree = multiply.bind(this, 3);
multiplyByThree(5);  // Output: 15 (3 * 5 = 15)

/**
 * Binding multiple parameters
 * - bind() mein hum multiple parameters bhi fix kar sakte hain
 * - Agar saare parameters bind kar diye to baad mein diye gaye ignore honge
 */

let multiplyByFour = multiply.bind(this, 4, 6); 
multiplyByFour(5);  // Output: 24 (4 * 6 = 24, 5 ignore ho gaya)

/**
 * Bind without fixing parameters
 * - Agar bind() mein koi parameter fix nahi karte to normal function ki tarah kaam karega
 */
let normalMultiply = multiply.bind(this);
normalMultiply(2, 3);  // Output: 6 (2 * 3 = 6)





/**
 * Real World Example - Restaurant Order System:
 */
function makeFood(cuisine, dish, spiceLevel) {
    return `Making ${cuisine} ${dish} with spice level ${spiceLevel}`;
}

/**
 * Indian cuisine ke liye fixed function
 */
const makeIndianFood = makeFood.bind(this, "Indian");
console.log(makeIndianFood("Curry", "High"));    // Output: Making Indian Curry with spice level High

/**
 * Chinese cuisine with medium spice level fixed
 */
const makeChineseFood = makeFood.bind(this, "Chinese", null, "Medium");
console.log(makeChineseFood("Noodles"));         // Output: Making Chinese Noodles with spice level Medium

/**
 * Thai cuisine with all parameters fixed
 */
const makeThaiFood = makeFood.bind(this, "Thai", "Curry", "Low");
console.log(makeThaiFood());                     // Output: Making Thai Curry with spice level Low





/**
 * Currying Using Bind Method:
 * - Bind method se currying kaise karte hain? Simple example se samjhte hain:
 * - Socho aapke paas ek coffee shop hai:
 *   a. Coffee banane ke liye 2 cheezein chahiye:
 *      i. Coffee type (Latte, Espresso etc)
 *      ii. Size (Small, Medium, Large)
 * 
 * - Ab 2 tarike hain coffee order lene ke:
 *   a. Har baar dono cheezein poochna:
 *      makeCoffee("Latte", "Large")
 * 
 *   b. Ya phir bind use karke ek special counter banana:
 *      i. Sirf Latte bechne wala counter
 *      ii. Sirf Espresso bechne wala counter
 * 
 * - Bind method se hum pehle se hi kuch values fix kar sakte hain
 *   Jaise ki ek counter sirf Latte hi bechega, size customer choose karega
 */

/**
 * Basic coffee making function
 */
function makeCoffee(type, size) {
    return `Making ${size} ${type} coffee`;
}

/**
 * Special counters using bind
 */
const latteCounter = makeCoffee.bind(this, "Latte");
const espressoCounter = makeCoffee.bind(this, "Espresso");

/**
 * Ab customer sirf size choose karega
 */
console.log(latteCounter("Large"));     // Output: Making Large Latte coffee
console.log(espressoCounter("Small"));  // Output: Making Small Espresso coffee

/**
 * Ek aur example - Discount Calculator
 */
function calculateDiscount(productType, price) {
    const discounts = {
        "electronics": 10,
        "clothing": 20,
        "furniture": 15
    };
    const discount = discounts[productType];
    return price - (price * discount / 100);
}

/**
 * Special discount calculators for different departments
 */
const electronicsDiscount = calculateDiscount.bind(this, "electronics");
const clothingDiscount = calculateDiscount.bind(this, "clothing");

console.log(electronicsDiscount(1000));  // Output: 900 (10% off)
console.log(clothingDiscount(1000));     // Output: 800 (20% off)

/**
 * Basic multiply function
 */
let multiply = function (x, y) {
    console.log(x * y);
}