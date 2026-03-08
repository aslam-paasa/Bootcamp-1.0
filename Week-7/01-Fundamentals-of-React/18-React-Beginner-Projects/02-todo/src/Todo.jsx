import { useState } from "react";
import "./App.css";

/**
 * Generate a random id:
*/
function generateId() {
  return Math.floor(Math.random() * 10);
}

function Todo() {

  /**
   * 1. State:
   *    - todos: array of objects
   *    - input: string
  */
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  /**
   * 2. Function: 
   *    - handleSubmit: function to add a new todo
   *    - removeTodo: function to remove a todo
  */

  const handleSubmit = () => {
    setTodos((todos) =>
      todos.concat({
        text: input,
        id: generateId(),
      })
    );
    setInput("");
  };

  const removeTodo = (id) =>
    setTodos((todos) => todos.filter((t) => t.id !== id));

  return (
    <div className="container">

      {/* Input: Where user can type their todo */}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="New Todo"
      />

      {/* Button: Where user can submit their todo */}
      <button onClick={handleSubmit}>Submit</button>

      {/* List: Where all the todos are displayed */}
      <ul className="todos-list">
        {todos.map(({ text, id }) => (
          <li key={id} className="todo">
            <span>{text}</span>
            <button className="close" onClick={() => removeTodo(id)}>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
