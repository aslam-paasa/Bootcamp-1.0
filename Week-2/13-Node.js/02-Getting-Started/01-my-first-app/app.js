/**
 * ======================================================================
 * YOUR FIRST NODE.JS PROGRAM
 * ======================================================================
 *
 * WHAT IS NODE.JS?
 * ────────────────
 * JavaScript normally runs inside a browser (Chrome, Firefox).
 * Node.js lets you run JavaScript directly on your computer —
 * no browser needed. This is what makes backend development possible.
 *
 * WHAT IS THIS FILE?
 * ──────────────────
 * A single line that proves your Node.js setup works and introduces
 * the most fundamental tool in JavaScript: console.
 *
 * ======================================================================
 * HOW TO RUN IT
 * ======================================================================
 *
 *   node index.js
 *
 *   Output:
 *     Hello world
 *
 * ======================================================================
 * WHAT DOES console.log() DO?
 * ======================================================================
 *
 *   console        → Built-in Node.js object for printing output.
 *                    No import needed — Node provides it automatically.
 *
 *   .log()         → Prints a message to the terminal.
 *                    Other methods:
 *                      console.error("msg")  → prints in red
 *                      console.warn("msg")   → prints in yellow
 *                      console.table(obj)    → prints as a table
 *
 *   "Hello world"  → The message to print. Quotes tell Node this
 *                    is text (a string), not code.
 *
 * ======================================================================
 * COMMON ERRORS
 * ======================================================================
 *
 *   node: command not found    → Node is not installed. Get it at nodejs.org
 *   Cannot find module         → Wrong folder. Run: cd 01-my-first-app
 *   SyntaxError                → Typo in your code. Check quotes and spelling:
 *
 *     console.log(Hello world)    ← WRONG: missing quotes
 *     consol.log("Hello world")   ← WRONG: misspelled console
 *     console.log("Hello world")  ← CORRECT
 *
 * ======================================================================
 * VARIATIONS TO TRY
 * ======================================================================
 *
 *   console.log("Hello", "world");     // multiple arguments
 *   console.log(42);                   // numbers need no quotes
 *   console.log(10 + 5);               // Node evaluates expressions first
 *   console.log("Sum is:", 10 + 5);    // mix of text and numbers
 *
 * ======================================================================
 * WHERE THIS LEADS
 * ======================================================================
 *
 *   console.log("Hello world")   ← YOU ARE HERE
 *          ↓
 *   Reading and writing files
 *          ↓
 *   Creating web servers
 *          ↓
 *   Connecting to databases
 *          ↓
 *   Building REST APIs
 *
 * ======================================================================
 */

console.log("Hello world");