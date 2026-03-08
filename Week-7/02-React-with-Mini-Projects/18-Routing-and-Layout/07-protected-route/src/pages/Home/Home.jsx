/**
 * 6. Home.jsx — Public page
 * Koi bhi access kar sakta hai — login ki zarurat nahi.
 */
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Home() {
    const { isAuthenticated, user } = useAuth()

    return (
        <div className="max-w-4xl mx-auto px-4 py-16">

            {/* Hero */}
            <div className="text-center mb-16">
                <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
                    Protected Routes
                </h1>
                <p className="text-lg text-gray-500 max-w-xl mx-auto">
                    Kuch pages sirf logged-in users ke liye hain.
                    Bina login ke direct URL se bhi access karne ki koshish karo.
                </p>
            </div>

            {/* Route Access Table */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-10 shadow-sm">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <p className="font-bold text-gray-800">Routes aur unka access:</p>
                </div>
                <div className="divide-y divide-gray-100">
                    {[
                        { path: '/', label: 'Home', access: 'public', icon: '🌐' },
                        { path: '/login', label: 'Login', access: 'public', icon: '🔑' },
                        { path: '/dashboard', label: 'Dashboard', access: 'auth', icon: '📊' },
                        { path: '/profile', label: 'Profile', access: 'auth', icon: '👤' },
                        { path: '/admin', label: 'Admin Panel', access: 'admin', icon: '👑' },
                    ].map(route => (
                        <div key={route.path} className="flex items-center justify-between px-6 py-3">
                            <div className="flex items-center gap-3">
                                <span className="text-xl">{route.icon}</span>
                                <div>
                                    <p className="font-medium text-gray-800 text-sm">{route.label}</p>
                                    <p className="font-mono text-xs text-gray-400">{route.path}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${route.access === 'public' ? 'bg-green-100 text-green-700' :
                                        route.access === 'admin' ? 'bg-red-100 text-red-700' :
                                            'bg-orange-100 text-orange-700'
                                    }`}>
                                    {route.access === 'public' ? '🌐 Public' :
                                        route.access === 'admin' ? '👑 Admin only' :
                                            '🔐 Login required'}
                                </span>
                                <Link
                                    to={route.path}
                                    className="text-xs text-blue-600 hover:underline font-medium"
                                >
                                    Try →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Current status */}
            <div className={`rounded-2xl p-6 text-center border ${isAuthenticated
                    ? 'bg-green-50 border-green-200'
                    : 'bg-orange-50 border-orange-200'
                }`}>
                {isAuthenticated ? (
                    <>
                        <p className="text-2xl mb-2">✅</p>
                        <p className="font-bold text-green-800">Tum logged in ho!</p>
                        <p className="text-green-600 text-sm mt-1">
                            {user.name} ({user.role}) — Protected pages access kar sakte ho.
                        </p>
                        <div className="flex gap-3 justify-center mt-4">
                            <Link to="/dashboard" className="text-sm bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600">Dashboard</Link>
                            <Link to="/profile" className="text-sm bg-white text-green-700 border border-green-300 px-4 py-2 rounded-lg hover:bg-green-50">Profile</Link>
                            {user.role === 'admin' && (
                                <Link to="/admin" className="text-sm bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500">Admin Panel</Link>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <p className="text-2xl mb-2">🔒</p>
                        <p className="font-bold text-orange-800">Tum logged out ho</p>
                        <p className="text-orange-600 text-sm mt-1">
                            /dashboard ya /profile directly kholne ki koshish karo — login page pe redirect hoga.
                        </p>
                        <Link
                            to="/login"
                            className="inline-block mt-4 text-sm bg-orange-700 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
                        >
                            Login Karo
                        </Link>
                    </>
                )}
            </div>

        </div>
    )
}