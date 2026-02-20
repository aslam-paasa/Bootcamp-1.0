/**
 * Challenge: Password Toggle
 * In this challenge, you're going to implement the logic for an input
 * field that accepts a password. However, instead of a boring input field,
 * this one is like... slightly less boring.
 * 
 * What makes it less boring is it gives the user the option to toggle the
 * visibility of the password by giving them a button with some cute emojis,
 * 🙊 or 🙈 depending on if the password is visible. 
 * 
 * All the JSX is in place, all you need to do is properly handle the 
 * different states of the component and update 'handleChange' and 
 * 'handleToggleVisibility' so that the component behaves as expected.
 * 
 * Tasks:
 * 1. Update the password length count when the input changes
 * 2. Update the text style based on the password length threshold
 * 3. Allow users to toggle the password visibility
 * 4. Show an alert with a success message when the password length is equal
 *    to or above the threshold on form submission
 * 5. Show an alert with an error message when the password length is below
 *    the threshold on form submission
 * 
 * Hint:
 * 1. Because we want our UI to be dynamic based on the length of the 
 *    input field, we need to store the values of the input field as state.
 *    We can do this by using React's useState hook.
 * 
 *    const [inputValue, setInputValue] = React.useState("");
 * 
 *    And then we'll keep that state up to date with whatever is in the 
 *    input field by updating inputValue whenever the onChange event is
 *    fired.
 * 
 *    const handleChange = (e) => {
 *      setInputValue(e.target.value);
 *    };
 * 
 * 2. In this example, we need more than just our inputValue state. We also
 *    need to keep track of if the password field is visible. Since we can't
 *    drive this value, we'll create it with useState so it persists across
 *    renders.
 * 
 *    const [isInputValueVisible, setIsInputValueVisible] = React.useState(false);
 * 
 *    And then we'll toggle that state whenever handleToggleVisibility is
 *    invoke (which it will be whenever the user clicks on our monkey button).
 * 
 *    const handleToggleVisibility = () => {
 *      setIsInputValueVisible(!isInputValueVisible);
 *    };
 * 
 * 3. You may be tempted to add another piece of state to your component
 *    in order to keep track of if the user's current password length has
 *    surpassed the minimum value. But remember, only add state when you
 *    absolutely have to. In this scenario, we can derive that value with
 *    some basic math.
 * 
 *    const thresholdMet = inputValue.length >= minimum;
 *  
*/

import { useState } from 'react'
import './App.css'

function PasswordInput({ minimum = 8 }) {
  
  const [inputValue, setInputValue] = useState("");
  const [isInputValueVisible, setIsInputValueVisible] = useState(false);
  const thresholdMet = inputValue.length >= minimum;

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleToggleVisibility = () => {
    setIsInputValueVisible(!isInputValueVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (thresholdMet) {
      alert("Password submitted");
    } else {
      alert("You need a longer password");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="limited-text-input">Password:</label>
        <span className={thresholdMet ? "no-error" : "error"}>
          {inputValue.length}
        </span>
      </div>
      <div>
        <input
          placeholder="Enter a password"
          type={isInputValueVisible ? "text" : "password"}
          id="limited-text-input"
          value={inputValue}
          onChange={handleChange}
        />
        <button type="button" onClick={handleToggleVisibility}>
          {isInputValueVisible ? "🙊" : "🙈"}
        </button>
      </div>

      <button type="submit" className="primary">
        Submit
      </button>
    </form>
  );
}

function App() {

  return (
    <div>
      <PasswordInput />
    </div>
  )
}

export default App
