/**
 * Integration Testing:
 * > While Unit Tests are great, they mock out a lot of external services
 *   (DB, cache, message queue, ...). This is great for testing the
 *   functionality of a function in isolation.
 * > This means you have to start all auxilary services before running
 *   your tests and you DONT mock out any external service calls.
 * > Integration Testing says, I want every part of my system to be up
 *   locally and then I actually want to hit the database, put entries
 *   in database, etc.
 * 
 * Downsides:
 * 1. Slower to execute
 * 2. Add Complexity
 * 3. Local Development setup if required for a developer 
 *    (things like docker)
*/

/**
 * Pre-requisites of writing integration tests:
 * > Before we write an integration test, we should write the code that:
 *   1. Brings up the external services
 *   2. Seeds data in there
 *   3. Brings down the service when the test suite succeeds/fails.
*/

/**
 * Express + Prisma App:
 * 1. Initialize Project:
 *    > npm init -y
 *    > npx tsc --init
 * 2. Update rootDir and outDir
 *    > "rootDir": "src"
 *    > "outDir": "dist"
 * 3. Install Dependencies
 *    > npm i express @types/express prisma
 * 4. Initialize Prisma
 *    > npx prisma 
 * 5. Update schema
 *    > model Request {
 *         id       Int     @id @default(autoincrement())
 *          a       Int
 *          b       Int
 *         answer   Int
 *         type     Type
 *      }
 * 
 *    > enum Type {
 *         ADD
 *         MUL
 *      }
 * 6. Generate the prisma client
 *    > npx prisma generate
 * 7. Add a db.ts file to export the prisma client
 *    > import { PrismaClient } from "@prisma/client"
 *    > export const prismaClient = new PrismaClient()
 * 8. Write the express logic (index.ts)
 * 9. Create bin.ts to listen on port while starting the server
 *    > import { app } from "./index"
 *    > app.listen(3000)
 * 10. Try running the app locally
 *     > tsc -b
 *     > node dist/bin.js
 * Note: You will notice the request fails because we've not yet
 *       started the DB locally.
*/

/**
 * Starting the DB:
 * > Until now, we've used one of the following ways to start a DB
 *   1. Start one on https://neon.tech//aieven
 *   2. Start it locally using docker
 *      - docker run -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword -d .....
 * 
 * > Let's use the second one to start a database and then hit our
 *   backend:
 *   a. Make sure docker is running
 *   b. Start a DB locally
 *      - docker run -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword -d .....
 *   c. Update .env
 *      - DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432..."
*/

import express from "express";
import { prismaClient } from "./db";

export const app = express();

app.use(express.json());


/**
 * POST /sum
 * 
 * This API:
 * 1. Accepts two numbers (a, b)
 * 2. Validates the input
 * 3. Calculates the sum
 * 4. Stores the request in the database
 * 5. Returns the result
 * 
 * This makes it PERFECT for integration testing because:
 * - It touches HTTP layer
 * - It runs business logic
 * - It writes to the database
 */
app.post("/sum", async (req, res) => {
    const a = req.body.a;
    const b = req.body.b;
    
    /* Input Validation */
    if (a > 1000000 || b > 1000000) {
        return res.status(422).json({
            message: "Sorry we dont support big numbers"
        })
    }

    /* Business Logic */
    const result = a + b;

    /* Database Interaction (Real DB) */
    const request = await prismaClient.request.create({
        data: {
            a: a,
            b: b,
            answer: result,
            type: "ADD"
        }
    })
    
    /* Final Response */
    res.json({ answer: result, id: request.id });
})