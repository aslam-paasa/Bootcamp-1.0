/**
 * ============================================================
 * 1. App.jsx — Router Configuration
 * ============================================================
 *
 * createBrowserRouter: Modern React Router API.
 * Sari routes yahan ek jagah define hain — config object style.
 *
 * createBrowserRouter vs BrowserRouter:
 *   BrowserRouter   → JSX ke andar Routes/Route likhte hain
 *   createBrowserRouter → JS object mein routes define karte hain
 *
 * createBrowserRouter ka fayda:
 *   → loader support — route render se PEHLE data fetch hota hai
 *   → useLoaderData() sirf iske saath kaam karta hai
 *   → Better error handling (errorElement)
 */
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import Github, { githubInfoLoader } from './pages/Github/Github'
import User from './pages/User/User'
import NotFound from './pages/Notfound/Notfound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,       // ← parent: Header + Outlet + Footer
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      {
        path: 'github',
        element: <Github />,
        loader: githubInfoLoader, // ← data pehle fetch hoga, tab component render
      },
      { path: 'user/:userid', element: <User /> },
      { path: '*', element: <NotFound /> },  // 404
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App