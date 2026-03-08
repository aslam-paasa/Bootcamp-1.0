/**
 * Challenge: Task Manager
 * Given the completed TaskManager component, your challenge is to finish
 * implementing the reducer function so that the user can 'add', 'update',
 * and 'delete' tasks.
 * 
 * Tasks:
 * 1. The user should be able to add a new task.
 * 2. The user should be able to update the status of a task
 * 3. The user should be able to delete a task
 * 
 * Hint:
 * 1. Based on our event handlers, we know there are three different action
 *    types we need to handle:
 *    a. add
 *    b. update
 *    c. delete
 * 
 *    function reducer(tasks, action) {
 *       if (action.type === "add") {
 *      
 *       } else if (action.type === "update") {
 *      
 *       } else if (action.type === "delete") {
 *      
 *       } else {
 *         throw new Error("This action type isn't supported.")
 *       }
 *    }
 * 
 * 2. Since tasks is an array, what we learned earlier in the course about
 *    managing array state in React will help us out.
 * 
 *    In order to add a new task to our state, we'll use the spread operator
 *    to spread all the existing tasks onto a new array and then add the
 *    new task to the end of that array.
 * 
 *    function reducer(tasks, action) {
 *       if (action.type === "add") {
 *         return [
 *           ...tasks,
 *           action.task
 *         ];
 *       } else if (action.type === "update") {
 *      
 *       } else if (action.type === "delete") {
 *      
 *       } else {
 *         throw new Error("This action type isn't supported.")
 *       }
 *    }
 * 
 * 3. In order to update the status of a task, we'll use the map method to
 *    iterate overall the tasks and return a new array with the updated
 *    task.
 * 
 *    function reducer(tasks, action) {
 *       if (action.type === "add") {
 *         return [
 *           ...tasks,
 *           action.task
 *         ];
 *       } else if (action.type === "update") {
 *         return tasks.map((task) =>
 *           task.id === action.id
 *             ? {
 *                 ...task,
 *                 status: task.status === "pending" ? "completed" : "pending"
 *               }
 *             : task
 *         );
 *       } else if (action.type === "delete") {
 *      
 *       } else {
 *         throw new Error("This action type isn't supported.")
 *       }
 *    }
 * 
 * 4. In order to delete a task, we'll use the filter method to iterate
 *    over all the tasks and return a new array with the selected task
 *    removed.
 * 
 *    function reducer(tasks, action) {
 *       if (action.type === "add") {
 *         return [
 *           ...tasks,
 *           action.task
 *         ];
 *       } else if (action.type === "update") {
 *         return tasks.map((task) =>
 *           task.id === action.id
 *             ? {
 *                 ...task,
 *                 status: task.status === "pending" ? "completed" : "pending"
 *               }
 *             : task
 *         );
 *       } else if (action.type === "delete") {
 *         return tasks.filter((task) => task.id !== action.id);
 *       } else {
 *         throw new Error("This action type isn't supported.")
 *       }
 *    }
*/

import './App.css'

function createTask(title) {
  return {
    id: Date.now(),
    title: title.trime(),
    status: "pending"
  };
}

function reducer(tasks, action) {
  if (action.type === "add") {
    return [...tasks, action.task];
  } else if (action.type === "update") {
    return tasks.map((task) =>
      task.id === action.id
        ? {
            ...task,
            status: task.status === "pending" ? "completed" : "pending"
          }
        : task
    );
  } else if (action.type === "delete") {
    return tasks.filter((task) => task.id !== action.id);
  } else {
    throw new Error("This action type isn't supported.")
  }
}

function TaskManager() {
  const [tasks, dispatch] = React.useReducer(reducer, []);

  const handleUpdateTaskStatus = (id) => {
    dispatch({ type: "update", id });
  };

  const handleDeleteTask = (id) => {
    dispatch({ type: "delete", id });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    dispatch({ type: "add", task: createTask(formData.get("task")) });

    e.target.reset();
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <form onSubmit={handleSubmit}>
        <input name="task" placeholder="Task title" />
        <button className="primary" type="submit">
          Add Task
        </button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <div>
              <button
                className={`status ${task.status}`}
                onClick={() => handleUpdateTaskStatus(task.id)}
              />
              {task.title}
            </div>
            <button className="link" onClick={() => handleDeleteTask(task.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}


function App() {

  return (
    <div>
      <TaskManager />
    </div>
  )
}

export default App
