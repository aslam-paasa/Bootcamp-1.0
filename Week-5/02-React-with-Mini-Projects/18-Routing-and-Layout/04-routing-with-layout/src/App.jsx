/**
 * Layouts or Outlet:
 * - Layout is a component that wraps every route.
 * - Means it lets you wrap every route inside a certain component.
 *   (think headers and footers)
 * 
 * Ugly Way:
 * - We have already seen this in the previous example.
 * - The Allen Page has a navbar at the top and then the real content
 *   below it, and might have a footer at the bottom. So, we are saying this
 *   layout of this Allen Application is:
 *   a. Navbar  => Always remains constant
 *   b. Content (which can have multiple routes)
 *   c. Footer  => Always remains constant
 * 
 * Better Way with Layout & Outlet:
 * - We will create a layout component and wrap the routes inside it.
 *   So, if the path is '/' in the Route, then the layout needs to be
 *   present.
 * - We will also see how to pass the dynamic data to the layout.
 * 
 * Note: Layout is an important concept in Next.js.
*/

import { BrowserRouter, Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'

function App() {

  return (
    <div>

    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/neet/online-coaching-class-11" element={<Class11Program />} />
            <Route path="/neet/online-coaching-class-12" element={<Class12Program />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

function Layout() {
  return <div>

      {/* Header */}
      <div style={{color: 'white', backgroundColor: 'salmon', padding: '10px'}}>
        <Link to="/">Allen</Link>
        | 
        <Link to="/neet/online-coaching-class-11">Class 11</Link>
        | 
        <Link to="/neet/online-coaching-class-12">Class 12</Link>
      </div>


      {/* Outlet: Dynamic Content */}
      <div style={{height: "85vh", border: "1px solid red", background: 'gray', margin: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Outlet />
      </div> 


      {/* Footer */}
      <div style={{color: 'white', backgroundColor: 'salmon', padding: '10px'}}>
        Footer | Contact Us
      </div>
    </div>
}


function Landing() {
  return <div>
    <h1>Welcome to Allen Institute of Technology</h1>
  </div>
}

function Class11Program() {
  
  return <div>
    <h2>NEET Programs for Class 11</h2>
  </div>
}

function Class12Program() {
  const navigate = useNavigate();

  function redirectUser() {
    navigate('/');
  }

  return <div>
    <h2>NEET Programs for Class 12</h2>
    <br />
    <button onClick={redirectUser}>Go back to landing page</button>
  </div>
}

function ErrorPage() {
  return <div>
    Page Not Found
  </div>
}

export default App