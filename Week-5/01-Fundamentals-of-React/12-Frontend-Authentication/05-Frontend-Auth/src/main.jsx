import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext, AuthProvider } from './contexts/AuthContext.jsx';

import App from './App.jsx'

export { AuthContext };

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </StrictMode>,
)
