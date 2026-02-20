/**
 * Arrays:
 * - A data structure to store ordered collections!
 * - Array elements are numbered starting with zero.
 * - Arrays have many methods to manage the order of elements.
 * - Can be created by constructor or literal notation.
*/

/**
 * Declaring Arrays:
 * - let newArr = new Array();  <== Array Constructor
 * - let newArr = [];           <== Literal Notation
 * 
 * - Array are populated with elements, elements can be of any type:
 *   new Arr = ['Zebra', true, 21] 
 * 
 * - Empty spaces leave an empty element in an array.
*/

/**
 * Array Indexing:
 * - ["NYC", "LA", "SYD", "LDN"]
 *      0     1      2      3
 * 
 * - Elements can be accessed by their index numbers:
 * - newArr = ['Zebra', , true, 21]
 * - console.log(newArr[0]); // Zebra
 * - console.log(newArr[1]); // undefined
 * - console.log(newArr[2]); // true
 * - console.log(newArr[3]); // 21
 * 
 * 
 * - Elements can be updated by using the index at that position:
 * - newArr = ['Zebra', , true, 21]
 * - newArr[1] = 'Bob';
 * - console.log(newArr);  // ['Zebra', 'Bob', true, 21]
 * 
 * 
 * - You can overwrite whole arrays by assigning an array to a different
 *   array:
 * - let cars = ['Honda', 'Toyota', 'Ford', 'Tesla']
 * - let nums = [1, 2, 3]
 * - cars = nums
 * - console.log(cars); // [1, 2, 3]
*/

/**
 * Array Length:
 * Q. How do you determine how many elements are in your array?
 * -  let cars = ['Honda', 'Toyota', 'Ford', 'Tesla']
 * -  console.log(newArr.length); // 4
*/


/**
 * Q. Create an array of movies with at least three movies.
*/
let bestMovies = ["All or Nothing", "In it to win it", "fight to the finish", "World Wide Cheersmack"];

/**
 * Q. Using the array from above, store the first movie in a variable
*/
let firstMovie = bestMovies[0];
console.log(firstMovie);

/**
 * Q. Get the length of the original array and store it in a new variable
*/
let numOfMovies = bestMovies.length;
console.log(numOfMovies);

/**
 * Q. Get the last element in that array and store it in a new variable. 
 *    What if your array was really large and you didn't know the last 
 *    index? Would your solution still work?
*/
let lastMovie = bestMovies[numOfMovies - 1];
console.log(lastMovie);



/**
 * Array Iteration:
 * - Iterates through an array passing in the value and index of each
 *   element:
 * 
 * Way-1: for-loop
 * - let bestColors = ['green', 'blue', 'yellow', 'black'];
 * - for(let i = 0; i < bestColors.length; i++) {
 *      console.log(bestColors[i]);
 *   }
 * 
 * Way-2: forEach 
 * - forEach is a built-in fn to JS. It's a loop that runs once for each
 *   element in the array.
 * 
 * - let bestColors = ['green', 'blue', 'yellow', 'black'];
 * - bestColors.forEach((x, i) => log(x));
 * 
 * - In this case, forEach will run 4-times. It will grab each element
 *   from the array for us and throw it into a function:
 *   (x, i) => console.log(x)
 * - Every single time this forEach runs, each time this arrow fn will
 *   run i.e. 4-times. 
 * - Each time forEach runs, it pull some information out of the array:
 *   x: It is holding/storing the element(data) coming out of the array. 
 *   i: It is holding the index of the array. 
*/


/**
 * Q. Create an array of movie titles. Loop through the array and each
 *    element to the h2.
*/
let movieTitles = ["fight", "win", "worldwide"];

// Way-1: For Loop:
// for(let i = 0; i < movieTitles.length; i++) {
//     document.querySelector('h2').innerText += movieName
// }

// Way-2: forEach Loop:
movieTitles.forEach((movieName, movieIdx) => document.querySelector('h2').innerText += movieName);


/**
 * Q. Create an array of numbers. Loop through the array and three to 
 *    each number and replace the old number.
*/
let nums = [1, 2, 3];

nums.forEach((item, i) => {
    nums[i] = item + 3; 
})

console.log(nums); // 4, 5, 6

/**
 * Q. Find the average of all the numbers from question three
*/
let sum = 0;
for(let i = 0; i < nums.length; i++) {
    sum += nums[i];
}
console.log(sum / nums.length); 



/**
 * Practice Problem:
*/


/**
 * 1. Create an array containing different types of teas.
*/
const teas = ['Green tea', 'Black tea', 'Oolong tea', 'White tea', 'Herbal tea'];
console.log(teas);


/**
 * 2. Add 'Chamomile tea' to the existing list of teas.
*/
teas.push('Chamomile tea');
console.log(teas);


/**
 * 3. Remove 'Oolong tea' from the list of teas.
*/
const index = teas.indexOf('Oolong tea');
if(index < -1) {
    teas.splice(index, 1); // Remove 1 element from index i.e. Oolong tea.
}
console.log(teas);


/**
 * 4. Filter the list of only inlcude teas that are caffeinated.
*/
const caffeinatedTeas = teas.filter((tea) => tea !== 'Herbal tea');
console.log(caffeinatedTeas);


/**
 * 5. Sort the list of teas in alphabetical order.
*/
const test = ['🐔', '🥚'];
console.log(test.sort());


/**
 * 6. Use a for loop to print each type of tea in the array.
*/
for(let i = 0; i < teas.length; i++) {
    console.log(teas[i]);
}


/**
 * 7. Use a for loop to count how many teas are caffeinated (excluding 
 *    herbal tea).
*/
let caffeinatedCount = 0;
for(let i = 0; i < teas.length; i++) {
    if(teas[i] !== 'Herbal tea') {
        caffeinatedCount++;
    }
}
console.log(caffeinatedCount);


/**
 * 8. Use a for loop to create a new array with all tea names in uppercase.
*/
const uppercaseTeas = [];
for(let i = 0; i < teas.length; i++) {
    uppercaseTeas.push(teas[i].toUpperCase());
}
console.log(uppercaseTeas);


/**
 * 9. Use a for loop to find the tea name with the most characters.
*/
let longestTea = '';
for(let i = 0; i < teas.length; i++) {
    if(teas[i].length > longestTea.length) {
        longestTea = teas[i];
    }
}
console.log(longestTea);


/**
 * 10. Use a for loop to reverse the order of the teas in the array.
*/
const reversedTeas = [];
for(let i = teas.length - 1; i >= 0; i--) {
    reversedTeas.push(teas[i]);
}
console.log(reversedTeas);



/**
 * 11. Create a function that takes in an array. If the first number, is 
 *    less than the last number, alert "Hi". If the first number is 
 *    greater than the last number, alert "Bye". If they are equal, 
 *    alert "We close in an hour".
*/

function arrayOpen(dino) {
    if(dino[0] < dino[dino.length-1]) {
        alert("Hi");
    } else if(dino[0] > dino[dino.length-1]) {
        alert("Bye");
    } else {
        alert("We close in an hour");
    }
}

arrayOpen([1, 2, 3, 4, 5]);


/**
 * 12. Create a function that takes in an array of numbers. Multiply each 
 *    number together and alert the product. 
*/

function multiArray(arr) {
    let product = 1;
    
    // arr.forEach((item, i) => product *= item);
    for(let i = 0; i < arr.length; i++) {
        product = product * arr[i];
    }
    alert(product);
    
}
multiArray([1, 2, 3, 4, 5])




/**
 * Other Array Methods:
 * 1. Remove item from the beginning of the array:
 *    let bestRappers2020 = ['6ix9ine', 'Polo G', '6ix9ine']
 *    let removed = bestRappers2020.shift(); (storing removed item)
 *    console.log(bestRappers2020); ==> ['Polo G', '6ix9ine'] (remaining item)
 *    console.log(removed);         ==> 6ix9ine (removed item)
 * 
 * 2. Remove item from the end of the array:
 *    let bestRappers2020 = ['Polo G', '6ix9ine']
 *    let removed = bestRappers2020.pop(); (storing removed item)
 *    console.log(bestRappers2020); ==> ['Polo G'] (remaining item)
 *    console.log(removed);         ==> 6ix9ine (removed item)
 * 
 * 
 * 1. Add item to the beginning of the list of an array:
 *    let bestRappers2020 = ['Polo G']
 *    bestRappers2020.unshift('Daylan'); (adding new item to the list)
 *    console.log(bestRappers2020); ==> ['Daylan', 'Polo G'] (total item)
 * 
 * 2. Add item to the end of the list of an array:
 *    let bestRappers2020 = ['Daylan', 'Polo G']
 *    bestRappers2020.push('Daylan'); (adding new item to the list)
 *    console.log(bestRappers2020); ==> ['Daylan', 'Polo G', 'Daylan'] (total item)
 * */

/**
 * Map():
 * - It is kind of similar to forEach, except map creates a new array,
 *   so the result of map is always a new array.
 * - So, we are creating a new array called bestRapperAllTime, and we
 *   have used map which will give me a new array.
 * - We have said, all of the items(x) should now be 'Daylan'. So, for
 *   each item that's in our array, we are going to return 'Daylan'. 
 * - Since, there is 3 items in our array, bestRapperAllTime has 3 items
 *   ['Daylan', 'Daylan', 'Daylan']
 * 
 * Example:
 * - let bestRappers2020 = ['Daylan', 'Polo G', 'Daylan']
 * - let bestRappersAllTime = bestRappers2020.map(x => 'Daylan')
 *   ['Daylan', 'Daylan', 'Daylan']
*/

/**
 * Example:
 * - let bestRappers2020 = ['Daylan', 'Polo G', 'Daylan']
 * - let bestRappersAllTime = bestRappers2020.map(x => 'Daylan')
 * - bestRappersAllTime.unshift('Daylan');
 * - bestRappersAllTime.push('Daylan');
 * - console.log(bestRappersAllTime);
 *   ['Daylan', 'Daylan', 'Daylan', 'Daylan', 'Daylan']
*/

/**
 * Q. Create and array of numbers. Sum all of the numbers. Alert the sum.
 * => Reduce Method:
 *    - reduce has two things:
 *      a. accumulator
 *      b. current value
 *    - Think of accumulator as like a bucket, and we are throwing 
 *      everything into that bucket.
 *    - We have accumulator & current value, and the reduce will run once
 *      for each element in this array. So, we have 5 elements in the array
 *      and we are going to add each element one by one to the bucket to
 *      make a single "sum" result.
 *      - Loop-1: 0(accumulator)    + 2(current element)
 *      - Loop-2: 2(accumulator)    + 333(current element)
 *      - Loop-3: 335(accumulator)  + 9(current element)
 *      - Loop-4: 344(accumulator)  + 811(current element)
 *      - Loop-5: 1155(accumulator) + 9(current element)
 *      - Output: 1164(accumulator)
*/
let numbers = [2, 333, 9, 811, 9]
let sumOfNums = numbers.reduce((acc, c) => acc + c, 0);
console.log(sumOfNums);


/**
 * 13. Create a function that takes in an array of numbers. Return a new
 *    array containing every even number from the original array 
 *    (do not use map or filter)
*/

function newArrEven(arr) {
    let newArr = [];
    arr.forEach((item, i) => {
        if(item % 2 === 0) {
            newArr.push(item);
        }
    })
    return newArr;
}
console.log(newArrEven([1, 2, 3, 4, 5]));


/**
 * 14. Create and array of tv shows. Loop through and print each show to the console
*/
let powerRangers = ["mighty morphin", "alien rangers", "zeo"]
powerRangers.forEach((show, chickenButt) => console.log(show, chickenButt));

/**
 * 15. Create and array of numbers
 *    Return a new array of numbers that includes every even number from 
 *    the previous Arrays
*/

let num = [2, 7, 118, 18, 9]
// function onlyEvens(arr) {
//     return arr.filter(num => num % 2 === 0)
// }
let onlyEvens = arr => arr.filter(morphoneTime => morphoneTime % 2 === 0)
console.log(onlyEvens(num));


/**
 * 16. Create a function that takes in an array of numbers
 *    Alert the sum of the second lowest and the second highest number
*/
function secondLowAndHigh(arr) {
    let sorted = arr.sort((a, b) => a-b)
    alert(sorted[1] + sorted[sorted.length - 2])
}
secondLowAndHigh([2, 3, 4, 5, 1]);



/**
 * 17. Create and array of numbers. Sum all of the numbers. Alert the sum.
*/
let arr = [3, 4, 5, 2, 3]
console.log(arr.reduce((accumulator, currentVal) => accumulator + currentVal, 0));


/**
 * 18. Create a function that takes in an array of numbers
 *    Return a new array of numbers that is every original number squared
*/
let originalNum = [3, 4, 5, 2, 3]
let newArr = originalNum.map(num => num * num);
console.log(newArr);


/**
 * 19. Create a function that takes string
 *    Print the reverse of that string to the console
*/
function unoReverse(str) {
    console.log(str.split("").reverse().join(""));
}
unoReverse("aslam");

/**
 * 20. Create a function that takes in a string
 *    Alert if the string is a palindrome or not
*/
let palindromeCheck = str => str === str.split("").reverse().join("");
console.log(palindromeCheck("nitin"));


/**
 * 21. Your pokemon party order which is a list of pokemon has been leaked to
 *    Misty. Please create a function that reverses your list and prints it 
 *    to the console. 
*/

function reverseParty(arr) {
    return arr.reverse();
}

console.log(reverseParty(['bulba', 'pika', 'butter']));


/**
 * 22. Given two integer arrays a, b, both of length >= 1, create a program that 
 *    returns true if the sum of the squares of each element in a is strictly 
 *    greater than the sum of the cubes of each element in b.
*/

function compareArr(a, b) {
    return a.reduce((acc, curr) => acc + curr**2, 0) > b.reduce((acc, curr) => acc + curr**3, 0); 
}

console.log(compareArr([2, 2, 2], [2, 2, 2]));
// [2^2 + 2^2 + 2^2 = 12] > [2^3 + 2^3 + 2^3 = 24] => False
console.log(compareArr([3, 3, 3], [2, 2, 2]));
// [3^2 + 3^2 + 3^2 = 27] > [2^3 + 2^3 + 2^3 = 24] => True


/**
 * 23. Return a new array consisting of elements which are multiple of their own 
 *    index in input array (length > 1).
 *    [22, -6, 32, 82, 9, 25] =>  [-6, 32, 25]
 *    [68, -1, 1, -7, 10, 10] => [-1, 10]
 *    
 * Hint: Either map() or filter()
*/

function isMultiple(arr) {
    return arr.filter((ele, idx) => ele % idx == 0);
}
console.log(isMultiple([22, -6, 32, 82, 9, 25]));


/**
 * 24. Given an array of integers as strings and numbers, return the sum of 
 *    the array values as if all were numbers. Return your answer as a number.
 *    ["2", "5", "11", 4] => 22
*/


/**
 * Wrong Way:
 * function couldBeNumSum(arr) {
 *     return arr.reduce((acc, c) => acc + c, 0);
 * }
 * console.log(couldBeNumSum(["2", "5", "11", 4])); // 025114
*/


/**
 * Correct Way:
*/
function couldBeNumSum(arr) {
    return arr.reduce((acc, c) => acc + Number(c), 0);
}
console.log(couldBeNumSum(["2", "5", "11", 4])); // 22