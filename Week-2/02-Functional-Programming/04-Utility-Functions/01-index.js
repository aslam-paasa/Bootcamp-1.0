/**
 * Most used utility functions:
 * - Can take functions as arguments
 * - return functions
 * - or both
*/


/**
 * Understand:
*/
const colors = ["red", "green", "blue", "yellow", "orange"];
const printColor = color => console.log(`Color is: ${color}`);
printColor(colors[0]);
printColor(colors[1]);
printColor(colors[2]);
printColor(colors[3]);
printColor(colors[4] + "\n");


/**
 * To create an array - a function which takes one element at a time,
 * and return a new value. And then we have to call that function with
 * one element starting from idx-0. 
*/

const colorsMessage = [];
const convertColorToColorMessage = color => `Color is: ${color}`;

/**
 * We can do the same using map() fn:
*/
colorsMessage.push(convertColorToColorMessage(colors[0]));
colorsMessage.push(convertColorToColorMessage(colors[1]));
colorsMessage.push(convertColorToColorMessage(colors[2]));
colorsMessage.push(convertColorToColorMessage(colors[4]));
console.log(colorsMessage);


/**
 * Map: We can do the same thing using map.
 * 1. function(element, index)
 *      - element: One item of the array
 *      - index: index of the current item
 *      - returns: new item for the new array
 * 2. map(functionThatTakesOneElementAtATime) // (element) => {...}
 * 3. map(orFunctionThatTakesOneElementAtATimeAndIndex) // (element, idx) => {...}
*/
const colorsMessageMap = [];
const convertColorToColorMessageMap = color => `Color is: ${color}`;

const colorsMap = colors.map(convertColorToColorMessageMap);
console.log(colorsMap);