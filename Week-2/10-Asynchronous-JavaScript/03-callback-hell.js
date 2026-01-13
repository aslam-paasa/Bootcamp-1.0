/**
 * Now if we want to update the wallet, the wallet will update only after we 
 * show the summary:
 * 
 *    function() {
 *       api.updateWallet()
 *    };
 * 
 * */

const cart = ["shoes", "pants", "kurta"];

api.createOrder(cart, function () {
    api.proceedToPayment(function () {
        api.showOrderSummary(function () {
            api.updateWallet()
        })
    })
})

/**
 * Q. Can you see problem with the code?
 * => When we have a large codebase and there are so many APIs here and there and APIs 
 *    are dependent on one after another so we end up fallen into this "callback hell".
 * => Once callback inside another callback inside another api or if statement etc.., 
 *    make this "callbacks hell".
 * => And our code starts to grow horizontally instead of vertically.
 * => And this type of code is very unreadable and unmaintainable.
 * => This structure of code is known as "Pyramid of Doom".
*/