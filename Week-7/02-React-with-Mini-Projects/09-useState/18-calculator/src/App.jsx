/**
 * Building a Simple Calculator:
 * This article explains the process of creating a basic calculator app in
 * React, highlighting critical aspects of the development process, including
 * state management, user input handling, and calculation logic.
 * 
 * The goal is to showcase how to implement a functional calculator that
 * dynamically processes user inputs and performs arithmetic operations.
*/

/**
 * Step-1: Setting Up State
 * The first step in building this calculator is managing the state using
 * React's useState hook.
 * 
 *   const [input, setInput] = useState('');   <== stores user's input
 *   const [result, setResult] = useState(''); <== Stores the calculated result
 * 
 * Purpose:
 * a. The input state dynamically updates as users click calculator buttons,
 *    forming the mathematical expression.
 * b. The result state displays the calculate output after evaluating the
 *    expression.
 * This setup ensures a clean separation between the input and the 
 * computed result.
*/

/**
 * Step-2: Handling Button Clicks
 * When users interact with the calculator, their actions are processed
 * through dedicated event handlers.
 * 
 *   Appends clicked button's value (e.g., numbers, operators) to input state
 *   
 *   const handleButtonClick = (value) => {
 *     setInput(prev => prev + value);
 *   }
 * 
 *   Resets both input and result states, clearning calculator for a new
 *   expression
 * 
 *   const clearInput = () => {
 *     setInput('');
 *     setResult('');
 *   }
 * 
 *   Processes the input string to evaluate the arithmetic expression and
 *   updates the result state
 * 
 *   const calculateResult = () => {
 *     // calculation logic here
 *   }
*/

/**
 * Step-3: Implementing Calculation Logic
 * The calculateResult function is the core of the calculator. It proceses
 * the input string to compute the result.
 * 
 * Breakdown of the logic:
 * 
 *   const calculateResult = () => {
 * 
 *     let num1 = '';
 *     let num2 = '';
 *     let operator = '';
 * 
 *     for (let i = 0; i < input.length; i++) {
 *       const char = input[i];
 *       if (char === '+' || char === '-' || char === '*' || char === '/').includes(char) {
 *         operator = char;  <== Identify the operator
 *       } else if (!operator) {
 *         num1 += char;     <== Build the first operand
 *       } else {
 *         num2 += char;     <== Build the second operand
 *       }
 *     }
 * 
 *     num1 = parseFloat(num1);
 *     num2 = parseFloat(num2);
 * 
 *     let calcResult = 0;
 *     if (operator === '+') calcResult = num1 + num2;
 *     if (operator === '-') calcResult = num1 - num2;
 *     if (operator === '*') calcResult = num1 * num2;
 *     if (operator === '/') calcResult = num1 / num2;
 * 
 *     setResult(calcResult);
 *   }
 * 
 * 
 * How it works?
 * - The function iterates through the input string to extract two operands
 *   (num1 and num2) and an operator.
 * - Based on the operator, it performs the appropriate arithmetic operation.
 * - If the division by zero occurs, it returns 'Error'
 * - The result is then stored in the result state.
*/

/**
 * Step-4: Designing the Calculator Interface
 * The user interface is designed with simplicity in mind, an input field,
 * a results display, and a grid of buttons.
 * 
 * <div>
 *   {[1, 2, 3, '+', 4, 5, 6, '-', 7, 8, 9, '*', 0, '.', '=', '/'].map((btn) => (
 *     <button 
 *       key={btn} 
 *       onClick={() => btn === 'C' ? clearInput() : btn === '=' ? calculateResult() : () => handleButtonClick(btn.toString())}
 *       className={`calculator-button ${btn === 'C' ? 'clear' : btn === '=' ? 'equals' : ''}`}
 *     >
 *       {btn}
 *     </button>
 *   ))}
 * </div>
 * 
 * 1. Buttons are generated using a map() function to ensure flexibility.
 * 2. Specific styles and event handlers are applied conditionally based
 *    on button types.
 * 
 * Note: Buttons for clear (C) and equals(=) have distinct styles to
 *       highlight their performance.
 * 
*/

import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleButtonClick = (value) => {
    setInput((prev) => prev + value);
  };

  const clearInput = () => {
    setInput("");
    setResult("");
  };

  const calculateResult = () => {
    let num1 = "";
    let num2 = "";
    let operator = "";

    for (let i = 0; i < input.length; i++) {
      const char = input[i];
      if (["+", "-", "*", "/"].includes(char)) {
        operator = char;
      } else if (!operator) {
        num1 += char;
      } else {
        num2 += char;
      }
    }

    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    let calcResult = 0;
    if (operator === "+") calcResult = num1 + num2;
    if (operator === "-") calcResult = num1 - num2;
    if (operator === "*") calcResult = num1 * num2;
    if (operator === "/") calcResult = num2 !== 0 ? num1 / num2 : "Error";
    setResult("");

    setResult(calcResult);
  };

  return (
    <div className="calculator-container">
      <input
        type="text"
        value={input}
        readOnly
        className="calculator-input"
      />
      <div className="result">Result: {result}</div>
      <div className="buttons-container">
        {[1, 2, 3, "+", 4, 5, 6, "-", 7, 8, 9, "*", 0, "/", "C", "="].map((btn) => (
          <button
            key={btn}
            onClick={
              btn === "C"
                ? clearInput
                : btn === "="
                  ? calculateResult
                  : () => handleButtonClick(btn.toString())
            }
            className={`calculator-button ${btn === "C" ? "clear" : btn === "=" ? "equal" : ""
              }`}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;


/**
 * Key Takeaways:
 * 1. State Management: Demonstrates the use of useState for managing user
 *    inputs and results dynamically.
 * 2. Custom Arithmetic Logic: Implements a secure and custom approach to
 *    evaluate expressions, avoiding unsafe methods like eval().
 * 3. Dynamic UI Rendering: Shows how to render buttons dynamically with
 *    conditional behavior based on button types.
 * 4. Error Handling: Handles edge cases like division by zero gracefully,
 *    improve user experience.
*/

/**
 * Interview Tips:
 * 1. Understanding State Management: Be ready to explain how input and
 *    result states are updated dynamically.
 * 2. Logic Implementation: Emphasize the importance of avoiding unsafe
 *    methods like eval and explain the custom parsing logic.
 * 3. Error Handling: Discuss how edge cases like division by zero are
 *    managed in the code.
 * 4. Scalability: Suggest enhancements such as handling parenthesis,
 *    multi-operator expressions, or integrating advanced mathematical
 *    operators.
*/