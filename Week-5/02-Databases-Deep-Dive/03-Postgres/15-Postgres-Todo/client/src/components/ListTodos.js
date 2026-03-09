import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditTodo";

/**
 * 1. Building ListTodos component:
 */
const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  /**
   * 1. deleteTodo function:
   *    a. Fetches the todo with the given id
   *    b. Deletes the todo from the database
   *    c. Updates the todos state to remove the deleted todo
   */
  const deleteTodo = async id => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE"
      });

      setTodos(todos.filter(todo => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  /**
   * 2. getTodos function:
   *    a. Fetches all todos from the database
   *    b. Updates the todos state with the fetched todos
   */
  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();

      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  /**
   * 3. useEffect hook:
   *    a. Fetches todos when the component mounts
   */
  useEffect(() => {
    getTodos();
  }, []);

  console.log(todos);

  return (
    <Fragment>
      {" "}
      <table class="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/*<tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr> */}
          {todos.map(todo => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
