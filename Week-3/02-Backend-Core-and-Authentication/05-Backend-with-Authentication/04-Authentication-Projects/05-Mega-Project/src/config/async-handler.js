/**
 * What is Async Handler?
 * - Ye ek helper function hai jo async errors ko handle karne mein help 
 *   karta hai
 * - In Simple words - ye function async route handlers ko wrap karta hai 
 *   taaki hume har jagah try-catch blocks na likhne pade.
*/ 

/**
 * Reason for not using try-catch blocks:
 * - Try-catch blocks code ko bahut messy aur lengthy bana dete hain
 * - Har route handler mein same try-catch code likhna padta hai, jo ki 
 *   repetitive hai
 * - Isse code maintain karna mushkil ho jata hai
 * - AsyncHandler use karke hum ek hi jagah error handling kar sakte hain
 * - Code clean aur readable rehta hai
*/

/** 
 * How it works:
 * 1. Ye ek requestHandler function leta hai as input 
 * 2. Ek naya function return karta hai jo (req, res, next) parameters leta hai
 * 3. requestHandler ko Promise.resolve ke saath wrap karta hai taaki async 
 *    errors catch ho sake
 * 4. Agar koi error aata hai toh next() function ke through error handling 
 *    middleware tak pahunch jata hai
*/ 

/** 
 * Real World Example:
 * - Imagine aap ek restaurant waiter ho:
 * 
 * a. Without asyncHandler:
 *    try {
 *       const order = await takeOrder();
 *       const food = await cookFood();
 *       await serveFood();
 *    } catch(error) {
 *       handleProblem();
 *    }
 * 
 * b. With asyncHandler:
 *    const handleCustomer = asyncHandler(async () => {
 *       const order = await takeOrder();
 *       const food = await cookFood();
 *       await serveFood();
 *    })
 * 
 * - asyncHandler automatically handles all problems/errors, just like a 
 *   restaurant manager who automatically handles any issues that come up 
 *   during service, without the waiter needing to worry about every possible 
 *   problem.
 */


const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
        .catch(function(error) {
            next(error);
        });
    }
}

export { asyncHandler };
