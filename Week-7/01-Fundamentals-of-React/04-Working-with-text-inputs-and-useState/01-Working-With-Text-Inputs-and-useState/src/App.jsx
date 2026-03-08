import { useState } from 'react'
import './App.css'

/**
 * Working with Text Inputs in React:
 * Q. Create a input field and whatever you type  in the input field, 
 *    show that text simultaneously below in a paragraph tag.
*/

function App() {
  const [text, setText] = useState('');

  /**
   * onChange is an event. So, we will target the value of the event
   * to get the value of the input. And whatever we type, we can see
   * that on the UI. 
  */
  const handleChange = (event) => {
    setText(event.target.value);
  };


  return (
    <div>
      <input type="text" onChange={handleChange} />
    </div>
  )
}

export default App
