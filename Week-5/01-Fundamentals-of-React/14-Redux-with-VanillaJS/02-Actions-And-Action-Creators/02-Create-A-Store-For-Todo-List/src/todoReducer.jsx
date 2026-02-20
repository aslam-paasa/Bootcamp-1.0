/**
 * Topic: Actions & Action Creators
*/

/**
 * Challenge: Create a reducer for todo list
 * - Imagine you have a list of todos that you want to manage in your app's
 *   state. You need a reducer to define how your state changes when you
 *   add or remove a todo.
 * - Create a todosReducer that handles adding and removing todos in
 *   todosReducer.jsx
*/


const initialState = { todos: [] };

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TODO":
            return { ...state, todos: [...state.todos, action.payload] };
        case "REMOVE_TODO":
            return { 
                ...state, 
                todos: state.todos.filter((_, index) => index !== action.payload) 
            };
        default:
            return state;
    }
};

export default todoReducer;