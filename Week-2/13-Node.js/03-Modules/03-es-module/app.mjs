/**
 * ES MODULES — import, export, .mjs, CommonJS vs ESM
 *
 * 1. WHAT ARE ES MODULES?
 *    ────────────────────
 *    > The modern, standardised JavaScript module system (ES2015+).
 *    > Works in both browsers and Node.js — unlike CommonJS which is
 *      Node-only. 
 *    > Use import/export instead of require/module.exports.
 *
 * 2. FILE EXTENSION RULES
 *    ────────────────────
 *      .mjs  → always ES Modules
 *      .cjs  → always CommonJS
 *      .js   → depends on package.json "type" field:
 *                "type": "module"    → treated as ES Modules
 *                (no "type")         → treated as CommonJS (default)
 *   
 * 3. KEY CONCEPTS & KEYWORDS EXPLAINED
 *
 *    ┌─────────────────────────────────────────────────────────────────┐
 *    │ 1. Named exports + named imports                                │
 *    ├─────────────────────────────────────────────────────────────────┤
 *    │ What:  Each exported value keeps its name. The import must use  │
 *    │        the exact same name — no aliases unless you add `as`.    │
 *    │                                                                 │
 *    │ Code template:                                                  │
 *    │   // utils.mjs                                                  │
 *    │   export function add(a, b)      { return a + b; }              │
 *    │   export function subtract(a, b) { return a - b; }              │
 *    │                                                                 │
 *    │   // app.mjs                                                    │
 *    │   import { add, subtract } from "./utils.mjs"; // names match   │
 *    │   import { add as sum } from "./utils.mjs";    // rename with as│
 *    └─────────────────────────────────────────────────────────────────┘
 *
 *    ┌─────────────────────────────────────────────────────────────────┐
 *    │ 2. Default export + default import                              │
 *    ├─────────────────────────────────────────────────────────────────┤
 *    │ What:  One special export per file. Can be imported with any    │
 *    │        name — no curly braces needed.                           │
 *    │                                                                 │
 *    │ Code template:                                                  │
 *    │   // user.mjs                                                   │
 *    │   export default class User { constructor(name) {...} }         │
 *    │                                                                 │
 *    │   // app.mjs                                                    │
 *    │   import User from "./user.mjs";      // name is your choice    │
 *    │   import Person from "./user.mjs";    // also works             │
 *    └─────────────────────────────────────────────────────────────────┘
 *
 *    ┌─────────────────────────────────────────────────────────────────┐
 *    │ 3. Mixed export (default + named)                               │
 *    ├─────────────────────────────────────────────────────────────────┤
 *    │ Code template:                                                  │
 *    │   // utils.mjs                                                  │
 *    │   export default function greet(name) { return `Hi ${name}`; }  │
 *    │   export function add(a, b)      { return a + b; }              │
 *    │   export function subtract(a, b) { return a - b; }              │
 *    │                                                                 │
 *    │   // app.mjs                                                    │
 *    │   import greet, { add, subtract } from "./utils.mjs";           │
 *    │   //      ↑ default    ↑ named exports                          │
 *    └─────────────────────────────────────────────────────────────────┘
 *   
 *    ┌─────────────────────────────────────────────────────────────────┐
 *    │ 4. Namespace import (import *)                                  │
 *    ├─────────────────────────────────────────────────────────────────┤
 *    │ What:  Imports everything as a single object. Useful when you   │
 *    │        want all exports available under one namespace.          │
 *    │        Default export is accessible as utils.default.           │
 *    │                                                                 │
 *    │ Code template:                                                  │
 *    │   import * as utils from "./utils.mjs";                         │
 *    │   utils.add(10, 5);          // named export                    │
 *    │   utils.default("Mohammad"); // default export                  │
 *    └─────────────────────────────────────────────────────────────────┘
 *
 *    ┌─────────────────────────────────────────────────────────────────┐
 *    │ 5. ESM vs CommonJS — key differences                            │
 *    ├─────────────────────────────────────────────────────────────────┤
 *    │                                                                 │
 *    │  ┌────────────────────┬───────────────┬────────────────────┐    │
 *    │  │                    │ CommonJS      │ ES Modules         │    │
 *    │  ├────────────────────┼───────────────┼────────────────────┤    │
 *    │  │ Syntax             │ require()     │ import/export      │    │
 *    │  │ Loading            │ Synchronous   │ Async (parallel)   │    │
 *    │  │ Where in file      │ Anywhere      │ Top level only     │    │
 *    │  │ Dynamic paths      │ Yes           │ No (use import())  │    │
 *    │  │ Browser support    │ No            │ Yes                │    │
 *    │  │ __dirname          │ Available     │ Not available*     │    │
 *    │  └────────────────────┴───────────────┴────────────────────┘    │
 *    │                                                                 │
 *    │  * In ESM use: import.meta.url to derive __dirname equivalent   │
 *    └─────────────────────────────────────────────────────────────────┘
*/

/**
 * COMMON MISTAKES
 * 1. Using import in a .js file without "type":"module" → SyntaxError
 *    Fix: rename to .mjs or add "type":"module" to package.json
 *
 * 2. Using require() inside an ES Module → ReferenceError
 *    const fs = require("fs");    // WRONG in .mjs
 *    import fs from "fs";         // RIGHT
 *
 * 3. Wrong syntax for default export
 *    import { greet } from "./utils.mjs";  // WRONG if greet is default
 *    import greet from "./utils.mjs";      // RIGHT
 *
 * 4. Wrong syntax for named export
 *    import add from "./utils.mjs";        // WRONG if add is named
 *    import { add } from "./utils.mjs";    // RIGHT
 */

import * as utill from "./utils.mjs";

console.log(utill.add(10, 50));       // 60
console.log(utill.subtract(10, 50));  // -40
