function add(a, b) {
    return a + b;
}

function square(val) {
    return val * val;
}


/**
 * Let's say mujhe do number ko add karna hai aur fir uss result ka square
 * karnge:
*/

/**
 * Approach-1: 
*/

// const addResult = add(2, 3);
// console.log(square(addResult)); // 25


/**
 * Approach-2:
*/
function addTwoAndSquare(a, b) {
    const sum = add(a, b);
    return square(sum);
}

console.log(addTwoAndSquare(2, 3)); // 25


/**
 * Approach-3: Composition
 * - Composition is a technique of combining multiple functions to create a
 *   new function.
 * - We can use the compose function to combine multiple functions.
*/

function compose(fn1, fn2) {
    return function(a, b) {
        return fn2(fn1(a, b));
    }
}


/**
 * Fist it will call add function and then it will call square function.
 * 1. add(2, 3) => 5
 * 2. square(5) => 25
*/
const addAndSquare = compose(add, square); 
console.log(addAndSquare(2, 3)); // 25


/**
 * Approach-4: ES6+ Composition
 * - We can use the compose function to combine multiple functions.
*/

const composeTwoFunctions = (fn1, fn2) => (a, b) => fn2(fn1(a, b));
const addAndSquareFn = composeTwoFunctions(add, square);
console.log(addAndSquareFn(2, 3)); // 25


/**
 * Approach-5: Pass unlimited number of functions using rest operator
 * - Iss example mein hum rest operator ka use karke multiple functions ko
 *   compose kar sakte hain
 * - Functions right se left execute honge
*/
const composeMultiple = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x);

const addOne = (x) => x + 1;
const double = (x) => x * 2; 
const square = (x) => x * x;

const calculate = composeMultiple(square, double, addOne);
console.log(calculate(2)); // ((2 + 1) * 2)^2 = 36



/**
 * Real-world Example: E-commerce Order Processing using Function Composition
 * - Yahan hum ek order processing system banayenge jisme saare functions
 *   ek composition chain mein process honge
 */


/**
 * Fn-1: Calculate item total with tax
*/
function calculateTotal(orderData) {
    orderData.total = orderData.price * orderData.quantity * 1.18; // 18% tax
    return orderData;
}

/**
 * Fn-2: Apply discount if order value > 1000
*/
function applyDiscount(orderData) {
    orderData.total = orderData.total > 1000 ? orderData.total * 0.9 : orderData.total;
    return orderData;
}

/**
 * Fn-3: Check if item is in stock
*/
function checkInventory(orderData) {
    const inventory = {
        "PROD1": 50,
        "PROD2": 30,
        "PROD3": 20
    };
    orderData.isInStock = inventory[orderData.productId] >= orderData.quantity;
    if (!orderData.isInStock) throw new Error("Item out of stock!");
    return orderData;
}

/**
 * Fn-4: Validate shipping address
*/
function validateAddress(orderData) {
    orderData.isAddressValid = orderData.address.pincode && 
                              orderData.address.city && 
                              orderData.address.state;
    if (!orderData.isAddressValid) throw new Error("Invalid address!");
    return orderData;
}

/**
 * Fn-5: Calculate shipping cost
*/
function calculateShipping(orderData) {
    orderData.shipping = orderData.weight * 10 + orderData.distance * 2;
    return orderData;
}

/**
 * Fn-6: Generate final order summary
*/
function generateOrderSummary(orderData) {
    orderData.summary = `Order #${orderData.orderId}:
        Total: ₹${orderData.total}
        Shipping: ₹${orderData.shipping}
        Final Amount: ₹${orderData.total + orderData.shipping}`;
    return orderData;
}



/**
 * Compose multiple functions:
 * 1. Write composite function structure
 * 2. Create Order Processing Pipeline:
 *    a. Check if item is in stock
 *    b. Calculate the total price of the item
 *    c. Apply the discount if the order value is greater than 1000
 *    d. Validate the shipping address
 *    e. Calculate the shipping cost
 *    f. Generate the final order summary
 * 3. Test the composition with sample order
*/


/**
 * Note: (y,f) => f(y), y = orderData, f = function
 * 1. First fn will be called with orderData
 * 2. Then the result of the first fn will be passed to the second fn
 * 3. This process will continue for all the functions
 * 4. Finally the result of the last fn will be returned
*/
const processOrder = (...fns) => (orderData) => fns.reduce((y, f) => f(y), orderData);

const processOrderPipeline = processOrder(
    checkInventory,
    calculateTotal,
    applyDiscount,
    validateAddress,
    calculateShipping,
    generateOrderSummary
);

/**
 * Test the composition with sample order
*/
try {
    const orderResult = processOrderPipeline({
        orderId: "ORD123",
        productId: "PROD1",
        price: 500,
        quantity: 2,
        weight: 2,
        distance: 100,
        address: {
            pincode: "400001",
            city: "Mumbai",
            state: "Maharashtra"
        }
    });
    
    console.log("Order processed successfully!");
    console.log(orderResult.summary);
} catch (error) {
    console.error("Order processing failed:", error.message);
}
