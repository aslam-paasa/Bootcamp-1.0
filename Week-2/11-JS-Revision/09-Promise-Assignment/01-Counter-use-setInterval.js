/**
 * => We have already covered this in the second lesson, but as an easy recap try to
 *    code a counter in Javascript It should go up as time goes by in intervals of 
 *    one second.
*/

let i = 1;
setInterval(() => {
  console.log(i);
  i++;
}, 1000);


/**
 * => Here's how the function works:
 *    (a) Convert the input strings to lowercase, split them into arrays so that we 
 *        can sort them, and then join them back into strings.
 *    (b) Compare the two strings and return true if they are anagrams of each other, 
 *        and false if they are not.
*/