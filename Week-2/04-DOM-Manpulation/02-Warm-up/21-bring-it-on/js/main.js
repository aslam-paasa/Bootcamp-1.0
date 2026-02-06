/**
 * Variables:
*/

/**
 * Q. Create a variable and alert log the value
*/
let num = 10;
alert(num);

/**
 * Q. Create a variable, add -15 to it, and print the value to the console
*/
num += -15;
console.log(num);

/**
 * Q. Create a function that multiplys 4 numbers and alerts the product
*/
function multiplyFourNumbers(n1, n2, n3, n4) {
    alert(n1 * n2 * n3 * n4);
}
multiplyFourNumbers(1, 2, 3, 4);

/**
 * Q. Create a function that divides one number by another and returns the remainder plus 10
*/
function divideOneNumberByAnother(n1, n2) {
    return n1 % n2 + 10;
}
console.log(divideOneNumberByAnother(10, 2));

/**
 * Q. Create a function that adds three numbers and if the sum is greater than 1000 alert "Block Party"
*/
function addThreeNumbers(n1, n2, n3) {
    if(n1 + n2 + n3 > 1000) {
        alert("Block Party");
    }
}
addThreeNumbers(100, 200, 300);

/**
 * Q. Create a function that takes in a word and a number. Console log the word x cubed times where x was the number passed in
*/
function wordAndNumber(word, num) {
    console.log(word.repeat(num));
}
wordAndNumber("Hello", 3);