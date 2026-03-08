/**
 * ============================================================
 * TOPIC: Layout & Outlet
 * ============================================================
 *
 * Pehle problem samjho.
 *
 * ============================================================
 * PROBLEM — Navbar aur Footer har page pe repeat ho raha tha
 * ============================================================
 * Pichle example mein humne dekha tha "ugly way":
 *
 *   function Landing() {
 *     return <>
 *       <Navbar />        ← har component mein ye likhna pada
 *       <h1>Landing</h1>
 *       <Footer />        ← ye bhi har baar
 *     </>
 *   }
 *
 *   function Dashboard() {
 *     return <>
 *       <Navbar />        ← dobara likhna pada
 *       <h1>Dashboard</h1>
 *       <Footer />        ← dobara
 *     </>
 *   }
 *
 * 10 pages hain to 10 baar Navbar aur Footer likhna padega.
 * Ek jagah change karna ho to 10 jagah karna padega.
 * ❌ Repetitive, ❌ Hard to maintain
 *
 * ============================================================
 * SOLUTION — Layout + Outlet
 * ============================================================
 * Layout ek wrapper component hai:
 *   - Upar Navbar
 *   - Beech mein <Outlet /> ← yahan active route ka component aayega
 *   - Neeche Footer
 *
 * React Router mein ek route doosre route ka parent ban sakta hai.
 * Parent route ka component render hoga → andar Outlet ki jagah
 * child route ka component render hoga.
 *
 *   <Route path="/" element={<Layout />}>        ← parent
 *     <Route path="/" element={<Landing />} />   ← child
 *     <Route path="/about" element={<About />} />← child
 *   </Route>
 *
 * User "/" pe gaya:
 *   Layout render hoga → Outlet ki jagah Landing aayega
 *
 * User "/about" pe gaya:
 *   Layout render hoga (Navbar + Footer same) → Outlet ki jagah About aayega
 *
 * ============================================================
 * OUTLET KYA HAI?
 * ============================================================
 * <Outlet /> ek placeholder hai — "yahan child route ka
 * component render karo" bolne ka tarika hai React Router ko.
 *
 * Sochho ek picture frame ki tarah:
 *   Frame (Navbar + Footer) hamesha same rahega.
 *   Frame ke andar ki tasveer (Outlet) route ke hisaab se
 *   badal jaayegi.
 *
 * ============================================================
 * NOTE: Layout Next.js mein bhi bahut important hai
 * ============================================================
 * Next.js mein ye aur zyada powerful hai — layout.jsx file
 * automatically sub-routes pe apply hoti hai. Same concept.
 * ============================================================
 */

import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Outlet,
} from "react-router-dom";
import "./App.css";


/**
 * ============================================================
 * APP
 * ============================================================
 * Bilkul tumhare diye code jaisa — sirf styled aur commented.
 *
 * Route structure:
 *   "/" → Layout (parent)
 *     "/"                              → Landing
 *     "/neet/online-coaching-class-11" → Class11Program
 *     "/neet/online-coaching-class-12" → Class12Program
 *     "*"                              → ErrorPage (koi bhi unknown path)
 *
 * Layout hamesha render hoga — Outlet ke andar sirf content badlega.
 * ============================================================
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*
          Layout parent route hai.
          Matlab: jab bhi koi bhi route match ho, Layout render hoga.
          Andar Outlet ki jagah matching child route ka component aayega.
        */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="/neet/online-coaching-class-11" element={<Class11Program />} />
          <Route path="/neet/online-coaching-class-12" element={<Class12Program />} />
          {/*
            "*" — wildcard route
            Koi bhi path match nahi hua to ye render hoga.
            Always last mein rakho.
          */}
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


/**
 * ============================================================
 * LAYOUT — Wrapper Component
 * ============================================================
 * Ye component hamesha render hoga — chahe koi bhi route ho.
 *
 * Structure:
 *   <Header />    ← hamesha same, navigation links
 *   <Outlet />    ← yahan child route ka component aayega
 *   <Footer />    ← hamesha same
 *
 * Outlet ke baare mein sochho ek "hole" ki tarah —
 * Layout mein ek jagah khali hai, wahan jo route
 * active hai uska component fit ho jaata hai.
 * ============================================================
 */
function Layout() {
  return (
    <div className="layout-wrapper">

      {/* ── Header ── hamesha same rehta hai ── */}
      <header className="layout-header">
        <div className="layout-brand">🎓 Allen Institute</div>
        <nav className="layout-nav">
          {/*
            Link component — React Router ka.
            <a href> ki tarah kaam karta hai lekin page reload nahi hota.
            to="/path" → navigate karta hai
          */}
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/neet/online-coaching-class-11" className="nav-link">Class 11</Link>
          <Link to="/neet/online-coaching-class-12" className="nav-link">Class 12</Link>
        </nav>
      </header>

      {/*
        ── Outlet ── dynamic content area ──

        Yahan koi bhi fixed content nahi hai.
        React Router yahan active child route ka component render karega.

        User "/" pe → Landing yahan render hoga
        User "/neet/online-coaching-class-11" pe → Class11Program yahan
        User "/neet/online-coaching-class-12" pe → Class12Program yahan
        Koi aur path → ErrorPage yahan

        Header aur Footer wahi rahenge — sirf Outlet badlega.
      */}
      <main className="layout-content">
        <Outlet />
      </main>

      {/* ── Footer ── hamesha same rehta hai ── */}
      <footer className="layout-footer">
        <p>© 2024 Allen Institute of Technology</p>
        <div className="footer-links">
          <a href="#" className="footer-link">Contact Us</a>
          <a href="#" className="footer-link">Privacy Policy</a>
          <a href="#" className="footer-link">Terms</a>
        </div>
      </footer>

    </div>
  );
}


/**
 * ============================================================
 * PAGE COMPONENTS — Sirf content, Layout nahi
 * ============================================================
 * Ye components sirf apna content return karti hain.
 * Navbar ya Footer likhne ki zarurat nahi — Layout handle karta hai.
 * ============================================================
 */

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="page-hero">
        <p className="page-hero-badge">🏆 India's #1 NEET Coaching</p>
        <h1 className="page-hero-title">Welcome to Allen Institute</h1>
        <p className="page-hero-subtitle">
          12 lakh se zyada students ne qualify kiya Allen ke saath.
          Tumhari taiyari shuru karo aaj se.
        </p>
        <div className="btn-row" style={{ justifyContent: "center" }}>
          <button className="btn-primary" onClick={() => navigate("/neet/online-coaching-class-11")}>
            Class 11 Programs →
          </button>
          <button className="btn-success" onClick={() => navigate("/neet/online-coaching-class-12")}>
            Class 12 Programs →
          </button>
        </div>
      </div>

      {/* Layout concept explain karna hai yahan bhi */}
      <div className="layout-explainer">
        <p className="explainer-title">🔍 Yahan kya ho raha hai?</p>
        <p className="explainer-text">
          Upar ka Header aur neeche ka Footer — dono Layout component mein hain.
          Ye page sirf Outlet ki jagah render hua hai. Navigate karo —
          Header aur Footer wahin rahenge, sirf ye area badlega.
        </p>
        <div className="explainer-diagram">
          <div className="diagram-header">Header (Layout)</div>
          <div className="diagram-outlet">← Outlet — Tum yahan ho (Landing)</div>
          <div className="diagram-footer">Footer (Layout)</div>
        </div>
      </div>
    </div>
  );
}

function Class11Program() {
  const navigate = useNavigate();

  const courses = [
    { name: "Physics Foundation", duration: "12 months", students: "2,400+" },
    { name: "Chemistry Basics",   duration: "12 months", students: "2,100+" },
    { name: "Biology Mastery",    duration: "12 months", students: "1,900+" },
  ];

  return (
    <div className="page-container">
      <div className="page-header-section">
        <h2 className="page-title">📚 NEET Programs — Class 11</h2>
        <p className="page-subtitle">
          Class 11 se shuruaat karo — strong foundation banao
        </p>
      </div>

      <div className="course-grid">
        {courses.map((course, i) => (
          <div key={i} className="course-card">
            <p className="course-name">{course.name}</p>
            <p className="course-meta">⏱ {course.duration}</p>
            <p className="course-meta">👥 {course.students} students</p>
            <button className="btn-primary" style={{ marginTop: "10px", width: "100%" }}>
              Enroll Now
            </button>
          </div>
        ))}
      </div>

      <div className="btn-row" style={{ marginTop: "20px" }}>
        <button className="btn-gray" onClick={() => navigate("/")}>← Home</button>
        <button className="btn-success" onClick={() => navigate("/neet/online-coaching-class-12")}>
          Class 12 Programs →
        </button>
      </div>

      <div className="note" style={{ marginTop: "16px" }}>
        Outlet mein sirf ye content hai. Header + Footer Layout se aa rahe hain.
        Navigate karo — wo hamesha same rahenge.
      </div>
    </div>
  );
}

function Class12Program() {
  // useNavigate() — programmatically navigate karne ke liye
  // Link component ke bajaaye button se navigate karna ho to ye use karo
  const navigate = useNavigate();

  const courses = [
    { name: "Physics Advanced",   duration: "10 months", students: "3,200+" },
    { name: "Chemistry Advanced", duration: "10 months", students: "2,800+" },
    { name: "Biology Advanced",   duration: "10 months", students: "2,600+" },
  ];

  function redirectUser() {
    // useNavigate() se programmatically home pe bhejo
    navigate("/");
  }

  return (
    <div className="page-container">
      <div className="page-header-section">
        <h2 className="page-title">🎯 NEET Programs — Class 12</h2>
        <p className="page-subtitle">
          Class 12 wale — final push ke liye taiyar ho jao
        </p>
      </div>

      <div className="course-grid">
        {courses.map((course, i) => (
          <div key={i} className="course-card">
            <p className="course-name">{course.name}</p>
            <p className="course-meta">⏱ {course.duration}</p>
            <p className="course-meta">👥 {course.students} students</p>
            <button className="btn-primary" style={{ marginTop: "10px", width: "100%" }}>
              Enroll Now
            </button>
          </div>
        ))}
      </div>

      <div className="btn-row" style={{ marginTop: "20px" }}>
        {/*
          navigate('/') → programmatic navigation
          useNavigate() se call kar rahe hain onClick pe.
          Link vs useNavigate:
            Link   → JSX mein anchor tag ki tarah use karo
            navigate() → function ke andar, condition ke baad, redirect ke liye
        */}
        <button className="btn-gray" onClick={redirectUser}>
          ← Home pe Jao (useNavigate)
        </button>
        <button className="btn-primary" onClick={() => navigate("/neet/online-coaching-class-11")}>
          Class 11 Dekhna Hai
        </button>
      </div>

      <div className="note" style={{ marginTop: "16px" }}>
        redirectUser() mein navigate('/') call hoga — Link nahi use kiya.
        Event handlers mein useNavigate() use karo.
      </div>
    </div>
  );
}

function ErrorPage() {
  const navigate  = useNavigate();
  const location  = useLocation();

  return (
    <div className="page-container" style={{ textAlign: "center" }}>
      <p style={{ fontSize: "4rem" }}>🔍</p>
      <h2 className="page-title">404 — Page Not Found</h2>
      <p className="page-subtitle">
        <code style={{ background: "#f1f5f9", padding: "2px 8px", borderRadius: 4 }}>
          {location.pathname}
        </code>
        {" "}— ye path exist nahi karta.
      </p>
      <div className="btn-row" style={{ justifyContent: "center", marginTop: "20px" }}>
        <button className="btn-primary" onClick={() => navigate("/")}>
          Home pe Jao
        </button>
      </div>
      <div className="note" style={{ marginTop: "20px", textAlign: "left" }}>
        Route mein "*" wildcard hai — koi bhi unknown path yahan aata hai.
        Hamesha routes mein last mein rakho * wala route.
      </div>
    </div>
  );
}


export default App;