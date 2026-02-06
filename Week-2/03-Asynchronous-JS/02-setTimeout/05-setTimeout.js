setTimeout(() => console.log("A"), 1000);
setTimeout(() => console.log("B"), 400);
setTimeout(() => console.log("C"), 1300);

/**
 * Output:
 * 1. B
 * 2. A
 * 3. C
 * 
 * 
 * Callstack: A
 * WebAPIs: Send A, 1000ms
 * JobQueue: Nope
 * 
 * Callstack: B
 * WebAPIs: Send B, 400ms
 * JobQueue: Nope
 * 
 * Callstack: C
 * WebAPIs: Send C, 1300ms
 * JobQueue: Nope
 * 
 * 399ms
 * Callstack: Nothing
 * Job Queue: Nothing
 * 
 * Three timers are running in the webAPIs
 * => 400ms
 * => B is done
 * => Job Queue: B
 * => Callstack: B -> Executed
 * 
 * 999ms
 * Callstack: Nothing
 * Job Queue: Nothing
 * 
 * 1000ms
 * => A is done
 * => Job Queue: A
 * => Callstack: A -> Executed
 * 
 * 1299ms
 * Callstack: Nothing
 * Job Queue: Nothing
 * 
 * 1300ms
 * => C is done
 * => Job Queue: C
 * => Callstack: C -> Executed
 * 
 * WebAPIs: No   
 * Console: B A C
*/