/**
 * Step 9: findLast() - Return last matching element
 * > findLast() searches from right to left
 * > Returns the last element matching a condition.
 * > If no match: returns undefined.
 */


/**
 * Example 1: Users Array (Basic Usage)
*/

const users = [
  { id: 1, name: "Rahul", age: 25 },
  { id: 2, name: "Priya", age: 22 },
  { id: 3, name: "Amit", age: 30 },
  { id: 4, name: "Rahul", age: 28 },
];

/* Utility Function for clean output */
function printResult(title, result) {
  console.log(`${title}:`, result ?? "Not Found");
}

/* Q1. Last user named "Rahul" */
const lastRahul = users.findLast(user => user.name === "Rahul");
printResult("Last user named 'Rahul'", lastRahul); // { id: 4, ... }

/* Q2. Last user with age < 20 */
const lastYoung = users.findLast(user => user.age < 20);
printResult("Last user with age < 20", lastYoung); // Not Found




/**
 * Example 2: Products Array (Advanced Usage)
*/

const products = [
  { id: 101, name: "iPhone 14", price: 79999, category: "mobile" },
  { id: 102, name: "Samsung Galaxy", price: 49999, category: "mobile" },
  { id: 201, name: "MacBook Pro", price: 149999, category: "laptop" },
  { id: 202, name: "Dell XPS", price: 89999, category: "laptop" },
  { id: 301, name: "Apple Watch", price: 29999, category: "wearable" }
];


/* Q1. Last product exactly named 'iPhone 14' */
printResult(
  "Last product exactly named 'iPhone 14'",
  products.findLast(product => product.name === "iPhone 14")
); // id: 101


/* Q2. Last product with price > 50,000 */
printResult(
  "Last product with price > 50,000",
  products.findLast(product => product.price > 50000)
); // id: 201


/* Q3. Last product in category 'laptop' */
printResult(
  "Last product in category 'laptop'",
  products.findLast(product => product.category === "laptop")
); // id: 202


/* Q4. Last product with price < 30,000 */
printResult(
  "Last product with price < 30,000",
  products.findLast(product => product.price < 30000)
); // id: 301


/* Q5. Last product in 'mobile' category */
printResult(
  "Last product in 'mobile' category",
  products.findLast(product => product.category === "mobile")
); // id: 102