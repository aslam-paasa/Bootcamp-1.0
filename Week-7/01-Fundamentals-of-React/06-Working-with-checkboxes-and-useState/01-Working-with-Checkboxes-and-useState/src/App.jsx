import { useState } from 'react'
import './App.css'

/**
 * Working with Checboxes and useState:
 * Q. Create a React component that displays a list of tasks, each with
 *    a checkboz next to it. When a checkbox is checked, display the
 *    task as strikethrough text.
*/

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Clean the house", completed: false },
    { id: 2, text: "Do laundry", completed: false },
    { id: 3, text: "Buy groceries", completed: false }
  ]);

  const handleTaskCompletion = (id) => {
    const toggleCompletion = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(toggleCompletion);
  };

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => handleTaskCompletion(task.id)}
          />
          <span
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
          >
            {task.text}
          </span>
        </div>
      ))}
    </div>
  );
}


export default App
