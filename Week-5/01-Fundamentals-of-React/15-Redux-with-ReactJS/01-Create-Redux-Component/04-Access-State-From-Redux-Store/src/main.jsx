import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

/**
 * Challenge-3: Connect Redux Store to react app
 * In the main.jsx file, wrap the App component with the Provider component
 * and connect it to the Redux Store.
 * 
 * Note: Install react-redux dependency
 *       npm install react-redux
*/

import { Provider } from 'react-redux'
import store from './store.js'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
