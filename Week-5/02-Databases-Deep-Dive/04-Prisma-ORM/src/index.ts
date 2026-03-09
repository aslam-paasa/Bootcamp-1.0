/**
 * Step-1: What is an ORM?
 * 1. Boring Offical Definition:
 *    - ORM stands for Object-Relational Mapping, a programming technique 
 *      used in software development to convert data between incompatible 
 *      type systems in object-oriented programming languages. 
 *    - This technique creates a "virtual object database" that can be used 
 *      from within the programming language.
 * 
 *    - ORMs are used to abstract the complexities of the underlying database
 *      into simpler, more easily managed objects within the code.
 * 
 * 2. What does this mean?
 *    - ORMs allow you to interact with your database using objects and 
 *      classes, rather than writing raw SQL queries.
 *    - A lot of problem that originates with SQL queries, especially 
 *      SQL Injection attacks can be avoided with ORMs.
 * 
 *    Example:
 *    - Non-ORM:
 *      const query = 'SELECT * FROM users WHERE email = $1';
 *      const result = await client.query(query, ["harkirat@gmail.com"]);
 * 
*/

/**
 * Step-2: Why ORMs?
 * 1. Simpler Syntax (Converts objects to SQL Queries under the hood)
 *    a. Non-ORM:
 *       const query = 'SELECT * FROM users WHERE email = $1';
 *       const result = await client.query(query, ["harkirat@gmail.com"]);
 * 
 *    b. ORM:
 *       User.find({
 *         email: "harkirat@gmail.com"
 *       })
 * 
 * 2. Abstraction that let's you flip the database you are using is easy. 
 *    Unified API irrespective of the DB:
 * 
 *    Raw Query in Node.js, ORM will convert it to the appropriate query for
 *    the database you are using:
 *    - User.find({ email: "harkirat@gmail.com" })
 *                    |
 *                    v
 *    MongoDB     +----------+ mongoose.find({ email: "harkirat@gmail.com" })
 *    Postgres    +----------+ SELECT * FROM users WHERE email = "harkirat@gmail.com"
 *    Postgres    +----------+ SELECT & FROM users WHERE email = "harkirat@gmail.com"
 * 
 * 3. Type Safety/Auto Completion:
 *    a. Non-ORM(pg):
 *       const result = await client.query(query, ["harkirat@gmail.com"]);
 *    b. ORM(Prisma):
 *       const user = UserDb.find({
 *         email: "harkirat@gmail.com"
 *       })
 * 
 * 4. Automatic Migrations:
 *    - In case of simple Postgre App, it's very hard to keep track of all
 *      commands that were ran that led to the current schema of the table.
 *    - As our app grows, we keep adding more and more tables to our app.
 *    - With ORMs, you can just write the schema in the code and the ORM will
 *      automatically generate the schema in the database.
 *    - Ex: https://github.com/code100x/cms/tree/main/prisma/migrations
*/

/**
 * Step-3: What is Prisma?
 * 1. Data Model:
 *    - In a single file, define your schema(database structure).
 *    - This is a great way to keep track of your schema changes.
 * 
 * 2. Automated Migrations:
 *    - Prisma generates and runs database migrations based on changes to
 *      the Prisma Schema.
 * 
 * 3. Type Safety:
 *    - Prisma generates a type-safe database client based on the Prisma
 *      Schema.
 * 
 * 4. Auto-Completion
*/

/**
 * Step-4: How to use Prisma?
 * Let's create a simple Todo App using Prisma:
 * 1. Install an empty Node.js project: npm init -y
 * 2. Install typescript: npm i typescript
 * 3. Initialize typescript: 
 *    - npx tsc --init
 *    - rootDir: src
 *    - outDir : dist
 * 4. Add dependencies: npm install prisma @prisma/client
 * 5. Initialize a fresh Prisma project: npx prisma init
 * 6. Create a Prisma Schema:
 *    - Create a new file called prisma/schema.prisma
 *    - Define your schema in the file.
*/

/**
 * Step-5: Selecting your database
 * - Prisma lets you choose between a few databases:
 *   - PostgreSQL
 *   - MySQL
 *   - MongoDB, etc
 * - You can update prisma/schema.prisma to setup what database you want 
 *   to use:
 * 
 *   database db {
 *     provider = "postgresql"
 *     url      = env("DATABASE_URL")
 *   }
 * 
 * Note: Good to have the VS Code extension that let's you visualize prisma
 *       better.
*/

/**
 * Step-6: Defining your data model
 * - Prisma expects you to define the shape of your data in the schema.prisma
 *   file.
 * - If your final app will have a User table, it would look like this in the
 *   schema.prisma file:
 * 
 *   model User {
 *     id        String   @id @default(cuid())
 *     username  String   @unique
 *     password  String
 *     firstName String
 *     lastName  String
 *   }
*/

/**
 * Assignment:
 * Add a User and a Todo table in your application.
 * 1. Define the schema for the User and Todo tables.
 * 2. Generate the Prisma Client.
 * 3. Use the Prisma Client to interact with the database.
*/


/**
 * Commands:
 * 1. Initialize an empty Node.js project: npm init -y
 * 2. Add dependencies: 
 *    - npm install typescript
 *    - npx tsc --init
 * 3. Change tsconfig.json:
 *    - "outDir": "./dist"
 *    - "rootDir": "./src"
 * 4. Create a src folder : mkdir src -> touch src/index.ts
 * 5. Create a dist folder: mkdir dist
 * 6. Add scripts to package.json:
 *    - "dev": "tsc -b && node dist/index.js"
 * 7. Run the app: npm run dev
 * 8. Install postgres: npm install pg @types/pg
 * 9. Install Prisma: npm install prisma
 * 10. Create an empty Prisma Schema: npx prisma init
 * 11. Setup the database in schema.prisma file
 * 12. Create your first project app using Prisma Client
*/


/**
 * Step-7: Relationships:
 * - Prisma let's you define relationships between tables with each other.
 * 
 * 1. Types of relationships:
 *    a. One-to-One
 *    b. One-to-Many
 *    c. Many-to-One
 *    d. Many-to-Many
 * 
 * 2. For the TODO App, there is a one-to-many relationship: 
 *    a. A User can have many Todos.
 *    b. A Todo belongs to a User.
 * 
 * 3. How to define a one-to-many relationship in Prisma:
 *    a. Define the User model.
 *    b. Define the Todo model.
 * 
 * 4. Updating the prisma schema:
 *    model User {
 *      id        Int    @id @default(autoincrement())
 *      username  String @unique
 *      password  String
 *      age       Int
 *      city      String    
 *      todos     Todo[]
 *    }
 * 
 *    model Todo {
 *      id          Int     @id @default(autoincrement())
 *      title       String
 *      description String
 *      done        Boolean @default(false)
 *      userId      Int
 *      user        User    @relation(fields: [userId], references: [id])
 *    }
*/

/**
 * Creating our first project app using Prisma Client
*/


import express, { Request, Response, RequestHandler } from 'express'
import { PrismaClient } from '@prisma/client'

const app = express()
const client = new PrismaClient()

app.use(express.json())
console.log('Server is running')


/**
 * USER ROUTES:
 * 1. Create a new user
 * 2. Get all users (with their todos)
 * 3. Get a single user by ID (with todos)
 * 4. Update a user by ID
 * 5. Delete a user and their todos
*/

/**
 * POST /users: Create a new user
*/
app.post('/users', (async (req: Request, res: Response) => {
    const { username, password, age, city } = req.body

    const user = await client.user.create({
        data: { username, password, age, city },
    })

    res.json(user)
}) as RequestHandler)

/**
 * GET /users: Get all users (with their todos)
*/
app.get('/users', (async (req: Request, res: Response) => {
    const users = await client.user.findMany({
        include: { todos: true },
    })
    res.json(users)
}) as RequestHandler)

/**
 * GET /users/:id: Get a single user by ID (with todos)
*/
app.get('/users/:id', (async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)

    const user = await client.user.findUnique({
        where: { id },
        include: { todos: true },
    })

    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json(user)
}) as RequestHandler)

/**
 * PUT /users/:id: Update a user by ID
*/
app.put('/users/:id', (async (req: Request, res: Response) => {
    const { id } = req.params
    const { username, age, city } = req.body

    const user = await client.user.update({
        where: { id: parseInt(id) },
        data: { username, age, city },
    })

    res.json(user)
}) as RequestHandler)

/**
 * DELETE /users/:id: Delete a user and their todos
*/
app.delete('/users/:id', (async (req: Request, res: Response) => {
    const { id } = req.params

    await client.todo.deleteMany({ where: { userId: parseInt(id) } }) // important: delete todos first
    await client.user.delete({ where: { id: parseInt(id) } })

    res.json({ message: 'User deleted successfully' })
}) as RequestHandler)

/**
 * GET /users/:id/todos: Get all todos for a specific user
*/
app.get('/users/:id/todos', (async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id)

    const todos = await client.todo.findMany({
        where: { userId },
    })

    res.json(todos)
}) as RequestHandler)


/**
 * TODO ROUTES:
 * 1. Create a new todo for a user
 * 2. Get all todos (with user info)
 * 3. Get a single todo by ID (with user info)
 * 4. Update a todo by ID
 * 5. Delete a todo
*/

/**
 * POST /todos: Create a new todo for a user
*/
app.post('/todos', (async (req: Request, res: Response) => {
    const { title, description, userId } = req.body

    const todo = await client.todo.create({
        data: {
            title,
            description,
            user: { connect: { id: userId } },
        },
    })

    res.json(todo)
}) as RequestHandler)

/**
 * GET /todos: Get all todos (with user info)
*/
app.get('/todos', (async (req: Request, res: Response) => {
    const todos = await client.todo.findMany({
        include: { user: true },
    })
    res.json(todos)
}) as RequestHandler)

/**
 * GET /todos/:id: Get a single todo by ID (with user info)
*/
app.get('/todos/:id', (async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)

    const todo = await client.todo.findUnique({
        where: { id },
        include: { user: true },
    })

    if (!todo) return res.status(404).json({ error: 'Todo not found' })
    res.json(todo)
}) as RequestHandler)

/**
 * PUT /todos/:id: Update a todo by ID
*/
app.put('/todos/:id', (async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const { title, description, done } = req.body

    const todo = await client.todo.update({
        where: { id },
        data: { title, description, done },
    })

    res.json(todo)
}) as RequestHandler)

/**
 * DELETE /todos/:id: Delete a todo by ID
*/
app.delete('/todos/:id', (async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)

    await client.todo.delete({
        where: { id },
    })

    res.json({ message: 'Todo deleted successfully' })
}) as RequestHandler)



const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
