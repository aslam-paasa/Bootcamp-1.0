/**
 * Use this URL: https://example.com/api/productlist to make a fake fetch
 * call and print the total price of all the products. A fake fetch has
 * been provided.
*/

const fakeFetch = (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === "https://example.com/api/productlist") {
                resolve({
                    status: 200,
                    message: "Success",
                    data: [
                        { itemName: "Shoes", price: 100, quantity: 2 },
                        { itemName: "Hat", price: 350, quantity: 1 },
                        { itemName: "Tshirt", price: 410, quantity: 5 }
                    ]
                });
            } else {
                reject({
                    status: 404,
                    message: "Items list not found."
                });
            }
        }, 2000);
    });
};


// Your Code here


// Output on the DOM should be:
// Total: INR 2600