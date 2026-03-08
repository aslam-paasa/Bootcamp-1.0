/**
 * COMMONJS MODULES — require and exports in practice
 * 
 * 1. WHAT THIS FILE SHOWS
 *    ────────────────────
 *    > How to consume a module using require() with named destructuring.
 *    > The imported names must exactly match what utills.js exports.
 *
 * 2. KEY CONCEPTS & KEYWORDS EXPLAINED
 *    ┌─────────────────────────────────────────────────────────────────┐
 *    │ 1. require() with destructuring                                 │
 *    ├─────────────────────────────────────────────────────────────────┤
 *    │ What:  require() returns the module's exports object.           │
 *    │        Destructuring pulls out only the properties you need.    │
 *    │                                                                 │
 *    │ Code template:                                                  │
 *    │   // Import everything                                          │
 *    │   const utills = require("./utills");                           │
 *    │   utills.sayHi("Alice");                                        │
 *    │                                                                 │
 *    │   // Import only what you need (destructuring)                  │
 *    │   const { sayHi, sayBye } = require("./utills");                │
 *    │   sayHi("Alice");                                               │
 *    └─────────────────────────────────────────────────────────────────┘
 */

const { sayHi, sayBye } = require("./utils");

console.log(sayHi("Emmanuel")); // Hi Emmanuel
console.log(sayBye("Agnes"));   // Goodbye Agnes