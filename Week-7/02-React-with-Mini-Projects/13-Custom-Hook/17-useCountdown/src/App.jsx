/**
 * Implement a useCountdown hook that manages a countdown.
 * 
 * > The hooks accepts an object with the following properties:
 *   a. countStart: number: 
 *      - The initial value of the countdown
 *   b. countStop: number: 
 *      - The value at which the countdown should stop.
 *      - This defaults to 0
 *   c. intervalMs: number:
 *      - The interval (in ms) at which the countdown should decrease.
 *      - This defaults to 1000ms
 *   d. isIncrement: boolean:
 *      - A flag to indicate whether the countdown should increment instead
 *        of decrement, defaults to false.
 * 
 * Returns:
 * > The hook returns an object with the following properties:
 *   a. count: number
 *      - The current value of the countdown
 *   b. start: () => void
 *      - A function that starts the countdown
 *   c. stop: () => void
 *      - A function that stops the countdown
 *   d. reset: () => void
 *      - A function that resets the countdown to countStart
 * 
 */

import "./App.css";

function App() {
  const { count, start, stop, reset } = useCountdown({ countStart: 10 });

  return (
    <div>
      <p>Countdown: {count}</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default App;
