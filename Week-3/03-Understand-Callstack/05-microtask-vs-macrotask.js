/**
 * Microtask vs Macrotask Queue:
*/

/**
 * Priority Order:
 * 1. First Priority  -  Microtask Queue - Promises, process.nextTick()
 * 2. Second Priority -  Macrotask Queue - setTimeout, setInterval, fetch(), Events
*/

/**
 * Example of Microtask Queue & Macrotask Queue:
 * - Start
 * - End
 * - Promise Resolved (Microtask)
 * - setTimeout       (Macrotask)
 * 
 * Note: Microtasks are always executed before Macrotasks.
*/

console.log("Start");

setTimeout(() => {
    console.log("setTimeout");
}, 0);

Promise.resolve().then(() => {
    console.log("Promise Resolved");
});

console.log("End");