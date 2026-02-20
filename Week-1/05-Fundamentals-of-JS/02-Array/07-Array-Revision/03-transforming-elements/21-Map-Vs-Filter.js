let products = [
    { name: "T-Shirt", price: 25 },
    { name: "Headphones", price: 125 },
    { name: "Keyboard", price: 75 },
    { name: "Monitor", price: 200 }
];

//return names of all products in upperCase who has prices >= 100
let fProducts = products.filter(p => p.price >= 100).map(p => p.name.toUpperCase());
console.log(fProducts);

// normal way
let fProducts2 = products.filter(function (v, i, oarr) {
    if (v.price >= 100) {
        return true;
    } else {
        return false;
    }
}).map(function (v, i, oarr) {
    return v.name.toUpperCase();
});
console.log(fProducts2);


// all >= 100 name uppercase and <= lowercase
let lProducts = products.map(function (v) {
    if (v.price >= 100) {
        return v.name.toUpperCase();
    } else {
        return v.name.toLowerCase();
    }
})
console.log(lProducts);