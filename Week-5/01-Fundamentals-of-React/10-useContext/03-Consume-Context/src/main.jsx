import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { createContext } from 'react'

/**
 * Creating & Providing context:
*/
export const CartContext = createContext();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <CartContext.Provider value={{ items: 4 }}>
        <App />
      </CartContext.Provider>
    </Router>
  </StrictMode>,
)
