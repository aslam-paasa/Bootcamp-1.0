/**
 * Medium: Event Listener
*/

/**
 * Q. Create a variable that holds a value from the input, and assign it to
 *    a variable.
*/
let inputedVal = document.querySelector('#danceDanceRevolution').value;
inputedVal += 25;
alert(inputedVal);

/**
 * Hard: Event Listener
*/

/**
 * Q. Create a variable that holds the h1, and add an event listener to it
 *    that logs the sum of the two previous variables.
*/
let h1Dom = document.querySelector('h1');
h1Dom.addEventListener('click', sum);

function sum() {
    // intial value is empty string, that's why it is concatenating number
    // console.log(num + inputedVal); 
    console.log(Number(num) + Number(inputedVal));
}