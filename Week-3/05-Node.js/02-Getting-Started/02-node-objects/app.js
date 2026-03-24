/**
 * ======================================================================
 * NODE.JS GLOBALS — global, __filename, __dirname, TIMERS
 * ======================================================================
 *
 * WHAT ARE GLOBALS?
 * ─────────────────
 * Variables and functions that Node.js makes available in every file
 * automatically — no import needed.
 *
 *   global       → shared object accessible across all files
 *   __filename   → full path of the current file
 *   __dirname    → full path of the current folder
 *   setTimeout   → run a function once after a delay
 *   setInterval  → run a function repeatedly on an interval
 *
 * ======================================================================
 * KEY CONCEPTS & KEYWORDS EXPLAINED
 * ======================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 1. global object                                                │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ What:  The top-level shared object in Node.js (equivalent to    │
 * │        window in the browser). Any property set on global is    │
 * │        readable in every file without importing.                │
 * │                                                                 │
 * │ Use sparingly — uncontrolled global state causes hard-to-track  │
 * │ bugs when multiple files overwrite the same property.           │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   global.config = { appName: "MyApp", version: "1.0.0" };      │
 * │                                                                 │
 * │   // In any other file:                                         │
 * │   console.log(global.config.appName); // "MyApp"                │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 2. __filename and __dirname                                     │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ What:  Node injects these into every file via the module        │
 * │        wrapper — the function Node silently wraps your code in: │
 * │                                                                 │
 * │   (function(exports, require, module, __filename, __dirname) {  │
 * │       // your code runs here                                    │
 * │   });                                                           │
 * │                                                                 │
 * │   __filename → full path of this file                           │
 * │                e.g. /home/user/project/index.js                 │
 * │   __dirname  → folder containing this file                      │
 * │                e.g. /home/user/project                          │
 * │                                                                 │
 * │ Most useful for building reliable file paths:                   │
 * │   const filePath = path.join(__dirname, "data", "users.json");  │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 3. setTimeout                                                   │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ What:  Schedules a function to run ONCE after a delay (in ms).  │
 * │        Node does NOT pause — it registers the timer and         │
 * │        immediately continues executing the next line.           │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   setTimeout(() => {                                            │
 * │     console.log("Runs after 5 seconds");                        │
 * │   }, 5000);                                                     │
 * │   console.log("Runs immediately"); // prints first              │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 4. setInterval + clearInterval                                  │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ What:  Runs a function repeatedly every N milliseconds until    │
 * │        clearInterval() is called with the returned ID.          │
 * │                                                                 │
 * │ Always store the ID and clear it when done — an interval with   │
 * │ no clearInterval() runs forever and leaks memory.               │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   let count = 0;                                                │
 * │   const id = setInterval(() => {                                │
 * │     count++;                                                    │
 * │     console.log("tick", count);                                 │
 * │     if (count === 5) clearInterval(id); // stop after 5 ticks  │
 * │   }, 1000);                                                     │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 5. The Event Loop (why timers don't block)                      │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ What:  Node runs on a single thread. Instead of waiting, it     │
 * │        registers async work (timers, I/O) and immediately moves │
 * │        to the next line. When the timer fires, Node comes back  │
 * │        and runs the callback. This is the event loop.           │
 * │                                                                 │
 * │   setTimeout(() => console.log("B"), 0);                        │
 * │   console.log("A");                                             │
 * │   // Output: A then B                                           │
 * │   // "A" runs first even with 0ms delay — sync code always runs │
 * │   // before any timer callbacks.                                │
 * │                                                                 │
 * │ Never block the event loop with infinite loops or heavy sync    │
 * │ work — it prevents ALL timers and callbacks from firing.        │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ======================================================================
 * COMMON MISTAKES
 * ======================================================================
 *
 *   // Forgetting clearInterval → runs forever, leaks memory
 *   setInterval(() => console.log("forever..."), 1000);
 *
 *   // Blocking the event loop → timer never fires
 *   setTimeout(() => console.log("never runs"), 1000);
 *   while (true) {} // blocks the thread
 *
 *   // Overusing global → hard-to-trace bugs
 *   global.user = "admin";   // File A sets it
 *   global.user = "hacker";  // File B overwrites it
 *
 * ======================================================================
 */

// Attach a property to the global object — accessible in any file
global.myGlobal = "Hello from the global object";

// __filename: full path to this file
// __dirname:  full path to the folder containing this file
console.log(__filename);
// console.log(__dirname);

// setInterval — runs every 1 second, stops after 5 ticks
// let count = 0;
// const intervalId = setInterval(() => {
//   console.log("Hello world");
//   count++;
//   if (count === 5) clearInterval(intervalId);
// }, 1000);

// setTimeout — runs once after 5 seconds
setTimeout(() => {
  console.log("This will be delayed by 5s");
}, 5000);