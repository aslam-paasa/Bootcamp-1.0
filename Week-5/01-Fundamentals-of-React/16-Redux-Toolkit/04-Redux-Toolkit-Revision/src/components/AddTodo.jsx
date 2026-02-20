import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todo/todoSlice';

/**
 * AddTodo component:
 * > useDispatch: 
 *   - dispatch reducer ko use krte hue store mai changes karta hai
 *   - Means it sends data to the store (access via dispatch(action))
 *   - addTodoHandler: fn to add a new todo 
 *     > dispatch(addTodo(input)) -> sends data to the store
 *                          |
 *                          V
 *                   action.payload -> 'Buy milk'
*/

const AddTodo = () => {
    const [input, setInput] = useState('');

    const dispatch = useDispatch();

    const addTodoHandler = (e) => {
        e.preventDefault();
        dispatch(addTodo(input));
        setInput('');
    }

  return (
    <form onSubmit={addTodoHandler}>
        <input 
        type="text" 
        placeholder="Add a new todo" 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Add Todo</button>
    </form>
  )
}

export default AddTodo
