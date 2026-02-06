/**
 * Closure:
 * - In simple terms, closure is a bundling of two or more functions
 *   where inner functions have access to the properties and methods
 *   of the outer functions even after the execution of the external
 *   function is done.
*/

function outer() {
    console.log("Hello i am outer and i am returning Inner");
    return function Inner() {
        console.log("I am Inner");
    }
}

/**
 * 1. Storing the function in a variable
 * 2. Calling the variable
*/
let returnVal = outer();
returnVal();

/** 
 * Closure : 
 * 
 * Stack Memory Diagram:                   Memory Allocation for inner @ 20k
 * 
 *                                         +-----------------+
 *                                         |                 |
 *      +-----------------+          +----+|                 |
 *      |                 |          |     |                 |
 *      |                 |          |     |                 |
 * Outer| inner = 20k     |----------+     +-----------------+
 *      +-----------------+
 *  GEC | rval = undefined|                Memory Allocation for outer @ 16k
 *      | outer = 16k     |----------+     +-----------------+
 *      +-----------------+          |     |                 |
 *                                   |     |                 |
 *                                   +----+|                 |
 *                                         |                 |
 *                                         +-----------------+
 * 
 * 1. Memory Allocation:
 *    - Sabse pehle GEC banega, usme memory allocation hogi to returnVal k 
 *      liye 'undefined' set ho jaegi aur outer k liye ek alag se memory 
 *      allocate ho jaegi.
 *    - Ab outer() function chlega/call hoga, ab ye stack pe aaega aur stack
 *      pe outer() ki block bn jaegi.
 *    - Outer() function m koi variable ni h bss ek function h to 'inner' k 
 *      liye v memory allocate ho jaegi
 * 
 * 2. Code Execution:
 *    - Ab outer() function k andr ka code chlega to ye "Hello i am outer 
 *      and i am returning Inner" return hoga.
 *    - Fir outer() function k andr inner function() stored h to uska address
 *      20k return ho jagea
 *    - Fir console.log(returnVal); run hoga aur humne avi tk function call
 *      kiya ni h to function name print hoga - [Function: inner]
 *    - Fir returnVal() ko call krte h tb inner() function print hoga -
 *      "Hello i am outer and i am returning Inner"
 *      "I am Inner"
 * 
 * Output :
 * - Hello i am outer and i am returning Inner
 * - [Function: inner]
 * - I am Inner
 * 
 * Note : 
 * - Ab returnVal() ko call krte h tb inner() function print hoga - 
 *   "Hello i am outer and i am returning Inner"
 *   "I am Inner" 
*/




/**
 * Example of Closure with Parameters:
 * - Closure allows inner functions to access outer function variables even after
 *   outer function has returned.
 * 
 * Code Example:
*/

function outer(first) {
    console.log("Inside Outer");
    return function inner(second) {
        console.log("Inside Inner");
        return first * second;
    }
}

let rVal = outer(2);
console.log("before calling rVal that contains inner");
let ans = rVal(4);
console.log(ans); // 8

/**
 * Stack Memory Diagram:
 *                                         Memory Allocation for inner @ 20k
 *      +------------------+              +------------------+
 *      |                  |              | second=undefined |
 *      |                  |              |                  |
 *      |                  |     +------->|                  |
 *      |                  |     |        |                  |
 *      |                  |     |        +------------------+
 * Inner| second=4         |     |        
 *      +------------------+     |        Memory Allocation for outer @ 16k
 *      | ans=undefined    |     |        +------------------+
 * GEC  | rVal=undefined   |     |        | first=undefined  |
 *      | outer=memory     |------------->|                  |
 *      +------------------+              +------------------+
 * 
 * Code Execution Flow:
 * 1. Memory Allocation Phase:
 *    - GEC created with outer(), rVal and ans as undefined
 *    - outer() gets memory allocation
 * 
 * 2. Code Execution Phase:
 *    - outer(2) called:
 *      - first parameter becomes 2
 *      - inner function reference (20k) stored
 *      - "Inside Outer" printed
 *      - inner function returned
 *    - outer() completes and removed from stack
 *    - "before calling rVal that contains inner" printed
 *    - rVal(4) called:
 *      - second parameter becomes 4
 *      - "Inside Inner" printed
 *      - first*second calculated using closure
 *      - 8 returned and stored in ans
 *    - ans (8) printed
 * 
 * Closure Concept:
 * - Inner function maintains access to outer function's variables (first)
 *   even after outer function has completed execution
 * - This is possible through closure - a JavaScript feature that preserves
 *   outer scope access for inner functions
*/




/**
 * User Data Collection Example using Closures:
 * - Demonstrates collecting user data across multiple steps
 * - Each function maintains access to data from previous steps via closure
 * - Common pattern used in callbacks, promises and async code
 * 
 * Flow:
 * 1. User enters firstName 
 * 2. Then enters lastName
 * 3. Finally enters age
 * 4. Data is printed/processed
 * 
 * Code Structure:
 * - Nested functions each capturing variables from outer scope
 * - Each function returns next function in chain
 * - Final function prints collected data
 */

function enterFirstName(first) {
    return function enterLastName(last) {
        return function enterAge(age) {
            return function printDetails() {
                console.log("Your name is " + first + " " + last + " and your age is " + age);
            }
        }
    }
}

console.log("Kindly enter your first Name");
let enterLastName = enterFirstName("Mohammad");
console.log("Kindly enter your last Name");
let enterAge = enterLastName("Aslam");
console.log("Kindly enter your age");
let printDetails = enterAge(25);

// Data can be used for various purposes like forms, payments etc
console.log("Doing Random Stuff");
printDetails();





/**
 * Assignment: Understanding Closures with Inner Functions
 * 1. We are given an outer function that returns an inner function
 * 2. We need to store the inner function in a variable called 'inner'
 * 3. Then we need to call the inner function
*/

function outer() {
    var name = 'Tyler';
    return function () {
        return 'The original name was ' + name;  // Accessing name through closure
    }
}

/**
 * Explanation: 
 * - Call outer function and store inner function
 * - Then call the inner function
 * 
 * a. Calling outer() function will return inner function
 * b. We store this inner function in the 'inner' variable
 * c. Inner function has reference to 'name' variable (closure)
 * d. When we call the inner function, it will print:
 *    "The original name was Tyler"
*/

let inner = outer();
console.log(inner());  // Output: "The original name was Tyler"


/**
 * Important Points for Beginners:
 * 1. Closure is a feature that lets inner functions access outer variables
 * 2. Inner function remembers the variables from its outer function
 * 3. Whenever inner function is called, it will have access to outer variables
 * 4. In real life, closures are used for data privacy and function factories
*/


/**
* Assignment: Phone Dialer with Closures
* In this exercise, we'll create a phone dialer system using closures.
* We'll demonstrate how closures can be used to create specialized functions
* that "remember" certain values.
* 
* The goal is to:
* 1. Understand how nested functions access outer variables
* 2. Create specialized functions using closures
* 3. See practical application of function factories
*/

function callFriend(name) {
    function dial(number) {
        return 'Calling ' + name + ' at ' + number
    }
    return dial
}


/**
 * Explanation:
 * - Call callFriend() with 'Jake' to get dial function
 * - Store dial function in callJake variable
 * - dial function has reference to name='Jake' (closure)
 * - When we call callJake with number, it will print:
 *   "Calling Jake at 435-555-9248"
 */

let callJake = callFriend('Jake');
console.log(callJake('435-555-9248')); // Output: "Calling Jake at 435-555-9248"

/**
 * Important Points:
 * 1. callFriend creates a closure over the name parameter
 * 2. dial function remembers the name value
 * 3. When callJake is called, it has access to 'Jake' through closure
 * 4. This pattern is useful for creating specialized functions
 */



/**
 * Assignment: Counter with Closures
 * In this exercise, we'll create a counter using closures to demonstrate
 * how functions can maintain their own private state.
 * 
 * The goal is to:
 * 1. Create a counter that increments each time it's called
 * 2. Keep the count variable private using closure
 * 3. Return a function that can access and update this private count
 */

function makeCounter() {
    let count = 0;
    return function () {
        count++;
        return count;
    }
}

/**
 * Explanation:
 * - makeCounter creates a closure over count variable 
 * - Inner function has access to count through closure
 * - Each time counter is called, it:
 *   1. Increments the private count
 *   2. Returns new value
 * - count stays private, can only be modified by returned function
 */

// Usage:
var count = makeCounter();
count(); // 1
count(); // 2  
count(); // 3
count(); // 4

/**
 * Important Points:
 * 1. count variable is private, cannot be accessed from outside
 * 2. Inner function "remembers" count through closure
 * 3. Each call to makeCounter creates new independent counter
 * 4. This pattern useful for creating private state in JavaScript
 */



/**
 * Assignment: Counter Factory with Increment/Decrement
 * In this assignment we will create a counter that can both increment and
 * decrement values. We will use closures to maintain private state.
 * 
 * Goals:
 * 1. Create a counter that can increment and decrement values
 * 2. Keep the value private using closure
 * 3. Return two functions - inc() and dec()
 */

function counterFactory(value) {
    // Private variable
    let count = value;

    return {
        inc: function () {
            count++;
            return count;
        },
        dec: function () {
            count--;
            return count;
        }
    }
}

/**
 * Explanation:
 * - counterFactory creates a closure over the count variable
 * - inc and dec functions can access count through closure
 * - count remains private, cannot be accessed from outside
 * - each counterFactory call creates a new independent counter
 */

// Usage example:
counter = counterFactory(10);
counter.inc() // 11
counter.inc() // 12 
counter.inc() // 13
counter.dec() // 12



/**
 * Assignment: Message Generator with Closure
 * 
 * In this assignment we will create a message generator that takes a firstname
 * and lastname and returns a motivational message.
 * 
 * Goals:
 * 1. Create a function that takes firstname and lastname
 * 2. Use closure to access the names in inner function
 * 3. Return a motivational message with the full name
 */

function motivation(firstname, lastname) {
    var welcomeText = 'You\'re doing awesome, keep it up ';

    function message() {
        return welcomeText + firstname + ' ' + lastname + '.';
    }

    return message();
}

// Usage example:
motivation('Billy', 'Bob'); // 'You're doing awesome, keep it up Billy Bob.'




/**
 * Assignment: Module Pattern with Private Method
 * 
 * In this assignment we will create a module that has a private method which can only 
 * be accessed through a public method using closure concept.
 * 
 * Goals:
 * 1. Create a module with private data and method
 * 2. Use closure to access private method through public method
 * 3. Return public method that can invoke private functionality
 */

var module = (function () {
    var person = {
        name: "phillip",
        age: 29,
        location: "Utah"
    };

    function privateMethod() {
        return "Hi, I'm " + person.name + ", age " + person.age + " from " + person.location;
    }

    return {
        publicMethod: function () {
            return privateMethod();
        }
    };

})();

// Usage example:
// module.publicMethod(); // "Hi, I'm phillip, age 29 from Utah"




/**
 * Assignment: Friend Finder with Closure
 * In this assignment we will create a function that helps find potential new 
 * friends by checking if a person is not already in our friends list.
 * 
 * Goals:
 * 1. Create a function that takes existing friends list
 * 2. Return a function that checks if someone is not a friend
 * 3. Use closure to remember existing friends
 */

var friends = ["Tom", "Dick", "Harry"];
var secondLevelFriends = ["Anne", "Harry", "Quinton"];
var allUsers = ["Tom", "Dick", "Harry", "Anne", "Quinton", "Katie", "Mary"];

function findPotentialFriends(existingFriends) {
    return function (user) {
        return !existingFriends.includes(user);
    }
}

var isNotAFriend = findPotentialFriends(friends);
// Usage example:
// isNotAFriend("Tom"); // false - already a friend
// isNotAFriend("Anne"); // true - potential friend

// Finding all potential friends using Array.filter
var potentialSecondLevelFriends = secondLevelFriends.filter(isNotAFriend);
var allPotentialFriends = allUsers.filter(isNotAFriend);




/**
 * Assignment: Timer with Closure
 * In this assignment we will fix a timer function that logs numbers with 
 * proper delays using closure to preserve the counter value.
 * 
 * Goals:
 * 1. Log numbers 0-5 with 1 second delay between each
 * 2. Use closure to preserve the counter value for each timeout
 * 3. Fix the existing code to work correctly
 */

function timeOutCounter() {
    for (var i = 0; i <= 5; i++) {
        (function (num) {
            setTimeout(function () {
                console.log(num);
            }, num * 1000);
        })(i);
    }
}

// Usage example:
// timeOutCounter();
// Will log 0,1,2,3,4,5 with 1 second delay between each




