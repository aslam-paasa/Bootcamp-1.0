/**
 * Summary of Event Loop Flow:
 * a. Call Stack      : Executes synchronous code
 * b. Web API         : Handles asynchronous tasks like setTimeout, fetch, etc
 * c. Callback Queue  : Holds async callbacks (macrotasks), waiting for execution
 * d. Event Loop      : Continuously checks and move tasks from queues to the call stack 
 * e. Microtask Queue : Higher priority than macrotasks, cleared first
 * f. Macrotask Queue : Lower priority, processed after microtasks
 * 
 * Note: Microtasks are executed before macrotasks.
*/

/**
 * Visual Flow of Event Loop:
 * Start -> Call Stack -> Web API -> Callback Queue -> Event Loop -> Call Stack
*/