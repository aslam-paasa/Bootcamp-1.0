/**
 * 8. Dashboard.jsx — Protected page
 *
 * Ye page sirf tab dikhega jab user logged in ho.
 * Agar logged out user /dashboard URL pe aaye:
 *   ProtectedRoute → <Navigate to="/login" state={{ from: /dashboard }} />
 *   Login ke baad → user wapas /dashboard pe aayega
 */
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'

export default function Dashboard() {
    const { user } = useAuth()

    const stats = [
        { label: 'Projects', value: '12', icon: '📁', color: 'blue' },
        { label: 'Tasks', value: '48', icon: '✅', color: 'green' },
        { label: 'Messages', value: '7', icon: '💬', color: 'purple' },
        { label: 'Reports', value: '3', icon: '📊', color: 'orange' },
    ]

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">

            {/* Welcome */}
            <div className="mb-8">
                <h1 className="text-3xl font-black text-gray-900">
                    Welcome back, {user.name}! 👋
                </h1>
                <p className="text-gray-500 mt-1">
                    Tum is page pe ho kyunki tum logged in ho.
                    Logged out hokar /dashboard seedha kholne ki koshish karo.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {stats.map(s => (
                    <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm">
                        <p className="text-2xl mb-1">{s.icon}</p>
                        <p className="text-2xl font-black text-gray-900">{s.value}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Protected route explanation */}
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
                <p className="font-bold text-orange-800 mb-3">🔐 Is page pe kaise aaye?</p>
                <div className="font-mono text-xs text-orange-700 space-y-1">
                    <p>1. App.jsx mein route:</p>
                    <p className="ml-4 bg-white px-3 py-1.5 rounded border border-orange-200 text-gray-700">
                        {'{ path: "dashboard", element: <ProtectedRoute><Dashboard /></ProtectedRoute> }'}
                    </p>
                    <p className="mt-2">2. ProtectedRoute ne check kiya: isAuthenticated = ✅ true</p>
                    <p>3. Dashboard render hua</p>
                    <p className="text-green-700 mt-2">// Agar isAuthenticated = false hota:</p>
                    <p className="text-green-700">// &lt;Navigate to="/login" state={{ from: '/dashboard' }} /&gt;</p>
                </div>
            </div>

            <div className="mt-4 flex gap-3">
                <Link to="/profile" className="text-sm bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
                    Profile Dekho →
                </Link>
                {user.role === 'admin' && (
                    <Link to="/admin" className="text-sm bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500">
                        Admin Panel →
                    </Link>
                )}
            </div>

        </div>
    )
}