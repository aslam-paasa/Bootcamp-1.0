/**
 * isArray() Method:
 * - Check if a value is an array.
 * - Syntax: Array.isArray(value)
 * 
 * - If value is an array, return true
 * - If value is not an array, return false
*/ 

/** 
 * Real World Example:
 * - When we receive data from the user, we need to check if it is in array format,
 *   so that we can apply array methods on it.
 */

/**
 * Example 1: Basic Usage
 */
const fruits = ['apple', 'banana', 'mango'];
console.log(Array.isArray(fruits)); // true

const number = 123;
console.log(Array.isArray(number)); // false

/**
 * Example 2: Real World Scenario
 * - Check if the data is in array format before processing it.
 * - If it is not in array format, return a message.
 */
function processUserData(data) {
    if (Array.isArray(data)) {
        return data.map(item => item.toUpperCase());
    } else {
        return "Please provide data in array format";
    }
}

/**
 * Testing the function
 */
const userData = ['john', 'jane', 'bob'];
console.log(processUserData(userData)); // ['JOHN', 'JANE', 'BOB']

const invalidData = "not an array";
console.log(processUserData(invalidData)); // "Please provide data in array format"

/**
 * Example 3: Pagination Example
 * - Check if the data is an array before implementing pagination
 */
function implementPagination(data, pageSize) {
    if (!Array.isArray(data)) {
        return "Data must be an array for pagination";
    }
    
    const totalPages = Math.ceil(data.length / pageSize);
    const pages = [];
    
    for (let i = 0; i < totalPages; i++) {
        const start = i * pageSize;
        const end = start + pageSize;
        pages.push(data.slice(start, end));
    }
    
    return pages;
}

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(implementPagination(items, 3)); // [[1,2,3], [4,5,6], [7,8,9], [10]]

/**
 * Example 4: E-commerce Cart Example
 * - Validate cart items before processing
 */
function processCart(cartItems) {
    if (!Array.isArray(cartItems)) {
        return "Invalid cart format";
    }
    
    const validItems = cartItems.filter(item => 
        Array.isArray(item) && item.length === 2 && typeof item[0] === 'string' && typeof item[1] === 'number'
    );
    
    if (validItems.length === 0) {
        return "No valid items in cart";
    }
    
    const total = validItems.reduce((sum, [name, price]) => sum + price, 0);
    return {
        items: validItems,
        total: total
    };
}

const cart = [
    ["Laptop", 50000],
    ["Mouse", 1000],
    "Invalid Item",
    ["Keyboard", 2000]
];

console.log(processCart(cart));
