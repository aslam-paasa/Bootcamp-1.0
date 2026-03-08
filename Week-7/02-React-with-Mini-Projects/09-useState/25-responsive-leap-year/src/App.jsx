/**
 * Assignment: Leap Year
 * Create a responsive leap year checker component that lets a user input
 * a year and check whether it is a leap year or not.
*/

/**
 * Requirements:
 * a. A label "Enter a year:" indicating the user to enter a year.
 * b. The interface must include:
 *    - An input field (type="text") allowing the user to enter a year.
 *    - A button "Check" that calculates leap-year status.
 *    - A display "check" that calculates leap-year status.
 * c. A display area below the button which will show:
 *    - The result if valid ('YYYY is a Leap Year' or 'YYYY is not a Leap Year')
 *    - Error message if input is empty ("Please enter a year").
 * d. Input can contain extra whitespace, which must be trimmed.
*/

/**
 * Edge Cases & Constraints:
 * a. Input must not be empty.
 * b. Input must represent a valid integer year.
 * c. Whitespace before or after the year must not cause errors.
 * d. Leap Year Logic:
 *    - Year if leap if:
 *      - Divisible by 4 OR,
 *      - Divisible by 4 but not by 100.
 * e. Error must show if input is empty or contains only whitespace.
 * f. Result must update immediately on clicking "Check".
 * g. Input should accept any integer (positive, negative), as the logic
 *    still holds.
*/

/**
 * Data Test IDs (for testing):
 * a. Label for the year input: data-testid="label-date"
 * b. Input field for the year: data-testid="year-input"
 * c. Button to trigger leap-year check: data-testid="check-btn"
 * d. Display area for leap-year result: data-testid="result"
 * e. Error message container for empty/invalid input: data-testid="error-msg"
*/

import { useState } from "react";
import "./App.css";

function LeapYear() {
  const [year, setYear] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const checkLeapYear = () => {
    const trimmedYear = year.trim();
    if (!trimmedYear) {
      setError("Please enter a year");
      setResult("");
      return;
    }

    setError("");
    const y = parseInt(trimmedYear, 10); // Trimmed string is numeric
    const isLeapYear = (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
    setResult(isLeapYear ? `${y} is a Leap Year` : `${y} is not a Leap Year`);
  }

  return (
    <div className="container">
      <h1>Leap Year Checker</h1>
      <label data-testid="label-date">Enter a year:</label>
      <input
        type="text"
        data-testid="year-input"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />

      <button data-testid="check-btn" onClick={checkLeapYear}>
        Check
      </button>

      {error && (<div data-testid="error-msg">{error}</div>)}
      {result && (<div data-testid="result">{result}</div>)}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <LeapYear />
    </div>
  );
}

export default App;