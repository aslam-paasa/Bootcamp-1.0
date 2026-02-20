/**
 * The dynamic part of the code i.e. notification count, should only be
 * changed via state variable.
*/

import { useState } from 'react'
function App() {

  const [count, setCount] = useState(1);
  function increaseCount() {
    setCount(prev => prev + 1);
  }

  return (
    <div>
      <div style={{background: '#b2bec3', height: "47vh"}}>
        <div style={{display: 'flex'}}>
            <div style={{background: 'red', borderRadius: 20, width: 20, height: 25, paddingLeft: 10, paddingTop: 5}}>
                {count}
            </div>
        </div>
        <div>
             <img style={{cursor: 'pointer'}} src={'https://static.vecteezy.com/system/resources/previews/015/934/666/original/bell-icon-simple-element-symbol-for-template-design-can-be-used-for-website-and-mobile-application-vector.jpg'} width={40} />
             <button onClick={increaseCount}>Increase the count</button>
        </div>
      </div>
    </div>
  )
}

export default App
