/**
 * Single Page Application (SPA), Routing:
 * - Single Page Application (SPA) are web applications that loads a single
 *   HTML page and dynamically update the page as the user interacts with the
 *   app.
 * - This approach allows for a smoother user experience compared to traditional
 *   multi-page applications (MPAs), where each interaction often requires a
 *   full page reload.
 *   a. Install react-router-dom: npm i react-router-dom
 *   b. Import three things:
 *     => BrowserRouter: Provides the routing functionality
 *     => Routes       : Wraps the routes
 *     => Route        : Defines a route
 *   c. Define the routes:
 *     => <BrowserRouter>
 *     =>   <Routes>
 *     =>     <Route path="/" element={<Home />} />
 *     =>   </Routes>
 *     => </BrowserRouter>
 *   d. Define the components:
 *     => Landing
 *     => Class11Program
 *     => Class12Program
 *     => NotFound
 *   e. Define the navigation:
 *      i. Dumb way to navigate user from one page to another :-
 *         => <a href="/neet/online-coaching-class-11">Class 11</a>
 *         => <a href="/neet/online-coaching-class-12">Class 12</a>
 *         => Issue: When we click on the link, the page reloads and the
 *            browser navigates to the new page.
 *      ii. Smart way to navigate user from one page to another (Approach-1)
 *         => <Link to="/neet/online-coaching-class-11">Class 11</Link>
 *         => <Link to="/neet/online-coaching-class-12">Class 12</Link>
 *         => Adv: When we click on the link, the page does not reload and
 *            the browser navigates to the new page.
 *         => Issue: We cannot use <Link> outside of the <BrowserRouter>. 
 *      iii. Smart way to navigate user from one page to another (Approach-2)
 *         => <NavLink to="/neet/online-coaching-class-11">Class 11</NavLink>
 *         => <NavLink to="/neet/online-coaching-class-12">Class 12</NavLink>
 *         => Adv: When we click on the link, the page does not reload and
 *            the browser navigates to the new page.
 * Note: There are two ways to navigate:-
 * a. User clicked on it and we went to another page.
 *    - <Link />
 *    - <NavLink />
 * b. Custom Logic: Whenever the user comes on the Class12 Page, after 10
 *    seconds we will redirect the user to the Landing Page.
 *    - useNavigate() hook 
 *    - But we can do the same with our Link or NavLink.
 * 
*/

import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'

function App() {

  return (
    <div>

    
      <BrowserRouter>
        <Link to="/">Allen</Link>
        | 
        <Link to="/neet/online-coaching-class-11">Class 11</Link>
        | 
        <Link to="/neet/online-coaching-class-12">Class 12</Link>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/neet/online-coaching-class-11" element={<Class11Program />} />
          <Route path="/neet/online-coaching-class-12" element={<Class12Program />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

function Landing() {
  return <div>
    Welcome to Allen Institute of Technology
  </div>
}

function Class11Program() {
  
  return <div>
    NEET Programs for Class 11
  </div>
}

function Class12Program() {
  const navigate = useNavigate();

  function redirectUser() {
    navigate('/');
  }

  return <div>
    NEET Programs for Class 12
    <button onClick={redirectUser}>Go back to landing page</button>
  </div>
}

function ErrorPage() {
  return <div>
    Page Not Found
  </div>
}

export default App
