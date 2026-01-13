/**
 * Variables:
*/

/**
 * Q. Declare a variable, reassign it to your favorite food, and alert the 
 *    value
*/
let favFood = "pho"
favFood = "Dominos"
alert(favFood);

/**
 * Q. Declare a variable, assign it a string, alert the second character 
 *    in the string (Use your google-fu and the MDN)
*/
let str = "Hello, world!"
alert(str.charAt(1));

/**
 * Functions:
*/

/**
 * Q. Create a function that takes in 3 numbers. Divide the first two 
 *    numbers and multiply the last. Alert the product. Call the function.
*/
function divideAndMultiply(num1, num2, num3) {
    alert((num1/num2 * num3).toFixed(2)); // ans will be in 2-decimal places
}
divideAndMultiply(2, 3, 4); // 2.67

/**
 * Q. Create a function that takes in 1 number. Console log the cube root 
 *    of the number. Call the function.
*/
function cubeRootNum(num) {
    console.log(Math.cbrt(num));
}
cubeRootNum(12);

/**
 * Conditionals:
*/

/**
 * Q. Create a function that takes in a month. If it is a summer month 
 *    alert "YAY". If another other month, alert "Booo"
*/
function summerMonthCheck(month) {
    let lowerCaseMonth = month.toLowerCase();
    if(lowerCaseMonth === 'june' || lowerCaseMonth === 'july' || lowerCaseMonth === 'august' || lowerCaseMonth === 'august') {
        alert("Yay!");
    } else {
        alert("Booo!");
    }
}
summerMonthCheck('july');

/**
 * Loops:
*/

/**
 * Q. Create a function that takes in a number. Console log every number 
 *    from 1 to that number while skipping multiples of 5.
*/
function skip5(num) {
    for(let i = 1; i <= num; i++) {
        if(i % 5 !== 0) {
            console.log(i);
            
        }
    }
}