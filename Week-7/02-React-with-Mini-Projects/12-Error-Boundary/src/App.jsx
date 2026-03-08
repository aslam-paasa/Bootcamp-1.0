/**
 * ============================================================
 * TOPIC: Error Boundary
 * ============================================================
 *
 * Pehle problem samjho.
 *
 * ============================================================
 * PROBLEM — Ek component crash kare to poora app band ho jaata hai
 * ============================================================
 * Maan lo tumhare page pe 5 cards hain. Har card ek alag
 * component hai. Pehle card mein koi error aa gayi — jaise
 * API se data nahi aaya, ya koi unexpected value aayi.
 *
 * Bina Error Boundary ke kya hoga?
 * Pehle card ki error puri application ko crash kar degi.
 * White screen aa jaayegi. Baaki ke 4 cards bhi nahi dikhenge.
 * User ko kuch samajh nahi aayega ki kya hua.
 *
 * Real world mein ye bahut bura experience hai.
 *
 * ============================================================
 * SOLUTION — Error Boundary
 * ============================================================
 * Error Boundary ek React component hai jo apne andar ke
 * (child) components ki errors pakad leta hai aur ek
 * fallback UI dikhata hai — poora app crash nahi hota.
 *
 * Analogy: Circuit breaker ki tarah — ghar mein ek room ki
 * wiring mein fault aaye to sirf us room ki light jaati hai,
 * poora ghar dark nahi hota.
 *
 * ============================================================
 * IMPORTANT — Error Boundary sirf Class Component mein hai
 * ============================================================
 * Ye React ka ek exception hai. Hooks (useState, useEffect)
 * sirf function components mein hain. Lekin Error Boundary
 * ke liye do lifecycle methods chahiye jo SIRF class
 * components mein milti hain:
 *
 *   a. static getDerivedStateFromError(error)
 *      → Error aane pe state update karo (hasError: true)
 *      → Isse fallback UI render hogi
 *
 *   b. componentDidCatch(error, errorInfo)
 *      → Error aur uski details console mein log karo
 *      → Production mein Sentry jaise tools ko bhej sakte hain
 *
 * Ye dono methods abhi tak hooks mein available nahi hain.
 * Isliye Error Boundary hamesha class component hoga.
 *
 * ============================================================
 * KAHAN WRAP KARO?
 * ============================================================
 * Tum apni choice se decide karte ho ki kitna wrap karna hai:
 *
 *   Option 1 — Poori app ek saath:
 *     <ErrorBoundary>
 *       <App />
 *     </ErrorBoundary>
 *     → Koi bhi crash hua to ek generic "Something went wrong"
 *
 *   Option 2 — Har section alag wrap karo:
 *     <ErrorBoundary>
 *       <Card1 />         ← sirf ye crash hogi
 *     </ErrorBoundary>
 *     <ErrorBoundary>
 *       <Card2 />         ← ye safe rahegi
 *     </ErrorBoundary>
 *     → Crash hone wala component fallback dikhayega,
 *       baaki sab normal chalte rahenge
 *
 *   Option 2 better hai for production apps.
 *
 * ============================================================
 * ERROR BOUNDARY KYA NAHI PAKADTA?
 * ============================================================
 * Error Boundary SIRF rendering errors pakadta hai.
 * Ye nahi pakadta:
 *   - Event handlers ke errors  (onClick mein error)
 *   - Async code ke errors      (setTimeout, fetch)
 *   - Server side rendering errors
 *   - Error Boundary khud ki errors
 *
 * In cases ke liye try/catch use karo.
 * ============================================================
 */

import React, { useState } from "react";
import "./App.css";


/**
 * ============================================================
 * ERROR BOUNDARY CLASS COMPONENT
 * ============================================================
 * Ye ek reusable component hai. Jahan bhi use karo, iske
 * andar ke components ki errors ye pakad lega.
 *
 * State: { hasError: false }
 *   → false: sab theek hai, children render karo
 *   → true:  error aayi, fallback UI dikhao
 *
 * Flow:
 *   Child mein error →
 *   getDerivedStateFromError() → hasError: true →
 *   componentDidCatch() → console log →
 *   render() → fallback UI dikhao
 * ============================================================
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    // hasError: false → sab normal hai
    // hasError: true  → error aayi, fallback dikhao
    this.state = { hasError: false, errorMessage: "" };
  }

  // Step 1 — Ye pehle chalta hai
  // Child component mein error aate hi React ye method call karta hai
  // Jo bhi return karo wo state mein merge ho jaata hai
  // Isse render() mein hasError: true milega → fallback UI dikhegi
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      errorMessage: error.message,
    };
  }

  // Step 2 — getDerivedStateFromError ke baad chalta hai
  // Yahan error ko log kar sakte hain — console mein ya Sentry pe
  // Production apps mein ye important hai debugging ke liye
  componentDidCatch(error, errorInfo) {
    console.log("Error Boundary ne error pakdi:");
    console.log("Error:", error.message);
    console.log("Component stack:", errorInfo.componentStack);
  }

  // Step 3 — Render
  // hasError true hai → fallback dikhao (children nahi)
  // hasError false hai → children normally render karo
  render() {
    if (this.state.hasError) {
      // Agar parent ne custom fallback diya hai to wo dikhao
      // Warna default fallback use karo
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="error-fallback">
          <p className="error-fallback-icon">⚠️</p>
          <p className="error-fallback-title">Kuch galat ho gaya</p>
          <p className="error-fallback-msg">{this.state.errorMessage}</p>
          <button
            className="btn-primary"
            onClick={() => this.setState({ hasError: false, errorMessage: "" })}
          >
            Dobara Try Karo
          </button>
        </div>
      );
    }

    // Koi error nahi — children normally render karo
    return this.props.children;
  }
}


/**
 * ============================================================
 * DEMO 1 — Bina Error Boundary ke (Poora App Crash)
 * ============================================================
 * Yahan BuggyCard mein throw new Error() hai.
 * Koi Error Boundary nahi — poora section crash ho jaayega.
 *
 * NOTE: React dev mode mein bhi error overlay aayega — wo
 * normal hai. Overlay band karo to fallback dikhega.
 * ============================================================
 */
function Demo1_NoBoundary() {
  const [showBuggy, setShowBuggy] = useState(false);

  return (
    <div className="section">
      <p className="section-title">Demo 1 — Bina Error Boundary ke</p>
      <p>
        Button dabao — BuggyCard crash hogi aur ye poora section
        band ho jaayega. SafeCard bhi nahi dikhegi.
      </p>

      <div className="btn-row">
        <button className="btn-danger" onClick={() => setShowBuggy(true)}>
          BuggyCard Mount Karo (Crash Hogi)
        </button>
        <button className="btn-gray" onClick={() => setShowBuggy(false)}>
          Reset
        </button>
      </div>

      {/* Koi ErrorBoundary nahi — crash hogi to saath mein SafeCard bhi jaayegi */}
      {showBuggy && <BuggyCard />}
      <SafeCard label="Safe Card (crash hone pe ye bhi gayab ho jaayegi)" color="blue" />

      <div className="note note-error">
        BuggyCard crash hogi to SafeCard bhi screen se gayab ho jaayegi.
        Ye Error Boundary ke bina ki problem hai.
      </div>
    </div>
  );
}


/**
 * ============================================================
 * DEMO 2 — Error Boundary ke saath (Sirf Buggy Part Crash)
 * ============================================================
 * Ab BuggyCard ko ErrorBoundary mein wrap kiya hai.
 * SafeCard alag ErrorBoundary mein hai.
 *
 * BuggyCard crash hogi → sirf uski ErrorBoundary fallback
 * dikhayegi → SafeCard bilkul theek chalti rahegi.
 * ============================================================
 */
function Demo2_WithBoundary() {
  const [showBuggy, setShowBuggy] = useState(false);

  return (
    <div className="section">
      <p className="section-title">Demo 2 — Error Boundary ke saath ✅</p>
      <p>
        Ab BuggyCard ErrorBoundary mein wrap hai. Crash hogi to
        sirf uski jagah fallback dikhega — SafeCard safe rahegi.
      </p>

      <div className="btn-row">
        <button className="btn-danger" onClick={() => setShowBuggy(true)}>
          BuggyCard Mount Karo
        </button>
        <button className="btn-gray" onClick={() => setShowBuggy(false)}>
          Reset
        </button>
      </div>

      <div className="cards-row">
        {/*
          BuggyCard ko ErrorBoundary mein wrap kiya — crash hogi
          to sirf is boundary ka fallback dikhega, baaki safe
        */}
        <ErrorBoundary>
          {showBuggy && <BuggyCard />}
          {!showBuggy && <PlaceholderCard label="BuggyCard yahan aayegi" />}
        </ErrorBoundary>

        {/*
          SafeCard apni alag ErrorBoundary mein — BuggyCard ke
          crash se ye bilkul affected nahi hogi
        */}
        <ErrorBoundary>
          <SafeCard label="Safe Card" color="blue" />
        </ErrorBoundary>
      </div>

      <div className="note note-success">
        BuggyCard crash hone ke baad bhi SafeCard chal rahi hai.
        Circuit breaker ki tarah — ek room ki light gayi, baki ghar safe.
      </div>
    </div>
  );
}


/**
 * ============================================================
 * DEMO 3 — Custom Fallback UI
 * ============================================================
 * ErrorBoundary ko `fallback` prop pass kar sakte hain.
 * Har component ka apna alag, custom fallback ho sakta hai.
 *
 * Jaise:
 *   - Profile card crash → "Profile load nahi ho saka"
 *   - Payment card crash → "Payment service down hai, baad mein try karo"
 *   - News feed crash    → "News load nahi ho saka, refresh karo"
 * ============================================================
 */
function Demo3_CustomFallback() {
  const [crashProfile, setCrashProfile] = useState(false);
  const [crashPayment, setCrashPayment] = useState(false);

  return (
    <div className="section">
      <p className="section-title">Demo 3 — Custom Fallback UI</p>
      <p>
        Har ErrorBoundary ka apna alag custom fallback hai —
        generic "Something went wrong" nahi.
      </p>

      <div className="btn-row">
        <button className="btn-danger" onClick={() => setCrashProfile(true)}>
          Profile Crash Karo
        </button>
        <button className="btn-danger" onClick={() => setCrashPayment(true)}>
          Payment Crash Karo
        </button>
        <button
          className="btn-gray"
          onClick={() => { setCrashProfile(false); setCrashPayment(false); }}
        >
          Reset
        </button>
      </div>

      <div className="cards-row" style={{ marginTop: "14px" }}>
        {/* Profile card — apna custom fallback */}
        <ErrorBoundary
          fallback={
            <div className="error-fallback">
              <p className="error-fallback-icon">👤</p>
              <p className="error-fallback-title">Profile load nahi hua</p>
              <p className="error-fallback-msg">Check karo ki aap login hain</p>
            </div>
          }
        >
          {crashProfile ? <CrashingComponent /> : <SafeCard label="Profile Card" color="green" />}
        </ErrorBoundary>

        {/* Payment card — apna alag custom fallback */}
        <ErrorBoundary
          fallback={
            <div className="error-fallback">
              <p className="error-fallback-icon">💳</p>
              <p className="error-fallback-title">Payment service down hai</p>
              <p className="error-fallback-msg">Kuch der baad dobara try karo</p>
            </div>
          }
        >
          {crashPayment ? <CrashingComponent /> : <SafeCard label="Payment Card" color="purple" />}
        </ErrorBoundary>
      </div>

      <div className="note">
        Har boundary ka fallback alag hai — user ko exact situation
        ke hisaab se message milta hai.
      </div>
    </div>
  );
}


/**
 * ============================================================
 * DEMO 4 — Error Boundary kya NAHI pakadta
 * ============================================================
 * Error Boundary sirf rendering errors pakadta hai.
 *
 * Event handler mein error (onClick) → Error Boundary nahi
 * pakadega — try/catch use karo.
 *
 * Async errors (setTimeout, fetch) → Error Boundary nahi
 * pakadega — try/catch ya .catch() use karo.
 * ============================================================
 */
function Demo4_WhatBoundaryMisses() {
  const [eventError, setEventError]   = useState("");
  const [asyncError, setAsyncError]   = useState("");

  function handleEventError() {
    try {
      // ❌ Error Boundary ye nahi pakdega — event handler mein hai
      // ✅ try/catch se pakad rahe hain
      throw new Error("Event handler mein error aayi!");
    } catch (err) {
      setEventError(err.message);
    }
  }

  function handleAsyncError() {
    setTimeout(() => {
      try {
        // ❌ Error Boundary ye bhi nahi pakdega — async hai
        // ✅ try/catch se pakad rahe hain
        throw new Error("Async code mein error aayi!");
      } catch (err) {
        setAsyncError(err.message);
      }
    }, 500);
  }

  return (
    <div className="section">
      <p className="section-title">Demo 4 — Error Boundary kya Nahi Pakadta</p>
      <p>
        In cases ke liye Error Boundary kaam nahi karta —
        try/catch use karna padta hai.
      </p>

      <div className="btn-row">
        <button className="btn-primary" onClick={handleEventError}>
          Event Handler Error (try/catch se pakdo)
        </button>
        <button className="btn-primary" onClick={handleAsyncError}>
          Async Error (try/catch se pakdo)
        </button>
      </div>

      {eventError && (
        <div className="note note-warning" style={{ marginTop: "10px" }}>
          Event error pakdi try/catch se: <strong>{eventError}</strong>
        </div>
      )}
      {asyncError && (
        <div className="note note-warning" style={{ marginTop: "10px" }}>
          Async error pakdi try/catch se: <strong>{asyncError}</strong>
        </div>
      )}

      <div className="note note-error" style={{ marginTop: "10px" }}>
        Error Boundary sirf render ke time ki errors pakadta hai.
        onClick, setTimeout, fetch — inke liye try/catch use karo.
      </div>
    </div>
  );
}


/**
 * ============================================================
 * HELPER COMPONENTS
 * ============================================================
 */

// Ye component hamesha crash karta hai — render hote hi error throw
function BuggyCard() {
  throw new Error("BuggyCard: API se data nahi aaya!");
  // ye line kabhi execute nahi hogi — sirf IDE warning rokne ke liye
  return null;
}

// Intentionally crash karne wala generic component
function CrashingComponent() {
  throw new Error("Component crash ho gaya!");
  return null;
}

// Ye component safely render hota hai
function SafeCard({ label, color }) {
  const colors = {
    blue:   { bg: "#eff6ff", border: "#3b82f6", text: "#1d4ed8" },
    green:  { bg: "#f0fdf4", border: "#22c55e", text: "#15803d" },
    purple: { bg: "#faf5ff", border: "#a855f7", text: "#7e22ce" },
  };
  const c = colors[color] || colors.blue;

  return (
    <div
      className="demo-card"
      style={{ background: c.bg, borderColor: c.border, color: c.text }}
    >
      <p className="demo-card-title">✅ {label}</p>
      <p className="demo-card-body">Ye component sahi se render ho raha hai</p>
    </div>
  );
}

// Placeholder jab BuggyCard mount nahi hui
function PlaceholderCard({ label }) {
  return (
    <div className="demo-card" style={{ background: "#f8fafc", borderColor: "#e2e8f0" }}>
      <p className="demo-card-title" style={{ color: "#94a3b8" }}>{label}</p>
      <p className="demo-card-body" style={{ color: "#cbd5e1" }}>Button dabao mount karne ke liye</p>
    </div>
  );
}


/**
 * ============================================================
 * APP
 * ============================================================
 */
function App() {
  return (
    <div className="app">
      <h1>Error Boundary</h1>
      <Demo1_NoBoundary />
      <Demo2_WithBoundary />
      <Demo3_CustomFallback />
      <Demo4_WhatBoundaryMisses />
    </div>
  );
}

export default App;