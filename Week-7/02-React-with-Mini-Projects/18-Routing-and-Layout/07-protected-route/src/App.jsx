/**
 * 3. App.jsx — Router Configuration
 *
 * Routes overview:
 *
 *   PUBLIC ROUTES (koi bhi access kar sakta hai):
 *     /          → Home
 *     /login     → Login page
 *     *          → NotFound (404)
 *
 *   PROTECTED ROUTES (sirf logged-in users):
 *     /dashboard → Dashboard  (any logged-in user)
 *     /profile   → Profile    (any logged-in user)
 *
 *   ROLE-PROTECTED ROUTES (sirf specific role):
 *     /admin     → AdminPanel (sirf role="admin")
 *
 * ProtectedRoute wrapper kaise kaam karta hai:
 *   element: (
 *     <ProtectedRoute>
 *       <Dashboard />
 *     </ProtectedRoute>
 *   )
 *   → ProtectedRoute check karega: logged in hai?
 *     Haan → Dashboard render hoga
 *     Nahi → /login pe redirect hoga
 */
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/Layout/Layout'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import Profile from './pages/Profile/Profile'
import NotFound from './pages/NotFound/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [

      // ── Public Routes ──────────────────────────────────────
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },

      // ── Protected Routes (any logged-in user) ──────────────
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },

      // ── Role-Protected Route (sirf admin) ──────────────────
      {
        path: 'admin',
        element: (
          <ProtectedRoute requiredRole="admin">
            <AdminPanel />
          </ProtectedRoute>
        ),
      },

      // ── 404 ────────────────────────────────────────────────
      { path: '*', element: <NotFound /> },
    ],
  },
])

// Simple inline AdminPanel — sirf admin dekhega
function AdminPanel() {
  return (
    <div className="max-w-2xl mx-auto my-12 px-4">
      <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
        <p className="text-4xl mb-4">👑</p>
        <h2 className="text-2xl font-bold text-red-800 mb-2">Admin Panel</h2>
        <p className="text-red-600">
          Sirf <span className="font-mono bg-red-100 px-2 py-0.5 rounded">admin</span> role wale yahan aa sakte hain.
          Normal user try kare to "Access Denied" dikhega.
        </p>
        <div className="mt-6 bg-white rounded-xl p-4 border border-red-100">
          <p className="text-sm font-mono text-gray-500">
            // App.jsx mein route:
          </p>
          <pre className="text-sm font-mono text-gray-700 mt-1">{`{ path: 'admin',
  element: (
    <ProtectedRoute requiredRole="admin">
      <AdminPanel />
    </ProtectedRoute>
  )
}`}</pre>
        </div>
      </div>
    </div>
  )
}

// AuthProvider poori app ko wrap karta hai — context available everywhere
function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App