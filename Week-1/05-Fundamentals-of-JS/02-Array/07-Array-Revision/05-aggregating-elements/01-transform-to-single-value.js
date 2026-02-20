/**
 * Aggregator Functions:
 * - Aggregator functions wo functions hote hain jo multiple values ko ek single value mein combine karte hain
 * - Ye functions array ke elements ko process karke ek final result dete hain
 * - Common aggregator functions:
 *   => reduce()  - Array ko ek single value mein reduce karta hai
 *   => sum()     - Array ke elements ka sum karta hai
 *   => average() - Array ke elements ka average nikalta hai
 *   => count()   - Array ke elements ko count karta hai
 *   => min()     - Array mein se minimum value nikalta hai
 *   => max()     - Array mein se maximum value nikalta hai
 */

/**
 * reduce() Method:
 * - Array ko ek single value mein reduce karta hai
 * - 4 parameters leta hai:
 *   => previousValue (accumulator)
 *   => currentItem (current element)
 *   => index (optional)
 *   => array (optional)
 * - Initial value provide kar sakte hain
 */

/**
 * Example 1: Basic Usage - Sum of Numbers
 */
const numbers = [1, 2, 3, 4, 5];


/**
 * Without initial value (first element becomes initial value)
 */
const sum1 = numbers.reduce((prev, curr) => prev + curr);
console.log("Sum without initial value:", sum1); // 15

/**
 * With initial value 0
 */
const sum2 = numbers.reduce((prev, curr) => prev + curr, 0);
console.log("Sum with initial value 0:", sum2); // 15

/**
 * With initial value 2
 */
const sum3 = numbers.reduce((prev, curr) => prev + curr, 2);
console.log("Sum with initial value 2:", sum3); // 17

/**
 * Example 2: Real World Problem - Shopping Cart Total
 * - Calculate total price with tax and discounts
 * - Apply 10% tax
 * - Apply 5% discount if total > 1000
 */
const cart = [
    { name: "Laptop", price: 50000 },
    { name: "Mouse", price: 1000 },
    { name: "Keyboard", price: 2000 }
];

/**
 * Calculate total price:
 * - Add item price to total
 * - Return total
 * - Initial value is 0
 */
const total = cart.reduce((total, item) => {
    total += item.price;
    return total;
}, 0);

/**
 * Apply tax and discount:
 * - Calculate tax
 * - Calculate discount
 * - Return final total
 */
const finalTotal = parseInt(total * 1.1); // 10% tax
const discountedTotal = parseInt(total > 1000 ? finalTotal * 0.95 : finalTotal); // 5% discount

console.log("Cart Total:", total); // 53000
console.log("Final Total with Tax:", finalTotal); // 58300
console.log("Final Total with Discount:", discountedTotal); // 55385
