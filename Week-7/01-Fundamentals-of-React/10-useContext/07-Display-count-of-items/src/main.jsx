import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
/**
 * 2. Import Cart Context:
*/
import { CartContext, CartProvider } from './contexts/CartContext'
export { CartContext };

/**
 * 3. Wrap it with CartProvider Component:
*/
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <CartProvider>
        <App />
      </CartProvider>
    </Router>
  </StrictMode>,
)
