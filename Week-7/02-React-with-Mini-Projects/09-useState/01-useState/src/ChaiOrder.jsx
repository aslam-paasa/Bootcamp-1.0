import { useState } from 'react'

const ChaiOrder = () => {
    const [count, setCount] = useState(0);

    /**
     * Custom Function:
     * - We are setting the state in the setState.
     * - Inside the setState, we have a callback function which is called
     *   "prev" which is the previous stored value. And we are incrementing
     *   the value by 1 on every click.
     * - Using callback form ensures we always work with latest state value.
     * - And there is no point in returning anything from the function, because
     *   we are not using the return value anywhere.
    */
    const handleClick = () => {
      setCount(prev => prev + 1);
    }
  
    return (
      <div>
        <h2>Chai Counter</h2>
        <p>You have served {count} cups of chai today!</p>
        <button onClick={handleClick}>Serve Chai</button>
      </div>
    )
  }
  

export default ChaiOrder
