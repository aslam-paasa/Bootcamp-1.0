/**
 * 7. Login.jsx
 *
 * ============================================================
 * KEY CONCEPTS HERE
 * ============================================================
 *
 * 1. useAuth() se login() function milta hai
 *    login() AuthContext mein user set karta hai
 *
 * 2. useLocation() — state se "from" padhna
 *    Jab ProtectedRoute redirect karta hai:
 *      <Navigate to="/login" state={{ from: location }} />
 *    Tab Login page pe location.state.from milta hai.
 *    Login success ke baad user ko wapas wahi bhejte hain.
 *
 *    Example:
 *      User /dashboard kholna chahta tha (logged out tha)
 *      ProtectedRoute ne /login pe bheja, state mein { from: '/dashboard' }
 *      Login success → navigate(from || '/dashboard')
 *      User seedha /dashboard pe pahunch jaata hai
 *
 * 3. Already logged in hai to / pe redirect karo
 *    Logged in user login page kyon dekhega?
 *
 * Demo credentials:
 *   Admin: admin@demo.com / admin123
 *   User:  user@demo.com  / user123
 */
import { useState } from 'react'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
    const { login, isAuthenticated } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    // Agar already logged in hai to home pe bhejo
    if (isAuthenticated) {
        return <Navigate to="/" replace />
    }

    // Jahan se aaya tha wahan wapas bhejo, warna dashboard
    // location.state?.from → ProtectedRoute ne set kiya tha
    const from = location.state?.from?.pathname || '/dashboard'

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setLoading(true)

        // Simulate network delay (real app mein API call hogi)
        await new Promise(r => setTimeout(r, 600))

        const result = login({ email, password })
        setLoading(false)

        if (result.success) {
            // Login success — user ko wapas bhejo jahan jaana chahta tha
            navigate(from, { replace: true })
        } else {
            setError(result.error)
        }
    }

    function fillCredentials(type) {
        if (type === 'admin') { setEmail('admin@demo.com'); setPassword('admin123') }
        else { setEmail('user@demo.com'); setPassword('user123') }
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="w-full max-w-md">

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                    <div className="text-center mb-8">
                        <div className="w-14 h-14 bg-orange-600 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4">🔐</div>
                        <h1 className="text-2xl font-bold text-gray-900">Login</h1>
                        <p className="text-gray-500 text-sm mt-1">
                            {location.state?.from
                                ? `Login karo aur ${location.state.from.pathname} pe jao`
                                : 'Apne account mein login karo'
                            }
                        </p>
                    </div>

                    {/* Quick fill buttons */}
                    <div className="mb-6">
                        <p className="text-xs text-gray-400 mb-2 text-center">Demo credentials:</p>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                type="button"
                                onClick={() => fillCredentials('admin')}
                                className="text-xs bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 py-2 px-3 rounded-lg transition font-medium"
                            >
                                👑 Fill Admin
                            </button>
                            <button
                                type="button"
                                onClick={() => fillCredentials('user')}
                                className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 py-2 px-3 rounded-lg transition font-medium"
                            >
                                👤 Fill User
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="email@demo.com"
                                required
                                className="w-full py-2.5 px-3 rounded-lg border border-gray-300 text-gray-800 text-sm focus:border-orange-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="password"
                                required
                                className="w-full py-2.5 px-3 rounded-lg border border-gray-300 text-gray-800 text-sm focus:border-orange-500 focus:outline-none"
                            />
                        </div>

                        {/* Error message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2 rounded-lg">
                                ❌ {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-orange-700 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold py-2.5 rounded-lg transition"
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    {/* Concept note */}
                    <div className="mt-6 bg-gray-50 rounded-xl p-4 text-xs font-mono text-gray-500">
                        <p className="text-orange-600 mb-1">// Login ke baad redirect logic:</p>
                        <p>from = location.state?.from?.pathname</p>
                        <p>navigate(from || '/dashboard')</p>
                        <p className="text-green-600 mt-1">// User wapas wahi jaata hai jahan jaana chahta tha</p>
                    </div>
                </div>

            </div>
        </div>
    )
}