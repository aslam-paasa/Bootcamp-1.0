/**
 * Filter Function:
 * - Filter function is used to filter the elements of an array based on a 
 *   condition. If the condition is true, the element is included in the 
 *   new array, otherwise it is excluded. 
*/


/**
 * Q. Ek array hai, aur uss array mai sirf even numbers ko filter karo.
*/
const arr = [1, 2, 3, 4, 5];

const even = arr.filter((item, index, array) => {
    if(item % 2 == 0){
        return true;
    } else {
        return false;
    }
})
console.log(even);



/**
 * Q. Ek array hai, aur uss array mai sirf numbers greater than 3 ko filter 
 *    karo.
*/
const numbers =  [1, 2, 3, 4, 5];

const newNums = numbers.filter((item, index, array) => {
    return item > 3; 
}) 
console.log(newNums); // [ 4, 5 ]


/**
 * Q. Array mai jitne bhi elements hai, unme se jinka naam k 'a' aa rha 
 *    hai usko hata do.
*/
const filterNames = ["Sumeet", "Amit", "Inderjit", "Daya", "Kunal", "Aryan"];

const filteredNames = filterNames.filter((item, index, array) => {
    return !item.includes("a");
})
console.log(filteredNames);


/**
 * Q. Aise name ko remove karo jinme do ya do se jyda baar 'a' aa rha hai.
 *    a. Agar naam ek hai to do mai split hoga
 *    b. Agar naam do hai to teen mai split hoga
*/

const filterName = ['harsh', 'abhay', 'sumit', 'anushka', 'radhika'];

const filteredName = filterName.filter((item, index, array) => {
    if(item.split('a').length <= 2){
        return true;
    } else {
        return false;
    }
})
console.log(filteredName);


/**
 * Q. Aise age ko filter karo jinki gender F hai.
*/
const females = [
    { name: "A", age: 14, gender: "M" },
    { name: "B", age: 34, gender: "M" },
    { name: "C", age: 24, gender: "F" },
    { name: "D", age: 40, gender: "F" },
    { name: "E", age: 44, gender: "M" },
    { name: "F", age: 28, gender: "F" },
    { name: "G", age: 36, gender: "M" },
    { name: "H", age: 27, gender: "F" }
];

/**
 * Way-1 : Normal function
*/
let femalesAges = females.filter(function (v, i, oarr) {
    if (v.gender == "F") {
        return true;
    } else {
        return false;
    }
}).map(function (v, i, oarr) {
    return v.age;
});
console.log(femalesAges);
//ye humein sirf females return krega to ab females k upar map laga denge


/**
 * Way-2 : Using arrow function
*/
let femalesAgesUsingArrow = females.filter((v, i, oarr) => v.gender == 'F').map((v, i, oarr) => v.age);
console.log(femalesAgesUsingArrow);







