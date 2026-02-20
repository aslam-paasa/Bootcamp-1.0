import { useEffect, useState } from "react";

/**
 * Step-1: The useTimer Hook
 * The useTimer hook is the core of this project, encapsulating the logic for
 * tracking and updating the timer's state. By separating this logic into a
 * custom hook, we make it reusable and maintainable.
 * 
 * How the hook works:
 * 1. Initialization:
 *    - The hook initializes the 'current' state with the initialVal param. 
 *    - It uses the useState hook to manage the timer's value and useRef to
 *      store the timestamp of the last interval execution.
 * 
 * 2. Dynamic Updates with useEffect:
 *    - The useEffect hook listens for changes in active, paused, and
 *      completed states.
 *    - If completed is true, the timer resets to its initial value.
 *    - If the timer is active, and not paused, the setInterval function
 *      updates the current state every second.
 * 
 * 3. Cleanup:
 *    - To avoid memory leaks, the useEffect hook clears the interval when
 *      the component unmounts or the dependencies change.
 *    - Hook Code:
 * 
 *    
*/

const useTimer = (initialVal, active, paused, completed) => {
    const [current, setCurrent] = useState(initialVal);

    useEffect(() => {
        let handler;

        if (completed) {
            /*
             * Reset when completed
            */
            setCurrent(initialVal);
        } else if (active && !paused) {
            /*
             * Increment timer
            */
            handler = setInterval(() => {
                setCurrent((prev) => prev + 1);
            }, 1000);
        }

        /*
         * Clean up interval
        */
        return () => clearInterval(handler);
    }, [active, paused, completed, initialVal]);

    return { current, setCurrent };
};

export default useTimer;

/**
 * Key Features of the Hook:
 * 1. Tracks and updates the timer value dynamically.
 * 2. Resets or halts the timer based on states.
 * 3. Prevents unnecessary interval executions with cleanup logic.
*/