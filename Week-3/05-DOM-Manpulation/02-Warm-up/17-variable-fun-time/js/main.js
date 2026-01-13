/**
 * Easy:
*/

/**
 * Q. Create a variable and assign it a string that is a number
*/
let num = "5";

/**
 * Q. Add 10 to that number - how?!? https://media.giphy.com/media/lkdH8FmImcGoylv3t3/giphy.gif
*/
// num = num + 10; // 510 
num = Number(num) + 10;

/**
 * Q. Print that number to the console
*/
console.log(num);


/**
 * Q. Why did we not get 15?
 * => Concatenation
 * => Whenever we try to add something to a string, string is a piece
 *    of text. So, we took our string of "5" and snap on to a 10 at the
 *    end, and created "510".
 * => So, make it a number: 
 *    a. num = Number(num) + 10;
 *    b. num = parseInt(num) + 10;  
*/
// num = Number(num) + 10;
// alert(num); // 15


/**
 * Medium:
*/

/**
 * Q. Create a variable that holds the h1
*/
let mrRightNow = document.querySelector('#mrRightNow');

/**
 * Q. Add an event listener to that element that places the product of the two previous variables in the DOM
*/
// document.querySelector('#mrRightNow').addEventListener('click', add21)

// function add21() {
//     //create a variable that holds a value from the input
//     let inputVal = Number(document.querySelector('input').value);
//     //add 21 to that number
//     inputVal = inputVal + 21;
//     //alert that number
//     alert(inputVal);
// }

//--- Hard

/**
 * Q. Create a variable that holds the h1
*/
let mrRightNow2 = document.querySelector('#mrRightNow2');

/**
 * Q. Add an event listener to that element that places the product of the two previous variables in the DOM
*/
mrRightNow2.addEventListener('click', stunt) 

function stunt() {
    document.querySelector('#needSomeTLC').innerText = num * num;
}
