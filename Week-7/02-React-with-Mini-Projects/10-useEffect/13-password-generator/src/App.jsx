/**
 * Password Generator:
 * A password generator is a useful tool for creating secure, randomized
 * passwords based on specific criteria. This project demonstrates how to
 * build a customizable password generator using React. Users can define
 * the password length and choose to include uppercase letters, lowercase
 * letters, numbers, and special characters. 
*/

/**
 * Step-1: Setting up the State and Configuration Options
 * The component starts by defining state variables to manage user inputs
 * and generate the password. The userInput object tracks configuration
 * options such as password length and the inclusion of different character
 * types.
 * 
 * 1. State Variables:
 *    - userInput     : Tracks user preferences for the password.
 *    - passwordString: Stores the generated password.
 *    - submitClicked : Toggles the display of the generated password after
 *                      submission.
 * 
 * 2. Character Arrays:
 *    Define reusable arrays for uppercase letters, lowercase letters,
 *    numbers, and special characters.
*/

/**
 * Step-2: Handling User Input
 * React's useState allows dynamic updates to the userInput object based
 * on the user actions. Sliders and checkboxes are used to capture the 
 * password configuration.
*/

/**
 * Step-3: Generating the Password
 * The generatePassword function creates a password based on the user's 
 * selected preferences for length and character types. It initializes an
 * empty characterPool, adding character sets(uppercase, lowercase, numbers,
 * special characters) based on user choices. These selected arrays are
 * flattened into a single characterPoolFlatList, which serves as the source
 * for password generation.
 * 
 * Using a while loop, characters are randomly picked from the pool using
 * Math.random() until the desired length is reached. The generated password
 * is stored in passwordString, and the submitClicked state is updated to
 * trigger its display. This ensures a flexible and dynamic password
 * generation process. 
 * 1. Dynamic Character Pool: Builds the character pool based on user
 *    selections (e.g., uppercase, lowercase).
 * 2. Random Selection: Selects random characters from the pool to construct
 *    the password.
 * 3. Flattening Arrays: Combines nested arrays into a single array for
 *    easier access.
 * 4. Updating State: Stores the generated password and displays it on the UI.
*/

/**
 * Step-4: Rendering the Configuration and Password
 * The UI includes sliders, checkboxes, and a button to generate the password.
 * Each configuration option updates the corresponding state variable in
 * real time. 
 * 1. Dynamic Inputs: Slider and checkboxes allow users to customize password
 *    properties.
 * 2. Button Trigger: Initiates the password generation process when clicked.
*/

import { useState } from "react";
import "./App.css";

function App() {
  const [userInput, setUserInput] = useState({
    length: 0,
    specialChar: false,
    uppercase: false,
    lowercase: false,
    numbers: false,
  });

  const [passwordString, setPasswordString] = useState('')
  const [submitClicked, setSubmitClicked] = useState(false)

  const uppercaseArr = [...Array(26)].map((_, i) => String.fromCharCode(65 + i)); // A-Z
  const lowercaseArr = [...Array(26)].map((_, i) => String.fromCharCode(97 + i)); // a-z
  const numbersArr = [...Array(10)].map((_, i) => i.toString()); // 0-9
  const specialCharArr = "@#$%^&*()".split(""); // Special characters


  const onSliderChange = (e) => {
    let newUserInput = { ...userInput, ["length"]: e.target.value };
    setSubmitClicked(false)
    setUserInput(newUserInput);
  };

  const onCheckboxChange = (e, type) => {
    let newUserInput = { ...userInput, [type]: e.target.checked };
    setSubmitClicked(false)
    setUserInput(newUserInput);
  };

  const generatePassword = () => {
    let characterPool = [];
    let { length, uppercase, lowercase, numbers, specialChar } = userInput
    if (uppercase) characterPool.push(uppercaseArr)
    if (lowercase) characterPool.push(lowercaseArr)
    if (specialChar) characterPool.push(specialCharArr)
    if (numbers) characterPool.push(numbersArr)

    let characterPoolFlatList = characterPool.flat()
    console.log('characterPoolFlatList', characterPoolFlatList)

    let passwordString = [];
    while (length > 0) {
      passwordString.push(
        characterPoolFlatList[Math.floor(Math.random() * characterPoolFlatList.length)]
      );
      length--;
    }

    setSubmitClicked(true)
    setPasswordString(passwordString)
  };

  return (
    <div className="App">
      Password Generator
      <div className="config-section">
        <div className="config-option">
          <label>Select Length</label>
          <input
            type="range"
            name="length"
            min="1"
            max="20"
            value={userInput.length}
            onChange={(e) => onSliderChange(e)}
          />
        </div>

        <div className="config-option">
          <label>Special Characters</label>
          <input
            name="specialChar"
            type="checkbox"
            onClick={(e) => onCheckboxChange(e, "specialChar")}
          />
        </div>
        <div className="config-option">
          <label>Lowercase</label>
          <input
            name="lowercase"
            type="checkbox"
            onChange={(e) => onCheckboxChange(e, "lowercase")}
          />
        </div>
        <div className="config-option">
          <label>Uppercase</label>
          <input
            name="uppercase"
            type="checkbox"
            onChange={(e) => onCheckboxChange(e, "uppercase")}
          />
        </div>
        <div className="config-option">
          <label>Numbers</label>
          <input
            name="numbers"
            type="checkbox"
            onChange={(e) => onCheckboxChange(e, "numbers")}
          />
        </div>
      </div>
      <button onClick={() => generatePassword()}>Generate Password</button>
      <div className="passwordHolder">{submitClicked && passwordString}</div>
    </div>
  );
}

export default App;


/**
 * Key Points:
 * 1. State Management: Tracks password configuration using React's useState.
 * 2. Dynamic Logic: Builds a custom character pool based on user experience.
 * 3. Real-Time Feedback: Displays the generated password immediately after
 *    submission.
 * 4. User-Friendly Controls: Includes sliders and checkboxes for seamless
 *    customization.
*/

/**
 * Interview Tips:
 * 1. Explain Controlled Components: Describe how sliders and checkboxes
 *    dynamically update state variables like length and specialChar.
 * 2. Discuss Logic Optimization: Highlight the use of .flat() for
 *    simplifying characters pool generation.
 * 3. Propose Enhancements: Suggest adding validation for min/max password
 *    length or character inclusion.
 * 4. Relate to Real-World Applications: Show how similar logic is used in
 *    security tools and online account creation processes.
*/