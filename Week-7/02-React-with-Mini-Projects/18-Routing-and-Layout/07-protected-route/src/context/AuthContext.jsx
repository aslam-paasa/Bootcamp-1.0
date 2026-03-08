/**
 * 1. AuthContext.jsx — Global Authentication State
 *
 * ============================================================
 * PROBLEM — Auth state har component mein chahiye
 * ============================================================
 * Login state (user logged in hai ya nahi) kai jagah chahiye:
 *   - Header         → "Login" ya "Logout" button dikhana
 *   - ProtectedRoute → access allow karna ya redirect karna
 *   - Dashboard      → user ka naam dikhana
 *   - Profile        → user ki details dikhana
 *
 * Props drilling se karna:
 *   App → Layout → Header → NavButtons (3 levels)
 *   ❌ Repetitive, messy, hard to maintain
 *
 * SOLUTION — React Context
 *   AuthContext ek global "store" hai.
 *   useAuth() se koi bhi component seedha access kar sakta hai.
 *   Koi props drilling nahi.
 *
 * ============================================================
 * Context kaise kaam karta hai
 * ============================================================
 * Step 1 — Context banao:
 *   const AuthContext = createContext(null)
 *
 * Step 2 — Provider se wrap karo (main.jsx mein):
 *   <AuthProvider>
 *     <App />
 *   </AuthProvider>
 *   Ab App ke andar har component ko ye values milegi.
 *
 * Step 3 — Kisi bhi component mein use karo:
 *   const { user, login, logout } = useAuth()
 *   Seedha access, koi prop pass nahi karna.
 *
 * ============================================================
 * Is app mein context mein kya hai
 * ============================================================
 *   user            → null (logged out) ya { name, email, role }
 *   login(creds)    → user set karta hai, success/error return
 *   logout()        → user null karta hai
 *   isAuthenticated → boolean shortcut: !!user
 */
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    // user null = logged out | user object = logged in
    const [user, setUser] = useState(null)

    function login({ email, password }) {
        // Fake users — real app mein backend API verify karega
        // Real app mein: const res = await fetch('/api/login', { method: 'POST', body: ... })
        const fakeUsers = {
            'admin@demo.com': { name: 'Admin User', email: 'admin@demo.com', role: 'admin', password: 'admin123' },
            'user@demo.com': { name: 'Normal User', email: 'user@demo.com', role: 'user', password: 'user123' },
        }

        const found = fakeUsers[email]
        if (found && found.password === password) {
            const { password: _, ...safeUser } = found  // password strip karo
            setUser(safeUser)
            return { success: true }
        }
        return { success: false, error: 'Invalid email or password' }
    }

    function logout() {
        setUser(null)
        // Real app mein: localStorage.removeItem('token') bhi hoga
    }

    const value = {
        user,
        login,
        logout,
        isAuthenticated: !!user,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

// Custom hook — useContext(AuthContext) ka shortcut
export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth() ko AuthProvider ke andar use karo')
    return context
}