/**
 * Custom every() Method:
 * - Check if all elements satisfy the condition.
 * - Return true if all elements satisfy the condition.
 * - Return false if any element does not satisfy the condition.
*/


Array.prototype.myEvery = function (cb) {
    let oarr = this;
    let res = true;

    for (let i = 0; i < oarr.length; i++) {
        let v = oarr[i];
        let rbv = cb(v, i, oarr);

        if (rbv == false) {
            res = false;
            break;
        }
    }

    return res;
}


const arr = [1, 2, 3, 4, 5];
const result = arr.myEvery(function (v, i, oarr) {
    return v > 0;
});

console.log(result); // true


const arr2 = [1, 2, 3, 4, 5];
const result2 = arr2.myEvery(function (v, i, oarr) {
    return v > 3;
});

console.log(result2); // false

