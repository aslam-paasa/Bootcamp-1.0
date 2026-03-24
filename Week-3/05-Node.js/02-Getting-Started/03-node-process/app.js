/**
 * ======================================================================
 * NODE.JS PROCESS OBJECT — env, cwd, chdir, exit, exports
 * ======================================================================
 *
 * WHAT IS THE process OBJECT?
 * ───────────────────────────
 * A global object (no import needed) that gives you control over the
 * running Node process. Use it to read environment variables, inspect
 * the working directory, handle signals, and exit gracefully.
 *
 * ======================================================================
 * KEY CONCEPTS & KEYWORDS EXPLAINED
 * ======================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 1. process.env                                                  │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ What:  An object containing all environment variables set on    │
 * │        the system. Used to configure behaviour per environment  │
 * │        (development / staging / production) without code changes.│
 * │                                                                 │
 * │ All values are STRINGS — convert when you need a number/bool.   │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const env = process.env.NODE_ENV || "development";            │
 * │   const port = Number(process.env.PORT) || 3000;                │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 2. process.exit()                                               │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ What:  Immediately terminates the Node process.                 │
 * │   exit(0)  → success                                            │
 * │   exit(1)  → error                                              │
 * │                                                                 │
 * │ Use it to guard scripts that should only run in certain envs.   │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   if (process.env.NODE_ENV !== "production") {                  │
 * │     console.error("Only runs in production. Aborting.");        │
 * │     process.exit(1);                                            │
 * │   }                                                             │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 3. process.cwd() vs __dirname                                   │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ process.cwd() → where the node command was run FROM             │
 * │ __dirname     → where this file physically lives                │
 * │                                                                 │
 * │ They are different if you run node from a parent folder:        │
 * │   cd /home/user                                                 │
 * │   node projects/app/index.js                                    │
 * │                                                                 │
 * │   process.cwd()  →  /home/user                                  │
 * │   __dirname      →  /home/user/projects/app                     │
 * │                                                                 │
 * │ Always use __dirname to build reliable file paths:              │
 * │   path.join(__dirname, "data", "users.json")                    │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 4. process.chdir() + try/catch                                  │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ What:  Changes the current working directory at runtime.        │
 * │        Always wrap in try/catch — the path may not exist on     │
 * │        the current OS (e.g. /tmp does not exist on Windows).    │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   try {                                                         │
 * │     process.chdir("/tmp");                                      │
 * │     console.log("Now in:", process.cwd());                      │
 * │   } catch (err) {                                               │
 * │     console.error("chdir failed:", err.message);                │
 * │   }                                                             │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 5. exports vs module.exports                                    │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ What:  Every Node file has a module.exports object. The exports │
 * │        shorthand is a reference to that same object.            │
 * │                                                                 │
 * │   exports.x = value        → adds a property (safe)            │
 * │   exports = { x: value }   → replaces the reference (broken)   │
 * │   module.exports = value   → replaces the whole object (safe)   │
 * │                                                                 │
 * │ Rule: use exports.x to add properties, module.exports to        │
 * │       replace the entire export.                                │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   exports.sandwich = "Ham and Cheese";  // add property         │
 * │   module.exports = { sandwich, drink }; // replace entirely     │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 6. Useful process properties                                    │
 * ├─────────────────────────────────────────────────────────────────┤
 * │   process.version      → Node version string ("v20.0.0")        │
 * │   process.platform     → OS ("linux" | "darwin" | "win32")      │
 * │   process.pid          → current process ID                     │
 * │   process.argv         → CLI arguments array                    │
 * │   process.memoryUsage()→ heap and RSS stats                     │
 * │   process.uptime()     → seconds since process started          │
 * │                                                                 │
 * │   process.on("SIGINT", handler)  → catch Ctrl+C for cleanup     │
 * │   process.on("exit", handler)    → runs just before exit        │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ======================================================================
 * COMMON MISTAKES
 * ======================================================================
 *
 *   // Using cwd() for file paths — breaks when run from another folder
 *   fs.readFileSync("config.json");             // WRONG
 *   fs.readFileSync(__dirname + "/config.json"); // RIGHT
 *
 *   // Overwriting exports — breaks the module.exports reference
 *   exports = { sandwich: "Ham" };              // WRONG
 *   exports.sandwich = "Ham";                   // RIGHT
 *
 *   // Missing try/catch on chdir — crashes on wrong OS
 *   process.chdir("/tmp");                      // WRONG
 *   try { process.chdir("/tmp") } catch(e) {}   // RIGHT
 *
 * ======================================================================
 */

const os = require("os");
const { sayHi } = require("./me");

// Read APP_ENV from environment, fall back to "development" if not set
const appEnv = process.env.APP_ENV || "development";
// console.log(`App is running in: ${appEnv}`);

// Guard: exit immediately if not in production
// if (process.env.NODE_ENV !== "production") {
//   console.error("This script only runs in production.");
//   process.exit(1);
// }

// Log where node was launched from
console.log(`Current working directory: ${process.cwd()}`);

// Change working directory — wrapped in try/catch for cross-OS safety
try {
  process.chdir("/tmp");
  console.log(`New working directory: ${process.cwd()}`);
} catch (error) {
  console.error(`chdir failed: ${error.message}`);
}

// Named exports — adds properties to the shared module.exports object
const sandwich = "Ham and Cheese";
const drink    = "Lemonade";
exports.sandwich = sandwich;

// setInterval — runs every 1 second, stops after 5 ticks
// let count = 0;
// const intervalId = setInterval(() => {
//   console.log("Hello world");
//   count++;
//   if (count === 5) clearInterval(intervalId);
// }, 1000);

console.log(sayHi(3));