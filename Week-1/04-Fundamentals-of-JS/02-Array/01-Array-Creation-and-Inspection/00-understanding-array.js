/**
 * Q. What do you mean by Data Structure?
 * - We know that we are going to have lots of data
 * - And Structure means how are we going to store it.


 * Q. What is an Array?
 * - A array can be described as a group or collection of items (numbers)
 *   stored inside memory in a logical order. The main function of Array is
 *   to store a collection of homogenous data of the same type.
 * - In an array, all items are kept in a single memmory region.
 * - All arrays are allocated dynamically; it provides a variable-size list
 *   data structure, allowing elements to be removed or added in an array.
 * - An array is a data structure where we save comparable objects.
 * - An array is index-based, with the first element, or the first element
 *   in the Array, stored at the 0th index, the second element at the 1st
 *   index, the third element at the 2nd index, and so on.
 * - An array can be used to store primitive values or objects in JavaScript.
 * - We can create both single-dimensional and multi-dimensional arrays.

 * Array : Real-life example => Index in a Book 
 * +-----------------------+
 * | Index         Page No.|
 * |   1.            1     |
 * |   2.            12    |
 * |   3.            50    |
 * +-----------------------+

 * The following is the representation of an array :
 * arr = +---------------------------+
 *       | 11 | 12 | 20 | 2 | 5 | 30 |
 *       +---------------------------+
 *         0    1    2   3   4   5
 * 
 * value at position 3 = 2
 * value at position 5 = 30

 * If you want to calculate the total number of arr -
 * - Total no. of elements in array = arr.length (returns total no. of elements in array)
 *                                  = 6
 * So, if we have 6 elements then index range is going to be 0-5.

 * Creating an Array = 
 * - let nums = [5,6,7,1]
 * - Index Range = 0 to 3

 * Advantage of Arrays :-
 * 1. In one variable we can store more than one value.
 *    - Example : const num1 = 5;    |
 *              const num2 = 6;    |
 *              const num3 = 7;    | const arr = [5,6,7,1]
 *              const num4 = 1;    |
 *
 * 2. In arrays, the elements can be accessed in any order by using the
 *    index number.
 *
 *    arr = +---------------------------+
 *          | 11 | 12 | 20 | 2 | 5 | 30 |
 *          +---------------------------+
 *            0    1    2   3   4   5
 *
 * 3. Arrays are stored in contiguous manner. Means it is going to store 
 *    continuously. Hence, there is not possibility of additional memory
 *    being allocated in the case of arrays. This saves memory spillage
 *    or overflow of memory and helps to regulate memory usage in any
 *    database.

 *    +---------------------------------------------+
 *    | num1 | ... | num2 | num3 | ... | num4 | ... |
 *    +---------------------------------------------+
 *    (Not necessary the values will be stored on after the another)
 *
 *    +---------------------------------------------+
 *    |      | arr |
 *    +---------------------------------------------+
 *             |
 *             V
 *         [5,6,7,1]
 * (But inside arr variable everything is stored at once place. So, contiguous manner)

 * 3. Arrays are homogeneous (same type) in nature. Means the stored values
 *    are going to be -
 *        (a) Entirely num type - [5,10,3,9]
 *        (b) Entirely String type - ["Mohammad, "Aslam"]
 *        (c) Entirely boolean type - [true, false, true, false]
 *
 *    -> To access any value based upon index -> arr[indexNo.]
 *
 * 4. With the use of arrays, other data structures like stacks, queues,
 *    trees, linked lists, graphs, etc., can be implemented.

 * Disadvantages of arrays :
 * 1. Size limit : In the Array, we can only store elements of a fixed size.
 *    It does not expand in size during use.
 * 2. In JavaScript, a collection framework is employed to handle this problem,
 *    which grows automatically.
*/


/**
 * Ex-1: Sum of 5 values (Without Array)
 * - Har value ke liye alag console.log karni padegi.
 */
const num1 = 5, num2 = 1, num3 = 2, num4 = 3, num5 = 1;
let sum = num1 + num2 + num3 + num4 + num5;
console.log(sum);
console.log(num2);

/**
 * Ex-2: Sum of 5 values (With Array)
 */
const nums = [5, 1, 2, 3, 1];
console.log(`Index 3 par value hai: ${nums[3]}`); 
console.log(`Array ki length hai: ${nums.length}`); 

/**
 * Loop se saari values print karna
 */
for(let i = 0; i < nums.length; i++) {
    console.log(`Index ${i} par value hai: ${nums[i]}`);
}



/**
 * Array 2 types ke hote hain:
 * 1. Single Dimension Array (1-D Array)
 * 2. Multi-Dimension Array (2-D, 3-D, Jagged Array)
 */

/**
 * 1. Single Dimension Array (1-D Array)
 *    - Ye simple array hota hai jisme values ek line mein store hoti hain
 *    - Example: ["Red", "Blue", "Green"]
 * 
 * 2. Multi-Dimension Array
 *    - Isme arrays ke andar arrays hote hain
 *    - 3 types ke hote hain:
 *      a. 2-D Array (2 dimensions)
 *      b. 3-D Array (3 dimensions) 
 *      c. Jagged Array (irregular shape)

 * Q. Jab humare paas 1-D array hai toh multi-dimension arrays ki zarurat 
 *    kyun padti hai?
 * -  Multi-dimension arrays tab use karte hain jab hume data ko multiple 
 *    levels par organize karna ho
 * -  Example: School mein students ka data store karna ho toh:
 *    - 1-D array: Sirf names store kar sakte hain
 *    - 2-D array: Names ke saath class, roll number bhi store kar sakte hain
 * 
 * Note: 
 * - 1-D aur 2-D arrays coding interviews mein bahut important hain
 * - Jagged arrays mostly theory questions mein puchte hain
 */

/**
 * Ex-1: 1-D Array
*/   
var color = ["Blue", "Green", "Yellow"];
console.log(color);

/**
 * Ex-2: 1-D Array
*/
const myArray = ['h', 'e', 'l', 'l', 'o'];
console.log(myArray[0]);
console.log(myArray[1]);
console.log(myArray[2]);
console.log(myArray[3]);
console.log(myArray[4]);

/**
 * Output:
 * "h"
 * "e"
 * "l"
 * "l"
 * "o"
*/


/**
 * What are differet ways to create Arrays in JavaScript?
 * In JavaScript, there are many ways in which an array can be created:
 * a. Array Literal
 * b. New Keyword
*/

/**
 * Approach 1: Array Literal
 * - The easiest and most common way to create an array is using the array literal notation.
 * - Square brackets [] are used to create an array.
 * - Example:
 *   const numbers = [1, 2, 3];
 *   console.log(numbers); // Output: [1, 2, 3]
*/

const numbers = [1, 2, 3];
for(let i = 0; i < numbers.length; i++) {
    console.log(numbers[i]); // Output: 1 2 3
}


/**
 * Approach 2: New Keyword
 * - The 'new Array()' constructor can also be used to create an array.
 * - Example:
 *   const numbers = new Array(1, 2, 3);
 *   console.log(numbers); // Output: [1, 2, 3]
*/

const moreNumbers = new Array(4, 5, 6);
for(let i = 0; i < moreNumbers.length; i++) {
    console.log(moreNumbers[i]); // Output: 4 5 6
}

/**
 * Note: Both approaches will give the same result, but the array literal 
 *       approach is more commonly used because it is simpler and more 
 *       readable. 
*/




/**
 * Common Operations performed on Arrays :
 * 1. Looping through an Array :
 *    - There are many ways to loop over the Array. 
 *    - The most common way of looping through arrays in JavaScript are:
 *      a. for Loop : As we have seen above
 *      b. for-of Loop 
 *      c. for-in Loop 
 *      d. forEach Loop 
 * 
 * 2. Length of array : 
 *    - Array index always starts from 0, which means the first element is 
 *      stored at index 0 and the last element will be stored at index 
 *      length - 1.
 *     Example of Length of array :
 *     - arr.length = 5
 *     - Idx are from 0-4, so, we are excluding arr.length that's why
 *       condition is 'i < nums.length'
 *     - But if we want to include index-4 then we can write the condition 
 *       as - 'i <= nums.length - 1'. (Now 5th index is not there -> 0 to 4).
 *     - Ex: 
 *       nums.length = 5
 *       nums.length - 1 => 5 - 1 => 4
 * 
 * 3. Add and remove elements from an array :
 *    - We can add and remove elements from an array using:
 *      a. push() and pop() methods.       [End mein add/remove karta hai]
 *      b. unshift() and shift() methods.  [Start mein add/remove karta hai]
 *    - Example:
 *      const nums = [1,2,3,4,5];
 *      nums.push(6);                // Output: [1,2,3,4,5,6]
 *      nums.pop();                  // Output: [1,2,3,4,5]
 *      nums.unshift(0);             // Output: [0,1,2,3,4,5]
 *      nums.shift();                // Output: [1,2,3,4,5]
 * 
*/

/**
 * Two ways to write conditions for for-loop :
 * a. for(i = 0; i < nums.length; i++} {...}
 * b. for(i = 0; i <= nums.length-1; i++) {...}
*/ 

/**
 * Ex-1: String array
 */
const arrStr = ["a", "b", "c", "d", "e", "f"];

for(let i = 0; i < arrStr.length; i++) {
    console.log(`Value at index = ${i} is ${arrStr[i]}`);
}

/**
 * Ex-2: Boolean array
 */
const booleanArr = [true, false, true, false, false];
for(let i = 0; i < booleanArr.length; i++) {
    console.log(`Value at index = ${i} is ${booleanArr[i]}`);
}

/**
 * Ex-3: Number array
 */
const numsArr = [1, 2, 3, 4, 5];

for(let i = 0; i < numsArr.length; i++) {
    console.log(`Value at index = ${i} is ${numsArr[i]}`);
}

/**
 * Ex-4: Array of objects
 */
const arrObj = [
    {
        name: "John",
        age: 20,
        city: "New York"
    },
    {
        name: "Jane",
        age: 21,
        city: "Los Angeles"
    },
    {
        name: "Jim",
        age: 22,
        city: "Chicago"
    }
]

for(let i = 0; i < arrObj.length; i++) {
    console.log(`Value at index = ${i} is ${arrObj[i]}`);
}


/**
 * Ex-5: Array of arrays
 */
const arrOfArr = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

for(let i = 0; i < arrOfArr.length; i++) {
    console.log(`Value at index = ${i} is ${arrOfArr[i]}`);
}



/**
 * Ex-6: Calculate sum of 5-values:
*/
const nums2 = [5,1,2,3,1]; 
let sum2 = 0; 

for(let i = 0; i < nums2.length; i++) {
    sum2 += nums2[i];
}
console.log(`Sum is ${sum2}`);



/**
 * What is the main difference between with Array and Without Array?
 * 
 * 1. Without array each value are stored in different variables which result
 *    in different memory location, whereas using array the values are stored
 *    in contiguous memory allocation.
 * 2. For developer we can easily maintain code and data manipulation is good
 *    for larger data, without array we need to create 100 variables for
 *    100 values but in array we can insert the values in the single array.
 * 
 * Note :
 * 1. When we have to create a database with complex and multiple variables
 *    to store, it will be difficult to control a database without using an
 *    array.
 * 2. Using Arrays in the database makes it easier to manage and control the
 *    database in the programming language; we can easily create an array
 *    and enter or remove values in it.
*/


/**
 * How to loop through an array in JavaScript?
 * - There are two main ways to loop through an array in JavaScript:
 *   1. For-loop     (which we have already seen)
 *   2. ForEach loop (which we will see now)
*/ 

/**
 * ForEach loop:
 * - Let's say we have an array: nums = [1,2,3,4]
 * - ForEach loop will iterate over each element of the array
 * - and will execute the code block for each element.
 * 
 * - ForEach loop has two parameters:
 *   - First parameter : array ka current value
 *   - Second parameter: value ka index/position
 * 
 * Example:
 * - colors = ["red", "blue", "green"]
 * - colors.forEach((color, i) => ...)
 *   - color: array ka current value
 *   - i: current value ka index/position
*/

const colors = ["red", "blue", "green"];

colors.forEach((color, i) => {
    console.log(`Index ${i} par value hai: ${color}`);
});


/**
 * Length of an array:
 * - Length of an array is the number of elements present in the array.
 * - We can get the length of an array using the length property.
 * - Example:
 *   const nums = [1,2,3,4,5];
 *   nums.length; // Output: 5
*/

const nums3 = [1,2,3,4,5];
console.log(nums3.length); // Output: 5




let person = {
   name: "Piyush",
   age: "25",
}

let fruits = ["apple", "banana", "cherry", person];

/**
* Array mein elements add/remove karne ke 4 main methods hain:
* 1. push() - Array ke end mein element add karta hai
* 2. pop() - Array ke end se element remove karta hai
* 3. unshift() - Array ke start mein element add karta hai
* 4. shift() - Array ke start se element remove karta hai
*/

/**
* 1. push() method - End mein element add karta hai
*/
console.log("push() method se end mein element add karna:");
fruits.push("orange");
console.log(fruits); // ["apple", "banana", "cherry", person, "orange"]


/**
* 2. pop() method - End se element remove karta hai
*/
console.log("\npop() method se end se element remove karna:");
fruits.pop();
console.log(fruits); // ["apple", "banana", "cherry", person]


/**
* 3. unshift() method - Start mein element add karta hai
*/
console.log("\nunshift() method se start mein element add karna:");
fruits.unshift("orange");
console.log(fruits); // ["orange", "apple", "banana", "cherry", person]

/**
* 4. shift() method - Start se element remove karta hai
*/
console.log("\nshift() method se start se element remove karna:");
fruits.shift();
console.log(fruits); // ["apple", "banana", "cherry", person]

/**
* Important Note:
* - push() aur pop() methods unshift() aur shift() se zyada efficient hain
* - Kyunki push() aur pop() sirf array ke end se kaam karte hain
* - Jabki unshift() aur shift() ko array ke start se element add/remove 
*   karne ke liye baaki saare elements ko shift karna padta hai
*/