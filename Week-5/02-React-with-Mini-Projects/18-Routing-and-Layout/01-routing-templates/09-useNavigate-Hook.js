/** Way-2: Right Way => useNavigate() Hook
 * => It let us navigate from one route to another. And it we are
 *    using this hook that is exported from react-router-dom library.
 * => It make sure that it is not doing a hard reload of the page, it
 *    is simply changing the route, keeping the same client bundle
 *    and changing the page because the route has changed.
*/


/**
 * Code-1:
*/
import { useNavigate } from "react-router-dom"

export function Dashboard() {
    const navigate = useNavigate();

    function handleClick() {
        navigate('/')
    };

    return <div>
        Dashboard
        <button onClick={handleClick}>Click to navigate</button>
    </div>
}

/**
 * Code-2:
*/
function App() {

    return (
        <div>
            <BrowserRouter>
                <Appbar />
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/" element={<Landing />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

function Appbar() {
    const navigate = useNavigate();
    return (
        <div>
            <button onClick={() => navigate("/")}>Landing Page</button>
            <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        </div>
    )
}

/**
 * Not displaying, because this useNavigate() hook expects whenever you
 * are using me, make sure you are using me in a component that is inside
 * your <BrowserRouter>. 
*/



/**
 * Code-3:
*/
// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Landing from './Landing';
import Dashboard from './Dashboard';

const App = () => {
  const navigate = useNavigate();

  const navigateToDashboard = () => {
    // Use navigate function instead of window.location.href
    navigate('/dashboard');
  };

  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            {/* Use the navigateToDashboard function for navigation */}
            <button onClick={navigateToDashboard}>Go to Dashboard</button>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;

/**
 * In this example, the useNavigate() hook is used to get the navigate
 * function, which can be called to navigate to different routes without
 * causing a full page reload. By using this approach, you maintain the
 * benefits to client-side routing in React, ensuring a faster and
 * more seamless user experience.
*/

/**
 * Note:
 * The useNavigate hook in React Router DOM is designed to work within
 * the context of a BrowserRouter. It should be used inside a component
 * that is a descendant of BrowserRouter to ensure access to the correct
 * router context. The limitation is intentional, as useNavigate relies
 * on the router context for scoped navigation, enabling seamless 
 * client-side routing without triggering a full page reload. Placing the
 * hook within the correct context ensures its proper functionality for
 * dynamic view URL updates.
*/