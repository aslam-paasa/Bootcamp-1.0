/**
 * NODE.JS MODULES — require, exports, module.exports, caching
*/

/**
 * WHAT IS A MODULE?
 * ─────────────────
 * > Modules are reusable chunks of code.
 * > Every .js file in Node is automatically a module. 
 * > Each module has its own private scope — variables do not leak into 
 *   other files.
 * > Node wraps every file in a function before running it:
 *
 *   (function(exports, require, module, __filename, __dirname) {
 *       // your code runs here
 *   });
 *
 * > This is why exports, require, __filename, and __dirname are available
 *   in every file without importing them.
*/

/**
 * THREE TYPES OF MODULES:
 * 1. Core (built-in)    - require("fs")        → ships with Node
 * 2. Local (your files) - require("./utils")   → starts with ./ or ../
 * 3. Third-party (npm)  - require("express")   → installed via npm
*/

/**
 * KEY CONCEPTS & KEYWORDS EXPLAINED:
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 1. require()                                                    │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ What:  Loads a module and returns its exports. Node resolves    │
 * │        the path in this order:                                  │
 * │                                                                 │
 * │   require("fs")        → core module, returned immediately      │
 * │   require("./utils")   → looks for utils.js → utils/index.js    │
 * │   require("express")   → searches node_modules up the tree      │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const fs      = require("fs");          // core               │
 * │   const utils   = require("./utils");     // local              │
 * │   const express = require("express");     // third-party        │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 2. exports vs module.exports                                    │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ What:  exports is a shorthand reference to module.exports.      │
 * │        They point to the same object — until you reassign one.  │
 * │                                                                 │
 * │   exports.x = value       → safe: adds a property               │
 * │   exports = { x: value }  → BROKEN: severs the reference        │
 * │   module.exports = value  → safe: replaces the whole export     │
 * │                                                                 │
 * │ Rule: use exports.x to add properties, module.exports to        │
 * │       replace the entire exported value.                        │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   // Multiple named exports                                     │
 * │   exports.add      = (a, b) => a + b;                           │
 * │   exports.subtract = (a, b) => a - b;                           │
 * │                                                                 │
 * │   // Single default export                                      │
 * │   module.exports = class User { ... };                          │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 3. Module caching                                               │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ What:  Node loads each module ONCE and caches the result.       │
 * │        Every subsequent require() of the same file returns the  │
 * │        cached object — the module code does not run again.      │
 * │                                                                 │
 * │   const a1 = require("./math");                                 │
 * │   const a2 = require("./math");                                 │
 * │   console.log(a1 === a2); // true — same cached object          │
 * │                                                                 │
 * │ Practical effect: top-level side effects (DB connections, logs) │
 * │ in a module run only once no matter how many files require it.  │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 4. Common module patterns                                       │
 * ├─────────────────────────────────────────────────────────────────┤
 * │                                                                 │
 * │   // Utility — multiple named functions                         │
 * │   exports.add      = (a, b) => a + b;                           │
 * │   exports.subtract = (a, b) => a - b;                           │
 * │                                                                 │
 * │   // Class — single default export                              │
 * │   class User { constructor(name) { this.name = name; } }        │
 * │   module.exports = User;                                        │
 * │                                                                 │
 * │   // Config — plain object                                      │
 * │   module.exports = {                                            │
 * │     port: process.env.PORT || 3000,                             │
 * │     env:  process.env.NODE_ENV || "development",                │
 * │   };                                                            │
 * │                                                                 │
 * │   // Function — single callable                                 │
 * │   module.exports = (name) => `Hello, ${name}!`;                 │
 * └─────────────────────────────────────────────────────────────────┘
*/

/**
 * COMMON MISTAKES
 *   1. Missing ./ — looks in node_modules instead of current folder
 *      - require("utils");    // WRONG
 *      - require("./utils");  // RIGHT
 *
 *   2. Reassigning exports — breaks module.exports reference
 *      - exports = { add: fn };         // WRONG
 *      - exports.add = fn;              // RIGHT
 *      - module.exports = { add: fn };  // RIGHT
 *
 *   3. Circular dependencies — a.js requires b.js requires a.js
 *      Solution: extract shared logic into a third file
 */