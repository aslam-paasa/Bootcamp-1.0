/**
 * Q. Focusing on an input box:
 *    - document.getElementById().focus()
 *    - ref.current.focus()
*/
import { useRef, useState } from 'react';

function App() {

  return (
    <div>
      <UseRefToStoreValue1 />
      <Clock1 />
      <UseRef />
    </div>
  )
}


/**
 * Using useRef to store a value (Not recommended)
 * - Anything which is not a DOM element like number, string, boolean, etc.
 *   can be stored in useRef.
 * 
 * Q. Why can't we use useState to store a value?
 *    - Whenever we use useState, the component re-renders.
 *    - But, we don't want the component to re-render when the value updated.
 *    - So, we use useRef to store a value that cannot be changed.
 * 
 * Q. How to store a value in useRef?
 *    - const inputRef = useRef(0);
 *    - inputRef.current = 1;
 * 
 * Q. How to access the value in useRef?
 *    - inputRef.current
 * 
 * Note: useRef is updating the count, but the component is not re-rendering.
 *       So, changes are not visible on the UI, but the value is updated in
 *       the background.
 * 
*/

function UseRefToStoreValue1() {

  const inputRef = useRef(0);

  const increment = () => {
    inputRef.current++;
    console.log(inputRef.current);
  };

  return <div>
    {inputRef.current}
    <button onClick={increment}>Increment</button>
  </div>;
}


/**
 * Clock with start and stop functionality:
*/
function Clock1() {

  /**
   * Approach-1: Using let to store the timer.
   * - When we use let to store the timer(like let timer = 0), the timer gets
   *   reinitialized every time the component re-renders. This is because
   *   the let variable is scoped inside the function, and its value is
   *   reset when the component re-renders.
   * - Since React re-renders the component whenever state or props change,
   *   the let variable will lose its value on each re-render. 
   * - The timer value won't persist between renders, so it's impossible to
   *   store and manage an interval properly.
  */
  // let timer = 0;

  /** 
   * Approach-2: Using useState to store the timer.
   * - useState allows you to store values(like currentCount and timer) and
   *   keep their values persistent across re-renders. This means if we 
   *   update the currentCount state, React will update the UI and re-render
   *   the component.
   * - The problem with useState in this case is that when we update the
   *   state (setCurrentCount(current+1)), it triggers a re-render of the 
   *   entire component. This leads to performance issues(unnecessary re-renders)
   *   because React needs to re-render the component to reflect the updated
   *   state. 
   * - It's fine for small updates, but for things like timers, where values
   *   change frequently, this can become inefficient.
   * 
  */
  const [currentCount, setCurrentCount] = useState(1);
  // const [timer, setTimer] = useState(0);


  // const startClock = () => {
  //   let value = setInterval(() => {
  //     setCurrentCount(currentCount => currentCount + 1);
  //   }, 1000);
  //   setTimer(value);
  // }

  // const stopClock = () => {
  //   console.log(timer);
  //   clearInterval(timer);
  // }


  /**
   * Approach-3: Using useRef to store the timer.
   * - useRef is the best approach when you need to store a value that
   *   should not trigger a re-render when it changes.
   * - In this case, we don't need to re-render the component every second
   *   when the timer updates, as the UI doesn't need to reflect every change
   *   immediately. We only need to store the timer reference(the setInterval
   *   ID) and prevent it from being re-initialized on every render.
   *   a. useRef provides a way to persist values across re-renders without
   *      causing the component to update. So, you can store the setInterval
   *      ID(the timer) in a useRef to make sure it doesn't get reset during
   *      re-renders.
  */

  const timerRef = useRef(null);

  const startClock = () => {
    timerRef.current = setInterval(() => {
      setCurrentCount(currentCount => currentCount + 1);
    }, 1000);
  }

  const stopClock = () => {
    console.log(timerRef.current);
    clearInterval(timerRef.current);
  }


  return <div>
    {currentCount}
    <br />
    <button onClick={startClock}>Start</button>
    <button onClick={stopClock}>Stop</button>
  </div>;
}


/**
 * useRef:
 * - Ye aisa hook hai jo kisi value ka reference create karta hai jisko
 *   render nhi karana.
 * 
 * - Humne ek variable money banaya aur usse initialize kar diya 0 se,
 *   aur iske liye humne ek counter banay diya.
 * - Humein pta hai ki hum increment karnge to counter ki value badhegi,
 *   lekin money pe increment karunga to kuch nhi hoga qki ye state variable
 *   nahi hai.
 * 
 * Kya money ki value actually m increment ho v rhi hai?
 * - Agar hum console.log(money) kare to hum dekhnge ye increment ho rhi hai,
 *   lekin wo UI pe increment nhi ho rhi kyuki state variable rerender nhi
 *   ho rha, aur UI pe display karane k liye humein state variable banana 
 *   padta hai.
 * - Ab agar mai apne UI ko rerender karta hu aur money ki value ko dobara
 *   se increment karta hu to wo wapase se shuru se increment hone lagega
 *   lekin UI pe update nhi hoga.
 * 
 * Mai ye chahta hu ki money ki jo value hai persist kare across rerender.
 * Money ki value ko hum kaise hold kar sakte hai?
 * - Agar mere paas money ka reference aa jae to ye problem solve ho jayega.
 *   and we can achieve this by using useRef hook.
 * 
 *   const money = useRef(0);
 * 
 * - money ek object hai aur uske andr current property m wo value
 *   store hoti hai like 'current: 0'.
 * - Aur agar humein iss value ko print karana hai to humein likhna hoga
 *   money.current tab hum 0 ko access kar sakte hai.
 * 
 *   console.log(money.current); => 0
 * 
 *   money.current = 1;
 *   console.log(money.current); => 1
 * 
 * - useRef humaare liye re-render nhi karta hai, re-render state variable
 *   karta hai useRef nhi karta isliye jab hum money ki value ko increment
 *   karte hai to wo UI re-render nhi hota hai lekin mere useRef object m
 *   store hota hai, lekin jaise hi hum re-render karte hai using state 
 *   variable or something, to mera stored updated useRef value mere UI m 
 *   display hone lagta hai.
 * 
 * Note: Ye prev updated value ko hold kar k rakhta hai, aur kisi aur ne
 *       re-render karaya to wo changes mere UI v visible ho jaega.
*/

function UseRef() {
  const [count, setCount] = useState(0);
  
  // let money = 0;
  const money = useRef(0);
  console.log(money);
  
  return (
    <div>
      <h1>Counter is: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>

      <h1>Money is: {money.current}</h1>
      <button onClick={() => {
        money.current = money.current + 1;
        console.log(money.current);
      }}>Increment</button>
    </div>
  );
}


/**
 * Stopwatch:
 * a. Start: It will start the stopwatch.
 * b. Stop : It will stop the stopwatch.
 * c. Reset: It will reset the stopwatch.
 * d. setInterval(timer, 1000) : It will call the timer fn every 1 second.
 * e. clearInterval(interval)  : It will stop the interval.
 * f. setIsRunning(true/false) : One interval is running at a time.
*/

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  function start() {
    if (!isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      setIsRunning(true);
    }
  }

  function stop() {
    if (isRunning) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsRunning(false);
    }
  }

  function reset() {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setTime(0);
    }
  }


  return (
    <div>
      <h1>Stopwatch is: {time}</h1>
      <button onClick={start}>Start</button>
      <br />
      <br />
      <button onClick={stop}>Stop</button>
      <br />
      <br />
      <button onClick={reset}>Reset</button>
    </div>
  );
}



export default App
