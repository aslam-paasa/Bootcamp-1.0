import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo } from "../features/todo/todoSlice";

/**
 * useSelector:
 * > gets data from the store
 * > Ex: const todos = useSelector((state) => state.todo.todos);
 */

const Todos = () => {
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();

  const removeTodoHandler = (id) => {
    dispatch(removeTodo(id));
  };

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          <span>{todo.text}</span>
          <button onClick={() => removeTodoHandler(todo.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default Todos;
