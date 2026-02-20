import { useState } from 'react'
import './App.css'

/**
 * How to clear input field in React:
 * 1. Connect input value to state:
 *    <input type="text" value={firstName} />
 * 
 * 2. Update state with empty string on submit:
 *    setFirstName("");
 * 
 * Note: Clearing input field is important because:
 * 1. Gives user feedback that form was submitted
 * 2. Prevents duplicate entries
 * 3. Provides clean slate for next entry
*/

/**
 * Why preventDefault() is important?
 * 1. Problem with default behavior: 
 *    Form submits refresh page automatically which resets
 *    all our state data
 * 
 * 2. Solution: e.preventDefault() stops page refresh:
 *    e.preventDefault() stops page refresh and data stays intact
 *    after form submit. Now, we can clear the input field.
 * 
 *    handleSubmit = (e) => {
 *       e.preventDefault();  // Stops refresh ✅
 *       setFirstName("");    // Clear input
 *       setLastName("");     // Clear input
 *       console.log("Form submitted!");
 *    }
*/

function App() {
  const[firstName, setFirstName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Stop page refresh
    if (firstName) {
      console.log(firstName);
      setFirstName(""); // Clear input
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">Name </label>
        <input
          type="text"
          value={firstName} // Connect to state
          onChange={(e) => setFirstName(e.target.value)}
        />
        <button type="submit">add person</button>
      </form>
    </>
  );
}

export default App
