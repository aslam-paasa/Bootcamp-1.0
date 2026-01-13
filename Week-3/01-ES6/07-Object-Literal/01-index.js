/**
 * Dynamic fields in an Object/Computed property syntax:
*/

let key = "ram";
const obj = { [key]: 122 };
console.log(obj);


const keyIsComingFromSomewhere = (keyname) => ({ [keyname]: "anotherValue" });
console.log(keyIsComingFromSomewhere("mohammad"));


/**
 * Object literals/Shorthand property-value:
*/
let aaloo = 1;
let bhaaloo = 2;

const obj1 = { aaloo: aaloo, bhaaloo: bhaaloo };
console.log(obj1);

const obj2 = { aaloo, bhaaloo };
console.log(obj2);



const meraNaamJoker = "joker"
const jokerTeacher = { name: meraNaamJoker }
console.log(jokerTeacher);



/**
 * Template Literal:
*/
let name = 'Tanay'
let line = 'Hello ' + name + " !"
console.log(line);

const helloTemp = `Hello ${name} !`
console.log(helloTemp);


const giveMeFive = () => 5
const line2 = `Hey, my roll is ${giveMeFive()}`
console.log(line2);
