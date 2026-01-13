/**
 * Immutability:
 * - Do not change any data, return a new copy
 * - In JavaScript, function arguments are references to actual data
*/


var car1 = ["Tata Nexon", "Hundai Exter", "Maruti Fronx", "Maruti Alto"];
var car2 = car1;

console.log("car1: " + car1);
console.log("car2: " + car2 + "\n");


car2[3] = "Hundai Verna";
console.log("car1: " + car1);
console.log("car2: " + car2 + "\n");


/**
 * Issue: Don't mutate/change the data which is given
 * - We have copied car2 from car1, and done some changes in car2, but
 *   the changes are also reflecting in car1.
 * 
 *   car1: Tata Nexon,Hundai Exter,Maruti Fronx,Maruti Alto
 *   car2: Tata Nexon,Hundai Exter,Maruti Fronx,Maruti Alto
 *                                                 |
 *                                                 V
 *   car1: Tata Nexon,Hundai Exter,Maruti Fronx,Hundai Verna
 *   car2: Tata Nexon,Hundai Exter,Maruti Fronx,Hundai Verna
 * 
 * Reason: 
 * - Car1 uss array ko represent kr rha hai jiske andr saare car k names
 *   hai.
 * - Fir humne Car2 = Car1 kiya, which means Car2 pointing to the content
 *   of Car1(memory location of Car1).
 * - We done some changes in Car2 i.e. car2[3] = "Hundai Verna", which
 *   means changes will reflect in Car1 because Car2 is simply pointing
 *   to the content of Car1.
 * 
 * Solution: Make a new copy (with previous data)
 * - Spread Operator: This will copy the entire content of Car1 and 
 *   assign it to Car3 with new reference.
*/

var car3 = [...car1];
car3[3] = "Tata Seltos";
console.log("car1: " + car1);
console.log("car3: " + car3 + "\n");


/**
 * Challenge:
 * 1. Take an object with your mother's name and your age. Now create an
 *    object for your sibling by age difference.
*/
const anObj = { name: "tanay", age: 31 };
const sisObj = { ...anObj, age: anObj.age - 4};
console.log(anObj);
console.log(sisObj + "\n");


/**
 * Challenge:
 * 2. Take an array with 5 colors. Create another array by adding 2 more
 *    colors to it.
*/
const orignalArr = ["red", "green", "blue", "black", "yellow"];
const copyArr = [...orignalArr, "purple", "orange"];
console.log(orignalArr);
console.log(copyArr);

