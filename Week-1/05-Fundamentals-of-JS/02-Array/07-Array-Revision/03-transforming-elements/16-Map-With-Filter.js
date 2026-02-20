// node 37ArraysFilter.js
// true -> jb jb true return hoga tbtb true k jagha wo value de dega & false ko skip/reject kr dega
let arr = [2, 9, 18, 32, 74, 57, 63, 58];
let even = arr.filter(function(v, i){
    if(v % 2 == 0){
        return true;
    } else {
        return false;
    }
});

console.log(even);

let odd = arr.filter(v => v % 2 == 1);
console.log(odd);

let v1 = arr.filter(v => v % 2 == 1);
let v2 = arr.map(v => v % 2 == 1);
console.log(v1);
console.log(v2);