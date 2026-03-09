/**
 * Auto-Generating API Documentation:
 * > Imagine you're writing a recipe book (your API). You have two 
 *   options:
 *   1. Manual Method: 
 *      > Write the book, then separately create an index and table of 
 *        contents.
 *   2. Auto-Generate Method: 
 *      > Write special notes in your recipes that automatically create
 *        the index and table of contents
 * 
 * > Auto-generation is like magic sticky notes that transform into a
 *   complete book index!
*/

/**
 * Two Approaches Compared:
 * 1. Manual OpenAPI (Previous Method):
 *    >  Write YAML file separately
 *    > Keep code & docs in sync manually
 *    > Easy to forget updates
 *    > Two files to manage
 *    > Great for API-first design
 * 2. Auto-Generated OpenAPI (New Method)
 *    > Add comments to your code
 *    > Documentation lives WITH code
 *    > Always up-to-date
 *    > One file (code + docs)
 *    > Great for code-first development
 * 
 * Note: @swagger Comment turn this into API documentation
*/

/**
 * Project Setup:
 * 1. Install Tools:
 *    > These packages do the auto-generation magic:
 *      npm install swagger-ui-express swagger-jsdoc
 *    > What each package does:
 *      a. swagger-ui-express: Shows the beautiful UI
 *      b. swagger-jsdoc     : Reads magic comments and creates OpenAPI spec
 * 
 * 2. Set Up the Magic
*/

import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const app = express();
const port = 3000;
app.use(express.json());

/* SECTION 1: SWAGGER CONFIGURATION */
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      version: '1.0.0',
      description: 'API to manage users with auto-generated Swagger docs'
    }
  },
  apis: ['./server.ts']  // Scan this file for @swagger comments
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);


/* SECTION 2: OUR DATA STORE */
let users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' }
];


/* SECTION 3: MAGIC COMMENTS + CODE */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier of the user
 *         name:
 *           type: string
 *           description: Name of the user
 *       example:
 *         id: 1
 *         name: John Doe
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of users
 *     description: Retrieve all users or filter by name
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter users by name
 *         example: John
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *             example:
 *               - id: 1
 *                 name: John Doe
 *               - id: 2
 *                 name: Jane Doe
 */
app.get('/users', (req, res) => {
  const { name } = req.query;
  if (name) {
    const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(name.toString().toLowerCase())
    );
    res.json(filteredUsers);
  } else {
    res.json(users);
  }
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Add a new user
 *     description: Create a new user with a unique id and name
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             id: 3
 *             name: Alice Smith
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request - missing required fields
 */
app.post('/users', (req, res) => {
  const { id, name } = req.body;
  if (!id || !name) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'id and name are required'
    });
  }

  /* Check if user already exists */
  if (users.find(user => user.id === id)) {
    return res.status(409).json({
      error: 'Conflict',
      message: `User with id ${id} already exists`
    });
  }

  const newUser = { id, name };
  users.push(newUser);
  res.status(201).json(newUser);
});

/* SECTION 4: DISPLAY THE MAGIC UI */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


/* SECTION 5: Raw JSON spec (important for client generation!) */
app.get('/api-docs/json', (req, res) => {
  res.json(swaggerSpec);
});

/* SECTION 6: START THE SERVER */
app.listen(port, () => {
  console.log('🚀 SERVER STARTED SUCCESSFULLY');
  console.log(`🌐 API Base URL: http://localhost:${port}`);
  console.log(`📚 Documentation: http://localhost:${port}/api-docs`);
  console.log(`📋 OpenAPI Spec: http://localhost:${port}/api-docs/json`);
  console.log(`👤 Get Users: http://localhost:${port}/users`);
  console.log(`🔍 Search Users: http://localhost:${port}/users?name=John`);
});
