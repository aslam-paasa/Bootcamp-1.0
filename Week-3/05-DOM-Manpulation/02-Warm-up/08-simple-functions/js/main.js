/**
 * Easy:
*/

/**
 * Q. Create a function that adds two numbers and log the sum
*/
function addTwoNumbers(num1, num2) {
    let sum = num1 + num2;
    console.log(sum);
}

addTwoNumbers(2, 3);
addTwoNumbers(10, 22);

/**
 * Q. Create a function that multiplys three numbers and console logs the product
*/
function multiplyThreeNumbers(num1, num2, num3) {
    console.log(num1 * num2 * num3);
}

multiplyThreeNumbers(3, 6, 9);

/**
 * Q. Create a function that divides two numbers and returns the ???
*/
function divideTwoNumbers(num1, num2) {
    return num1 / num2;
}

/**
 * Q. Create a function that subtracts two numbers and alerts the difference
*/
function subTwoNumAlert(num1, num2) {
    alert(num1 - num2);
}
subTwoNumAlert(200, 50);

/**
 * Q. Create a function that divides three numbers and console logs the quotient
*/
function divideThreeAndLog(num1, num2, num3) {
    console.log(num1/num2/num3);
}
divideThreeAndLog(12, 4, 2);

/**
 * Q. Create a function that multiplys three numbers and returns the product
*/
function multiThreeAndReturn(n1, n2, n3) {
    return n1 * n2 * n3;
}
multiThreeAndReturn(2, 3, 4);

/**
 * Medium:
*/

/**
 * Q. Create a function that takes in three numbers. Add the first two numbers and return the remainder of dividing the sum of the first two numbers by the third number
*/
function addTwoAndDivide(n1, n2, n3) {
    return (n1 + n2) % n3;
}
multiThreeAndReturn(3, 3, 2);



/**
 * Variables:
*/

/**
 * Q. Create a variable and console log the value
*/
let num = 5;
console.log(num);

/**
 * Q. Create a variable, add 10 to it, and alert the value
*/
let otherNum = 20;
otherNum += 10;
alert(otherNum);



/**
 * Functions:
*/

/**
 * Q. Create a function that subtracts 4 numbers and alerts the difference
*/
function subFourAlert(n1, n2, n3, n4) {
    alert(n1 - n2 - n3 - n4);
}

/**
 * Q. Create a function that divides one number by another and returns the remainder
*/
function dividesAndRemainder(n1, n2) {
    return n1 % n2;
}



/**
 * Conditionals:
*/

/**
 * Q. Create a function that adds two numbers and if the sum is greater than 50 alert Jumanji
*/
function sumGreaterJumanji(n1, n2) {
    let sum = n1 + n2;
    if(sum > 50) {
        alert("Jumanji");
    }
}

/**
 * Q. Create a function that multiplys three numbers and if the product is divisible by 3 alert ZEBRA
*/
function multiAndDivsByThreeAlertZebra(n1, n2, n3) {
    let product = n1 * n2 * n3;
    if(product % 3 === 0) {
        alert("ZEBRA");
    }
}


/**
 * Loops:
*/

/**
 * Q. Create a function that takes in a word and a number. Console log the word x times where x was the number passed in
*/
function logWordXTimes(word, num) {
    for(let i = 1; i <= num; i++) {
        console.log(word);
    }
}
logWordXTimes("dominos", 21);



/**
 * Loops:
*/ 

/**
 * What are loops?
 * 1. Repeat an action some number of times.
 * 2. Three main types of loops in JS.
 *    a. For
 *    b. While
 *    c. Do while
 * 3. Each type offers a different way to determine the start and end
 *    points of a loop.
*/

/**
 * For-loop:
 * - for([initialExpression]; [conditionExpression]; [incrementExpression]) {
 *      // do stuff
 *   }
 * 
 * - for(let i = 1; i < 5; i++) {
 *      console.log(i);
 *   }
*/

/**
 * While-loop:
 * - let count = 0;
 *   while(count < 5) {
 *      console.log(count);
 *      count++;
 *   }
*/


/**
 * Q. Create a function that has a loop that prints '21' 21 times to the
 *    console and then call that function
*/

// function savege21() {
//     for(let i = 1; i <= 21; i++) {
//         console.log(i);
//     }
// }
// savege21();


