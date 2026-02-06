// Complex Searching
Array.prototype.myFind = function (cb) {
    let oarr = this;

    for (let i = 0; i < oarr.length; i++) {
        let v = oarr[i];
        let rv = cb(v, i, oarr);

        if (rv == false) {
            return v;
        }
    }
    return undefined;
}

let arr = [
    { name: "A", age: 14, gender: "M" },
    { name: "B", age: 34, gender: "M" },
    { name: "C", age: 24, gender: "F" },
    { name: "D", age: 40, gender: "F" },
    { name: "E", age: 44, gender: "M" },
    { name: "F", age: 28, gender: "F" },
    { name: "G", age: 36, gender: "M" },
    { name: "H", age: 27, gender: "F" }
];

// find gives value against first true, if there is no true then undefined

// First valid candidate ('F' and between 20 and 30)? (Ek v true to true)
let fvc = arr.find(function (v, i, oarr) {
    if (v.gender == 'F' && v.age >= 20 && v.age <= 30) {
        return true;
    } else {
        return false;
    }
});

console.log(fvc.name + "@" + fvc.age + "#" + fvc.gender);