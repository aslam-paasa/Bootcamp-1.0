/**
 * Challenge: Clock
 * In this challenge, you'll be synchronizing the current time with your
 * component's state by updating the UI every second with the new time.
 * To do that, you'll need the right combination of useEffect, component
 * state, and the browser's setInterval method.
 * 
 * Tasks:
 * 1. Update the time every second
 * 2. Clear the timer when unmounted
 * 
 * Hint:
 * 1. Because we want to persist 'time' across renders and update the UI
 *    when it changes, we'll store it as a piece of component state using
 *    useState.
 * 
 *    const [time, setTime] = useState(null);
 * 
 *    Notice that we set time's initial state to null. This is so we keep
 *    React's rendering flow pure.
 * 
 * 2. Every 1000 milliseconds, we want to update time with the current date.
 * 
 *    We can do that by setting up an interval inside our useEffect using
 *    window.setInterval to run every 1000 milliseconds. Then, every time
 *    the interval runs, we'll update our time state with new Date().
 * 
 *    useEffect(() => {
 *       window.setInterval(() => {
 *          setTime(new Date());
 *       }, 1000);
 *    }, []);
 * 
 *   Also, since our effect doesn't have any dependencies, we'll pass an
 *   empty array as the second argument.
 * 
 * 3. Whenever you establish a timer, you need to make sure you remove it
 *    or else you'll get a memory leak. We can do that by keeping track of
 *    the timer's id and calling clearInterval in the effect's cleanup
 *    function.
 * 
 *    useEffect(() => {
 *       const timerID = window.setInterval(() => {
 *          setTime(new Date());
 *       }, 1000);
 * 
 *       return () => {
 *          window.clearInterval(timerID);
 *       };
 *    }, []);
 * 
*/


import './App.css'
import { useState, useEffect } from 'react';

function Clock() {
  const [time, setTime] = useState(null);

  useEffect(() => {
    const timerID = window.setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      window.clearInterval(timerID);
    };
  }, []);

  if (time === null) return null;

  return (
    <section>
      <h1>Current Time</h1>
      <p>{time.toLocaleTimeString()}</p>
    </section>
  );
}


function App() {

  return (
    <div>
      <Clock />
    </div>
  )
}

export default App
