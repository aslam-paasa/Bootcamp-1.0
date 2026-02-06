//custom filter
Array.prototype.myFilter = function (cb) {
    let oarr = this;
    let res = [];

    for (let i = 0; i < oarr.length; i++) {
        let v = oarr[i];
        let rbv = cb(v, i, oarr);

        if (rbv == true) {
            res.push(v);
        }
    }
    return res;
}

// filter is itself a function
// filter takes as input a callback function
// callback function takes 3 parameters (v, i, oarr)
// filter will call the callback multiple times (once for each value)
// for each run of callback, filter will pass v, i, and original array to callback
// callback will process the value and index and returns a single boolean value (true/false)
// single value returned by each run of callback will be used by filter
// whenever a true is received by filter (returned by callback) then filter adds the 'v' to a new array
// Filters returns the new array
// length of returned array is equal to number of trues returned by callback

// original filter
// let arr = [2, 5, 9, 8, 15, 11, 6];
// let oarr = arr.filter(function(v, i, oarr){
//     console.log(v + " @ " + i + " [" + oarr + "]");
//     if(v % 2 == 1){
//         return true;
//     } else {
//         return false;
//     }
// })
// console.log(oarr);


// custom filter
let arr = [2, 5, 9, 8, 15, 11, 6];
let oarr = arr.myFilter(function (v, i, oarr) {
    console.log(v + " @ " + i + " [" + oarr + "]");
    if (v % 2 == 1) {
        return true;
    } else {
        return false;
    }
})
console.log(oarr);