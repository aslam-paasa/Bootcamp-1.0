/**
 * Testing a simple express app with Zod:
 * > Code: https://github.com/100xdevs-cohort-2/week-24-testing/tree/main/3-express-with-zod
 * > Let's add zod to add solid input validation and return erroneous status
 *   codes if the input is incorrect.
 *   a. Install add: npm install zod
 *   b. Update index.ts
 *   c. Update tests/sum.test.ts
 *   d. Run the test: npm run test
*/

/**
 * Code Coverage:
 * > Code coverage is a metric that measures how much of your code is executed during testing.
 * > It helps identify untested parts of your codebase.
 * 
 * Coverage Types:
 * 1. Line: Tracks executed code lines
 *    Example: let sum = a + b; // ✓ covered
 * 
 * 2. Branch: Tracks conditional paths 
 *    Example: if/else, switch cases
 * 
 * 3. Function: Tracks called functions
 *    Example: function multiply() {...} // ✓ called
 * 
 * 4. Statement Coverage:
 *    - Shows which statements were executed
 *    - Similar to line coverage but more granular
 * 
 * Popular Tools:
 * - Jest Coverage
 * - Istanbul
 * - NYC
 * 
 * Tips:
 * - Target 80%+ coverage
 * - Prioritize core logic
 * - Quality > 100% coverage
*/


import express from "express";
import { z } from "zod";

export const app = express();
app.use(express.json());

const sumInput = z.object({
    a: z.number(),
    b: z.number()
})

/**
 * if-condition is not covered because:
 * 1. Test cases sirf valid inputs ke liye likhe gaye hain
 * 2. Koi test case nahi hai jo invalid input bheje
 * 3. Code coverage improve karne ke liye, hume invalid inputs ke test cases
 *    add karne honge tabhi woh cover hoga.
 * 4. Example: 
 *    a. Sending body in request
 *    b. Sending empty body in request (if condition will be covered)
*/
app.post("/sum", (req, res) => {
    const parsedResponse = sumInput.safeParse(req.body)

    if (!parsedResponse.success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const answer = parsedResponse.data.a + parsedResponse.data.b;

    res.json({
        answer
    })
});



/**
 * if-condition is not covered because:
 * 1. Test cases sirf valid inputs ke liye likhe gaye hain
 * 2. Koi test case nahi hai jo invalid input bheje
 * 3. Code coverage improve karne ke liye, hume invalid inputs ke test cases
 *    add karne honge tabhi woh cover hoga.
 * 4. Example: 
 *    a. Sending headers in request
 *    b. Sending empty headers in request (if condition will be covered)
*/
app.get("/sum", (req, res) => {
    const parsedResponse = sumInput.safeParse({
        a: Number(req.headers["a"]),
        b: Number(req.headers["b"])
    })
    
    if (!parsedResponse.success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const answer = parsedResponse.data.a + parsedResponse.data.b;

    res.json({
        answer
    })
});
