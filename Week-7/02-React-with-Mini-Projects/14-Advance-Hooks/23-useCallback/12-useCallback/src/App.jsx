/**
 * useCallback:
 * => useCallback is a hook in React, a popular JavaScript library for
 *    building user interfaces. It is used to memoize functions, which
 *    can help in optimizing the performance of your application,
 *    especially in cases involving child components that rely on
 *    reference equality to prevent unnecessary renders.
 * 
 * Q. Why do we always define state variable?
 * => Reason: Referential Equality
 * => If we define any fn or even a variable
 * 
 *      function sum(a, b) {return a + b}
 *      function sum2(a, b) {return a + b}
 * 
 * Q. Is sum == sum2?
 * => False (content and logic is same)
 * => Even though they are exactly same but they are not referencly
 *    equal. Means they are not placed in same memory. a & b is diff
 *    variable, they point to different places in RAM. They are equal
 *    by value but they are not equal by reference.


 *  function sum(a, b) {return a + b}
 *  function sum2(a, b) {return a + b}


 *  import { useState, memo, useEffect, useMemo } from 'react'
 *
 *  function App() {
 *      const [counter, setCounter] = useState(0)
 *
 *      function a() {
 *          console.log("Hi there");
 *      }
 *
 *      return (
 *          <>
 *              <div>
 *                  <button onClick={() => { setCounter(counter + 1) }}>Counter ({counter})</button>
 *                  <Demo a={a} />
 *              </div>
 *          </>
 *      )
 *  }
 *
 *  export default App
*/


/**
 * Q. Will the `Demo` component re-render every time we click the button?
 * 
 *  const Demo = memo(function ({ a }) {
 *      console.log("rerender");
 *      return <div>Hi there</div>
 *  })
 * 
 * => When we use `a` inside `Demo`, it is important to understand how React
 *    checks for changes. React uses reference equality to decide if a prop
 *    has changed. This means it checks if the reference to `a` is the same
 *    object in memory.
 * 
 * => If the function `a` is defined inside the `App` component, it will be
 *    redefined every time `App` re-renders. This means `a` will have a new
 *    reference each time, even if the function's logic hasn't changed. This
 *    causes React to think that `a` has changed and therefore re-renders
 *    the `Demo` component.
 * 
 * => To avoid unnecessary re-renders of `Demo`, we use `useCallback` to
 *    keep the reference of `a` the same across renders. `useCallback` 
 *    memoizes the function, so `a` maintains the same reference unless
 *    its dependencies change.
 * 
 * => In summary, using `useCallback` helps `Demo` avoid re-rendering by
 *    ensuring that the reference to the function `a` remains constant, 
 *    which is important for optimizing performance when passing functions 
 *    as props.
 */

/**
 * Q. How to use useCallback?
 * 
 * */


import { memo, useState, useCallback } from 'react';

function App() {
  const [count, setCount] = useState(0);

  // Use useCallback to memoize the logSomething function
  const logSomething = useCallback(() => {
    console.log('child clicked');
  }, []); // Empty array matlab function sirf ek baar create hoga.

  return (
    <div>
      <ButtonComponent inputFunction={logSomething} />
      <button onClick={() => setCount(count + 1)}>Click me {count}</button>
    </div>
  );
}

const ButtonComponent = memo(({ inputFunction }) => {
  console.log('child render');
  return (
    <div>
      <button onClick={inputFunction}>Button clicked</button>
    </div>
  );
});

export default App;


/**
 * => Agar aap App component ke andar ek function define karte ho ie. logSomething
 *    aur usko kisi child component me pass karte ho: 
 *    <ButtonComponent inputFunction={logSomething} />, to har render ke saath wo 
 *    function naya create ho sakta hai, jo unnecessary re-renders cause karega.
 * 
 * 1. logSomething Function:
 *    Aapne `logSomething` function define kiya hai jo console me "child clicked"
 *    log karta hai. Yeh function App component ke andar define kiya gaya hai.
 * 
 * 2. ButtonComponent ko Function Pass Karna:
 * => Aap `logSomething` function ko `ButtonComponent` me `inputFunction` prop 
 *    ke through pass kar rahe ho:
 *   <ButtonComponent inputFunction={logSomething} />
 * => Is waqt tak, koi issue nahi hai, kyunki `logSomething` function baar baar
 *    create nahi ho raha.
 * 
 * 3. Problem Tab Aati Hai Jab:
 * => Jab <App/> component re-render hota hai. Jaise jab aap `setCount` ke through
 *    state update karte ho to poora component re-render hota hai aur same instance
 *    k liye new reference point ban jaata hai, aur same function ko humne child
 *    component k pass kiya hai. To jb re-rendered fn aur Child Component k passed
 *    function ki reference match nhi hoti to React ko lgta hai "logSomething" fn
 *    update hua hai, isliye <Demo /> component v re-render ho jaata hai.
 * 
 * Solution: useCallback 
 * */ 