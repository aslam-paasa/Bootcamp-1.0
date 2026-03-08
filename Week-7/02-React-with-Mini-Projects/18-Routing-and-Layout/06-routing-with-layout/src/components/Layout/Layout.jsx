/**
 * 2. Layout.jsx — Wrapper component
 *
 * Header aur Footer hamesha same rahenge.
 * Outlet ki jagah active route ka page component render hoga.
 *
 * Route structure se:
 *   / (Layout)
 *   ├── / (Home)       → Outlet mein Home dikhega
 *   ├── /about         → Outlet mein About dikhega
 *   ├── /contact       → Outlet mein Contact dikhega
 *   ├── /github        → Outlet mein Github dikhega
 *   └── /user/:userid  → Outlet mein User dikhega
 *
 * Header aur Footer in sab routes pe same rahenge.
 */
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />   {/* ← active route ka component yahan render hoga */}
      <Footer />
    </>
  )
}