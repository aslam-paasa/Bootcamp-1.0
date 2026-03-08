/**
 * 4. Layout.jsx
 * Header + Outlet + Footer — same as previous app.
 * Outlet mein active route ka page render hoga.
 */
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}