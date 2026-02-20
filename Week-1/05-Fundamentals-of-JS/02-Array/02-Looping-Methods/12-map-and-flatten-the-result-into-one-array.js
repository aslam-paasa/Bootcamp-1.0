/**
 * Step 12: flatMap() -  Map + flat ek saath
 * > flatMap() pehle map karta hai, phir result ko 1 level deep flatten 
 *   karta hai.
*/

/**
 * Example 1: Sentences ko Words mein break karna
*/
const sentences = [
    "Hello world",
    "JavaScript is awesome",
    "Array methods are powerful"
];

/* Har sentence ko words mein break karo aur flatten karo */
const allWords = sentences.flatMap(sentence => sentence.split(' '));
console.log("All words:", allWords);
// ['Hello', 'world', 'JavaScript', 'is', 'awesome', 'Array', 'methods', 'are', 'powerful']



/**
 * Example 2: Real World - Order Items Flatten Karna
*/

const orders = [
    {
        orderId: 101,
        items: ["Laptop", "Mouse"]
    },
    {
        orderId: 102, 
        items: ["Phone", "Case", "Charger"]
    },
    {
        orderId: 103,
        items: ["Book"]
    }
];

/* Q1. Saare items ek array mein */
const allItems = orders.flatMap(order => order.items);
console.log("All ordered items:", allItems);
// ['Laptop', 'Mouse', 'Phone', 'Case', 'Charger', 'Book']

/* Q2. Order ID ke saath items */
const itemsWithOrderId = orders.flatMap(order => 
    order.items.map(item => `${item} (Order: ${order.orderId})`)
);
console.log("Items with order ID:", itemsWithOrderId);



/**
 * map() vs flatMap() Comparison:
*/

const numbers = [1, 2, 3];

/* Q1. map() - nested arrays create karta hai */
const mapped = numbers.map(n => [n, n * 2]);
console.log("map() result:", mapped); // [[1, 2], [2, 4], [3, 6]]

/* Q2. flatMap() - automatically flatten karta hai */
const flatMapped = numbers.flatMap(n => [n, n * 2]);
console.log("flatMap() result:", flatMapped); // [1, 2, 2, 4, 3, 6]
