/**
 * Form Validation:
 * Form validation is one of the most common tasks in web development.
 * Whether you're creating a sign-up form, login form or any other user
 * input interface, validation ensures data integrity and improves user
 * experience.
 * 
 * In this guide, we'll create a form validation system using React. We'll
 * cover dynamic input handling, error validation, reusable components,
 * and state management in detail.
*/

/**
 * Problem Statement:
 * We need to build a form with the following requirements:
 * 1. Input for first name, last name, mobile number and password.
 * 2. Validation rules for each field:
 *    a. First Name : Minimum 5 characters
 *    b. Last Name  : Minimum 2 characters
 *    c. Mobile     : Exactly 10 digits and numeric
 *    d. Password   : Minimum 8 characters
 * 3. Display appropriate error message for invalid fields.
 * 4. Handle submission to indicate of the form is valid or contains errors.
*/

/**
 * Step-1: Setting up the Component
 * The App Component is the main handler. It:
 * a. Manages the state for user inputs and errors.
 * b. Handles user interactions (typing in inputs and submitting the form)
 * c. Uses a reusable InputComponent to simplify input handling.
 * 
 * It has two state variables:
 * a. userInput: To stores the value entered into each field
 * b. errors   : To track any validation issues.
 * As user types, the handleUserInput() updates userInput dynamically for
 * the relevent field.
 * 
 * Validation happens through isValidValue(), which checks each field
 * against predefined rules, like ensuring the first ame has at least
 * 5 characters or the mobile number is exactly 10 digits.
 * 
 * If the form is valid on submission, a success message is logged; otherwise,
 * errors is updated and the issues are displayed next to the respective
 * fields. The InputComponent handles rendering each input and its associated
 * error, keeping the code clean and reusable.
*/

/**
 * Step-2: Input Component
 * 1. Reusable Design: InputComponent acts as a wrapper for each input field.
 *    a. type    : Specifies the type of the input (e.g., text, password)
 *    b. onChange: Callback function to handle user input. 
 *    c. name    : Label text for the input field
 *    d. error   : Displays the validation error message if any.
 * 
 * 2. Dynamic Label and Input:
 *    a. The name prop dynamically renders the label for each field.
 *    b. The type prop ensures flexibility to handle different input types.
 * 
 * 3. Error Handling: 
 *    If the error prop is not an empty string, the corresponding error
 *    message is displayed below the input field in red.
 * 
 * 4. Separation of Concerns:
 *    By using InputComponent, we separate the logic for rendering inputs
 *    from the main form component, keeping the code modular and clean.
*/

import "./App.css";
import InputComponent from "./component/InputComponent";
import { useState } from "react";

function App() {
  const [userInput, setUserInput] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    password: "",
  });

  const isValidValue = () => {
    const errorObj = {
      firstName: "",
      lastName: "",
      mobile: "",
      password: "",
    };

    if (userInput.firstName.length < 5) {
      errorObj.firstName = "Please enter a longer value";
    } else {
      errorObj.firstName = "";
    }

    if (userInput.lastName.length < 2) {
      errorObj.lastName = "Please enter a longer value";
    } else {
      errorObj.lastName = "";
    }

    if (userInput.mobile.length !== 10 || isNaN(userInput.mobile)) {
      errorObj.mobile = "Please enter a valid 10-digit mobile number";
    } else {
      errorObj.mobile = "";
    }


    if (userInput.password.length < 8) {
      errorObj.password = "Please enter a password with at least 8 characters";
    } else {
      errorObj.password = "";
    }


    setErrors(errorObj);

    return !Object.values(errorObj).some((error) => error !== "");
  };

  const handleUserInput = (e, type) => {
    let value = e.target.value;
    let userNewInput = { ...userInput, [type]: value };
    setUserInput(userNewInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = isValidValue();
    if (isValid) {
      console.log("Form is valid");
    } else {
      console.log("Form has errors");
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <InputComponent
          name="First Name"
          type="text"
          onChange={(e) => handleUserInput(e, "firstName")}
          error={errors.firstName}
        />

        <InputComponent
          name="Last Name"
          type="text"
          onChange={(e) => handleUserInput(e, "lastName")}
          error={errors.lastName}
        />

        <InputComponent
          name="Mobile"
          type="text"
          onChange={(e) => handleUserInput(e, "mobile")}
          error={errors.mobile}
        />

        <InputComponent
          name="Password"
          type="password"
          onChange={(e) => handleUserInput(e, "password")}
          error={errors.password}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;


/**
 * Key Points:
 * 1. Input Component: 
 *    - Simplifies input rendering and error display. 
 *    - Keeps the form component focused on managing state and validation.
 * 
 * 2. State Interaction:
 *    - userInput drives the form's content.
 *    - errors ensures users are aware of invalid inputs.
 * 
 * 3. Validation Logic:
 *    Dynamically validates inputs and provides immediate feedback.
*/


/**
 * Interview Tips:
 * 1. Explain Component Reusability: 
 *    Highlight how InputComponent ensures scalability and separation of
 *    concerns.
 * 
 * 2. Discuss State Management:
 *    Detail how userInput and errors interact to handle dynamic form
 *    validation.
 * 
 * 3. Propose Enhancements: 
 *    Add live validation(validate while typing) or integrate with a backend
 *    for server-side validation.
*/