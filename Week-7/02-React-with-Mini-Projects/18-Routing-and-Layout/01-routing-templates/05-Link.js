/**
 * Using React Router DOM:
 * In a React App, creating a basic landing page and dashboard page
 * with routing involves using React DOM to manage navigation. Here's
 * a simple example:
*/

/**
 * 1. Install React Router DOM:
 *    If you haven't installed React Router DOM, you can do so by
 *    running the following command:
 * 
 *    npm install react-router-dom
*/


/**
 * 2. Setting up Routes:
 *    Create two components for the landing page and the dashboard.
*/

// Landing.jsx
import React from 'react';

const Landing = () => {
  return (
    <div>
      <h1>Welcome to the Landing Page</h1>
    </div>
  );
};

// export default Landing;


// Dashboard.jsx
import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

// export default Dashboard;


/**
 * 3. Create the Main App Component:
 *    Set up your main App Component with React Router to handle routing.
 *    a. Link:
 *       - The Link component is used to create navigation links in your
 *         application.
 *       - We pass the path to the Link component to navigate to that path.
 *       - The 'to' prop specifies the path to navigate to.
 *       - It allows users to navigate between different pages without
 *         reloading the entire page.
 *    b. Routes:
 *       - The Routes component is used to define the routes for your
 *         application.
 *       - It contains individual Route components for each page.
 *       - The path prop specifies the URL path for each route, and the
 *         element prop specifies the component to render when the path
 *         matches.
 *    c. Route: 
 *       - The Route component is used to define the path for each page.
 *       - It contains the component to render when the path matches.
 *       - The path prop specifies the URL path for the route, and the
 *         element prop specifies the component to render when the path
 *         matches.
*/

// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Landing from './Landing';
import Dashboard from './Dashboard';

const App = () => {
  return (
    <BrowserRouter>
      {/* 3. Nav is used to navigate to the path */}
      <nav>
        <ul>
          <li>
            {/* 4. Link is used to navigate to the path */}
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>

      {/* 1. Routes is used to define the routes for the application */}
      <Routes>
        {/* 2. Route is used to define the path for the component to render */}
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

// export default App;

/**
 * In this example, we use the 'link' component from React Router to
 * create navigation links. The 'Routes' component contains individual
 * 'Route' components for each page.
*/


/**
 * 4. Navigate Programatically:
 *    If you want to navigate programatically, you can use 
 *    "window.location.href". For example, in a function:
*/

const navigateToDashboard = () => {
    window.location.href = '/dashboard';
};


/**
 * 5. Shared UI:
 *    If you want to share UI components between the landing page and
 *    the dashboard, you can create a common component and use it in
 *    both 'landing' and 'Dashboard' components.
*/

// SharedComponent.jsx
import React from 'react';

const SharedComponent = () => {
  return (
    <div>
      <p>This component is shared between Landing and Dashboard.</p>
    </div>
  );
};

export default SharedComponent;

/**
 * Import and use SharedComponent in both Landing and Dashboard.
*/

/**
 * Via this example, we learn about a basic structure for setting up
 * routing in a React App. React Router's declarative approach makes
 * it easy to manage navigation and share UI components between different
 * pages.
*/
