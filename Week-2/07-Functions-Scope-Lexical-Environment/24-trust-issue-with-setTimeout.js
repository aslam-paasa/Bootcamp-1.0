/**
 * setTimeout has trust issues:
 * => setTimeout with a delay of 5000ms doesn't always wait for 5 seconds.
 * => setTimeout doesn't guarantee that callback method will be called exactly
 *    after 5 seconds. It might also takes 6 seconds or maybe even 10 seconds.
 *    It all depends on the "callstack".
*/

console.log("Start");

setTimeout(function cb() {
    console.log("Callback");
}, 5000);

console.log("End");

/**
 * Q. Why this setTimeout has trust issues?
 * => When we run JS Code, Global Execution Context (GEC) is created and that is
 *    pushed inside the callstack.
 * => Now the code will run line-by-line :
 *    1. First it will print "Start" in the console.
 *    2. Now the code moves onto setTimeout() function line. When we see the 
 *       setTimeout it actually registers this callback method "cb()" into Web API's
 *       environment and it also starts a timer of 5000ms. Now the function() is waiting
 *       in the Web API to finish the timer. 
 *    3. But JS doesn't wait for anything. It just registers this setTimeout and moves
 *       to the next line and now "end" is printed in the console.
 * 
 * => Suppose we had 1 million line of code after this "End" which takes a lot of time
 *    to run (10sec). In that case, the GEC will still be busy executing these millions
 *    of lines of code while the timer is running. So, this GEC will wait for 10sec
 *    and execute the lines.
 * => But our setTimeout() timer was running for 5 seconds. While this callstack/thread
 *    is busy executing millions of lines of code, this timer has already expired long
 *    back and callback function "cb()" is already pushed inside the "callback queue".
 *    And now "event loop" is constantly checking whether the callstack (GEC) is 
 *    empty or not. If the callstack is empty then only it can take this callback 
 *    queue method i.e. "cb()" and pushed inside the callstack. And that's how event
 *    loop works.
*/



/**
 *    Call Stack                                             Web APIs
 *    |      |                                          +------------------------+
 *    |      |                                          | * setTimeout()   5000ms|
 *    |      |                                          | * DOM APIs             |
 *    |      |                                          | * fetch()              |
 *    |      |                                          | * console              |
 *    | GEC  |                                          +------------------------+
 *    +------+                                          | cb() => 5000ms         |
 *       ^                                              +------------------------+
 *       |                                                 |
 *       +---------[Event Loop]<-----Callback Queue<-------+
 *                                   +------------+
 *                                   | cb |       |
 *                                   +------------+ 
 * 
 * => But in this case GEC doesn't move out before 10 sec, and this setTimeout()
 *    5 sec also expires. "cb()" is waiting in "callback queue" and "GEC" is also
 *    running and doing its own job. So, now what will happen? When will this
 *    "cb()" callback function will get a chance to execute?
 * => After 10 seconds!. Though setTimeout() was for 5sec it will for this GEC to
 *    move out of the callstack. This is also known as "Concurrency Model" in JavaScript.
*/

/**
 *    Call Stack                                             Web APIs
 *    |      |                                          +------------------------+
 *    |      |                                          | * setTimeout()   5000ms|
 *    |      |                                          | * DOM APIs             |
 *    |      |                                          | * fetch()              |
 *    |      |                                          | * console              |
 *    |  cb  |                                          +------------------------+
 *    +------+                                          |                        |
 *       ^                                              +------------------------+
 *       |                                                 |
 *       +---------[Event Loop]<-----Callback Queue<-------+
 *                                   +------------+
 *                                   |            |
 *                                   +------------+ 
 * 
 * => Once GEC will move out from CallStack, this event loop will pick up the "cb()"
 *    from callback queue and put inside the callstack and the function will get the
 *    chance to execute.
 * 
 * => Output:
 *       Start
 *       End
 *       Callback
 * 
 * Note : JS is single threaded, so never block the main thread. Because if GEC
 *        is not emtpy, it cannot process any other event.
*/