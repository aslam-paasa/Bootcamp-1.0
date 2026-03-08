/**
 * 3. Route:
 * => The Route component is responsible for rendering specific
 *    components based on the currentURL path. It takes two main props:
 *    (a) path
 *    (b) element
 * => The path props defines the URL path that should match for the
 *    route to be rendered, and the element prop specifies the component
 *    to render when the path matches.
*/

import { Route } from 'react-router-dom';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add more Route components for other views */}
      </Routes>
    </BrowserRouter>
  );
}

/**
 * In the above example, when the URL path is "/", the Home component
 * will be rendered.
*/

/**
 * This is a basic setup for using React Router DOM. You can extend
 * this by adding nested routes, handling dynamic route parameters, 
 * and incorporating additional features provided by React Router DOM
 * for more advanced routing scenarios.
*/