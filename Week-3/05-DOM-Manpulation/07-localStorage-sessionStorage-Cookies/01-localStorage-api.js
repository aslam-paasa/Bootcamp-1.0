/**
 * Local Storage:
 * - Humaare browser k andr data store karna jo ki browser band hone par bhi
 *   delete nahi hoti.
*/


/**
 * 1. How to store data?     - setItem()
 * 2. How to get data?       - getItem()
 * 4. How to update data?    - setItem()    [overrides the old value]
 * 3. How to delete data?    - removeItem()
 * 5. How to clear all data? - clear()
 * 
 * Note: Every data should be stored in string format, that's why we are
 *       using JSON.stringify() and JSON.parse() to store and get data.
*/

localStorage.setItem("name", JSON.stringify("John"));
localStorage.setItem("age", JSON.stringify(20));
localStorage.setItem("users", JSON.stringify([
    {name: "John", age: 20},
    {name: "Jane", age: 21},
    {name: "Jim", age: 22}
]));
localStorage.setItem("city", JSON.stringify("New York"));

let value = localStorage.getItem("name");
console.log(JSON.parse(value)); // John

let users = localStorage.getItem("users");
console.log(JSON.parse(users)); // [ {name: "John", age: 20}, {name: "Jane", age: 21}, {name: "Jim", age: 22} ]

localStorage.removeItem("name");
localStorage.removeItem("age");

localStorage.clear();
