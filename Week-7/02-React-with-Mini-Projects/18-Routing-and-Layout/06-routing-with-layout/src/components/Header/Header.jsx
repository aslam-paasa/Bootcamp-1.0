/**
 * 3. Header.jsx — Sticky navigation bar
 *
 * NavLink vs Link:
 *   Link    → simple navigation, no active state
 *   NavLink → active state detect karta hai (isActive property)
 *
 * isActive kaise kaam karta hai:
 *   NavLink check karta hai: current URL == link ka "to" path?
 *   Agar haan → isActive = true → orange color (active page)
 *   Agar nahi → isActive = false → gray color
 *
 * className mein callback diya hai taaki isActive as param le sakein:
 *   className={({ isActive }) =>
 *     isActive ? "text-orange-700" : "text-gray-700"
 *   }
 *
 * end prop on Home NavLink:
 *   Bina end ke "/" path har route pe active dikhega
 *   (kyunki /about bhi "/" se start hota hai)
 *   end lagane se sirf exact "/" pe hi active hoga
 */
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false)

    // Reusable navlink class — isActive se conditional orange/gray
    const navClass = ({ isActive }) =>
        `block py-2 pr-4 pl-3 duration-200 font-medium text-sm transition-colors
     ${isActive ? 'text-orange-700' : 'text-gray-700 hover:text-orange-600'}
     border-b border-gray-100 lg:border-0 lg:p-0
     hover:bg-gray-50 lg:hover:bg-transparent`

    return (
        <header className="shadow sticky z-50 top-0 bg-white">
            <nav className="border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">

                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img
                            src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
                            className="mr-3 h-12"
                            alt="Logo"
                        />
                    </Link>

                    {/* Right side: Login + Get Started + Mobile toggle */}
                    <div className="flex items-center lg:order-2 gap-2">
                        <Link
                            to="#"
                            className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none"
                        >
                            Log in
                        </Link>
                        <Link
                            to="#"
                            className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none"
                        >
                            Get started
                        </Link>

                        {/* Mobile hamburger */}
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
                    <div className={`${menuOpen ? 'flex' : 'hidden'} justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}>
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 w-full lg:w-auto">
                            <li><NavLink to="/" className={navClass} end>Home</NavLink></li>
                            <li><NavLink to="/about" className={navClass}>About</NavLink></li>
                            <li><NavLink to="/contact" className={navClass}>Contact</NavLink></li>
                            <li><NavLink to="/github" className={navClass}>Github</NavLink></li>
                        </ul>
                    </div>

                </div>
            </nav>
        </header>
    )
}