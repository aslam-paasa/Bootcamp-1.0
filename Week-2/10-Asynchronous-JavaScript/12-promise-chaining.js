/**
 * Promise Chaining:
 * => Now we will understand the complex part : "Promise Chaining".
*/

/**
 * Consumer:
*/
const cart = ["shoes", "pants", "kurta"];

createOrder(cart)
    .then(function (orderId) {
        console.log(orderId);
        return orderId;
    })
    .then(function (orderId) {
        return proceedToPayment(orderId);
    })
    .then(function (paymentInfo) {
        console.log(paymentInfo);
    })
    .catch(function (err) {
        console.log(err.message);
    });


/**
 * Producer:
*/
function createOrder(orderId) {

    const pr = new Promise(function (resolve, reject) {
        /**
         * a. createOrder
         * b. validateCart
         * c. orderId
        */
        if (!validateCart(cart)) {
            const err = new Error("Cart is not valid");
            reject(err);
        }

        /**
         * logic for createOrder
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

/**
 * validateCart
*/
function validateCart(cart) {
    /**
     * reject promise => Error: Cart is not valid
     * */ 
    return false;
}


/**
 * => Right now we didn't have proceedToPayment, so let's take proceed to payment
 *    also in picture.
 * => Now with the orderId we want to proceed to payment.
 * => We will write promise chaining:
 * 
 *    createOrder(cart)
 *     .then(function (orderId) {
 *        console.log(orderId);
 *     })
 *     .then(function() {
 *        proceedToPayment(orderId); 
 *     })
 *     .catch(function(err) { 
 *        console.log(err.message);
 *     });
 * 
 * So, proceedToPayment is a promise now. proceedToPayment will have 'orderId' which
 * is passed from createOrder.
*/


/**
 * This orderId will be there in proceedToPayment:
*/  
function proceedToPayment(orderId) {
    return new Promise(function (resolve, reject) {
        resolve("Payment Successful");
    })
}