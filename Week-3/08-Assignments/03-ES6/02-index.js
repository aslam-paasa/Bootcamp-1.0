/**
 * Create a fn that takes a product object as an argument and returns
 * a string that includes the product name, price, and a message based
 * on whether it is in stock or not.
*/

const product = {
    name: 'Socks',
    price: 249,
    inStock: true,
}


const message = formatProduct(product)
console.log(message)
// Socks costs INR 249 and is in stock.