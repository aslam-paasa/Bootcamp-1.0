/**
 * JavaScript switch Case:
 * 
 * What is switch case?
 * - switch case ek conditional branching statement hai - just like if-else.
 * - But it's super handy when we have to check multiple fixed values for a
 *   single variable.
 * 
 * - Think of it like:
 *   "Agar yeh value hai to ye karo... Agar wo value hai to wo karo..."
*/


/**
 * Syntax:
 * switch (expression) {
 *   case value1:
 *        logic if expression === value1
 *        break;
 *   case value2:
 *        logic if expression === value2
 *        break;
 *   default:
 *        logic if expression doesn't match any case
 * }
*/


/**
 * Example-1: Match with Sanket
*/
let name = "Sanket";

switch (name) {
    case "Sarthak":
        console.log("Working at PhonePe");
        break;

    case "Sanket":
        console.log("Working at Google");
        break;

    case "JD":
        console.log("Working at Microsoft");
        break;

    default:
        console.log("Don't know the company");
}



/**
 * Example-2: No case matched
*/
let name2 = "Sunny";

switch (name2) {
    case "Sarthak":
        console.log("Working at PhonePe");
        break;

    case "Sanket":
        console.log("Working at Google");
        break;

    case "JD":
        console.log("Working at Microsoft");
        break;

    default:
        console.log("Don't know the company");
}



/**
 * Example-3: No break statement
*/
let name3 = "Sanket";

switch (name3) {
    case "Sarthak":
        console.log("Working at PhonePe");
        break;

    case "Sanket":
        console.log("Working at Google");
    // 👇 No break here

    case "JD":
        console.log("Working at Microsoft");
        break;

    default:
        console.log("Don't know the company");
}
