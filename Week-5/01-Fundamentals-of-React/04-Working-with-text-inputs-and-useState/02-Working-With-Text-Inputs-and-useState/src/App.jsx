import { useState } from 'react'
import './App.css'

/**
 * Working with Text Inputs in React:
 * Q. Create 2 text input fields 'First Name', 'Last Name'. On entering
 *    your name in the text fields, you should populate that input below
 *    in a paragraph tag.
*/

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleFirstNameInput = () => {
    setFirstName(event.target.value);
  };

  const handleLastNameInput = () => {
    setLastName(event.target.value);
  };

  return (
    <div>
      <label className='inputfield'>First Name: <input onChange={handleFirstNameInput} /></label>
      <br />
      <label className='inputfield'>Last Name: <input onChange={handleLastNameInput} /></label>
      <p>You will be checked in with the name: <b>{firstName} {lastName}</b></p>
    </div>
  )
}

export default App
