/**
 * Step 1: forEach() - Simple Execution Har Element Par
 * > forEach() har array element ke liye ek function execute karta hai. 
 * > Kuch return nahi karta.
 * 
 * > Syntax: 
 *    array.forEach(function(currentValue, index, array) {
 *        // code to execute
 *    });
*/


/**
 * Example 1: Basic forEach - Console Log
*/

const fruits = ["Apple", "Banana", "Orange", "Mango"];

/* Har fruit ko print karo */
console.log("Fruits List:");
fruits.forEach(function(fruit, index) {
    console.log(`${index + 1}. ${fruit}`);
});

/* Output:   */
/* 1. Apple  */
/* 2. Banana */
/* 3. Orange */
/* 4. Mango  */



/**
 * Example 2: Real World - Shopping Cart
*/

const cartItems = [
    { name: "Laptop", price: 50000, quantity: 1 },
    { name: "Mouse", price: 1500, quantity: 2 },
    { name: "Keyboard", price: 3000, quantity: 1 }
];

let totalAmount = 0;

/* Har item ka cost calculate karo */
console.log("Shopping Cart Breakdown:");
cartItems.forEach(function(item) {
    const itemTotal = item.price * item.quantity;
    totalAmount += itemTotal;
    console.log(`${item.name} - ₹${item.price} × ${item.quantity} = ₹${itemTotal}`);
});

console.log(`Total Amount: ₹${totalAmount}`);


/**
 * Example 3: DOM Manipulation
*/

{/* 
HTML code:
<ul id="studentList"></ul>

<script>
const students = ["Rahul", "Priya", "Amit", "Neha"];

// ✅ DOM mein list render karo
const studentList = document.getElementById('studentList');

students.forEach(function(student, index) {
    const listItem = document.createElement('li');
    listItem.textContent = `${index + 1}. ${student}`;
    listItem.style.padding = '5px';
    studentList.appendChild(listItem);
});
</script> 

*/}


/**
 * When to use forEach()?
 * > Jab har element kar koi operation karna ho
 * > Jab result store nahi karna ho
 * > DOM Manipulation k liye
 * > Side effects k liye (console.log, DOM changes)
*/