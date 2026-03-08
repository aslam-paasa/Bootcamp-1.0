/**
 * JS on Server:
 * - NodeJS comes with a philosophy that NodeJS can run outside the
 *   browser. And now JS can run outside the browser, primarily on
 *   server.
 * - A server means nothing but a remote computer working remotely.
 * - JS Engine is not an actual engine but a piece of code written in
 *   C++. So, if we are saying to run JS we need JS Engine, means to
 *   run JS Language we have to execute some C++ piece of code. 
 * - NodeJS is a C++ application with V8 embedded in it.
 * 
 * ECMAScript: 
 * - Standard/Rules
 * - JS Engines follows ECMAScript standards.
 *   a. V8 - Google
 *   b. Spider Monkey - Firefox
 *   c. Chakra - MS, IE
 * - These JS Engines are build differently but the all follow the
 *   same standard/rules. So, every browser will give same answer.
 * - And because of the ECMAScript standards, V8 engine cannot go
 *   beyond the standard. That is why NodeJS gives some extra super
 *   power on top of V8.
 * - We can assume these super powers as APIs on server. For example,
 *   suppose we want to connect to database but V8 cannot connect to
 *   database because ECMAScript doesn't provide that standard. The
 *   only job of V8 is to execute Core JS ECMAScript. So, for that
 *   we need some super power and those super powers come in for of
 *   APIs, and that makes the NodeJS powerful.
 * - So, NodeJS is a C++ program with some superpower & V8 running
 *   engine, and this is known as JS Runtime. And now this NodeJS is
 *   executed on the server.
 * 
 *    NodeJS(C++) Runtime Engine
 *   +------------------------------------+
 *   |                                    |
 *   |  +--------------+ +-------------+  |
 *   |  | V8 JS Engine | | Super Power |  |
 *   |  +--------------+ +-------------+  |
 *   |                                    |
 *   +------------------------------------+
*/

/**
 * What does V8 do, and why it is a C++ code?
 * - Computer understands binary code. And on top of this binary code,
 *   there is something called as Assembly Code which is written in
 *   Assembly Language. And on top of Assembly Code, Machine Code is
 *   written. And on top of this Machine Code, there is High Level 
 *   Languages i.e. C++, Java, etc.
 * - Then the JS code converted to C++(JS Engine), which then converts
 *   this High Level Language to Machine Level Language.
*/

/**
 * Q. Once we install NodeJS, how can we write code?
 * => Node REPL (Read, Evaluate, Print, Loop): This is the quickest way
 *    of running NodeJS Code.
 * 
 * Q. How can we go to Node REPL?
 * => There is a command - node
 * => If we write this keyword in our terminal, we enter the Node REPL.
 * => Now we can write our JS code inside this terminal.
 *    var a = 'Mohammad';
 *    var b = 'Aslam';
 *    var c = a + ' ' + b;
 *    > Mohammad Aslam
 * 
 * Q. Where are we running this JS Code?
 * => We are running this in Node Runtime Environment. 
 * 
 *    NodeJS(C++) Runtime Engine
 *   +------------------------------------+
 *   |                                    |
 *   |  +--------------+ +-------------+  |
 *   |  | V8 JS Engine | | Super Power |  |
 *   |  +--------------+ +-------------+  |
 *   |                                    |
 *   +------------------------------------+
 * 
 * => Basically inside this NodeJS we have V8 Engine & Super Power API.
 *    So, whenever we write JS Code inside Node, it executed by the
 *    V8 Engine.
 * => Similarly, we write code inside our Browser Console, then this
 *    code gets passed to the JS Engine for execution.
 * 
 * => But we cannot write our program inside NodeJS REPL, because it
 *    is very painful to write. So, this REPL doesn't work for production.
 * => In daily life, we write code inside files, folders then structure
 *    our code. So, now we will create one small respository where we
 *    will test our NodeJS Code.
*/

/**
 * Creating JS Code Repository:
 * 1. Create a new folder - namaste-node
 * 2. Now to write any code, we will need Code Editor like VSCode.
 * 3. Import this folder inside VSCode.
 * 4. Start writing code
*/

var name = "Namaste NodeJS";
console.log(name);

var a = 10;
var b = 20;
console.log(a + b);


/**
 * Q. How do we run this code inside VSCode?
 * => Step-1: Go to terminal inside VSCode (CTRL + ~)
 *    Step-2: Write 'node filename' => node index.js
 *            This will run the code inside our NodeJS Runtime Env.
*/

/**
 * window vs gloabl:
 * - If we write 'window' inside our browser console, it will return a
 *   global object.
 * - If we write 'this', it will also return the same global object.
 * - This 'window' object is given to us by browser, not V8 Engine.
 *   So, it is not part of V8 Engine, but Browser.
 * 
 * - Similarly, NodeJS also return a global object, but it is not
 *   known as 'window'. It is known as 'global'.
 * - And if we just console our global object in VSCode terminal, it
 *   will return the global object.
 * - And if we look at the object, we can see:
 *   a. setTimeout
 *   b. clearTimeout
 *   c. setInterval
 *   d. clearTimeout etc...
 *   All of these things are given to us by this global object.
 * 
 * - Basically, 'global' is not part of V8 Engine. It is one of the super
 *   power which is given to us by NodeJS, and this global object gives
 *   access to a lot of cool features.
 * - This 'global' object's access is given inside this V8 Engine.
 * - Whenever we write any global object inside our code. V8 Engine 
 *   only follows ECMA Standard i.e. Whatever is there in the
 *   Core JS Lang like variables, fns, operators etc. but it doesn't
 *   understand global. It only understands when NodeJS gives global
 *   inside our V8 Engine. So, global object is a part of NodeJS, but
 *   not V8 Engine.
 * 
 * Note: When we do console.log(this) in our NodeJS. It doesn't return
 *       global object. It prints an empty object.
*/