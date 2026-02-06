/**
 * Promise Creation:
 * - Promises are like a delivery person - they promise to deliver something
 *   later.
 *   a. If it goes well - they give you the product - .then()
 *   b. If it fails - they give you an error - .catch()
*/

/**
 * Real-World Setup:
 * - Imagine we're building an e-commerce app like Amazon.
 * - You:
 *   a. Add some items to the cart.
 *   b. Hit 'Place Order' - this will create an order.
 *   c. After that, you're taken to the payment page.
 * 
 * - So our flow looks like:
 *   Cart > Create Order > Proceed to Payment
*/

/**
 * How Promises work behind the scenes:
 * - We want to understand: How createOrder(cart) returns a Promise.
 * - So, let's build this thing step-by-step. 
*/

/**
 * Step-1: The Cart:
*/
const cart = ["shoes", "pants", "kurta"];


/**
 * Step-2: Consumer Code - Calling the API (Customer Placing Order)
 * a. We're calling createOrder() and expecting a Promise.
 * b. If it succeeds .then() will run.
 * c. If it fails .catch() will catch and show the error.
 * 
 * This is the 'Customer Side' (someone who uses the promise)
*/

const promise = createOrder(cart);

promise
  .then(function (orderId) {
    console.log("Order ID is:", orderId);
  })
  .catch(function (err) {
    console.log("Error:", err.message);
  });


/**
 * Step-3: Producer Code - How createOrder() returns a Promise
 * - Now let's build our own custom Promise. 
 * - We are the API developer here, lets understand what's happening behind
 *   the scenes:
 *   a. new Promise() is how we create a promise.
 *   b. It takes a function with two tools: resolve() and reject().
 *   c. You use:
 *      - resolve(data) when things go right
 *      - reject(error) when things go wrong
 * 
 * - We're wrapping the logic of order creation inside this promise, so
 *   that whoever uses createOrder() can .then() on it and get the orderId.
*/

function createOrder(cart) {
    const pr = new Promise(function (resolve, reject) {
      
      /**
       * 1. Validate Cart
      */
      if (!validateCart(cart)) {
        const err = new Error("Cart is not valid");
        return reject(err);
      }
  
      /**
       * 2. Let's pretend we called DB and created the order (dummy orderId)
      */
      const orderId = "12345";
  
      /**
       * 3. Simulate delay using setTimeout
       *    - Pretend it takes 2 seconds to process
      */
      setTimeout(() => {
        resolve(orderId);
      }, 2000);
    });
  
    return pr;
  }
  

/**
 * Step-4: Cart Validator
 * - This returns false, so your promise will fail and go to .catch().
 * - This is the 'Producer Side' (someone who creates the promise)
 * 
 * Note: If we don't handle errors using .catch(), we'll see scary red
 *       errors in the console.
*/

function validateCart(cart) {
    // return false; // Assume cart is invalid
    return true; // Assume cart is valid
}


/**
 * Example: Topwear Cart (Valid Cart)
 * 1. User adds topwear items to cart
 * 2. User initiates order creation
 * 3. Cart is validated
 * 4. Order is created and orderId generated
 * 5. OrderId is returned after 2 seconds
 * 6. User can proceed to payment with orderId
*/
const topwear = ["shirt", "t-shirt", "polo-shirt", "hoodie"];

function validateItems(topwear) {
  return true; // Valid cart triggers success
}

function createOrderItems(topwear) {
  return new Promise(function (resolve, reject) {
    if (!validateItems(topwear)) {
      const err = new Error("Cart is not valid");
      return reject(err); // Go to .catch()
    }

    const orderId = "8345";
    setTimeout(() => {
      resolve(orderId); // Go to .then()
    }, 2000);
  });
}

createOrderItems(topwear)
  .then(function (orderId) {
    console.log("Order ID is:", orderId);
  })
  .catch(function (err) {
    console.log("Error:", err.message);
  });



/**
 * Example: Fetch user data from JSONPlaceholder using Promises
 * 1. UserId is 1
 * 2. Create a function that returns a promise using fetch()
 * 3. Consume the promise with .then() and .catch()
*/

const userId = 1;

function fetchUser(userId) {
  return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
}

fetchUser(userId)
  .then(function (response) {
    return response.json();
  })
  .then(function (userData) {
    console.log("User Data:", userData);
  })
  .catch(function (err) {
    console.log("Error fetching user:", err.message);
  });
