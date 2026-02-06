/**
 * Session Storage:
 * - Ye temporary data store karta hai, means tab close hua aur data delete
 *   ho jata hai.
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

sessionStorage.setItem("name", JSON.stringify("John"));
sessionStorage.setItem("age", JSON.stringify(20));
sessionStorage.setItem("users", JSON.stringify([
    {name: "John", age: 20},
    {name: "Jane", age: 21},
    {name: "Jim", age: 22}
]));
sessionStorage.setItem("city", JSON.stringify("New York"));

let value = sessionStorage.getItem("name");
console.log(JSON.parse(value)); // John

let users = sessionStorage.getItem("users");
console.log(JSON.parse(users)); // [ {name: "John", age: 20}, {name: "Jane", age: 21}, {name: "Jim", age: 22} ]

sessionStorage.removeItem("name");
sessionStorage.removeItem("age");

sessionStorage.clear();
