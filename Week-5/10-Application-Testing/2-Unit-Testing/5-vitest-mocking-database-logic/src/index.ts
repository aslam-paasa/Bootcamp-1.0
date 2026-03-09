/**
 * Unit Testing with Mocking:
 * > The good thing about testing is we don't actually need database.
 * > We might have multiple external services talking to database,
 *   Kafka, Redis, etc.
 * > In Unit Testing, whenever we are testing the code, we will mock
 *   out or ignore all of the external dependencies and only test the
 *   logic of our code.
 * > Mocking, as the name suggests, means mocking/ignoring the behavior
 *   of external dependencies and only testing the logic of our code.
 * > But the downside is we are not actually testing the database or
 *   Kafka calls, which may lead to some problems in our codebase because
 *   we haven't tested the INSERT, UPDATE, etc functionality.
*/

/**
 * Adding a database:
 * > There are two approaches to take when you add external service to db.
 *  
 *   a. Unit Testing: 
 *      - Ignore/Mock out the external service calls
 *  
 *   b. Integration Testing or End-to-End Testing:
 *      - Start the external services when the tests are running and stop
 *        them after the tests
*/

/**
 * Project Setup:
 * 1. Add prisma to your codebase:
 *    - npm i prisma
 *    - npx prisma init
 * 
 * 2. Add a basic schema in schema.prisma
 *    model Sum {
 *      id     Int     @id @default(autoincrement())
 *      a      Int
 *      b      Int
 *      result Int
 *    }
 * 
 * 3. Generate the client (notice we don't need to migrate since we won't
 *    actually need a database)
 *    - npx prisma generate
 * 
 * 4. Create src.db.ts which exports the prisma client. This is needed 
 *    because we will be mocking this file out eventually:
 * 
 *    - import { PrismaClient } from "@prisma/client";
 *    - export const prismaClient = new PrismaClient();
 * 
 *    Why we are not writing this: 'prismaClient = new PrismaClient()'
 *    directly in index.ts? Why are we creating a separate file for it?
 *    - Better Structuring
 *    - Mocking out DB Requests.
 * 
 * 5. Importing the dummy/mocking prismaClient in index.ts:
 *    - import { prismaClient } from './db';
 * 
 * 6. Update src/index.ts to store the requests in database:
 * 
 *    app.post("/sum", (req, res) => {
 *       const a = req.body.a;
 *       const b = req.body.b;
 *  
 *       if(a > 1000000 || b > 1000000) {
 *          return res.status(422).json({
 *             message: "Sorry we don't support big numbers"
 *          })
 *       }
 *    })
 *  
 *    app.post("/multiply", (req, res) => {
 *       const a = req.body.a;
 *       const b = req.body.b;
 *  
 *       const result = a * b;
 *       res.json({ answer: result })
 *    })
*/


import express from "express";
import { prismaClient } from "./db";

export const app = express();
app.use(express.json());

app.post("/sum", async (req, res) => {
    const a = req.body.a;
    const b = req.body.b;


    if (a > 1000000 || b > 1000000) {
        return res.status(422).json({
            message: "Sorry we don't support big numbers"
        })
    }
    const result = a + b;

    await prismaClient.request.create({
        data: {
            a: a,
            b: b,
            answer: result,
            operation: "Sum"
        }
    })

    res.json({ answer: result })
})

app.post("/multiply", async (req, res) => {
    const a = req.body.a;
    const b = req.body.b;
    
    const result = a * b;

    await prismaClient.request.create({
        data: {
            a: a,
            b: b,
            answer: result,
            type: "Multiply"
        }
    })

    res.json({ answer: result })
})