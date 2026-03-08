import { useState } from "react";


/**
 * Typing State with Arrays:
*/
interface Todo {
    id: number;
    task: string;
    completed: boolean;
}

const TodoList: React.FC = () => {
    /**
     * Define a state variable for a list of to-do items:
    */
    const [todos, setTodos] = useState<Todo[]>([]);

    /**
     * Add a new todo item:
     * - Create a new todo item
     * - Add it to the list
     */
    const addTodo = (task: string) => {
        const newTodo: Todo = {
            id: todos.length + 1,
            task,
            completed: false,
        };
        setTodos((prevTodos) => [...prevTodos, newTodo]);
    };

    return (
        <div>
            <h2>Todo List</h2>
            <button onClick={() => addTodo("New Todo")}>Add Todo</button>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {todo.task} {todo.completed ? "(Completed)" : ""}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;