/**
 * Step 11: findLastIndex() - 
 * > Returns index of the last element matching a condition
 * > If no element matches: returns -1
*/


/**
 * Example 1: Users Array
*/

const users = [
  { id: 1, name: "Rahul", age: 25 },
  { id: 2, name: "Priya", age: 22 },
  { id: 3, name: "Amit", age: 30 },
  { id: 4, name: "Rahul", age: 28 }
];

/* Find the index of the last user named "Rahul" */
const lastRahulIndex = users.findLastIndex(user => user.name === "Rahul");
console.log("Index of last user named 'Rahul':", lastRahulIndex); // Output: 3

/* Find the index of the last user younger than 20 (none in this list) */
const youngUserIndex = users.findLastIndex(user => user.age < 20);
console.log("Index of last user younger than 20:", youngUserIndex); // Output: -1 (not found)




/**
 * Example 2: Products Array
*/

const products = [
  { id: 101, name: "iPhone 14", price: 79999, category: "mobile" },
  { id: 102, name: "Samsung Galaxy", price: 49999, category: "mobile" },
  { id: 201, name: "MacBook Pro", price: 149999, category: "laptop" },
  { id: 202, name: "Dell XPS", price: 89999, category: "laptop" },
  { id: 301, name: "Apple Watch", price: 29999, category: "wearable" }
];


/* Q1. Find the index of the last product whose name is exactly 'iPhone 14' */
const lastIphoneIndex = products.findLastIndex(
    product => product.name === "iPhone 14"
);
console.log("Index of last product named 'iPhone 14':", lastIphoneIndex); // 0


/* Q2. Find the index of the last product with price greater than 50,000 */
const lastExpensiveProductIndex = products.findLastIndex(
    product => product.price > 50000
);
console.log("Index of last product with price > 50,000:", lastExpensiveProductIndex); // Output: 2


/* Q3. Find the index of the last product in the "laptop" category */
const lastLaptopIndex = products.findLastIndex(
    product => product.category === "laptop"
);
console.log("Index of last product in category 'laptop':", lastLaptopIndex); // Output: 3


/* Q4. Find the index of the last product with price less than 30,000 */
const lastCheapProductIndex = products.findLastIndex(
    product => product.price < 30000
);
console.log("Index of last product with price < 30,000:", lastCheapProductIndex); // Output: 4