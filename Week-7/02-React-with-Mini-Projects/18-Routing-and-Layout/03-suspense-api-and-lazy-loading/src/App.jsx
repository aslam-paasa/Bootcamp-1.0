/**
 * ============================================================
 * TOPIC: Lazy Loading, Suspense, Async Component & Data Fetching
 * ============================================================
 *
 * Ye file 4 cheezein cover karti hai:
 *   1. Lazy Loading         — component ka JS tab download karo jab chahiye
 *   2. Suspense API         — loading ke dauran fallback UI dikhao
 *   3. Async Component      — component file hi network se aati hai
 *   4. Async Data Fetching  — component load hone ke baad API se data laao
 *
 * Aur ek bonus:
 *   5. React Router + Lazy  — real app mein routing ke saath kaise use karte hain
 *
 * ============================================================
 * PROBLEM — Default mein poora app ek bundle mein hota hai
 * ============================================================
 * Jab React app build karte ho, Vite/Webpack sabhi components
 * ek bade JS file (bundle) mein pack kar deta hai.
 *
 * Matlab user jab bhi app kholega — Landing page, Dashboard,
 * Profile, Settings — sab ka code ek saath download hoga,
 * chahe user un pages pe jaaye ya na jaaye.
 *
 * App bada ho to:
 *   Bundle size → 2MB, 5MB, 10MB
 *   Pehla load  → bahut slow
 *   User bounce → page slow tha, chale gaye
 *
 * ============================================================
 * SOLUTION — Code Splitting + Lazy Loading
 * ============================================================
 * React.lazy() se tum component ko "lazily" import karte ho.
 * Matlab uska code ek alag chunk mein jaata hai.
 * Wo chunk tab download hoga jab component pehli baar render hoga.
 *
 *   Normal import (sab pehle):
 *     import Dashboard from './Dashboard'   ← bundle mein shamil
 *
 *   Lazy import (jab chahiye tab):
 *     const Dashboard = lazy(() => import('./Dashboard'))
 *     ↑ ek alag Dashboard.chunk.js banega
 *     ↑ tab download hoga jab user /dashboard route pe jaayega
 *
 * ============================================================
 * SUSPENSE — Loading ke beech kya dikhao?
 * ============================================================
 * Lazy component download ho raha hota hai tab thodi der ke
 * liye kuch dikhana hota hai. Suspense ye kaam karta hai.
 *
 *   <Suspense fallback={<Spinner />}>
 *     <Dashboard />     ← download ho raha hai
 *   </Suspense>
 *
 *   Download pending  → fallback render hoga
 *   Download complete → Dashboard render hoga
 *
 * Suspense ke bina lazy() use nahi kar sakte — React error deta hai.
 *
 * ============================================================
 * REACT ROUTER + LAZY LOADING (Tumhara Code)
 * ============================================================
 * Real app mein exactly aisa karte hain:
 *
 *   const Dashboard = lazy(() => import('./pages/Dashboard'))
 *   const Landing   = lazy(() => import('./pages/Landing'))
 *
 *   <Routes>
 *     <Route path="/" element={
 *       <Suspense fallback={"loading..."}>
 *         <Landing />
 *       </Suspense>
 *     } />
 *     <Route path="/dashboard" element={
 *       <Suspense fallback={"loading..."}>
 *         <Dashboard />
 *       </Suspense>
 *     } />
 *   </Routes>
 *
 * User "/" pe gaya → Landing.chunk.js download hua
 * User "/dashboard" pe gaya → Dashboard.chunk.js download hua
 * Pehli baar delay → doosri baar instant (browser cache)
 * ============================================================
 */

import React, { Suspense, lazy, useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "./App.css";


/**
 * ============================================================
 * LAZY COMPONENTS
 * ============================================================
 * Real project mein ye actual file imports hote:
 *   const Landing   = lazy(() => import('./pages/Landing'))
 *   const Dashboard = lazy(() => import('./pages/Dashboard'))
 *
 * Yahan hum same cheez simulate kar rahe hain — Promise jo
 * kuch milliseconds baad resolve hoti hai, exactly jaisi
 * network se file aati hai.
 *
 * lazy() ko ek function dete hain jo Promise return kare.
 * Wo Promise ek module resolve kare jisme default export ho.
 * ============================================================
 */

// Landing page — 800ms network delay simulate
const Landing = lazy(
  () =>
    new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            default: function LandingPage() {
              return <LandingContent />;
            },
          }),
        800
      )
    )
);

// Dashboard — 1500ms delay (bada component hai, zyada time)
const Dashboard = lazy(
  () =>
    new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            default: function DashboardPage() {
              return <DashboardContent />;
            },
          }),
        1500
      )
    )
);

// Profile — 1000ms delay
const Profile = lazy(
  () =>
    new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            default: function ProfilePage() {
              return <ProfileContent />;
            },
          }),
        1000
      )
    )
);


/**
 * ============================================================
 * APP — React Router + Lazy Loading + Suspense
 * ============================================================
 * Bilkul tumhare diye code jaisa — bas 3 routes hain ab.
 *
 * BrowserRouter  → routing context provide karta hai
 * Routes         → active route match karta hai
 * Route          → path aur element define karta hai
 * Suspense       → lazy component load hone tak fallback
 * lazy()         → component ka code alag chunk mein
 * ============================================================
 */
function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <h1>Lazy Loading & Suspense</h1>

        {/* Appbar — useNavigate yahan use hoga, BrowserRouter ke andar hai */}
        <Appbar />

        {/* Route explanation */}
        <RouteInfo />

        {/* Routes — React Router v6 */}
        <Routes>
          {/*
            "/" route — Landing page
            Suspense fallback: jab tak Landing.js download ho raha hai
            tab "Loading Landing Page..." dikhega
          */}
          <Route
            path="/"
            element={
              <Suspense fallback={<PageLoader name="Landing Page" color="blue" />}>
                <Landing />
              </Suspense>
            }
          />

          {/*
            "/dashboard" route — Dashboard
            Pehli baar navigate karne pe 1500ms loading dikhega
            Doosri baar instant (chunk already downloaded)
          */}
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<PageLoader name="Dashboard" color="green" />}>
                <Dashboard />
              </Suspense>
            }
          />

          {/*
            "/profile" route — Profile
            Extra route add kiya concept dikhane ke liye
          */}
          <Route
            path="/profile"
            element={
              <Suspense fallback={<PageLoader name="Profile" color="purple" />}>
                <Profile />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}


/**
 * ============================================================
 * APPBAR — Navigation
 * ============================================================
 * useNavigate() — programmatically route change karta hai.
 * Bilkul tumhare diye code jaisa.
 *
 * IMPORTANT: Appbar BrowserRouter ke ANDAR hona chahiye —
 * tabhi useNavigate() kaam karega. Agar BrowserRouter ke
 * bahar hoga to React error dega:
 * "useNavigate() may be used only in the context of a Router"
 * ============================================================
 */
function Appbar() {
  const navigate = useNavigate();
  const location = useLocation(); // current path — active button highlight ke liye

  const routes = [
    { path: "/",          label: "🏠 Landing Page", delay: "800ms"  },
    { path: "/dashboard", label: "📊 Dashboard",    delay: "1500ms" },
    { path: "/profile",   label: "👤 Profile",      delay: "1000ms" },
  ];

  return (
    <div className="appbar">
      {routes.map((route) => (
        <button
          key={route.path}
          // Active route ko highlight karo
          className={location.pathname === route.path ? "btn-active" : "btn-inactive"}
          onClick={() => navigate(route.path)}
        >
          {route.label}
          {/* Pehli baar delay dikhao — tab disappear hoga jab chunk load ho */}
          <span className="appbar-delay">{route.delay}</span>
        </button>
      ))}
    </div>
  );
}


/**
 * ============================================================
 * ROUTE INFO — Current path dikhao
 * ============================================================
 */
function RouteInfo() {
  const location = useLocation();
  return (
    <div className="note" style={{ marginBottom: "0", marginTop: "10px" }}>
      Current path: <strong>{location.pathname}</strong> — 
      Pehli baar navigate karo: loading dikhega. Doosri baar: instant.
    </div>
  );
}


/**
 * ============================================================
 * PAGE LOADER — Suspense fallback
 * ============================================================
 * Ye wahi hai jo Suspense dikhata hai jab lazy component
 * download ho raha hota hai. Tumhare code mein ye
 * {"loading..."} tha — hum isko thoda acha bana rahe hain.
 * ============================================================
 */
function PageLoader({ name, color }) {
  const colors = {
    blue:   "#3b82f6",
    green:  "#22c55e",
    purple: "#a855f7",
  };

  return (
    <div className="suspense-fallback">
      <div className="spinner" style={{ borderTopColor: colors[color] || colors.blue }} />
      <p className="suspense-msg">{name} load ho raha hai...</p>
      <p style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "4px" }}>
        Component ka JS chunk network se aa raha hai
      </p>
    </div>
  );
}


/**
 * ============================================================
 * PAGE CONTENTS — Actual page UI
 * ============================================================
 * Real app mein ye alag files mein hote:
 *   ./pages/Landing.jsx
 *   ./pages/Dashboard.jsx
 *   ./pages/Profile.jsx
 *
 * Hum sab ek file mein rakh rahe hain — self-contained file.
 * ============================================================
 */

// Landing page content — async data fetch bhi karta hai
function LandingContent() {
  const navigate = useNavigate();

  return (
    <div className="demo-page demo-page-blue">
      <p className="demo-page-icon">🏠</p>
      <p className="demo-page-title">Landing Page</p>
      <p className="demo-page-body">
        Ye component lazily load hua — 800ms ka delay simulate kiya gaya.
        Real app mein ye Landing.chunk.js network se aata.
      </p>
      <div className="btn-row" style={{ marginTop: "14px" }}>
        <button className="btn-primary" onClick={() => navigate("/dashboard")}>
          Dashboard pe Jao →
        </button>
      </div>
      <div className="lazy-info-box">
        <p><strong>lazy() kya karta hai:</strong></p>
        <p>import('./pages/Landing') → Landing.chunk.js alag file banti hai</p>
        <p>User / pe aaya → tab download hua → Suspense ne loading dikhaya</p>
      </div>
    </div>
  );
}

// Dashboard — async data fetch bhi karta hai (dono stages demonstrate karta hai)
function DashboardContent() {
  const [stats, setStats]     = useState(null);
  const [loading, setLoading] = useState(true);

  // Stage 2 — Component load ho gaya, ab API se data laao
  useEffect(() => {
    // Real app mein: fetch('/api/dashboard/stats')
    setTimeout(() => {
      setStats({
        users: 1240,
        orders: 384,
        revenue: "₹84,200",
        growth: "+12%",
      });
      setLoading(false);
    }, 1000); // API response simulate
  }, []);

  return (
    <div className="demo-page demo-page-green">
      <p className="demo-page-icon">📊</p>
      <p className="demo-page-title">Dashboard</p>
      <p className="demo-page-body">
        Component 1500ms mein load hua. Ab andar API se data aa raha hai.
      </p>

      {/* Stage 2 loading — component ka apna loading state */}
      {loading ? (
        <div className="suspense-fallback" style={{ background: "transparent" }}>
          <div className="spinner" style={{ borderTopColor: "#22c55e" }} />
          <p className="suspense-msg">Stats fetch ho rahe hain... (Stage 2)</p>
        </div>
      ) : (
        <div className="stats-grid">
          <StatCard label="Total Users"  value={stats.users}   />
          <StatCard label="Orders"       value={stats.orders}  />
          <StatCard label="Revenue"      value={stats.revenue} />
          <StatCard label="Growth"       value={stats.growth}  />
        </div>
      )}

      <div className="lazy-info-box" style={{ marginTop: "14px" }}>
        <p><strong>Do stages hain:</strong></p>
        <p>Stage 1: Suspense fallback → Dashboard.chunk.js download (1500ms)</p>
        <p>Stage 2: Component ka loading state → API data fetch (1000ms)</p>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="stat-card">
      <p className="stat-value">{value}</p>
      <p className="stat-label">{label}</p>
    </div>
  );
}

// Profile page
function ProfileContent() {
  const navigate = useNavigate();

  return (
    <div className="demo-page demo-page-purple">
      <p className="demo-page-icon">👤</p>
      <p className="demo-page-title">Profile</p>
      <p className="demo-page-body">
        Ye component lazily load hua — 1000ms ka delay.
        Doosri baar yahan aao — instant load hoga (chunk cached hai).
      </p>
      <div className="btn-row" style={{ marginTop: "14px" }}>
        <button className="btn-primary" onClick={() => navigate("/")}>
          ← Landing pe Jao
        </button>
      </div>
      <div className="lazy-info-box">
        <p><strong>Browser Cache:</strong></p>
        <p>Pehli baar: Profile.chunk.js download hua</p>
        <p>Doosri baar: Cache se load — 0ms delay</p>
      </div>
    </div>
  );
}


export default App;