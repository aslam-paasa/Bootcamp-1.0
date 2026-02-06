/**
 * Write an ES6 fn that takes an array of objects representing products
 * and returns an array with the product names in all lowercase letters
 * using the map method.
*/

const products = [
    { name: 'Lip Balm', stock: 100 },
    { name: 'PERFUME', stock: 400 },
    { name: 'Socks', stock: 200 },
]

console.log(getProductNamesInLowerCase(products)); // Output: ["lip balm", "perfume", "socks"]