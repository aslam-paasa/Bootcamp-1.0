/**
 * Q. What will be the output and why?
*/ 

let a = 42;
{
    let a = 100;
}
console.log(a); // => 42

/**
 * Explanation:
 * 1. 'let a = 100' creates a block-scope. So, this is accessible only
 *    inside block or curly brackets, and does not affect the value of
 *    the outer variable 'a' declared with the value '42'. As a result,
 *    when 'console.log(a)' is executed outside of the block, it will
 *    take outside block and print '42'. 
*/
