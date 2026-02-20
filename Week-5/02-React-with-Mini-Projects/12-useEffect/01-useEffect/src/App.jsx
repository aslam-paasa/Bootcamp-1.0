/**
 * Render kya hai? (What is Render?)
 * => Jab bhi hum koi React component banate hain, usko browser mein dikhane ke liye 
 *    React use HTML mein convert karta hai. Ye process render kehlata hai.
 * => Jaise agar aapne <Button /> component banaya, toh React usko actual HTML button 
 *    mein convert karega.
 * 
 * Render kab hota hai? (When does Render happen?)
 * => 3 cases mein render hota hai:
 *    1. Jab component ke props change hote hain
 *       Example: <Button color="red" /> se <Button color="blue" /> 
 *    2. Jab component ki state change hoti hai
 *       Example: setCount(count + 1) karne par
 *    3. Jab parent component re-render hota hai
 *       Example: Parent update hua toh child bhi update hoga
 * 
 * Render kaise kaam karta hai? (How does Render work?)
 * Step 1: Reconciliation
 * => React check karta hai ki kya change hua hai
 * => Purane state/props aur naye state/props ko compare karta hai
 * 
 * Step 2: Virtual DOM Creation
 * => React ek temporary copy banata hai actual DOM ki
 * => Ye copy memory mein rehti hai, screen par nahi dikhti
 * 
 * Step 3: Difference Finding (Diffing)
 * => React dono versions ko compare karta hai:
 *    - Virtual DOM (naya version)
 *    - Actual DOM (purana version)
 * => Fir decide karta hai ki kya kya update karna hai
 * 
 * Step 4: DOM Update
 * => Final step mein, React sirf jaruri changes hi karta hai actual DOM mein
 * => Ye process bahut efficient hai kyunki sirf jaruri changes hi hote hain
 * 
 * React ke Important Hooks (React's Important Hooks)
 * => Hook simple JavaScript functions hain jo React ki special features use 
 *    karne mein help karte hain
 * 
 * Main Hooks:
 * 1. useState - State management ke liye
 *    Example: const [count, setCount] = useState(0)
 * 
 * 2. useEffect - Side effects handle karne ke liye
 *    Example: API calls, timers
 * 
 * 3. useMemo - Performance optimization ke liye
 * 4. useCallback - Function optimization ke liye
 * 5. useRef - DOM elements ko directly access karne ke liye
 * 6. useReducer - Complex state logic ke liye
 * 7. useContext - Data ko deeply nested components mein share karne ke liye
 * 
 * Component Lifecycle (Component ki Life Journey)
 * 
 * 1. Birth (Mounting)
 *    - Component pehli baar screen pe aata hai
 *    - Kya kya hota hai:
 *      * API calls start hote hain
 *      * Timers set hote hain
 *      * Initial setup hota hai
 * 
 * 2. Growth (Updating)
 *    - Component mein changes hote hain
 *    - Kya kya hota hai:
 *      * Props/State update hote hain
 *      * Re-rendering hoti hai
 *      * UI update hota hai
 * 
 * 3. Death (Unmounting)
 *    - Component screen se remove hota hai
 *    - Kya kya hota hai:
 *      * Cleanup hota hai
 *      * Timers band hote hain
 *      * Event listeners remove hote hain
 * 
 * Lifecycle Methods
 * => Har stage ko handle karne ke liye special methods:
 * 
 * 1. useEffect - Modern way to handle all lifecycle events
 *    Example: useEffect(() => {
 *      // code here
 *    }, [dependencies])
 * 
 * 2. useLayoutEffect - Visual updates se pehle chalta hai
 * 
 * Class Components ke liye (Legacy code mein milenge):
 * - componentDidMount()    - Birth ke time
 * - componentDidUpdate()   - Growth ke time
 * - componentWillUnmount() - Death ke time
*/

/**
 * useEffect Hook ko samjhe:
 * 
 * 1. useEffect kya hai?
 *    - React ka ek special hook hai jo side effects handle karta hai
 *    - Side effects matlab wo kaam jo direct UI se related nahi hai
 *      jaise API calls, timers, etc.
 * 
 * 2. Side effects ke examples:
 *    - Data fetch karna (API calls)
 *    - DOM ko directly update karna 
 *    - Timers set karna
 * 
 * 3. useEffect kaise use karte hai?
 *    - Do cheezein leta hai:
 *      a) Callback function - jo code run karna hai
 *      b) Dependency array - optional hai, controls kab function run hoga
 * 
 * Ab 3 cases dekhte hai useEffect ke:
 * 
 * Case 1: Basic useEffect
 *    - Har re-render pe chalta hai
 *    - Problem: Unnecessary API calls ho sakte hai
 * 
 * Case 2: Empty Dependency Array
 *    - Sirf first render pe chalta hai 
 *    - Best for initial data fetch
 * 
 * Case 3: Dependency Array with Values
 *    - Specific state/prop change hone pe chalta hai
 *    - Jab dependency array mein di gayi value change hogi,
 *      tabhi useEffect chalega
*/

import { useEffect, useState } from 'react';

function UseEffect() {

  return (
    <div>
      <h1>Hello World</h1>
      <CaseOne />
      <CaseTwo />
      <CaseThree />
    </div>
  )
}

/**
 * Case 1: Basic Example
 * 
 * Problem:
 * - Har baar button click karne pe component re-render hota hai
 * - useEffect bhi har baar chalta hai
 * - Real life mein isse performance issues ho sakte hai
 * - Example: Agar har click pe API call ho rahi hai, to server pe load badhega
*/
function CaseOne() {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    console.log('10,000 Products Flipkart');
    
  })

  const toggleStatus = () => {
    setIsOnline(!isOnline);
  }

  return (
    <div>
      <h1>CaseOne</h1>
      <button onClick={toggleStatus}>Click</button>
      <h2>User Status:- {isOnline ? "Online" : "Offline"}</h2>
    </div>
  )
}

/**
 * Case 2: Empty Dependency Array
 * 
 * Solution:
 * - Empty array [] dene se useEffect sirf ek baar chalta hai
 * - Perfect for initial data loading
 * - Ab button click karne pe API call nahi hogi
*/
function CaseTwo() {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    console.log('10,000 Products fetched in Amazon');
  }, []);

  const toggleStatus = () => {
    setIsOnline(!isOnline);
  }

  return (
    <div>
      <h1>CaseTwo</h1>
      <button onClick={toggleStatus}>Click</button>
      <h2>User Status:- {isOnline ? "Online" : "Offline"}</h2>
    </div>
  )
}

/**
 * Case 3: Dependency Array with State
 * 
 * Advanced Usage:
 * - Specific state change pe useEffect chalana
 * - Example: Search karne pe new products load karna
 * - showBestSellers state change hone pe hi API call hogi
 * - isOnline change hone pe kuch nahi hoga
*/
function CaseThree() {
  const [isOnline, setIsOnline] = useState(false);
  const [showBestSellers, setShowBestSellers] = useState(false);

  useEffect(() => {
    console.log('10,000 Products fetched in AliBaba');
  }, [showBestSellers]);

  const toggleUserStatus = () => {
    setIsOnline(!isOnline);
  }

  const toggleBestSellerStatus = () => {
    setShowBestSellers(!showBestSellers);
  }

  return (
    <div>
      <h1>CaseThree</h1>
      <button onClick={toggleUserStatus}>Change User Status</button>
      <button onClick={toggleBestSellerStatus}>Show Best Sellers Products</button>
      <h2>User Status:- {isOnline ? "Online" : "Offline"}</h2>
      <h2>Product:- {showBestSellers ? "Best Seller Product" : ""}</h2>
    </div>
  )
}



function Cleanup() {
  const [showTimer, setShowTimer] = useState(true);

  /**
   * Even when the component is not mounted, the clock will keep running.
   * This is because the setInterval is not being cleaned up.
   * 
   * We can fix this by returning a function from the useEffect Hook.
   * This function will be called when the component unmounts.
  */
  useEffect(function() {
    const clock = setInterval(() => {
      console.log("from inside clock");
      setShowTimer(currentValue => !currentValue);
    }, 5000);
    
    /**
     * cleanup function:
     * - The fn that we have can itself return a fn where we write the cleanup
     *   code.
     * - When we pass the setInterval to the clearInterval, it will stop the
     *   clock, because this cleanup fn ran when the component was unmounted.
     * 
     * Q. Where this is needed?
     * - Suppose in LinkedIn, if we move from Home to Notifications, we are
     *   unsubscribing from the Home tab by running the cleanup logic, means
     *   no new posts will be fetched from the Home tab, and we are subscribing 
     *   to the Notifications tab, means new notifications will be fetched from
     *   the Notifications tab. So, we will get only notifications, and no
     *   posts will be fetched in the background.
    */
   return function() {
    clearInterval(clock);
   }
  }, []);

  return (
    <div>
      {showTimer && <Timer />}
    </div>
  )
}

const Timer = () => {
  const [seconds, setSeconds] = useState(0);

  /**
   * Case-3: Cleanup Code
   * - Issue: If I ever unmount the Timer Component, means if this ever goes
   *   away from the App Component, the clock will keep running.
   * - Solution: We can return a function from the useEffect Hook. This 
   *   function will be called when the component unmounts.
  */
  useEffect(function() {
    setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
  }, []);

  return (
    <div>
      {seconds} seconds elapsed
    </div>
  )
}



function App() {
  return (
    <div>
      <UseEffect />
      <Cleanup />
    </div>
  )
}

export default App
