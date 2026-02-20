/**
 * Transaction in SQL:
 * > When a user signs up, they send:
 *   - Their user info
 *   - Their address
 * > Should this be one query or multiple queries?
 * > What if one succeeds and the other fails?
 * 
 * Real Life Analogy:
 * > Imagine:
 *   a. You pay for movie ticket
 *   b. You pay for snacks
 * > Problem:
 *   - Money gone
 *   - Incomplete Experience
 *   - You're angry
 * > Solution:
 *   - Both payments are kept pending
 *   - If any payment fails, everything is cancelled
 *   - If both succeed, everything is confirmed.
 * 
 * Same Rule in Database:
 * > When user signs up:
 *   - Insert into users table
 *   - Insert into addresses table
 * > Without transaction:
 *   - User inserted
 *   - Address failed
 *   - Broken data (user without address)
 * > With transaction:
 *   - Either both inserted
 *   - Or none insert
 * This is exactly what Transaction solves.
*/

/**
 * SQL Query:
 * a. BEGIN    : Start transaction
 * b. COMMIT   : Save everything permanently
 * c. ROLLBACK : Undo everything
 * d. RETURNING: Get inserted row data
 * e. Example:
 *    
 *    BEGIN;
 *    
 *    INSERT INTO users (username, email, password)
 *    VALUES ('username_here', 'user@example.com', 'user_password');
 *   
 *    INSERT INTO addresses (user_id, city, country, street, pincode)
 *    VALUES (currval('users_id_seq'), 'New York', 'USA', '123 Broadway St', '10001');
 *   
 *    COMMIT;    
*/

/**
 * Command:
 * 1. npm init -y
 * 2. npm install typescript
 * 3. npx tsc --init
 *    - Go to tsconfig.json:
 *      - "rootDir": "./src",
 *      - "outDir": "./dist"
 * 4. Create a src folder
 * 5. Create a index.ts file
 * 6. npm install pg
 * 7. npm install @types/pg
 * 8. package.json:
 *    - "scripts": {
 *        "dev": "tsc && node dist/index.js"
 *      }
 *    - This will compile the typescript code and run the javascript code.
 * 9. Install express:
 *    - npm install express
 *    - npm install @types/express
*/

import express from "express";
import { Client } from "pg";

const app = express();
app.use(express.json());

/**
 * 1. Create Postgres Client
*/
const pgClient = new Client({
  connectionString:
    "postgresql://neondb_owner:npg_ouM0yCUPX5wb@ep-little-bird-a1mlb6dz-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require",
});

/**
 * 2. Initialize Database & Tables
*/
async function initDB() {
  try {
    await pgClient.connect();
    console.log("Connected to database");

    await pgClient.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pgClient.query(`
      CREATE TABLE IF NOT EXISTS addresses (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        city VARCHAR(100) NOT NULL,
        country VARCHAR(100) NOT NULL,
        street VARCHAR(255) NOT NULL,
        pincode VARCHAR(20),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    console.log("Tables ready");

    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });

  } catch (err) {
    console.error("DB initialization failed", err);
    process.exit(1);
  }
}

initDB();

/**
 * 3. Signup Route (WITH Transaction)
*/
app.post("/signup", async (req, res) => {
  const { username, email, password, city, country, street, pincode } = req.body;

  try {
    /* Step-1: Start Transaction */
    await pgClient.query("BEGIN");

    /* Step-2: Insert user */
    const userInsertQuery = `
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING id;
    `;

    const userResult = await pgClient.query(userInsertQuery, [
      username,
      email,
      password,
    ]);

    const userId = userResult.rows[0].id;

    /* Step-3: Insert address */
    const addressInsertQuery = `
      INSERT INTO addresses (user_id, city, country, street, pincode)
      VALUES ($1, $2, $3, $4, $5);
    `;

    await pgClient.query(addressInsertQuery, [
      userId,
      city,
      country,
      street,
      pincode,
    ]);

    /* Step-4: Commit Transaction */
    await pgClient.query("COMMIT");

    res.json({
      message: "✅ User and address created successfully",
    });

  } catch (err) {
    /* Step-5: Rollback on error */
    await pgClient.query("ROLLBACK");

    console.error(err);
    res.status(500).json({
      message: "Signup failed. Changes rolled back",
    });
  }
});
