// node 39ArraysMapAndFilter.js

/*
Ab hum ek object banaenge jisme mujhe saari aunty ki age chaiye. Uss array m uncle object v honge,
aunty object v hongi, isme mujhe aunty ki age chaiye q ki wo apni chupaati h to humein wahi pata
krni h -
*/

//array of objects
let arr = [
    {name: "A", age: 14, gender: "M"},
    {name: "B", age: 34, gender: "M"},
    {name: "C", age: 24, gender: "F"},
    {name: "D", age: 4, gender: "F"},
    {name: "E", age: 44, gender: "M"},
    {name: "F", age: 28, gender: "F"},
    {name: "G", age: 36, gender: "M"},
    {name: "H", age: 27, gender: "F"}
]

// 1) Pehle requirement h ki female chaiye
// 2) 2nd requirememt is, age of all ladies

//Way-1
// let ladies = arr.filter(person => person.gender == "F")
// console.log(ladies);
// let ladiesAges = ladies.map(l => l.age);
// console.log(ladiesAges);

//Way-2
// let ladies = arr.filter(function(v, i){
//     if(v.gender == "F"){
//         return true;
//     } else {
//         return false;
//     }
// }).map(function(v, i){
//     return v.age;
// });

// console.log(ladies);

//Way-3
let ladies = arr.filter(person => person.gender == "F").map(ladiesAges => ladiesAges.age);
console.log(ladies);    //[ 24, 4, 28, 27 ]