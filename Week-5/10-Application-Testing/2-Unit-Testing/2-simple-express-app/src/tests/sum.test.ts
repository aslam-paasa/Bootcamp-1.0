import { describe, expect, test, it } from '@jest/globals';
import request from "supertest";
import { app } from "../index"

/**
 * 
 * Testing a simple express app:
 * 1. Jest: Unit testing
 *    > Jest is a library that allows us to write and run tests.
 *    a. describe():
 *       - Works like a container to group related tests together
 *       - Makes tests more organized and readable
 *       - Example: describe('Calculator tests', () => { ... })
 *    
 *    b. test() or it():
 *       - Used to write individual test cases
 *       - Should clearly describe what you're testing
 *       - Example: test('should add two numbers correctly', () => { ... })
 *    
 *    c. expect():
 *       - Used to make assertions about your code
 *       - Checks if your code behaves as expected
 *       - Example: expect(sum(2, 3)).toBe(5)
 *    
 *    d. Matchers (like toBe()):
 *       - Used with expect() to check different types of conditions
 *       - toBe(): Checks exact equality (===)
 *       - toEqual(): For deep equality of objects
 *       - toContain(): For arrays/strings
 *       - And many more!
 * 
 * 2. Supertest: API testing
 *    > Supertest is a library that allows us to test HTTP requests & responses.
 *      a. request():
 *         - Used to make HTTP requests in tests
 *         - Takes an Express app as argument
 *         - Example: request(app).post("/sum")
 *      
 *      b. send():
 *         - Sends data in request body
 *         - Takes an object as argument
 *         - Example: send({ a: 1, b: 2 })
 *      
 *      c. expect():
 *         - Checks response properties
 *         - Can verify status code, body, headers etc
 *         - Example: expect(res.statusCode).toBe(200)
 *      
 *      d. async/await:
 *         - Requests are asynchronous
 *         - Need to use async/await or .then()
 *         - Example: const res = await request(app)...
 * 
*/


/**
 * Test suite 1: API testing
 * > TestCase 1: should return the sum of two numbers
 * > TestCase 2: should return the sum of two negative numbers
 * > TestCase 3: should return the sum of two zero numbers
*/
describe("POST /sum", () => {

  /**
   * Test case 1:
  */
  it("should return the sum of two numbers", async () => {
    // axios.post('http://localhost:3000/sum', { a: 1, b: 2 })
    const res = await request(app).post("/sum").send({
      a: 1,
      b: 2
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe(3);
  });


  /**
   * Test case 2:
  */
  it("should return the sum of two negative numbers", async () => {
    const res = await request(app).post("/sum").send({
      a: -1,
      b: -2
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe(-3);
  });


  /**
   * Test case 3:
  */
  it("should return the sum of two zero number", async () => {
    const res = await request(app).post("/sum").send({
      a: 0,
      b: 0
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe(0);
  });
});
