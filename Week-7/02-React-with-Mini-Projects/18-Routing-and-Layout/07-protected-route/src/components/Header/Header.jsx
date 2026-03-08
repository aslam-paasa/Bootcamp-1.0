/**
 * 5. Header.jsx
 *
 * useAuth() se isAuthenticated aur user milta hai —
 * iske basis pe Login ya Logout button dikhata hai.
 *
 * Protected links (Dashboard, Profile) sirf logged-in
 * users ko nav mein dikhte hain.
 */
import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Header() {
    const { isAuthenticated, user, logout } = useAuth()
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)

    function handleLogout() {
        logout()
        navigate('/')
    }

    const navClass = ({ isActive }) =>
        `block py-2 pr-4 pl-3 text-sm font-medium duration-200 transition-colors
     ${isActive ? 'text-orange-700' : 'text-gray-700 hover:text-orange-600'}
     border-b border-gray-100 lg:border-0 lg:p-0
     hover:bg-gray-50 lg:hover:bg-transparent`

    return (
        <header className="shadow sticky z-50 top-0 bg-white">
            <nav className="px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">PR</div>
                        <span className="font-bold text-gray-900 text-sm">Protected Routes</span>
                    </Link>

                    {/* Right: Auth buttons + hamburger */}
                    <div className="flex items-center lg:order-2 gap-2">
                        {isAuthenticated ? (
                            <>
                                {/* Logged in — show user name + logout */}
                                <span className="hidden sm:block text-sm text-gray-600">
                                    👋 <span className="font-semibold">{user.name}</span>
                                    <span className="ml-1 text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-mono">{user.role}</span>
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                {/* Logged out — show login button */}
                                <Link
                                    to="/login"
                                    className="text-sm font-medium text-white bg-orange-700 hover:bg-orange-600 px-4 py-2 rounded-lg transition"
                                >
                                    Login
                                </Link>
                            </>
                        )}

                        {/* Mobile toggle */}
                        <button
                            className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {menuOpen
                                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                }
                            </svg>
                        </button>
                    </div>

                    {/* Nav links */}
                    <div className={`${menuOpen ? 'flex' : 'hidden'} w-full lg:flex lg:w-auto lg:order-1`}>
                        <ul className="flex flex-col mt-4 lg:flex-row lg:space-x-6 lg:mt-0">
                            <li><NavLink to="/" className={navClass} end>Home</NavLink></li>

                            {/* Protected links — sirf logged-in users ko dikhao */}
                            {isAuthenticated && (
                                <>
                                    <li><NavLink to="/dashboard" className={navClass}>Dashboard</NavLink></li>
                                    <li><NavLink to="/profile" className={navClass}>Profile</NavLink></li>
                                    {/* Admin link sirf admin role ke liye */}
                                    {user?.role === 'admin' && (
                                        <li><NavLink to="/admin" className={navClass}>Admin</NavLink></li>
                                    )}
                                </>
                            )}
                        </ul>
                    </div>

                </div>
            </nav>
        </header>
    )
}