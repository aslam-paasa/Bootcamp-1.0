/**
 * 2. ProtectedRoute.jsx — THE core concept of this file
 *
 * ============================================================
 * WHAT IS A PROTECTED ROUTE?
 * ============================================================
 * Kuch pages sirf logged-in users ke liye hote hain:
 *   - Dashboard  → login ke baad hi dikhega
 *   - Profile    → login ke baad hi dikhega
 *   - Settings   → login ke baad hi dikhega
 *
 * Bina protection ke koi bhi URL bar mein /dashboard type
 * karke access kar sakta hai. Ye nahi hona chahiye.
 *
 * ============================================================
 * HOW IT WORKS
 * ============================================================
 * ProtectedRoute ek wrapper component hai:
 *
 *   function ProtectedRoute({ children }) {
 *     const { isAuthenticated } = useAuth()
 *
 *     if (!isAuthenticated) {
 *       return <Navigate to="/login" />   // redirect
 *     }
 *
 *     return children   // allow
 *   }
 *
 * Logic:
 *   User logged in hai  → children render karo (page dikhao)
 *   User logged out hai → /login pe redirect karo
 *
 * ============================================================
 * Route mein use kaise karte hain
 * ============================================================
 * App.jsx mein:
 *
 *   // Without protection — koi bhi access kar sakta hai
 *   { path: 'dashboard', element: <Dashboard /> }
 *
 *   // With protection — sirf logged-in user access kar sakta hai
 *   {
 *     path: 'dashboard',
 *     element: (
 *       <ProtectedRoute>
 *         <Dashboard />
 *       </ProtectedRoute>
 *     )
 *   }
 *
 * ============================================================
 * Navigate component — redirect karna
 * ============================================================
 * <Navigate to="/login" /> — seedha redirect karta hai.
 * useNavigate() se fark: Navigate JSX mein use hota hai,
 * useNavigate() function ke andar event handlers mein.
 *
 * replace prop:
 *   <Navigate to="/login" replace />
 *   "replace" matlab browser history mein /dashboard entry
 *   nahi aayegi. Login ke baad back button press karne pe
 *   user /dashboard pe nahi jaayega — seedha home pe.
 *
 * state prop:
 *   <Navigate to="/login" state={{ from: location }} replace />
 *   Login ke baad user ko wapas usi page pe bhej sakte hain
 *   jahan wo jaana chahta tha. (see redirectAfterLogin below)
 *
 * ============================================================
 * Role-based protection (bonus)
 * ============================================================
 * Sirf admin users ke liye:
 *   <ProtectedRoute requiredRole="admin">
 *     <AdminPanel />
 *   </ProtectedRoute>
 *
 * Normal user admin page kholne ki koshish kare to
 * "Access Denied" page dikhega.
 */
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function ProtectedRoute({ children, requiredRole = null }) {
    const { isAuthenticated, user } = useAuth()
    const location = useLocation()

    // Check 1 — Logged in hai ya nahi?
    if (!isAuthenticated) {
        /*
          Navigate to="/login"
            → User ko login page pe bhejo
    
          state={{ from: location }}
            → Current path save karo (e.g. /dashboard)
            → Login ke baad Login.jsx mein ye read karke
              user ko wapas /dashboard pe bheja ja sakta hai
    
          replace
            → History mein /dashboard entry mat rakho
            → Back button se /dashboard pe nahi jaayega
        */
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    // Check 2 — Role check (agar requiredRole diya gaya hai)
    if (requiredRole && user?.role !== requiredRole) {
        // Logged in hai lekin sahi role nahi hai
        return <AccessDenied requiredRole={requiredRole} userRole={user?.role} />
    }

    // Sab theek hai — page render karo
    return children
}

// Access Denied UI — role mismatch pe dikhega
function AccessDenied({ requiredRole, userRole }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <p className="text-6xl mb-4">🔒</p>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
            <p className="text-gray-500 mb-1">
                Ye page sirf <span className="font-semibold text-orange-600">{requiredRole}</span> role ke liye hai.
            </p>
            <p className="text-gray-400 text-sm">
                Tumhara role: <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">{userRole}</span>
            </p>
        </div>
    )
}