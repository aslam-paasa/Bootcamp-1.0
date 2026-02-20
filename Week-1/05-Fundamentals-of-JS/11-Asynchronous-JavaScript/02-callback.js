/**
 * => Suppose we are building an Asynchronous Website and E-Commerce wesbite 
 *    connot exist without a cart.
 * => Inside the cart we will add array of items to the cart:
*/
const cart = ["shoes", "pants", "kurta"];

/**
 * Once we hvae this items into the cart:
 * 1. We need to create an order.
 * 2. Proceed to payment
 * 
 * Consider we have access to 2 backend api methods:
 * 1. Create Order API => api.createOrder()
 * 2. Payment API => api.proceedToPayment()
 * => And there is a dependency between these 2 APIs. 
 * => This is an Async operation so here callback can come into picture and 
 *    help us to write code for this pattern. 
*/

/**
 * => Take the callback function and pass along with the cart item to this 
 *    createOrder() API. And we have passed a callback function to createOrder()
 *    API.
 * => Now it is the responsibility of createOrder API to create an Order and then 
 *    call this function back:
 * 
 *       function() {
 *          api.proceedToPayment()
 *       };
 * 
 * =>  And this is the way to handle Async operations
 * */

api.createOrder(cart, function () {
    api.proceedToPayment(function () {
        api.showOrderSummary()
    })
})


/**
 * Q. Now what if after we proceed to payment (payment is successful) we need to 
 *    show a order summary page?
 * => For that we have another API: showOrder() API.
 * => We have to call this API only after we are done with the payment:
 * 
 *       function() {
 *          api.showOrderSummary()
 *       };
 * 
 * =>  We have to pass this callback function into proceedToSummary().
 * => Now it is the responsibility of proceedToPayment() API to complete the payment
 *    and call this API. And this is how we manage the dependency between this whole
 *    flow one after another.
 * 
 * Note: Now if we want to update the wallet, the wallet will update only after we 
 *       show the summary:
 * 
 *       function() {
 *          api.updateWallet()
 *       };
*/