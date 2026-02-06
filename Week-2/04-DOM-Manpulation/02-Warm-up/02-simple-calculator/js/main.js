/**
 * In JS, there are big-4:
 * 1. Variables
 * 2. Conditionals
 * 3. Functions
 * 4. Loops
 * 
 * And with those big-4, we can build whatever we want.
*/

/**
 * Variables:
 * - We can tell our program to remember values for us to use later on.
 * - All variable is a bucket, we are going to take our bucket, we're
 *   going to put our value into it, and then the value can be retrieved
 *   later on.
 * - The entity we use to store the value is called a variable. 
/* 

/** 
 * Variable declaration & assignment:
 * - One of the thing which is important for the computer is 'memory',
 *   like a place to store stuffs or remember things. So, let's pretend
 *   we have some memory.
 * - When it comes to variables, there are two stuffs:
 *   a. Declaration: let age
 *      - declaration is creating a space in memory.
 *      - 'let' is the magic keyword that lets JS know that we are
 *        creating a space in memory. So, as soon as the JS saw a 'let',
 *        it creates a space in memory for 'age'.
 *   b. Assignment: age = 25
 *      - assignment is putting value into the blank memory. 
 * => Both at the same time: let age = 25;
*/ 

/** 
 * Variable Conventions:
 * - camelCase: let numberOfApples = 9;
*/
  
/** 
 * Variables & Data Types:
 * Q. What can you store in variables?
 * 1. Strings:
 *    - Stores text
 *    - String is surrounded by quotes
 *    - Ex: "How is the weather today?"
 *          'Warm'
 *    - Double vs Single Strings:
 *      'They "purchased" it'
 *      "It's a beautiful day"
 *      "They \"purchased\" it"
 *    - New Line + Tabs: 
 *      "1. Preheat over to 350\n2. Grease the pan"
 *      '\tBeginning of paragraph'
 * 2. Numbers:
 *    - Represent Numerical Data
 *      int: 29
 *      float: 5.14876
 *    - Signed:
 *      int: +4
 *      float: -10.375
 *    - Arithmetic in JS
 *      Operator     Meaning         Example
 *         +         Addition        8 + 10
 *         -         Subtraction     10 - 8
 *         *         Multiplication  12 * 2
 *         /         Division        10 / 5
 *         %         Modulus         10 % 6
*/

/**
 * Calculator:
 * - We have 4 buttons to click on, means we have 4 event-listeners who
 *   are listening for the clicks to do something.
 * - We have 4 <li> elements, each having their own unique ID, and the
 *   first thing we can see in our JS is that, we have 4 event-listeners
 *   that have been setup.
 * - This syntax is little bit different from previous one, but the
 *   same thing is happening here:
 *   a. We are looking in the 'DOM or document'
 *   b. We're finding something that has the ID - "#pumpkin"
 *   c. Then we are adding a 'click' event-listener to it. And this
 *      event-listener is listening for a click, and when #pumpkin ID
 *      hears the click, it tells the 'makeZero' instructions to run.
 * - This syntax is little bit different from the previous one, because
 *   this event-listener is listening to multiple events like click,
 *   mouseenter etc.
 * 
 * This calculator is keeping a total, and we have learnt so far that
 * "variable" can store values so that can we can:
 * a. add a number to total, 
 * b. subtract number from total,
 * c. make total zero.
*/

let total = 0

document.querySelector('#pumpkin').addEventListener('click', makeZero)
document.querySelector('#dominosPizza').addEventListener('click', jumanji)
document.querySelector('#zebra').addEventListener('click', add9)
document.querySelector('#cantThinkOfAnything').addEventListener('click', sub2)

// innerText puts text into the DOM
// innerHTML puts html into the DOM
function makeZero() {
  total = 0
  document.querySelector('#placeToPutResult').innerText = total
}

function jumanji() {
  total = total + 3
  document.querySelector('#placeToPutResult').innerText = total
}

function add9() {
  total = total + 9
  document.querySelector('#placeToPutResult').innerHTML = total
}

function sub2() {
  total = total - 2
  document.querySelector('#placeToPutResult').innerHTML = total
}
