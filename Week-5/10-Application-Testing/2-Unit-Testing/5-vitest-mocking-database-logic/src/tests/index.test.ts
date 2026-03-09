/**
 * Deep Mocking:
 * > Another way to mock variables is to let vitest figure out the 
 *   types and mock out all the attributes of the object being mocked.
 * > If we try to log Object.keys(prismaClient), which means what is
 *   the shape of prismaClient, how does it look. We'll notice, it has
 *   a bunch of keys/functions:
 * > console.log(Object.keys(prismaClient.request))
 *   - findUnique
 *   - findFirst
 *   - findMany
 *   - CreateMany
 *   - update
 *   .....
 *   .....
*/

/**
 * What if we could mock out all these keys in a single function call?
 * 1. Install vitest-mock-extended
 *    > npm i -D vitest-mock-extended
 * 
 * 2. Create __mocks__/db.ts
 *    > import { PrismaClient } from '@prisma/client'
 *      import { beforeEach } from 'vitest'
 *      import { mockDeep, mockReset } from 'vitest-mock-extended'
 * 
 *      export const prismaClient = mockDeep<PrismaClient>()
 * 
 * 3. Remove the mock we added in index.test.ts, simply add a 
 *    vi.mock("../db")
 *    > // vi.mock('../db', () => {
 *      //    prismaClient: { sum: { create: vi.fn() }
 *      // }})
 *    > vi.mock('../db');
 * 
 * 4. Try running the tests
 *    > npm run test
*/

/**
 * How to test database logic? (Mocking & Spy in Vitest)
 * > Mocking ka matlab hai external dependencies ko fake/mock 
 *   implementation se replace karna testing ke liye.
 * > Vitest mein mocking ke 4 important concepts hain:
 * 
 * 1. External Dependencies ko Mock Karna (vi.mock)
 *    - Kisi bhi external file/module ko mock karne ke liye vi.mock() use 
 *      karein
 *    - Example: vi.mock('../db') // db.ts file ko mock karega
 *    - Mock file __mocks__ folder mein create karni hoti hai
 * 
 * 2. Mock Responses Set Karna (mockResolvedValue)
 *    - Async functions ke liye fake responses set kar sakte hain
 *    - Database calls ke liye bohot useful hai
 *    - Example: 
 *      prismaClient.sum.create.mockResolvedValue({
 *        id: 1,
 *        result: 10
 *      })
 * 
 * 3. Mock Functions ko Track Karna (vi.spyOn) 
 *    - Mock function kitni baar call hui, kya arguments the - ye track
 *      karne ke liye
 *    - Example: const spy = vi.spyOn(prismaClient.sum, "create")
 *    - Spy se function calls ki detailed info mil sakti hai
 * 
 * 4. Mock Assertions Lagana
 *    - toHaveBeenCalled()     : Check karta hai function call hua ya nahi
 *    - toHaveBeenCalledWith() : Function ko kaunse arguments ke saath call kiya gaya
 *    - toHaveBeenCalledTimes(): Function kitni baar call hua
 *    - Example: expect(spy).toHaveBeenCalledWith({data: {a: 1, b: 2}})
 */


import {describe, expect, test, it, vi} from 'vitest';
import request from "supertest";
import { app } from "../index"
import { prismaClient } from '../__mocks__/db'

vi.mock('../db');

describe("POST /sum", () => {
  it("should return the sum of two numbers", async () => {
      prismaClient.sum.create.mockResolvedValue({
        id: 1,
        a: 1,
        b: 1,
        result: 3
      });

      vi.spyOn(prismaClient.sum, "create");

      const res = await request(app).post("/sum").send({
        a: 1,
        b: 2
      });

      expect(prismaClient.sum.create).toHaveBeenCalledWith({
        data: {
          a: 1,
          b: 2,
          result: 3
        }
      })

      expect(res.statusCode).toBe(200);
      expect(res.body.answer).toBe(3);
    });

    it("should return 411 if no inputs are provided", async () => {
      const res = await request(app).post("/sum").send({});
      expect(res.statusCode).toBe(411);
      expect(res.body.message).toBe("Incorrect inputs");
    });

});


describe("GET /sum", () => {
  it("should return the sum of two numbers", async () => {
      prismaClient.sum.create.mockResolvedValue({
        id: 1,
        a: 1,
        b: 1,
        result: 3
      });

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
    const res = await request(app).get("/sum").send();
    expect(res.statusCode).toBe(411);
  });

});
