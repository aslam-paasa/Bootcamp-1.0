/**
 * Handling Errors in Promises with .catch()
*/


/**
 * Scenario: E-commerce Cart + Order Flow
 * We're simulating a real-world async flow for placing an order on an
 * e-commerce website.
*/

const cart = ["shoes", "pants", "kurta"];

/**
 * We'll call an API-like function createOrder(cart) that returns a Promise. 
*/


/**
 * Consumer Side (User of the Promise):
*/

const promise = createOrder(cart);

promise
  .then(function (orderId) {
    console.log(orderId);  // Success case
  })
  .catch(function (err) {
    console.log(err.message); // Error case
  });


/**
 * Producer Side (Creator of the Promise):
 * We create a Promise manually using the Promise constructor. This is how
 * createOrder() is built under the hood:
*/

function createOrder(cart) {
    const pr = new Promise(function (resolve, reject) {
      // a. validateCart
      if (!validateCart(cart)) {
        const err = new Error("Cart is not valid");
        reject(err);  // Reject the Promise if validation fails
      }
  
      // b. createOrder logic
      const orderId = "12345";  // Simulating orderId from DB/API
      if (orderId) {
        setTimeout(() => {
          resolve(orderId);  // Fulfill the Promise
        }, 2000);
      }
    });
  
    return pr;
  }

  
/**
 * Cart Validation Function:
*/

function validateCart(cart) {
    return false; // Simulate failure (invalid cart)
}


/**
 * Problem: What if an Error happens?
 * - If the cart is not valid, we reject the Promise with:
 *   reject(new Error("Cart is not valid"));
 * 
 * - When this rejection is not handled, it shows a red error in the browser
 *   console.
*/


/**
 * Why is this a problem?
 * - If you don't handle rejections, and this code runs in production, the
 *   user sees nothing, but the console throws errors like:
 * 
 *   Uncaught (in promise) Error: Cart is not valid
 * 
 * - It silently fails - and users might think your site is broken.
*/


/**
 * Solution: Use .catch()
 * We should always write code to gracefully handle rejections using .catch():
*/

promise
  .then(function (orderId) {
    console.log(orderId);  // Order placed successfully
  })
  .catch(function (err) {
    console.log(err.message);  // Handle error like "Cart is not valid"
  });


/**
 * What's happening?
 * 1. .then() handles success (resolved promise)
 * 2. .catch() handles failure (rejected promise)
 * 
 * This is how we handle errors in Promises.
*/


/**
 * Producer Side (Creator of the Promise):
*/
function createOrder(cart) {
  const pr = new Promise(function (resolve, reject) {

    /**
     * a. validateCart
    */
    if (!validateCart(cart)) {
      const err = new Error("Cart is not valid");
      reject(err);
    }

    /**
     * b. createOrder
    */
    const orderId = "12345";
    if (orderId) {
      setTimeout(() => {
        resolve(orderId);
      }, 2000);
    }
  });

  return pr;
}

function validateCart(cart) {
  return false; // Simulate cart failure
}


/**
 * Consumer Side (User of the Promise):
*/
createOrder(cart)
  .then(function (orderId) {
    console.log(orderId);
  })
  .catch(function (err) {
    console.log(err.message); // Graceful error handling
  });

