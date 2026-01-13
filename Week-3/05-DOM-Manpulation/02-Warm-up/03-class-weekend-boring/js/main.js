/**
 * Making Decisions:
 * - It's either TRUE or FALSE.
 * - If you are greater than 18 you are an adult.
 * - if(age > 18) {
 *      console.log("You are an adult");
 *   }
*/

/** 
 * Comparisons: Equality
 * - Are two things equal?
 *   a. 9 === 9 // true
 *   b. 7 === 2 // false
 *   c. "Hello" === "Hello" // true
 * 
 * Comparisons: Logical Operators
 * - x = 3
 * - Operator     Description                   Comparing     Returns
 *   a. ==        equal to                      x == 8        False
 *   b. ===       exactly equal to              x ==="3"      False
 *                (value & type)                x === 3       True
 *   c. !=        is not equal                  x != 8        True
 *   d. !==       is not equal                  x !=== "3"    True
 *                (neither value nor type)      x !== 3       False
 *   e. >         greater than                  x > 8         False
 *   f. <         less than                     x < 8         True
 *   g. >=        greater than or equal to      x >= 8        False
 *   h. <=        less than or equal to         x <= 8        True
*/

/**
 * Conditionals Syntax:
 * a. Syntax-1: If-Statement
 * -  if(conditions is true) {
 *       // Do cool stuff
 *    }
 * 
 * b. Syntax-2: If-Else Statement
 * - if(condition is true) {
 *      // Do this cool stuff
 *   } else if(condition is true) {
 *      // Do this other cool stuff
 *   } else {
 *      // Default cool stuff
 *   }
 * 
 * - Example:
 *   const pizza = "Dominos";
 *   if(pizza === "Papa Johns") {
 *      console.log("Scram!");
 *   } else if(pizza === "Dominos") {
 *      console.log("All aboard the train to flavor town");
 *   } else {
 *      console.log("What are you even doing with your life?");
 *   }
 * 
 * c. Syntax-3: Multiple If-Statements
 * - if(name === "Leon" && status === "Ballin") {
 *      // Wink at camera
 *   }
 * 
 * - if(day === "Saturday" || day === "Sunday") {
 *      // It is weekend
 *   }
*/ 

document.querySelector('#check').addEventListener('click', check)

function check() {

  const day = document.querySelector('#day').value;

  //Conditionals go here
  if(day === "Tuesday" || day === "Thursday") {
    alert("CLASS YAY!!!");
  } else if(day === "Saturday" || day === "Sunday") {
    alert("WEEKENNDDDDDD!");
  } else {
    alert("BORRRRRINNNNNGGGGG!");
  }


}
