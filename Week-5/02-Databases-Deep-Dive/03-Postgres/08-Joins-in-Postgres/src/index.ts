/**
 * Joins in SQL:
 * > Defining relationships in SQL is easy, but joining data from 
 *   two(or more) tables together is hard. 
 * > Relationship is connection between two tables, whereas join is 
 *   combining data from two or more tables based on a related column.
 * 
 * > There are 4 main types of SQL joins:
 *   1. INNER JOIN:
 *      - Only returns rows that match in both tables
 *      - Ex: Only users who have addresses
 *   
 *   2. LEFT JOIN:
 *      - All rows from left table + matching rows from right table
 *      - Ex: All users, whether they have addresses or not
 * 
 *   3. RIGHT JOIN:
 *      - All rows from right table + matching rows from left table  
 *      - Ex: All addresses, whether they have associated users or not
 * 
 *   4. FULL JOIN:
 *      - All rows from both tables, whether they match or not
 *      - Ex: All users and addresses, regardless of relationships
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
 * Database Client Configuration
 */
const pgClient = new Client({
  connectionString:
    "postgresql://neondb_owner:npg_ouM0yCUPX5wb@ep-little-bird-a1mlb6dz-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require",
});

/**
 * Initialize Database and Start Server
 */
async function initApp() {
  try {
    await pgClient.connect();
    console.log("Connected to database");

    /**
     * Create tables:
     * > users     - Contains user information 
     * > addresses - User addresses (1:1 relationship with users)
    */
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

    await pgClient.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        done BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    console.log("All tables ready");

    app.listen(3000, () => {
      console.log("🚀 Server running on port 3000");
    });
  } catch (err) {
    console.error("Failed to start app", err);
    process.exit(1);
  }
}

initApp();


/**
 * 1. SIGNUP - Create User with Address (Transaction Example)
 */
app.post("/signup", async (req, res) => {
  const { username, email, password, city, country, street, pincode } = req.body;

  try {
    /* Step-1: Start Transaction */
    await pgClient.query("BEGIN");

    /* Step-2: Insert user */
    const userResult = await pgClient.query(
      `INSERT INTO users (username, email, password)
       VALUES ($1, $2, $3)
       RETURNING id`,
      [username, email, password]
    );

    const userId = userResult.rows[0].id;

    /* Step-3: Insert address */
    await pgClient.query(
      `INSERT INTO addresses (user_id, city, country, street, pincode)
       VALUES ($1, $2, $3, $4, $5)`,
      [userId, city, country, street, pincode]
    );

    /* Step-4: Commit Transaction */
    await pgClient.query("COMMIT");

    res.json({
      message: "Signup successful (User + Address saved)",
      userId: userId
    });
  } catch (err) {
    /* Step-5: Rollback on error */
    await pgClient.query("ROLLBACK");
    console.error(err);
    res.status(500).json({
      message: "Signup failed, rolled back",
    });
  }
});

/**
 * 2. CREATE TODO for a User
 *    > User todos (1:many relationship)
 */
app.post("/users/:userId/todos", async (req, res) => {
  const { userId } = req.params;
  const { title, description, done = false } = req.body;

  try {
    const result = await pgClient.query(
      `INSERT INTO todos (user_id, title, description, done)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [userId, title, description, done]
    );

    res.json({
      message: "Todo created successfully",
      todo: result.rows[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to create todo",
    });
  }
});

/**
 * 3. GET User and Address (LEFT JOIN Example)
 *    > Shows user details even if no address exists:
 *      - Returns ALL users(user details), even if they have no address
 *      - Address columns will be NULL for users without addresses
 */
app.get("/users/:id/metadata", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pgClient.query(
      `SELECT 
         u.id AS user_id,
         u.username,
         u.email,
         a.city,
         a.country,
         a.street,
         a.pincode
       FROM users u
       LEFT JOIN addresses a ON u.id = a.user_id
       WHERE u.id = $1`,
      [id]
    );

    res.json({
      user: result.rows[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching user metadata",
    });
  }
});

/**
 * 4. GET User and Todos - SEPARATE QUERIES
 *    > Two separate queries (N+1 problem example)
 */
app.get("/users/:id/todos-separate", async (req, res) => {
  const { id } = req.params;

  try {
    /* First query: Get user */
    const userRes = await pgClient.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    const user = userRes.rows[0];

    /* Second query: Get todos */
    const todosRes = await pgClient.query(
      'SELECT * FROM todos WHERE user_id = $1',
      [id]
    );
    const todos = todosRes.rows;

    res.json({
      user: user,
      todos: todos,
      queryCount: 2,
      note: "This uses 2 separate queries (N+1 problem if done in a loop)"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching user and todos",
    });
  }
});

/**
 * 5. GET User and Todos - LEFT JOIN
 *    > Every user appears at least once, even if no todos exist:
 *      - Returns ALL users, even if they have no address
 *      - Address columns will be NULL for users without addresses
 */
app.get("/users/:id/todos-left-join", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pgClient.query(
      `SELECT 
         users.*, 
         todos.title, 
         todos.description, 
         todos.done,
         todos.id as todo_id
       FROM users
       LEFT JOIN todos ON users.id = todos.user_id
       WHERE users.id = $1`,
      [id]
    );

    /* Group todos if needed */
    const user = {
      id: result.rows[0]?.id,
      username: result.rows[0]?.username,
      email: result.rows[0]?.email,
      todos: result.rows
        .filter((row: any) => row.todo_id !== null)
        .map((row: any) => ({
          id: row.todo_id,
          title: row.title,
          description: row.description,
          done: row.done
        }))
    };

    res.json({
      user: user,
      rawRows: result.rows,
      queryCount: 1,
      note: "LEFT JOIN ensures user appears even with no todos"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching user and todos",
    });
  }
});

/**
 * 6. GET User and Todos - INNER JOIN
 *    > Returns rows only when user has todos:
 *      - Returns only rows where both tables have matching records
 *      - Todos without users or users without todos won't appear
 */
app.get("/users/:id/todos-inner-join", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pgClient.query(
      `SELECT 
         users.*, 
         todos.title, 
         todos.description, 
         todos.done,
         todos.id as todo_id
       FROM users
       JOIN todos ON users.id = todos.user_id
       WHERE users.id = $1`,
      [id]
    );

    res.json({
      hasData: result.rows.length > 0,
      todos: result.rows,
      queryCount: 1,
      note: "INNER JOIN returns data only when user has todos"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching user and todos",
    });
  }
});

/**
 * 7. GET All Todos with User Details - INNER JOIN
 *    > Returns only rows where both tables have matching records
 *    > Todos without users or users without todos won't appear
 */
app.get("/todos-with-users", async (req, res) => {
  try {
    const result = await pgClient.query(
      `SELECT 
         todos.*, 
         users.username,
         users.email
       FROM todos
       JOIN users ON todos.user_id = users.id
       ORDER BY todos.created_at DESC`
    );

    res.json({
      count: result.rows.length,
      todos: result.rows,
      note: "Each todo includes user details via INNER JOIN"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching todos with user details",
    });
  }
});

/**
 * 8. GET All Users with Address and Todo Count
 *    > Combines multiple tables
 *    > Uses aggregation (COUNT) with GROUP BY
 */
app.get("/users-summary", async (req, res) => {
  try {
    const result = await pgClient.query(
      `SELECT 
         u.id,
         u.username,
         u.email,
         a.city,
         a.country,
         COUNT(t.id) as todo_count
       FROM users u
       LEFT JOIN addresses a ON u.id = a.user_id
       LEFT JOIN todos t ON u.id = t.user_id
       GROUP BY u.id, u.username, u.email, a.city, a.country
       ORDER BY u.id`
    );

    res.json({
      users: result.rows,
      note: "Multiple LEFT JOINs with GROUP BY for summary data"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching users summary",
    });
  }
});

/**
 * Sample Data Creation Endpoint
 */
app.post("/seed-sample-data", async (req, res) => {
  try {
    // Create sample users
    const users = [
      ['john_doe', 'john@example.com', 'password123'],
      ['jane_smith', 'jane@example.com', 'password456'],
      ['bob_wilson', 'bob@example.com', 'password789']
    ];

    for (const [username, email, password] of users) {
      await pgClient.query(
        `INSERT INTO users (username, email, password) 
         VALUES ($1, $2, $3) 
         ON CONFLICT (username) DO NOTHING`,
        [username, email, password]
      );
    }

    // Get user IDs
    const userRes = await pgClient.query('SELECT id FROM users ORDER BY id');
    const userIds = userRes.rows.map(row => row.id);

    // Create addresses for first 2 users
    await pgClient.query(
      `INSERT INTO addresses (user_id, city, country, street, pincode)
       VALUES ($1, 'New York', 'USA', '123 Main St', '10001')
       ON CONFLICT DO NOTHING`,
      [userIds[0]]
    );

    await pgClient.query(
      `INSERT INTO addresses (user_id, city, country, street, pincode)
       VALUES ($1, 'London', 'UK', '456 Oxford St', 'W1D 1BS')
       ON CONFLICT DO NOTHING`,
      [userIds[1]]
    );

    // Create todos for users
    const todos = [
      [userIds[0], 'Buy groceries', 'Milk, eggs, bread', false],
      [userIds[0], 'Finish project', 'Complete the JOIN example', true],
      [userIds[1], 'Call dentist', 'Schedule appointment', false],
      [userIds[2], 'Plan vacation', 'Research destinations', false]
    ];

    for (const [userId, title, description, done] of todos) {
      await pgClient.query(
        `INSERT INTO todos (user_id, title, description, done)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT DO NOTHING`,
        [userId, title, description, done]
      );
    }

    res.json({
      message: "Sample data created successfully",
      users: userIds.length,
      note: "Created users, addresses, and todos for testing JOINs"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to seed sample data",
    });
  }
});

/**
 * Health Check
 */
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    message: "JOIN Examples API is running",
    endpoints: [
      "POST /signup",
      "POST /users/:userId/todos",
      "GET /users/:id/metadata (LEFT JOIN user+address)",
      "GET /users/:id/todos-separate (2 queries)",
      "GET /users/:id/todos-left-join (LEFT JOIN)",
      "GET /users/:id/todos-inner-join (INNER JOIN)",
      "GET /todos-with-users (INNER JOIN)",
      "GET /users-summary (Multiple LEFT JOINs)",
      "POST /seed-sample-data",
      "GET /health"
    ]
  });
});

/**
 * Request-Response Cycle:
 * > Client (Postman / Frontend)
 *         |
 *         |  HTTP Request + JSON
 *         v
 * > Express Server
 *         |
 *         |  req.body
 *         v
 * > Postgres Database
 *         |
 *         |  Query Results
 *         v
 * > Express Server
 *         |
 *         |  res.json()
 *         v
 * > Client Response ✅
*/

