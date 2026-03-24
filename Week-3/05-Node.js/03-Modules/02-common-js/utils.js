/**
 * COMMONJS EXPORT PATTERNS — four ways to export
 *
 * 1. WHAT THIS FILE SHOWS
 *    ────────────────────
 *    > The four CommonJS export patterns, each building on the previous.
 *    > Only the last pattern (exports shorthand) is active — the rest
 *      are commented out for reference.
 *
 * 2. KEY CONCEPTS & KEYWORDS EXPLAINED
 *
 *    ┌─────────────────────────────────────────────────────────────────┐
 *    │ 1. Single function export  (module.exports = fn)                │
 *    ├─────────────────────────────────────────────────────────────────┤
 *    │ What:  Replaces the entire exports object with one function.    │
 *    │        The importer receives the function directly.             │
 *    │                                                                 │
 *    │   // utills.js                                                  │
 *    │   const greet = (name) => `Hello ${name}`;                      │
 *    │   module.exports = greet;                                       │
 *    │                                                                 │
 *    │   // app.js                                                     │
 *    │   const greet = require("./utills");                            │
 *    │   greet("Alice"); // "Hello Alice"                              │
 *    └─────────────────────────────────────────────────────────────────┘
 *
 *    ┌─────────────────────────────────────────────────────────────────┐
 *    │ 2. Object export  (module.exports = { ... })                    │
 *    ├─────────────────────────────────────────────────────────────────┤
 *    │ What:  Replaces the exports object with a plain object literal. │
 *    │        All properties are available on the returned object.     │
 *    │                                                                 │
 *    │   // utills.js                                                  │
 *    │   module.exports = { add, subtract };                           │
 *    │                                                                 │
 *    │   // app.js                                                     │
 *    │   const { add, subtract } = require("./utills");                │
 *    └─────────────────────────────────────────────────────────────────┘
 *
 *    ┌─────────────────────────────────────────────────────────────────┐
 *    │ 3. Named function export  (module.exports.name = fn)            │
 *    ├─────────────────────────────────────────────────────────────────┤
 *    │ What:  Adds individual properties to module.exports one by one. │
 *    │        Functionally identical to the exports shorthand below.   │
 *    │                                                                 │
 *    │   module.exports.sayHi  = (name) => `Hi ${name}`;               │
 *    │   module.exports.sayBye = (name) => `Goodbye ${name}`;          │
 *    └─────────────────────────────────────────────────────────────────┘
 *
 *    ┌─────────────────────────────────────────────────────────────────┐
 *    │ 4. exports shorthand  (exports.name = fn)  ← ACTIVE BELOW       │
 *    ├─────────────────────────────────────────────────────────────────┤
 *    │ What:  exports is a reference to module.exports. Adding         │
 *    │        properties to it is the shortest way to named-export.    │
 *    │                                                                 │
 *    │ Warning: never reassign exports itself — that severs the        │
 *    │          reference and module.exports stays empty.              │
 *    │                                                                 │
 *    │   exports.sayHi  = (name) => `Hi ${name}`;  // RIGHT            │
 *    │   exports = { sayHi };                       // WRONG           │
 *    └─────────────────────────────────────────────────────────────────┘
*/

/**
 * ALL FOUR PATTERNS — SIDE BY SIDE
 * 
 * 1. Single function
 *    module.exports = (name) => `Hello ${name}`;
 *
 * 2. Object
 *    module.exports = { add, subtract };
 *
 * 3. Named via module.exports
 *    module.exports.sayHi  = (name) => `Hi ${name}`;
 *    module.exports.sayBye = (name) => `Goodbye ${name}`;
 *
 * 4. Named via exports shorthand (same result as 3)
 *    exports.sayHi  = (name) => `Hi ${name}`;
 *    exports.sayBye = (name) => `Goodbye ${name}`;
 */


/* Pattern 1: Single function export                        */
// const greet = (name) => `Hello ${name}`;
// module.exports = greet;


/* Pattern 2: Object export                                 */
function add(a, b)      { return a + b; }
function subtract(a, b) { return a - b; }
// module.exports = { add, subtract };


/* Pattern 3: Named via module.exports                      */
// module.exports.sayHi  = (name) => `Hi ${name}`;
// module.exports.sayBye = (name) => `Goodbye ${name}`;


/* Pattern 4: Named via exports shorthand (active)          */
exports.sayHi  = (name) => `Hi ${name}`;
exports.sayBye = (name) => `Goodbye ${name}`;