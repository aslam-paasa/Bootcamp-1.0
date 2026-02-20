/**
 * Challenge: Smart Character Limit
 * Now that you know how to add preserve state in React, let's revisit our
 * Character Limit challenge from earlier in the course and make it a little
 * more sophisticated.
 * 
 * The goal of this app is to get some input from the user, but only "submit"
 * that input if its length is less than or equal to characterLimit(20 char
 * by default). Unlike our other "Character Limit" challenges, this one
 * shows the user how many characters they have left before they hit the
 * limit.
 * 
 * Tasks:
 * 1. LimitedTextInput renders an input and submit button
 * 2. Update the remaining characters count when the user types
 * 3. Add an 'error' class to the "Characters remaining:" 'span' element
 *    when the user exceeds the character limit and a 'no-error' when
 *    they haven't
 * 4. alert "The input exceeds the character limit. Please shorten your
 *    text." when the user submits a form with too many characters
 * 5. alert "Thanks for your submission!" when the user submits a form with
 *    an acceptable number of characters
 * 6. Reset the input back to an empty string when the form is successfully
 *    submitted
 * 
 * Hint:
 * 1. Because we want our UI to be dynamic based on the length of the input
 *    field, we need to store the value of the input field as state. We can
 *    do this by using React's useState hook.
 * 
 *    const [inputValue, setInputValue] = useState("");
 * 
 *    And then we'll keep that state up to date with whatever is in the
 *    input field by updating 'inputValue' whenever the 'onChange' event
 *    is fired.
 * 
 *    const handleChange = (event) => {
 *      setInputValue(event.target.value);
 *    }
 * 
 * 2. You may be tempted to add more pieces of state to your component in
 *    order to keep track of the number of characters remaining and whether
 *    or not the user has exceeded the limit. But remember, only add state
 *    when you absolutely have to. In our scenario, we can derive both of
 *    those values with some simple math.
 * 
 *    const [inputValue, setInputValue] = useState("");
 *    const remainingCharacters = characterLimit - inputValue.length;
 *    const limitExceeded = remainingCharacters < 0;
 * 
 * 3. At this point if you have 'inputValue', 'remainingCharacters', and
 *    'limitExceeded', all you have to do is update 'handleSubmit' as well
 *    as the "Characters remaining:" element(dont' forget the classname too).
 * 
 *    const handleSubmit = (event) => {
 *      event.preventDefault();
 *      if (limitExceeded) {
 *        alert("The input exceeds the character limit. Please shorten your text.");
 *      } else {
 *        alert("Thanks for your submission!");
 *      }
 *    }
 * 
 *    ...
 * 
 *    <span className={limitExceeded ? "error" : "no-error"}>
 *      {remainingCharacters} characters remaining
 *    </span>
*/

import './App.css'
import { useState } from 'react';
import PropTypes from 'prop-types';

function LimitedTextInput({ characterLimit = 20 }) {

  const [inputValue, setInputValue] = useState("");
  const remainingCharacters = characterLimit - inputValue.length;
  const limitExceeded = remainingCharacters < 0;


  const handleChange = (e) => {
    setInputValue(e.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (limitExceeded) {
      alert("The input exceeds the character limit. Please shorten your text.");
    } else {
      setInputValue("");
      alert("Thanks for your submission");
    }
  };

  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="limited-text-input">Limited Text Input:</label>
        <span className={limitExceeded ? "error" : "no-error"}>
          Characters remaining: {remainingCharacters}
        </span>
      </div>
      <input
        type="text"
        placeholder="Enter some text"
        id="limited-text-input"
        value={inputValue}
        onChange={handleChange}
      />

      <button type="submit" className="primary">
        Submit
      </button>
    </form>
  );
}


function App() {

  return (
    <div>
      <LimitedTextInput />
    </div>
  )
}

LimitedTextInput.propTypes = {
  characterLimit: PropTypes.number,
};

export default App
