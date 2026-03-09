const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

/**
 * Middleware:
 * 1. cors        : allows requests from different origins
 * 2. express.json: parses req.body to json
 */
app.use(cors());
app.use(express.json());

/**
 * 1. POST: /todos  : create a todo
 *    a. req.body: { description: "todo description" }
 *    b. Insert the todo into the database
 *       - todo table has a column called description
 *       - Values($1) is a placeholder for the description
 *       - [description] is the value to be inserted
 *       - RETURNING * returns all columns of the inserted row
 *    c. newTodo.rows[0] contains the newly created todo
 *    d. res.json(newTodo.rows[0]) sends the created todo back to the client
 */

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

/**
 * 2. GET: /todos  : get all todos
 *    a. Fetch all todos from the database
 *    b. allTodos.rows contains all the todos
 *    c. res.json(allTodos.rows) sends all the todos back to the client
 */
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

/**
 * 3. GET: /todos/:id  : get a todo
 *    a. Get the id from the request params
 *    b. Select the todo with the given id from the database
 *       - todo_id is the column name in the database
 *       - $1 is a placeholder for the id
 *       - [id] is the value to be inserted
 *    c. todo.rows[0] contains the todo
 *    d. res.json(todo.rows[0]) sends the todo back to the client
 */
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

/**
 * 4. PUT: /todos/:id  : update a todo
 *    a. Get the id from the request params
 *    b. Get the description from the request body
 *    c. Update the todo with the given id in the database
 *       - todo_id is the column name in the database
 *       - $1 is a placeholder for the description
 *       - [description] is the value to be inserted
 *       - $2 is a placeholder for the id
 *       - [id] is the value to be inserted
 *    d. res.json("Todo was updated!" + updateTodo.rows[0]) sends a success message back to the client
 */
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );

    res.json("Todo was updated!" + updateTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

/**
 * 5. DELETE: /todos/:id  : delete a todo
 *    a. Get the id from the request params
 *    b. Delete the todo with the given id from the database
 *       - todo_id is the column name in the database
 *       - $1 is a placeholder for the id
 *       - [id] is the value to be inserted
 *    c. res.json("Todo was deleted!" + deleteTodo.rows[0]) sends a success message back to the client
 */
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id
    ]);
    res.json("Todo was deleted!" + deleteTodo.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

/**
 * Start the server
 */
app.listen(5000, () => {
  console.log("server has started on port 5000");
});
