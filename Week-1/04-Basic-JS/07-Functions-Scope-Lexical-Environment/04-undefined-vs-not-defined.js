/**
 * undefined vs not defined:
 * - undefined is special keyword in JS and it is not there in other
 *   languages. It has a lot to do with how JS Code is executed.
 * - We have studied earlier that JS Code is executed in a different
 *   way. It creates a global execution context and allocates memory
 *   to all the variables and functions, even before a single line of
 *   code is executed. So, undefined comes into picture here only.
 * 
 * - var a = 10;
 * - During Memory Creation Phase, when the JS Engine scanning the 
 *   variables & functions, it is allocating 'undefined' memory. It
 *   is a placeholder which is kept for the timebeing until the 
 *   variable is assigned some other value.
 * 
 * - console.log(x);
 * - For this 'x', we have not allocated any memory in Memory Creation
 *   Phase. So, if we try to find 'x' we won't find anything and that 
 *   is known as not-defined.
 * */ 

var a;

console.log(a);
a = 10;

if(a === undefined) {
    console.log('a is undefined');
} else {
    console.log('a is not undefined');
    
}