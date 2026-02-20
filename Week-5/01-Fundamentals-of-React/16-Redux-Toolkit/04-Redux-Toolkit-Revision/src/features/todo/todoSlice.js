/**
 * Slice:
 * > A slice is like a mini-store that manages one specific part of the 
 *   application state.
 * > It contains everything needed to handle that piece of data.
 * > Think of a slice as a Todo Manager:
 *   a. Initial State: Empty todo list at the start
 *   b. Reducers: Rules to how to add/remove todos
 *   c. Actions : Commands like 'addTodo' or 'removeTodo' that trigger the 
 *                reducers
*/

/**
 * Import required tools:
 * a. createSlice: creates our slice with reducers & actions
 * b. nanoid: generates unique IDs for each todo
*/
import { createSlice, nanoid } from '@reduxjs/toolkit';

/**
 * 1. Define the initial state:
 *    > Startting point of our data
 *    > We begin with one todo item already in the list
*/
const initialState = {
    todos: [{ id: '1', text: 'Buy milk' }],
}

/**
 * 3.b. Create the slice:
 *    > This is where we'll define the reducer and actions
 *      a. name: unique name of the slice
 *      b. initialState: starting point of our data
 *      c. reducers: fns that define HOW state changes
 *         - It provides two things:
 *           > action: 
 *             - contains data sent with the command (access via action.payload)
 *             - create a new todo object with a unique id and text
 *           > state :
 *             - current state (access via state.todos, state.value, etc.) 
 *             - add new todo to the todos array (access via state.todos)
*/
export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload,
            }
            state.todos.push(todo); // initialState.todos.push(todo); 
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        },
    }
})

/**
 * Export actions + useReducer:
 * 1. Export REDUCER to connect to store
 *    > useSelector: gets data from the store (access via state.todo.todos)
 *    > Ex: const todos = useSelector((state) => state.todo.todos);
 * 
 * 2. Export ACTIONS to use in components
 *    > Actions: commands that trigger the reducers.
 *    > useDispatch: sends commands to the store (access via dispatch(action))
 *    > Ex: const dispatch = useDispatch();
 *          dispatch(addTodo('Learn Redux'));
 *          dispatch(removeTodo('abc123'));
*/
export const { addTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;