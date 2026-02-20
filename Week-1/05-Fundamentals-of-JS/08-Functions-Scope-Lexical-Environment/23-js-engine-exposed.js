/**
 * JavaScript Runtime Environment is a big container which contain all
 * the things required to run JavaScript Code. It contains:
 * 1. JS Engine: Heart of the JS Runtime Environment
 * 2. Set of APIs to connect to the environment
 * 3. Event Loop inside JS Environment
 * 4. Callback Queue
 * 5. Microtask Queue
 * 
 * - Browser can only execute our code just because it has the JS 
 *   Runtime Environment. 
 * - NodeJS also has JS Runtime Environment, and NodeJS can run this
 *   JS Runtime Environment outside the browser. And because of this
 *   JS is capable of running in a lot of devices.
 * 
 * - Browser has an API known as Local Storage, that gives super power
 *   of accessing local storage from our code. But in case of NodeJS
 *   it could be different.
 * - But there are some APIs which are of same name, and runs on both
 *   Browser as well as NodeJS like setTimeout(), console.log().
 * - These API on browser & NodeJS looks very same, but internally they
 *   are implemented very differently inside. Means setTimeout() of
 *   browser might have different implementations than the setTimeout()
 *   of NodeJS. And similarly we can find all sort of APIs in all sort
 *   of JS Runtime Environments, and that is what makes JS beautiful.
 * - We can access the outer APIs through set of APIs, and we can run
 *   the JS piece of code inside this JS Runtime Environment.
 * */ 

/**
 * JS Engine: Heart of JavaScript Runtime Environment
 * - All Browsers have their own JS Engine like:
 *   a. Microsoft Edge  :  Chakra
 *   b. Firefox         :  SpiderMonkey
 *   c. Google Chrome   :  V8   
 * - V8 is the same JS Engine which is used inside NodeJS & Deno.
 * - JS Engine is not a machine. It is just a normal program which is
 *   written in low level language. For example, V8 Engine is written
 *   in C++.
 * 
 * JS Engine Architecture:
 * - JS Engine takes human readable code as the input, and this code
 *   goes through 3 major steps:
 *   1. Parsing
 *   2. Compilation
 *   3. Execution
 * 
 * Parsing Phase:
 * - During the Parsing phase, the code which we write is broken down
 *   into TOKENs. Suppose if we write a code which is: let a = 7;
 *   So, this code is broken down into tokens:
 *   Token-1: let
 *   Token-2: a
 *   Token-3: 7
 * - Then the Syntax Parser take the code and convert it into AST
 *   [Abstract Syntax Tree]. And now the AST which is generated is
 *   passed down to Compilation Phase.
 * 
 * Note: astexplorer.net website shows how AST looks like.
 * 
 * Compilation Phase:
 * - JS has JIT Compilation[Just In Time]. Before understanding JIT
 *   let's first understand:
 *   1. Interpreter
 *   2. Compiler
 *   3. Is JS Interpreted language or compiled language?
 * - Interpreter: In many interpreted programming languages, code is 
 *   executed using an interpreter. So, this interpreter basically takes
 *   our code and starts executing our code line-by-line in the order.
 * - While on the other hand, there are many different languages which
 *   uses a compiler to compile their code. So, in case of compiler, our
 *   whole code is compiled first of all even before execution. So, this
 *   code is compiled and new code is formed which is the optimized
 *   version of this code, which runs very fast & has a lot of performance
 *   improvement and then it is executed.
 * - There are both pros & cons of both interpreter and compiler. 
 *   a. In interpreter, the code is fastly executed.
 *   b. In compiler, we have more efficiency.
 * - JS is interpreted or compiled language? JS can behave like an
 *   interpreted language as well as compiled language. Everything is
 *   dependent on the JS Engine. 
 * - When JS was created, it was suppose to be an interpreted language,
 *   because it use to run on browsers and browsers can't wait for the
 *   code to compile before running and executing everything, but now
 *   in today's world most of the browsers we see and most of the 
 *   modern JS Engine uses an interpreter and compiler both together.
 *   So, now it all depends on JS Engine, whether it is pure interpreted
 *   or JIT Compilation.
 * - Just In Time Jargon comes from this only, that JS Engine can use
 *   both interpreter along with a compiler, and that's make it JIT
 *   Compiler.
 * - JIT = Interpreter + Compiler
 * 
 * 
 * - Now this compilation and Execution going hand-in-hand. So, after
 *   parsing we got the AST, this AST then goes to the interpreter.
 *   Now this Interpreter convert our High Level Code to bytecode and
 *   the code moves to the Execution step, and while it is doing so, it
 *   takes the help of the compiler to optimize the code. So, compiler
 *   basically talks to the interpreter and while the code is being
 *   interpreted line-by-line, the compiler also basically tries to
 *   optimize the code as much as it can in the runtime and that's
 *   why it is called Just In Time Compilation.
 * - It is not one phase process but it can happen in multiple phases.
 *   All these JS Engines have their own algorithms for doing it. 
 * 
 * Execution Phase:
 * - The Execution phase is not possible without two major components
 *   of the JS Engine:
 *   a. Memory Heap
 *   b. Callstack
 * - Memory Heap is the place where all the memory is stored. It is
 *   constantly in sync with the Callstack, Grabage Collector etc.
 *   Those pieces and everything works together and memory heap is the
 *   place where all the variables and functions are assigned.
 * - The Grabage Collector is trying to free the memory from memory heap
 *   whenever possible. For example, whenever some function is not
 *   being used or we clear the timeout then it basically collects all
 *   the garbage and sweeps it, and for that it uses an algorithm called
 *   as Mark and Sweep Algorithm.
 * - There are many other optimizations like Grabage Collector which
 *   Compiler does while compiling the code, and those optimizations
 *   are:
 *   a. Inlining
 *   b. Inline caching 
 *   c. Copy elision etc... 
*/