/**
 * Why do we need Arrow Fn?
 * Shorter Syntax: Arrow functions allow you to write anonymous functions
 * in a more concise way, especially when the function body is small and
 * simple.
*/

/**
 * Challenge:
 * How would you write this with the least amout of characters?
*/

function add22andReturn(num) {
    let sum = 0;
    sum = sum + 22;
    return sum;
}
console.log(add22andReturn(22));



/**
 * Phases: Normal Function to Arrow Fn:
*/

/**
 * Phase-1:
*/
const add22andReturn1 = (num) => {
    let sum = 0;
    sum = num + 22;
    return sum;
}
console.log(add22andReturn1(22));

/**
 * Phase-2:
*/
const add22andReturn2 = num => {
    let sum = 0;
    sum = num + 22;
    return sum;
}
console.log(add22andReturn2(22));


/**
 * Phase-3:
*/
const add22andReturn3 = num => {
    return num + 22;
}
console.log(add22andReturn3(22));


/**
 * Phase-4
*/
const add22andReturn4 = num => num + 22;
console.log(add22andReturn4(22));