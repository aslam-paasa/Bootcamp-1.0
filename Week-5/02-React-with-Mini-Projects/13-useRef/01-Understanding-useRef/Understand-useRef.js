/**
 * What is useRef in React?
 * - useRef is a hook used to create a mutable reference that persists
 *   across renders. 
 * - It returns a mutable object with a .current property.
 * 
 * Means the value of ref will not get lost even when the component re-renders.
 * And whenever we update the state variable, it re-renders the component, but
 * with useRef hook, it doesn't re-render the component and the updated value
 * is still reflected in the UI.
*/

const useRefHook = () => {
    const ref = useRef(0);

    return (
        <div>
            {/* We can access the value of ref using ref.current i.e. 0 */}
            <p>{ref.current}</p>

            {/* 
                - We can update the value of ref using ref.current += 1, but 
                  the changes will not be reflected in the UI because it is
                  not re-rendering the component.
            */}
            <button onClick={() => ref.current += 1}>Increment</button>
        </div>
    )
}


/**
 * When would you use useRef?
 * - Accessing DOM elements or managing focus.
 * - Storing multiple values that persist without causing re-renders.
 * - Caching values to avoid re-initialization on re-renders.
 * 
 * Note: ref property is used to access the DOM elements.
*/

const useRefHook2 = () => {
    const inputRef = useRef(null);

    console.log(inputRef.current); 

    /**
     * 1. Accessing DOM elements:
     *    - We accessed the input element of the DOM using useRef hook.
     *    - const inputRef = useRef(null);
     *    - <input ref={inputRef} />
     * 2. We can manipulate the DOM elements using useRef hook.
     *    a. Focus the input element & set the value of the input element:
     *       - <button onClick={() => {
     *           inputRef.current.focus();
     *           inputRef.current.value = 5;
     *         }}>Set Focus</button>
     *       - When we click on the button, the input element will be focused
     *         and the value of the input element will be set to 5.
     *       - This is because we are using the focus() method to focus the
    */

    return (
        <div>
            <input ref={inputRef} />
            <button onClick={() => {
                inputRef.current.focus();
                inputRef.current.value = 5;
            }}>Set Focus</button>
        </div>
    )
}


/**
 * How do you access a DOM element using useRef hook?
 * - We can access the DOM element using useRef hook in useEffect hook.
 * - useEffect(() => {
 *      inputRef.current.focus();
 *   }, [])
 * - As soon as the app is loaded, we want to focus on the input element
 *   so the user can start typing their todos.
 * 
 * Note: We can access other html elements like checkbox, radio button, etc.
 *       and manipulate them directly. 
*/

const useRefHook3 = () => {
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, [])

    return (
        <div>
            <input ref={inputRef} />
        </div>
    )
}


/**
 * Difference between useRef and useState:
 * - useState manages state and triggers re-renders when its value changes.
 *   And when you update it using setStateValue, the component re-renders,
 *   and the updated value is reflected in the UI.
 * 
 * - useRef holds a mutable value (current) that persists across renders
 *   without causing re-renders. And when you update it (refValue.current = ...),
 *   the component doesn't re-render, but the updated value is stored and
 *   accessible across renders.
*/

/**
 * useRef:
 * => Let's say you want to do some tax evasion.
 * => You want to override what you CA calculated as you income tax.
 * => How would you do it? You would report an incorrect value to the
 *    government or we can say, if something rendered on the screen
 *    how can we override what react has written and put something else
 *    there?
 * 
 * Note: The most important usecase of useRef is, it lets you access to
 *    the DOM Elements.
 * */ 

/**
 * Let's say there is:
 * => const incomeTax = 20000;
 * => We can also create a state variable if want, useRef is also fine.
 * => Then we say income tax return is this, and this is what our CA
 *    renders on the screen and puts on the DOM or React does.
 *    
 *    return (
 *      <div>
 *          Hi there, you income tax returns are <div ref={divRef}>{incomeTax}</div>
 *      </div>
 *    )
 * => We want to overide this, but how can we do this?
 * 
 * 1. Easy Way: [Not Recommended DOM Manipulation in React]
 *    return (
 *      <div>
 *          Hi there, you income tax returns are <div id="incomeTaxContainer">{incomeTax}</div>
 *      </div>
 *    )
 * 
 * => This code run once, after 5 seconds override the innerHTML of
 *    this div to be "10".
 *       useEffect(() => {
 *           setTimeout(() => {
 *               document.getElementById("incomeTaxContainer").innerHTML = 10;
 *           }, 5000);
 *       }, [])
 * 
 * Output:
 * => hi there, you income tax returns are
 *    20000
 * => After 5 seconds:
 *    hi there, you income tax returns are
 *    10
 * 
 * Note: We have overridden react and it is not a good practice because
 *       react is getting confused and still believe that there is still
 *       20000 there.
 * 
 * 2. Better Way:
 * => const [incomeTax, setIncomeTax] = useState(20000);
 * => Get a reference to this div:
 *    const divRef = useRef();
 * => Using this, we can get reference to DOM Elements.
 * 
 * Q. How can we do it?
 * => Rather than doing <div id="incomeTaxContainer">, we do it like:
 *    <div ref={divRef}>
 * => It means "divRef" variable defined at the top will contain the
 *    reference to below div {incomeTax}.
 * 
 *    return (
 *      <div>
 *          Hi there, you income tax returns are <div ref={divRef}>{incomeTax}</div>
 *      </div>
 *    )
 * 
 * =>    useEffect(() => {
 *           setTimeout(() => {
 *               divRef.current.innerHTML = 10;
 *           }, 5000);
 *       }, [])
 * 
 * Q. Why current?
 * => Because using divRef.current, we get access to the current reference
 *    of that specific div. [Access specific <div>]
*/

import { useEffect, useRef } from 'react';

function App() {
    const [incomeTax, setIncomeTax] = useState(20000);
    const divRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            divRef.current.innerHTML = "10"
        }, 5000);
    }, [])

    // const incomeTax = 20000;

    return (
        <div>
            Hi there, you income tax returns are <div ref={divRef}>{incomeTax}</div>
        </div>
    )
}

export default App;