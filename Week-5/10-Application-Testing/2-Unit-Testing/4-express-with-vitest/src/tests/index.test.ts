/**
 * Moving from Jest to Vitest for mocking:
 * > Ignoring the code coverage of external dependencies like database
 *   to test pure functions is called mocking. 
 * > And vitest make it easy to mock the external dependencies than jest.
 *   That's why we are moving from jest to vitest.
 * 
 * > Link to why vitest - https://vitest/dev/guide/why.html
 * > Steps:
 *   - npm install vitest
 *   - "scripts": {
 *       "test": "vitest"
 *     }
 *   - import { describe, expect, test, it } from 'vitest'
 */

/**
 * Vitest Testing:
 * Vitest is a modern testing framework similar to Jest but with better performance.
 * Here are the main building blocks of a Vitest test:
 * 
 * 1. describe():
 *    - Container function jo related tests ko group karta hai
 *    - Tests ko organized aur readable banata hai
 *    - Example: describe('Calculator tests', () => { ... })
 * 
 * 2. test() ya it():
 *    - Individual test cases likhne ke liye use hota hai
 *    - Clear description hona chahiye ki kya test kar rahe hain
 *    - Example: test('should add two numbers correctly', () => { ... })
 * 
 * 3. expect():
 *    - Code ke behavior ko verify karne ke liye assertions banata hai
 *    - Example: expect(sum(2, 3)).toBe(5)
 * 
 * 4. Matchers (like toBe()):
 *    - expect() ke saath use hote hain different conditions check karne ke liye
 *    - toBe(): Exact equality (===) check karta hai
 *    - toEqual(): Objects ki deep equality check karta hai
 *    - toContain(): Arrays/strings mein check karta hai
 *    - Aur bahut saare matchers available hain!
 * 
 * 5. Supertest:
 *    - HTTP endpoints ko test karne ke liye library
 *    - request() function se API calls simulate kar sakte hain
 *    - Response ka status, body etc verify kar sakte hain
 *    - Example: await request(app).get('/api').expect(200)
 */

import { describe, expect, test, it } from 'vitest';
import request from "supertest";
import { app } from "../index"

/**
 * Test Suite:
 * > Test Case 1: Sum of two numbers
 * > Test Case 2: No inputs are provided
*/
describe("POST /sum", () => {
  it("should return the sum of two numbers", async () => {
    const res = await request(app).post("/sum").send({
      a: 1,
      b: 2
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe(3);
  });

  it("should return 411 if no inputs are provided", async () => {
    const res = await request(app).post("/sum").send({});
    expect(res.statusCode).toBe(411);
    expect(res.body.message).toBe("Incorrect inputs");
  });

});


/**
 * Test Suite:
 * > Test Case 1: Sum of two numbers
 * > Test Case 2: No inputs are provided
*/
describe("GET /sum", () => {
  it("should return the sum of two numbers", async () => {
    const res = await request(app)
      .get("/sum")
      .set({
        a: "1",
        b: "2"
      })
      .send();
    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe(3);
  });

  it("should return 411 if no inputs are provided", async () => {
    const res = await request(app)
      .get("/sum").send();
    expect(res.statusCode).toBe(411);
  });

});
