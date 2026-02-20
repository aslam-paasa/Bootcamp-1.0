import { useState } from 'react'
import './App.css'

/**
 * Working with Dropdown and useState:
 * - Each <option> element should have a value attribute containing
 *   the data value to submit when that option is selected. If no value
 *   attribute is included, the value defaults to the text contained
 *   inside the element.
*/

/**
 * Q. Create a React component that allows the user to select a color
 *    from a dropdown menu:
 *    a. Change the color of heading text to the selected color.
 *    b. The component should have an initial state value of "black"
 *       for the selected color.
 *    c. The dropdown menu should include at least four color options:
 *       black, red, blue, and green.
 *    d. Use the useState hook to manage the state of the selected color.
*/

function App() {
  const [selectedColor, setSelectedColor] = useState("black");

  const handleChange = (event) => {
    setSelectedColor(event.target.value);
  };

  return (
    <div>
      <h1 style={{ color: selectedColor}}>Working with Dropdown and useState</h1>
      <select onChange={handleChange}>

        <option value="black">Select Color</option>
        <option value="purple">Purple</option>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>  
      </select>      
    </div>
  )
}

export default App
