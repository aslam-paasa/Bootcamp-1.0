/**
 * Question 2:
 * Build a Custom Hook to fetch and display coffee data from an API.
*/

import { useState } from 'react'
import { useSpecialChai } from './hooks/useSpecialChai'

const App = () => {
  const { coffee, loading, error } = useSpecialChai();
  const [message, setMessage] = useState(6);
  console.log(coffee);

  return (
    <div>
      
      <h1 style={{ textAlign: 'center' }}>Welcome to CoffeeShala</h1>
      <p style={{ textAlign: 'center' }}>Serving hot coffee with react</p>
      <p style={{ textAlign: 'center' }}>You have served {message} cups of coffee today!</p>
      
      {/* Display the coffee data */}
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap',
        justifyContent: 'center', 
        gap: '20px' 
      }}>
       {loading ? <p>Loading...</p> : coffee.map((coffee) => (
          <div 
            key={coffee.id}
            style={{
              width: '200px',
              margin: '8px'
            }}
          >
            <img 
              src={coffee.image} 
              alt={coffee.title} 
              width={200}
              height={200}
              onClick={() => setMessage(message + 1)}
              style={{ cursor: 'pointer' }}
            />
            <h2>{coffee.title}</h2>
            <p>{coffee.description}</p>
          </div>
        ))}
      </div>

      {/* Display the error */}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  )
}

export default App
