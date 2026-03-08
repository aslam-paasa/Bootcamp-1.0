/**
 * Question 3:
 * Build a Custom Hook to manage and update a timer with appropriate
 * functionalities.
*/

/**
 * Stopwatch:
 * Timers are widely used in applications like reminders, countdowns, and
 * productivity tools, offering users a dynamic way to track time. Here, we'll
 * build a timer in React using a custom hook, useTimer, to simplify logic
 * and promote reusability.
 * 
 * This guide highlights how to handle time-based state updates efficiently
 * while ensuring clean and maintainable code. Mastering this component 
 * prepares you for interview scenarios where managing intervals, state
 * updates, and modular code design are key evaluation criteria. By the
 * end, you'll have a reusable timer ready for various real-world use cases.
 */


/**
 * Step-2: The Timer Interface
 * The App component provides the user interface and integrates the useTimer
 * hook to display and control the timer. It includes buttons for starting,
 * pausing, and stopping the timer, offering a complete timer management
 * experience. 
 * 
 * Button Logic:
 * 1. Start/Resume Button:
 *    - What it does: Starts the timer when pressed initially, and resumes
 *      the timer if paused.
 *    - State Updates: Sets active to true and paused to false.
 * 
 *      const handleStartOrResumeClick = () => {
 *        setActive(true);
 *        setPaused(false);
 *        setCompleted(false); // Reset the "completed" state
 *      };
 * 
 * 2. Pause Button:
 *    - What it does : Temporarily pauses the timer without resetting its value.
 *    - State Updates: Sets paused to true.
 * 
 *      const handlePauseButtonClick = () => {
 *        setPaused(true);
 *      };
 * 
 * 3. Stop Button:
 *    - What it does : Stops the timer and resets it to its initial value.
 *    - State Updates: Sets completed to true, and resets active and paused states.
 * 
 *      const handleStopButtonClick = () => {
 *        setCompleted(true);
 *        setActive(false);
 *        setPaused(false);
 *      };
 * 
 * How the hook and buttons work together:
 * 1. State Management:
 *    - The buttons update the states (active, paused, completed) based on
 *      user interactions.
 *    - The useTimer hook listens to these states to determine how the timer
 *      should behave.
 * 
 * 2. Dynamic Timer Updates:
 *    - The hook increments the timer value when active is true and paused
 *      is false.
 *    - If completed is true, it resets the timer to the initial value.
 * 
 * 
 * Rendering the Timer:
 * The timer value is displayed dynamically using the current value from the
 * hook. The buttons are conditionally enabled or disabled to prevent invalid
 * actions, such as resuming an already active timer.
 * 
 * Example:
 * - The 'Pause' button is disabled when the timer is not active or is already
 *   paused.
 * - The 'Start/Resume' button toggles between starting and resuming based
 *   on the paused state.
*/


import { useState } from "react";
import "./App.css";
import useTimer from "./hooks/useTimer";

function App() {
  const [active, setActive] = useState(false);
  const [paused, setPaused] = useState(false);
  const [completed, setCompleted] = useState(false);

  const { current } = useTimer(10, active, paused, completed);

  const handleStartOrResumeClick = () => {
    setActive(true);
    setPaused(false);
    setCompleted(false); // Reset the "completed" state
  };

  const handlePauseButtonClick = () => {
    setPaused(true);
  };

  const handleStopButtonClick = () => {
    setCompleted(true);
    setActive(false);
    setPaused(false);
  };

  return (
    <>
      <h1>React Timer</h1>
      <div className="card">
        {/* Start/Resume Button */}
        <button
          onClick={handleStartOrResumeClick}
          disabled={active && !paused} // Disabled when running
        >
          {paused ? "Resume" : "Start"}
        </button>

        {/* Pause Button */}
        <button onClick={handlePauseButtonClick} disabled={!active || paused}>
          Pause
        </button>

        {/* Timer Display */}
        <div>Current: {current}</div>

        {/* Stop Button */}
        <button onClick={handleStopButtonClick} disabled={completed}>
          Stop
        </button>
      </div>
    </>
  );
}

export default App;


/**
 * Interview Tips:
 * 1. Explain the Hook:
 *    Highlight how useTimer separates logic from UI, making the code reusable
 *    and cleaner.
 * 
 * 2. State Dependencies:
 *    Discuss how state changes trigger the timer's behavior and prevent
 *    unnecessary renders or updates.
 * 
 * 3. Modular Design:
 *    Emphasize the use of a custom hook to centralize timer logic, enhancing
 *    code reusability.
 * 
 * 4. Clean Code Practices:
 *    Mention the importance of clearing intervals and preventing memory
 *    leaks in timer-based applications.
*/