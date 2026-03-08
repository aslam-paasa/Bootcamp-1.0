/**
 * Counter Component - Ek simple counter app
 * 
 * Generic Type kya hai?
 * - Generic type ek template jaisa hota hai jo different types ke saath kaam kar sakta hai
 * - Angle brackets <> mein type specify karte hain
 * - Example:
 *   - useState<number>  - sirf number type ke liye
 *   - useState<string>  - sirf string type ke liye
 *   - useState<boolean> - sirf true/false ke liye
 * 
 * Is example mein:
 * - useState<number>(0) ka matlab:
 *   1. count variable sirf number type accept karega
 *   2. setCount function bhi sirf number hi lega
 *   3. (0) initial value hai
 * - Agar koi string ya boolean value daalenge toh TypeScript error dega
 */

import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
        <h1>Counter App</h1>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  )
}

export default Counter
