// join(): Joins all elements of an array into a string.

let str = "My name is Mohammad Aslam. I am a Software Developer. I believe in learning by doing. I need some courage and patience.";

//split, 2d array, reduce, join (without for loop)

// split the sentence
let res1 = str.split(".");
console.log(res1);

// filter the one extra space
let res2 = res1.filter(v => v.length > 0);
console.log(res2);

// trim the extra spaces
let res3 = res2.map(s => s.trim());
console.log(res3);

// convert to 2d array
let res4 = res3.map(s => s.split(" "));
console.log(res4);

// reverse array using forEach (jb sirf change krna h aur new nai banan h to map ni forEach use krnge)
res4.forEach(function(a){
    a.reverse();
});
console.log(res4);

// map again and join them with spaces (convert 2d to 1d array)
let res5 = res4.map(a => a.join(" "));
console.log();

// map again to add '.'
let res6 = res5.map(s => s + ".");
console.log(res6); 

// combine them using reduce
let res7 = res6.reduce(function(pv, cv){
    return pv + " " + cv;
});
console.log(res7);


// using everything in one line -
let res = str.split(".")
.filter(v => v.length > 0)
.map(s => s.trim())
.map(s => s.split(" "))
.map(a => a.reverse())
.map(a => a.join(" "))
.map(s => s + ".")
.reduce(function(pv, cv){
    return pv + " " + cv;
});

console.log(res);