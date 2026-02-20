"use strict";
/**
 * Assignment:
 * Add a User and a Todo table in your application.
 * 1. Define the schema for the User and Todo tables.
 * 2. Generate the Prisma Client.
 * 3. Use the Prisma Client to interact with the database.
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Relationships:
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
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const client = new client_1.PrismaClient();
app.use(express_1.default.json());
console.log('Server is running');
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
app.post('/users', ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, age, city } = req.body;
    const user = yield client.user.create({
        data: { username, password, age, city },
    });
    res.json(user);
})));
/**
 * GET /users: Get all users (with their todos)
*/
app.get('/users', ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield client.user.findMany({
        include: { todos: true },
    });
    res.json(users);
})));
/**
 * GET /users/:id: Get a single user by ID (with todos)
*/
app.get('/users/:id', ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const user = yield client.user.findUnique({
        where: { id },
        include: { todos: true },
    });
    if (!user)
        return res.status(404).json({ error: 'User not found' });
    res.json(user);
})));
/**
 * PUT /users/:id: Update a user by ID
*/
app.put('/users/:id', ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { username, age, city } = req.body;
    const user = yield client.user.update({
        where: { id: parseInt(id) },
        data: { username, age, city },
    });
    res.json(user);
})));
/**
 * DELETE /users/:id: Delete a user and their todos
*/
app.delete('/users/:id', ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield client.todo.deleteMany({ where: { userId: parseInt(id) } }); // important: delete todos first
    yield client.user.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'User deleted successfully' });
})));
/**
 * GET /users/:id/todos: Get all todos for a specific user
*/
app.get('/users/:id/todos', ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id);
    const todos = yield client.todo.findMany({
        where: { userId },
    });
    res.json(todos);
})));
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
app.post('/todos', ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, userId } = req.body;
    const todo = yield client.todo.create({
        data: {
            title,
            description,
            user: { connect: { id: userId } },
        },
    });
    res.json(todo);
})));
/**
 * GET /todos: Get all todos (with user info)
*/
app.get('/todos', ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield client.todo.findMany({
        include: { user: true },
    });
    res.json(todos);
})));
/**
 * GET /todos/:id: Get a single todo by ID (with user info)
*/
app.get('/todos/:id', ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const todo = yield client.todo.findUnique({
        where: { id },
        include: { user: true },
    });
    if (!todo)
        return res.status(404).json({ error: 'Todo not found' });
    res.json(todo);
})));
/**
 * PUT /todos/:id: Update a todo by ID
*/
app.put('/todos/:id', ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { title, description, done } = req.body;
    const todo = yield client.todo.update({
        where: { id },
        data: { title, description, done },
    });
    res.json(todo);
})));
/**
 * DELETE /todos/:id: Delete a todo by ID
*/
app.delete('/todos/:id', ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    yield client.todo.delete({
        where: { id },
    });
    res.json({ message: 'Todo deleted successfully' });
})));
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
