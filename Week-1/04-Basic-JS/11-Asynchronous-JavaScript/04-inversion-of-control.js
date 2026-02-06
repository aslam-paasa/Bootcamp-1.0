/**
 * Inversion of Control is another problem which using callbacks.
 * IOC is like you loose the control of your code when we are using callbacks.
*/

const cart = ["shoes", "pants", "kurta"];

/**
 * => In this code, we are creating an order and we take this callback function.
 *    
 *    function() {
 *       api.proceedToPayment()
 *    };
 * 
 * => And give it to createOrder() API, and we as a developer are sitting back and
 *    blindly trusting createOrder() API.
 * => We are expecting that createOrder API at some point of time will create an 
 *    order and call our function back, and this is very risky, because this 
 *    proceedToPayment() is an important piece of our code, and we gave the control
 *    of our program createOrder() API, and now it is the responsibility of createOrder()
 *    API to call our function back and we are blindly trusting this API.
 * => createOrder() API must have been written by some other developer and it may contain
 *    a lot of bug. For example, what if our callback function was never called, because 
 *    we don't know know the createOrder() API, some other developer wrote it and we are 
 *    blindly trusting it or what if our callback function i.e. proceedToPayment() called
 *    twice.
 * => We are trying to say, whenever we have this callback function and we pass it to some
 *    other function, we are giving control of our function(our piece of written code to 
 *    some other code).
*/

api.createOrder(cart, function() {
    api.proceedToPayment()
})

/**
 * We have learnt what is Inversion of Control.
 * Later we will see how this inversion of control is handled in our code.
 */ 