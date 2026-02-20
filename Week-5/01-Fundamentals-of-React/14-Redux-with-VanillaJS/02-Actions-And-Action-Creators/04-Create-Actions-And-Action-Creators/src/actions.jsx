/**
 * Create actions and action creators:
 * - Actions are plain JavaScript objects that describe what happened in your
 *   app. Actions creators are function that create these action objects.
 *   This helps keep your code organized and consistent.
*/

/**
 * Challenge: 
 * 1. Create 'actions.jsx' and define two contraints:
 *    a. ADD_TODO
 *    b. REMOVE_TODO
 * 2. Create an action creator function named 'addTodo' that makes a 'text'
 *    parameter and returns an action object with the 'type' of 'ADD_TODO'
 *    and the 'payload' as text.
 * 3. Create an action creator function named 'removeTodo' that makes an
 *    'index' parameter and returns an action object with the 'type' of
 *    'REMOVE_TODO' and the 'payload' as 'index'. 
*/

export const ADD_TODO = "ADD_TODO";
export const REMOVE_TODO = "REMOVE_TODO";

export const addTodo = (text) => ({
    type: ADD_TODO,
    payload: text
});

export const removeTodo = (index) => ({
    type: REMOVE_TODO,
    payload: index
});