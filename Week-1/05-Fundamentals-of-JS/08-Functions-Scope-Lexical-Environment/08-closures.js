/**
 * Closures:
 * - A closure is a combination of a function and the lexical environment
 *   within which that fn was declared.
 *   (Inner fns have access to the variables of outer fns).
 * 
 * Example:
 * function outerFunc() {
 *    var name = "Akanksha";
 *    function innerFunc() {
 *       console.log(name);
 *    }
 *    return innerFunc;
 * }
 * 
 * const runInnerFunc = outerFunc();
 * //...
 * //...
 * 
 * We can call it later, and whenever we call this fn it will
 * remember the reference of the name variables.
 * 
 * runInnerFunc();
*/

function x() {
    var a = 7;
    function y() {
        console.log(a);
    }
    return y;
}

// x();

/**
 * What does return y mean?
 * - The function x() declares a variable a and a nested function y().
 * - Instead of calling y(), it returns the function itself - not its
 *   result.
 * - So, when you do var z = x(), you are assigning the function y into z.
*/

var z = x();

/**
 * What happens when we call x()?
 * - When x() is invoked:
 *   a. It creates a new execution context.
 *   b. Declares a = 7
 *   c. Declares function y(), which refers to a. 
 *   d. Then returns the function y, not executing it yet.
 * - After x() finishes, it's removed from the call stack.
*/

console.log(z); // [Function: y] => Returns the fn y()

/**
 * What's inside the z now?
 * - console.log(z); // [Function: y] 
 * - This shows that z now holds the function definition of y().
 * - We haven't called it yet - it's just stored and ready to be used later.
*/


/**
 * What happens when we call z()?
 * - Even though x() is no longer in memory stack, and a is not in the
 *   global scope...
 * - The function y() remembers the variable a because of closure.
*/


/**
 * What is a Closure?
 * Closure is when a function "remembers" the variables from its lexical
 * (outer) scope, even after the outer function has finished executing.
 * a. Here, y() was defined inside x(), so it forms a closure over the
 *    variable a. 
 * b. Even though x() is done executing, the function y() still holds
 *    a reference to a. 
 * c. When we call z(), it still has access to a because of the closure.
 * 
 * In other words, a closure is a way to keep a function's scope alive
 * even after the outer function has finished executing.
*/



/**
 * Another way of returning a function:
 * 
 * Way-1:
 * function x() {
 *    var a = 7;
 *    function y() {
 *       console.log(a);
 *    }
 *    return y;
 * }
 * 
 * 
 * Way-2:
 * function x() {
 *    var a = 7;
 *    return function y() {
 *       console.log(a);
 *    }
 * }
*/



/**
 * Corner Cases of Closures: [Interview Questions]
 * 
 * Case-1: When we return a function and then modify the variable in the
 *         outer function, the inner function will still remember the
 *         original value of the variable.
 * 
 * Example:
 * function x() {
 *    var a = 7;
 *    function y() {
 *       console.log(a);
 *    }
 *    a = 100;
 *    return y;
 * }
 * 
 * var z = x();
 * z();            <== 100 (Comes along with its lexical scope)
 *
 * 
 * Case-2:
 * 
 * function outer(b) {
 *    function inner() {
 *       console.log(a, b);
 *    }
 *    let a = 100;
 *    return inner;
 * }
 * 
 * var z = outer(10);
 * z();
 * 
 * - inner() forms a closure along with the scope of outer() and z(). So, when we
 *   call z(), it will print 100 and 10.
 * 
 * 
 * Case-3: Nested Function:
 * 
 * Example:
 * function z() {
 *   var b = 900;
 *   function x() {
 *      var a = 7;
 *      function y() {
 *         console.log(a, b);
 *      }
 *      y();
 *   }
 *   x();
 * }
 * z(); 
 * 
 * - y() forms a closure along with the scope of x() and z(). So, when we
 *   call z(), it will print 7 and 900.
 * 
 * 
 * Case-4: Nested Function with Multiple Closures:
 * 
 * function outest() {
 *    var c = 20;
 *    function outer(b) {
 * 
 *       function inner() {
 *         console.log(a, b, c);
 *       }
 *       let a = 10;
 *       return inner;
 *    }
 *    return outer;
 * }
 * 
 * var close = (outest())('helloworld');   <== Shorthand way
 * close();
 * 
 * Note: This line is a bit confusing, but it can be written like this:
 * - var outer = outest();            <== Pehle outest() call kiya, outer() mila
 * - var close = outer('helloworld'); <== Fir outer() ko call kiya
 * 
 * But we can write it like this:
 * - (outest()) se outer() function milta hai
 * - Fir turant usko ('helloworld') se call kar diya
 * - Dono steps ek hi line mai ho gaye
 * 
 * 
 * 
 * Case-5: Conflicting name Global Variables
 * 
 * function outest() {
 *    var c = 20;
 *    function outer(b) {
 * 
 *       function inner() {
 *         console.log(a, b, c); // 10, 'helloworld', 20
 *       }
 *       let a = 10;
 *       return inner;
 *    }
 *    return outer;
 * }
 * 
 * let a = 100; // Global variable 'a'
 * var close = (outest())('helloworld');  
 * close(); // 10, 'helloworld', 20
 * 
 * Explanation:
 * - Even though we have a global variable 'a' with value 100, the inner function
 *   prints 10 because of lexical scoping
 * - When inner() looks for 'a', it first checks its own scope (nothing there)
 * - Then it checks outer()'s scope where it finds let a = 10
 * - It doesn't go to the global scope because it already found 'a' in its
 *   lexical environment
 * - This shows that closures follow lexical scoping rules - they use the
 *   closest variable in their scope chain, not necessarily the global one
*/


/**
 * Closure Use Cases:
 * 1. Module Design Pattern
 * 2. Currying
 * 3. Functions like once
 * 4. Memoization 
 * 5. Maintaining state in async world
 * 6. setTimeout
 * 7. Iterators and Generators
 * 8. Data Hiding & Encapsulation
 * and many more...
*/


/**
 * Data Hiding & Encapsulation using Closures:
 * 
 * Problem: Security of Global Variables
 * This code is not secure:
 * 
 * var counter = 0;
 * function incrementCounter() {
 *    counter++;
 * }
 * 
 * Why? Because:
 * - Anyone can access/modify the counter variable
 * - Instead of counter++, someone could do counter = 1000
 * - Creates global scope pollution
 * 
 * Solution: Using Closures for Data Privacy
 * 
 * function createCounter() {
 *   var counter = 0;  // Private variable
 *   
 *   return function incrementCounter() {
 *      counter++;
 *      console.log(counter);
 *   }
 * }
 * 
 * What improved?
 * - counter variable is now private, can't be accessed from outside
 * - Counter can only be modified through the increment function
 * - Each counter instance has its own private counter
 * 
 * Example:
 * var counterOne = createCounter();  
 * counterOne(); // 1 
 * counterOne(); // 2 
 * 
 * var counterTwo = createCounter(); // New independent counter
 * counterTwo(); // 1
 * counterTwo(); // 2
 * 
 * Why Constructor Functions are Better?
 * 1. Object Oriented approach - behaves more like proper classes
 * 2. Can add multiple methods (increment, decrement, reset etc)
 * 3. Benefits from prototype inheritance
 * 4. Proper usage of 'this' keyword
 * 5. Better code organization and maintainability
 * 6. Can have private and public methods clearly defined
 * 7. Easier to extend functionality later
*/

/**
 * Refactor: Function Constructor in JavaScript:
 * 
 * function createCounter() {
 *   var counter = 0;
 * 
 *   this.incrementCounter = function () {
 *     counter++;
 *     console.log(counter);
 *   }
 * 
 *   this.decrementCounter = function () {
 *     counter--;
 *     console.log(counter);
 *   }
 * 
 *   this.resetCounter = function () {
 *     counter = 0;
 * }
 * 
 * var counterOne = new createCounter(); // 'new' is used to create a new object
 * counterOne.incrementCounter();        // 1
 * counterOne.incrementCounter();        // 2
 * counterOne.decrementCounter();        // 1
 * counterOne.resetCounter();            // 0
 * 
 * Note: Data is private and encapsulated, and we can add multiple methods
 *       to the counter object.
*/

/**
 * Disadvantages of Closures:
 * 
 * 1. Memory Leaks:
 *    - Closures keep references to outer variables, preventing garbage collection
 *    Example:
 * 
 * function heavyComputation() {
 *    const bigData = new Array(1000000); // Large array
 * 
 *    return function process() {
 *      // Uses bigData but bigData stays in memory
 *    }
 * }
 * 
 * const processFunc = heavyComputation(); // bigData stays in memory
 * 
 * 
 * 2. Over-consumption of Memory:
 *    - Each closure creates new copy of variables
 * 
 * Example:
 * function createCounter() {
 *    let count = 0;  // New copy for each closure
 *    return function() {
 *        return ++count;
 *    }
 * }
 * 
 * const counter1 = createCounter(); // Has its own 'count'
 * const counter2 = createCounter(); // Has another copy of 'count'
 * const counter3 = createCounter(); // Another memory allocation
 * 
 * 
 * Note: It consumes a lot of memory, and those closed over variables are
 *       not garbage collected. That means it is accumulating a lot of 
 *       memory, and can cause memory leak and performance issues.
*/ 

/**
 * What is Garbage Collector in JS?
 * - It is a process by which JS engine automatically frees up memory that is
 *   no longer needed by the program.
*/

/**
 * How are Closures related to Garbage Collector?
 * 
 * The Relationship between Closures and Garbage Collector:
 * - When we create a closure, the inner function maintains references to variables
 *   from its outer function's scope
 * 
 * - Normally, when a function finishes executing, the Garbage Collector cleans up
 *   its variables. However, with closures:
 *   
 *   Example:
 *   function outer() {
 *       let data = "important data";
 *       return function inner() {
 *           console.log(data); // maintains reference to data
 *       }
 *   }
 * 
 *   - Here, 'data' won't be garbage collected because the inner function
 *     is still referencing it
 * 
 * Risk of Memory Leaks:
 * - Creating many closures without proper cleanup can lead to memory leaks
 * - This becomes particularly problematic when dealing with large objects/arrays
 * 
 * Best Practices:
 * - Break closure references by assigning null when no longer needed
 * - Only keep essential variables in closures
 * - Be cautious when using closures with large data structures
 * 
 * Note: Understanding this relationship is crucial for writing memory-efficient
 *       JavaScript applications
*/


/**
 * Memoization using Closures
*/

/**
 * Memoization kya hai?
 * - Ye ek technique hai jisme hum calculations ko store karke rakhte hain
 * - Agar same calculation dubara karni ho, to stored result use kar lete hain
 * - Isse performance better ho jati hai
 */


/**
 * Example: Number ka square calculate karne wala function
 * - Cache ka use karke hum result store karenge
 * - Cache object - isme hum results store karenge
 * 
 *   a. Inner function jo actual calculation karega
 *   b. Check karo ki result cache mein hai ya nahi
 *   c. Agar cache mein nahi hai to calculate karo
 * 
 * Note : Performance increased using closure
*/


function memoizeSquare() {
    const cache = {};
    
    return function(n) {
        if(n in cache) {
            console.log("Cache se value mil gayi!");
            return cache[n];
        }
        
        console.log("Naya calculation kar rahe hain...");
        cache[n] = n * n;
        return cache[n];
    }
}

const memoSquare = memoizeSquare();

console.log(memoSquare(5));  // Pehli baar calculate hoga: 25
console.log(memoSquare(5));  // Cache se aayega: 25



