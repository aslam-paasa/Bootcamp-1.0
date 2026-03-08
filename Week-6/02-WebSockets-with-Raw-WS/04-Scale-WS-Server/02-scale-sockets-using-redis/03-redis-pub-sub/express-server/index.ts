/**
 * Code:
 * 1. Create an empty Node.js project
 * 2. Initialize 2 folders inside it:
 *    a. express-server
 *    b. worker
 * 3. Initialize an empty Node.js typescript project in both of them:
 *    - npm init -y
 *    - npx tsc --init
 * 4. Install dependencies in express-server:
 *    - npm i express @types/express redis
 * 5. Install dependencies in worker:
 *    - npm i redis
 * 6. Create index in express-server:
*/

import express from "express";
import { createClient } from "redis";

const app = express();
app.use(express.json());

const client = createClient();
client.on('error', (err) => console.log('Redis Client Error', err));

app.post("/submit", async (req, res) => {
    const problemId = req.body.problemId;
    const code = req.body.code;
    const language = req.body.language;

    try {
        await client.lPush("problems", JSON.stringify({ code, language, problemId }));
        // Store in the database
        res.status(200).send("Submission received and stored.");
    } catch (error) {
        console.error("Redis error:", error);
        res.status(500).send("Failed to store submission.");
    }
});

async function startServer() {
    try {
        await client.connect();
        console.log("Connected to Redis");

        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    } catch (error) {
        console.error("Failed to connect to Redis", error);
    }
}

startServer();  