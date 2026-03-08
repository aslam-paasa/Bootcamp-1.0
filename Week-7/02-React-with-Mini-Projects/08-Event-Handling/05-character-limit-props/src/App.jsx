/**
 * Challenge: Character Limit Props
 * You'll notice that this challenge looks similar to the last one. However,
 * instead of hard coding the character limit as we did before, we now want
 * to make our component a little more flexible and pass it in via a prop.
 * Fix up the code so it works as before, but with the new characterLimit
 * prop.
 * 
 * Tasks:
 * 1. Don't show an alert if the input length is within character limit.
 * 2. Show an alert if the input length exceeds the character limit.
 * 
 * Hint:
 * 1. Remember, event handlers should live inside the component that way 
 *    they get access to the component's props and state via closure scope.
*/

import './App.css'
import PropTypes from 'prop-types'

function Input({ characterLimit }) {
  
  const handleChange = (event) => {
    if (event.target.value.length > characterLimit) {
      alert("Character limit exceeded");
    }
  };

  return <input onChange={handleChange} placeholder="Enter some text" />;
}

function App() {
  return (
    <section>
      <h1>Character Limit</h1>
      <Input characterLimit={20} />
    </section>
  );
}

Input.propTypes = {
  characterLimit: PropTypes.number.isRequired,
};

export default App
