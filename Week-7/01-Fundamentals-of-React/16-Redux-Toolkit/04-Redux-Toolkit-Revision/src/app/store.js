/**
 * 1. Import required fns
 *    > configureStore is the function that creates your store
 *    > todoReducer is the reducer for the todo slice (mini-store)
*/
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../features/todo/todoSlice';


/**
 * 2. Create the store (Global Data Container)
 *    > This is where we'll write the rules for updating the store (reducers)
*/
export default configureStore({
    reducer: {
        todo: todoReducer,
    },
})