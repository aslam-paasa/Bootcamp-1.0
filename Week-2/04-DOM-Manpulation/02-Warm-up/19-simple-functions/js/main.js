/**
 * Easy:
*/

/**
 * Q. Create a function that adds two numbers and alerts the difference
*/
function addTwoAndAlert(num1, num2) {
    alert(num1 + num2);
}
addTwoAndAlert(10, 20);

/**
 * Q. Create a function that divides two numbers and console logs the quotient
*/
function divideTwoAndLog(num1, num2) {
    console.log(num1 / num2);
}
divideTwoAndLog(6, 3);

/**
 * Q. Create a function that multiplys four numbers and returns the product
*/
function multiFourAndReturn(num1, num2, num3, num4) {
    return num1*num2*num3*num4;
}
multiFourAndReturn(1,2,3,4);

/**
 * Medium:
*/

/**
 * Q. Create a function that takes in four numbers. Add the first two numbers and return the remainder of dividing the sum of the first two numbers by the difference of the last two numbers
*/
function complicatedMath(num1, num2, num3, num4) {
    return (num1 + num2) % (num3 - num4);
}
console.log(complicatedMath(5, 5, 4, 1));


/**
 * Hard:
*/

/**
 * Q. Create a function that takes in 4 numbers. Multiply the first two numbers. If the product is greater than 100 add the sum of the last two numbers and console log the value. If the product is less that 100, subtract the difference of the last two numbers and console log the value. If the product is 100, multiply the first three numbers together and alert the remainder of dividing the fourth number
*/
