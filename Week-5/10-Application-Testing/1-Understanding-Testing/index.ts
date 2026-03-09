/**
 * Testing in Node.js + Express:
 * > One of the core things to do while writing your code is testing it.
 * > It's highly ignored in most codebases but we're going to try to get
 *   close to how testing happens in MERN stack codebases.
 * 
 * > Goal:
 *   1. How to test an express backend
 *   2. Mocking, spying, jest(most used), vitest(newer)
 *   3. Unit tests vs integration tests vs end-to-end tests
 *   4. How to integrate testing and coverage in CI/CD
 * 
 * > Code for today: https://github.com/100xdevs-cohort-2/week-24-testing/
*/

/**
 * Types of Testing:
 * a. Unit Testing:
 *    > Testing individual units/components of your code (isolation)
 *    > We don't start/connect to databases.
 *    > Example: Testing a function, a class, a module.
 * 
 * b. Integration Testing:
 *    > Testing the interaction between different units/components
 *    > We start/connect to databases.
 *    > Example: Testing a route, a controller, a service.
 * 
 * c. End-to-End Testing:
 *    > Testing the entire application as a user would
 *    > We start a browser and test the entire application.
 *    > Example: Testing a login page, a checkout process, etc
*/

/**
 * Unit Testing using Jest:
 * 
 * 1. Until now, we have written some Node.js code:
 * 
 *    import express from 'express';
 *    const app = express();
 *    
 *    app.get('/', (req, res) => {
 *     const a = 1;
 *     res.send({ a });
 *    });
 *    
 *    app.listen(3000, () => {
 *     console.log('Server is running on port 3000');
 *    });
 * 
 *   How have we tested this code until now?
 *   - node dist/index.js
 *   - Go to postman and end the endpoint
 *   - Check the response
 * 
 * 2. Let's explore Automated Testing:
 *    We can create a separate test file 'index.test.js' that contains:
 *    
 *    a) Making the API request:
 *       > const res = await request('/')
 *       > Send request to endpoint and capture response
 *    
 *    b) Validating the response:
 *       > expect(res.data.a).toBe(1)
 *       > Use Jest assertions to verify response matches expected value
 *       > Ensures res.json({ a }) returns correct data structure
 * 
 *       > This will automatically hit the endpoint and verify the response
 *         automatically.
 * 
 * Note: We cannot write infinite testcases and cover the every edge cases,
 *       but we can cover the most important ones.
*/


/**
 * Testing Libraries:
 *
 * 1. Node.js Built-in Test Runner + assert
 * > This comes built into Node.js (Node 18+).
 * > It uses:
 *      - node:test module for running tests
 *      - assert module for validations
 *
 * Example:
 *
 *   import test from 'node:test';
 *   import assert from 'node:assert';
 *
 *   function greet(name) {
 *      return `Hello, ${name}!`;
 *   }
 *
 *   test('greet returns the correct greeting', () => {
 *      const actual = greet('World');
 *      const expected = 'Hello, World!';
 *      assert.strictEqual(actual, expected);
 *   });
 *
 * Characteristics:
 *
 * - Built into Node.js
 * - No installation required
 * - Uses assert for assertions
 * - Lightweight and simple
 * - Mostly used for unit tests
 *
 *
 *
 * 2. Jest
 * > Jest is a popular third-party testing framework created by Meta.
 * > It includes:
 *      - Test runner
 *      - Assertion library
 *      - Mocking utilities
 *      - Snapshot testing
 *
 * Example:
 *
 *   test('API returns correct value', async () => {
 *      const res = await request('/');
 *      expect(res.data.a).toBe(1);
 *   });
 *
 * Characteristics:
 *
 * - Must be installed using npm
 * - Powerful assertion library (expect)
 * - Built-in mocking
 * - Supports snapshot testing
 * - Very popular in React and Node.js projects
 *
 *
 * ------------------------------------------------
 * Key Difference
 * ------------------------------------------------
 *
 * Node Test Runner + assert
 *   - Built into Node.js
 *   - Simple and lightweight
 *   - Minimal features
 *
 * Jest
 *   - External testing framework
 *   - More powerful features
 *   - Better developer experience
 *
 *
 * ------------------------------------------------
 * Summary
 * ------------------------------------------------
 *
 * Your two testing approaches were:
 *
 *   assert.strictEqual(...)  → Node.js assert library
 *   expect(...).toBe(...)    → Jest assertion library
 *
 */
