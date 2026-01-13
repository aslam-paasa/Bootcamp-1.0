Array.prototype.myMap = function (callback) {
    let res = [];
    for (let i = 0; i < this.length; i++) {
        let val = this[i];
        let rv = callback(val, i, this);
        res.push(rv);
    }
    return res;
}

// Map is itself a function
// Map returns a new array equal in length to original array
// Map takes as input a callback function
// The callback function takes 3 parameter (v, i, arr)

// map will call the callback multiple times (once for each value)
// for each run of callback, map will pass v and i to callback
// callback will process the value and index and return a single value
// single value returned by each run of callback will be collected in a new array by map
// Map returns that new array
// length of returned array is equal to the original array


// normal map function :
let arr = [2, 5, 9, 8, 15, 11, 6];
let sqarr = arr.map((v, i, oarr) => v * v);
console.log("Normal map function :");
console.log(sqarr);

// myMap function :
let arr1 = [2, 5, 9, 8, 15, 11, 6];
let sqarr1 = arr.myMap((v, i, oarr) => v * v);
console.log("myMap function :");
console.log(sqarr);


