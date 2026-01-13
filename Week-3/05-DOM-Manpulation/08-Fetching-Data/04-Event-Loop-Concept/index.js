/**
 * setTimeout & setInterval:
 * - setTimeout and setInterval are not part of the JS specification... 
 * - Most environments include them...like browsers and Node.js. 
 * - They are part of the Web APIs.
 * 
 * - Ex:
 *       setTimeout(() => {
 *          console.log('Hello');
 *       }, 1000);
*/

/**
 * Why JS can't have setTimeout?
 * - JS is single-threaded, synchronous language, so it cannot wait for the
 *   setTimeout to finish.
 * - setTimeout in the browser is a Web API.
 * 
 * When we get to Node, the setTimeout is still Web API?
 * - Maybe, but it's not part of the JS language.
 * - The setTimeout is given to us by the environment that means we are 
 *   running JS in. 
 * 
*/

/**
 * Code-01:
 * function houseOne() {
 *      console.log('Paper delivered to house one');
 * }
 * function houseTwo() {
 *      setTimeout(() => {
 *          console.log('Paper delivered to house two');
 *      }, 3000);
 * }
 * function houseThree() {
 *      console.log('Paper delivered to house three');
 * } 
 * 
 * houseOne();
 * houseTwo();
 * houseThree();
 * 
 * Output:
 * Paper delivered to house one
 * Paper delivered to house three
 * Paper delivered to house two
*/

/**
 * Code-02:
 * function houseOne() {
 *      console.log('Paper delivered to house one');
 * }
 * function houseTwo() {
 *      setTimeout(() => {
 *          console.log('Paper delivered to house two');
 *      }, 0);
 * }
 * function houseThree() {
 *      console.log('Paper delivered to house three');
 * } 
 * 
 * houseOne();
 * houseTwo();
 * houseThree();
 * 
 * Output:
 * Paper delivered to house one
 * Paper delivered to house three
 * Paper delivered to house two
 * 
 * Reason:- Event Loop
 * - setTimeout is a Web API, which means it has to be handed off to the
 *   browser which takes time, even though the delay is 0. 
*/

/**
 * Time for some data structures:
 * 1. Queue
 *    - Like a real queue, the first element which was added to the list,
 *      will be the first element out. 
 *    - This is called a FIFO (First In First Out) data structure.
 *    - Ex:
 *          let queue = [];
 *          queue.push('2');        => queue is now [2]
 *          queue.push('5');        => queue is now [2, 5]
 *          let i = queue.shift();  => queue is now [5]
 *          alert(i);               => displays 2
 * 2. Stack:
 *    - The first pancake made, is the last pancake served. This is called
 *      stack. 
 *    - The first element which was added to the list, will be the last
 *      one out. This is called a LIFO (Last In First Out) data structure.
 *    - Ex:
 *          let stack = [];
 *          stack.push('2');        => stack is now [2]
 *          stack.push('5');        => stack is now [2, 5]
 *          let i = stack.pop();   => stack is now [2]
 *          alert(i);               => displays 5
 * 
 * We are going to need both of these to understand the event loop.
*/

/**
 * JS is running in the browser, we get access to a few things:
 * 1. V8 Engine: 
 *    - Our JS is not something that the computer understands,
 *      so it has to be broken down into something that the computer can
 *      understand. So, V8 Engine comes with couple bits and pieces like
 *      Parse Code, Runnable Command, Garbage Collector, etc.
 *    - One of the pieces is the call stack.
 * 2. Window Runtime (Hosting Environment):
 *    - It gives us access to Web APIs.
 *    - It passes stuff to Libevent (Event Loop) which does all the heavy
 *      lifting for us. 
 *    - Libevent is the corner stone of the event loop in the browser. 
*/

/**
 * Event Loop: 
 * What happens when we run JS in the browser?
 * - We have something called Event Loop, which monitors the Callback Queue
 *   and Job Queue and decides what need to be pushed to the Call Stack.
 *   a. Call Stack    : Where synchronous code executes
 *   b. Web APIs      : Browser-provided APIs (like setTimeout)
 *   c. Callback Queue: Where asynchronous callbacks wait
 *   d. Job Queue     : For promises and microtasks
 * 
 * - Code:
 *   console.log('Paper delivered to house 1');
 *   setTimeout(() => {
 *      console.log('Paper delivered to house 2')
 *   }, 0);
 *   console.log('Paper delivered to house 3');
 * 
 * Execution Flow:
 * 1. Initial State:
 *    - Call Stack: main() function is pushed
 *    - Web APIs: Empty
 *    - Task Queue: Empty
 * 
 *       Console         Call Stack          Web APIs
 *   +-------------+   +--------------+   +-------------+
 *   |             |   |              |   |             |
 *   |             |   |              |   |             |
 *   |             |   |              |   |             |
 *   |             |   |              |   |             |
 *   |             |   | main()       |   |             |
 *   +-------------+   +--------------+   +-------------+
 * 
 *                     +-------------------------------+
 *                     |                               |
 *                     |                               |
 *                     +-------------------------------+
 *                        Task Queue (also, a job queue)
 * 
 * - Now, it's time to execute our JavaScript code, we know that JavaScript 
 *   is single-threaded, and we handle this single-threaded nature using
 *   something called the Call Stack.
 * - We place items on top of the stack, and since the stack follows LIFO
 *   (Last In First Out), when we run a program in the browser, there is
 *   always a main() function that initializes our JavaScript execution.
 *   When the code starts running, we have an event loop that comes through
 *   Libevent and runs continuously.
 *   [Loop: CallStack -> Web APIs -> Callback Queue]
 * 
 * 
 * 2. First console.log:
 *    - Call Stack: [main(), console.log('house1')]
 *    - Execution: 'house1' is logged
 *    - Call Stack: [main()]
 * 
 *       Console         Call Stack          Web APIs
 *   +-------------+   +--------------+   +-------------+
 *   |log('house1')|   |              |   |             |
 *   |             |   |              |   |             |
 *   |             |   |              |   |             |
 *   |             |   | log('house1')|   |             |
 *   |             |   | main()       |   |             |
 *   +-------------+   +--------------+   +-------------+
 * 
 *                     +-------------------------------+
 *                     |                               |
 *                     |                               |
 *                     +-------------------------------+
 *                        Task Queue (also, a job queue)
 * 
 * - If we examine the stack, main() (like a pancake) is building up the stack.
 *   This log('house1') is the last item in, so it will be the first out. Once our
 *   event loop executes, it will pop log('house1') off the stack, and then we will
 *   see that output in the console.
 *   
 * 
 * 3. setTimeout:
 *    - Call Stack: [main(), setTimeout()]
 *    - Web APIs: setTimeout starts (0ms delay)
 *    - Callback moves to Task Queue when timer completes
 * 
 *       Console         Call Stack          Web APIs
 *   +-------------+   +-------------+    +-------------+
 *   |log('house1')|   |              |   | setTimeout()|
 *   |             |   |              |   |             |
 *   |             |   |              |   |             |
 *   |             |   | setTimeout() |   |             |
 *   |             |   | main()       |   |             |
 *   +-------------+   +--------------+   +-------------+
 * 
 *                     +-------------------------------+
 *                     | setTimeout() - cb or promise  |
 *                     |                               |
 *                     +-------------------------------+
 *                        Task Queue (also, a job queue)
 * 
 * - We loop around again and return to the call stack, where
 *   setTimeout is the last item in, so it will be the first out.
 * - Can JavaScript execute it directly from the call stack?
 *   - No, because setTimeout is a Web API and not part of the JavaScript
 *     language. The event loop enables us to pass this setTimeout
 *     to the Web APIs, and it could take some time to run, which doesn't
 *     matter.
 * 
 * 
 * 4. Second console.log:
 *    - Call Stack: [main(), console.log('house3')]
 *    - Execution: 'house3' is logged
 *    - Call Stack: [main()]
 * 
 *       Console         Call Stack          Web APIs
 *   +-------------+   +-------------+    +-------------+
 *   |log('house1')|   |              |   |             |
 *   |log('house3')|   |              |   |             |
 *   |             |   |              |   |             |
 *   |             |   | log('house3')|   |             |
 *   |             |   | main()       |   |             |
 *   +-------------+   +--------------+   +-------------+
 * 
 *                     +-------------------------------+
 *                     | setTimeout() - cb or promise  |
 *                     |                               |
 *                     +-------------------------------+
 *                        Task Queue (also, a job queue)
 * 
 * - Now the event loop runs again and we have the last log('house3') on the
 *   call stack. 
 * - Since this log is the last item in, it will be the first out.
 * - Does it matter that our setTimeout has finished?
 *   - No, because when setTimeout finishes, it goes to the Task Queue,
 *     it doesn't get added to the stack immediately. When a Web API
 *     finishes, it doesn't get added to the stack immediately, it gets added
 *     to the Task Queue (Macro Queue).
 * - So, log('house3') will execute, and we will see in the
 *   console: house3. 
 * 
 * 5. Event Loop Processing:
 *    - Call Stack becomes empty
 *    - Event Loop checks Task Queue
 *    - setTimeout callback moves to Call Stack
 *    - 'house2' is logged
 * 
 *       Console         Call Stack          Web APIs
 *   +-------------+   +--------------+   +-------------+
 *   |log('house1')|   |              |   |             |
 *   |log('house3')|   |              |   |             |
 *   |             |   |              |   |             |
 *   |             |   |              |   |             |
 *   |             |   | cb - promise |   |             |
 *   +-------------+   +--------------+   +-------------+
 * 
 *                     +-------------------------------+
 *                     |                               |
 *                     |                               |
 *                     +-------------------------------+
 *                        Task Queue (also, a job queue)
 * - Now the event loop runs again and notices that there is nothing
 *   left on the call stack, and it notices that there is something in the
 *   Task Queue. 
 * - The promise that comes from the Web API is in a queue, and the queue
 *   follows FIFO (First In First Out). This means it will get added
 *   to the call stack once the call stack is empty.
 * - And since this is the last item in, it will be the first out from the Call Stack.
 * 
 *       Console         Call Stack          Web APIs
 *   +-------------+   +--------------+   +-------------+
 *   |log('house1')|   |              |   |             |
 *   |log('house3')|   |              |   |             |
 *   |log('house2')|   |              |   |             |
 *   |             |   |              |   |             |
 *   |             |   |              |   |             |
 *   +-------------+   +--------------+   +-------------+
 * 
 *                     +-------------------------------+
 *                     |                               |
 *                     |                               |
 *                     +-------------------------------+
 *                        Task Queue (also, a job queue)
 * 
 * Final Output:
 * Paper delivered to house 1
 * Paper delivered to house 3
 * Paper delivered to house 2
 * 
 * And this is why even with a 0-delay, it still console.log()s last.
 */



/**
 * Does JavaScript have access to the DOM natively (Built-in)?
 * - No, it doesn't have access to the DOM natively.
 * - JavaScript needed Web APIs to handle async and a bunch of stuff in
 *   the browser.
 * - JS is a language that can only do what the hosting environment allows.
 * - It we run JS in the browser, the browser becomes our hosting environment,
 *   and the browser gives us access to a bunch of APIs that we can use.
*/

/**
 * What do Servers need?
 * - They need:
 *   a. Network Access      : Internet, Request/Response
 *   b. Disk Storage Access : Harddrive/SSD
*/

/**
 * What if there was a hosting environment that allowed JS to have disk and
 * network access?
 * - Node.js is a JS runtime built on Chrome's V8 JS engine.
 * - The V8 engine doing all the heavy lifting for us.
*/

/**
 * Engine Vs Compiler:
 * - Compiler:
 *   a. Parses the code
 *   b. Compiles the code
 * - Engine:
 *   a. Parses the code
 *   b. Compiles the code
 *   c. Executes the code
 *   d. Handles the 
 *      - memory management
 *      - garbage collection
 *      - event loop
 *      - async operations
 *      - DOM operations
 *      - network operations
 *      - file system operations
 *      - database operations
 * 
 * And just like the browser's Web APIs, Node come with a bunch of stuff.
 * - Built in Modules (Libraries or Collections of functions)
 *   a. HTTP (network access)
 *   b. FS (file system access)
 * - Access to millions of packages on npm (Node Package Manager)
 *   (groupings of one or more custom modules)
 * - Not Web APIs, but C/C++ APIs (written in C/C++)
 *   a. Chrome V8 : JS Engine
 *   b. Async I/O: Libuv
 *   c. Event Loop: Libuv
 *   d. Node Bindings:
 *      - Socket
 *      - HTTP
 *      - File System
 *      - etc...
*/


/**
 * Install Node.js:
 * - Download from: https://nodejs.org/en/download/
 * - Install using the installer
 * - Verify the installation by running:
 *   node -v
 *   npm -v
*/




/**
 * Cohort-2 - Class-37: No Express! Fullstack App Just Node!
*/

