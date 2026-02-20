/**
 * useDebounce Hook:
 * The useDebounce hook can be implemented with useState to store the 
 * current debounced value and useEffect to update the debounced value 
 * after the specified delay with setTimeout. 
 * 
 * If value changes, it must mean that there's a state update, so we clear 
 * the timeout with clearTimeout on unmount and set a new timeout to update
 * the current debounced value.
 * 
 * > Arguments:
 *   a. value: The value to debounce.
 *   b. delay: number - The delay in milliseconds.
 * > Returns: The hook returns the debounced value after the specified delay.
*/

import { useState, useEffect } from 'react';

export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
