import { useState } from "react";
import "./App.css";

/**
 * Function as Props:
 * - You can create stateless components. Advantage of creating stateless components
 *   is that you can re-use that component with different data.
 * - Event Listeners like onClick can only be applied to standard HTML
 *   elements like <button>. With this method, you can name your event
 *   handler the way you want for each component.
 * - You can reduce the number of state variables. Managing state
 *   variable errors becomes easy.
 */

const todosDB = [
  { id: 1, text: "Buy milk", isDone: false },
  { id: 2, text: "Do laundry", isDone: false },
  { id: 3, text: "Finish project", isDone: true },
  { id: 4, text: "Tell Tanvi to learn driving", isDone: false },
  { id: 5, text: "Pay bills", isDone: true },
  { id: 6, text: "Go to gym", isDone: false },
  { id: 7, text: "Cook dinner", isDone: true },
  { id: 8, text: "Read book", isDone: false },
  { id: 9, text: "Take dog for a walk", isDone: false },
  { id: 10, text: "Clean bathroom", isDone: true },
];

function TodoItem({ todo: { id, text, isDone }, handleTogoToggle }) {
  function handleClickOnTodo() {
    handleTogoToggle(id);
  }

  return (
    <div
      style={{
        textDecoration: isDone ? "line-through" : "",
        cursor: "pointer",
        margin: "5px 0",
      }}
      onClick={handleClickOnTodo}
    >
      {text}
    </div>
  );
}

function App() {
  const [todos, setTodos] = useState(todosDB);

  const handleTogoToggle = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const { open, done } = todos.reduce(
    (count, todo) => {
      if (todo.isDone) {
        count.done++;
      } else {
        count.open++;
      }
      return count;
    },
    { open: 0, done: 0 }
  );

  return (
    <div>
      <h1>Todo List</h1>
      <p>
        Open: {open} | Done: {done}
      </p>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} handleTogoToggle={handleTogoToggle} />
      ))}
    </div>
  );
}

export default App;
