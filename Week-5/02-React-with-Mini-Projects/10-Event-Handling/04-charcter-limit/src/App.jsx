/**
 * Challenge: Character Limit
 * Whenever we're dealing with events in React, we can extract the logic
 * for those events into their own event handlers.
 * 
 * The goal with this challenge is to make it so when the user types more
 * than 10 characters into the input field, they'll get an alert that says
 * "Character limit exceeded"
 * 
 * Tasks:
 * 1. Don't show an alert if the input is under the character limit
 * 2. Show an alert if the input exceeds the character limit
*/

import './App.css'

function App() {
  const handleChange = (event) => {
    if (event.target.value.length > 10) {
      alert("Character limit exceeded");
    }
  };

  return (
    <section>
      <h1>Character Limit</h1>
      <input onChange={handleChange} placeholder="Enter some text" />
    </section>
  );
}

export default App
