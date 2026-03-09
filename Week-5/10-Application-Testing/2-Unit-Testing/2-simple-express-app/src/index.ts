/**
 * 
 * Testing a simple express app:
 * > Final Code: https://github.com/100xdevs-cohort-2/week-24-testing/tree/main/2-simple-express-app
 * > Initialize a simple TS project:
 *      - npm init -y
 *      - npx tsc --init
 * > Change rootDir and srcDir in tsconfig.json
 *      - "rootDir": "./src",
 *      - "outDir": "./dist",
 * > Create src/index.ts
 * > Add dependencies: 
 *   - npm install --save-dev ts-jest @jest/globals @types/express
 *   - npm i supertest @types/supertest
 *   - npm install express
 * > Initialize jest.config.ts
 *   - npx ts-jest config:init
 * > Create src/index.ts
 * > Update package.json:
 *   "test": "jest"
 * > Add tests/sum.test.ts
 * > Run the test: npm run test
*/

import express from "express";

export const app = express();
app.use(express.json());

app.post("/sum", (req, res) => {
    const a = req.body.a;
    const b = req.body.b;
    const answer = a + b;

    res.json({ answer })
});
