/**
 * ============================================================
 * TOPIC: useRef Hook
 * ============================================================
 *
 * Pehle problem samjho, phir hook samajh aayega.
 * Har React hook kisi na kisi problem ko solve karne ke liye
 * banaya gaya hai. useRef bhi aisa hi hai.
 *
 * ============================================================
 * PROBLEM 1 — Plain Variable Reset Ho Jaata Hai
 * ============================================================
 * Scenario: User ne form mein apna naam type kiya. Hum track
 * karna chahte hain kitne characters type hue abhi tak —
 * sirf console mein log karne ke liye, screen pe dikhana nahi.
 *
 * function App() {
 *   let money = 0;
 *
 *   function increment() {
 *     money = money + 1;
 *     console.log(money);
 *   }
 *
 *   return <button onClick={increment}>Click</button>;
 * }
 *
 * Lagta hai ye kaam karega. Console mein bhi dikhega.
 * Lekin ek problem hai.
 *
 * Agar component kisi aur wajah se re-render hua — jaise
 * parent component ne kuch update kiya — tab ye function
 * dobara chalega aur let money = 0 phir se execute hoga.
 * money reset ho jayega. Pehle ki koi value nahi bachegi.
 *
 * Plain variable render ke beech survive nahi karta.
 * ============================================================
 *
 * ============================================================
 * PROBLEM 2 — useState Har Baar Re-render Karta Hai
 * ============================================================
 * function App() {
 *   const [money, setMoney] = useState(0);
 *
 *   function increment() {
 *     setMoney(money + 1);
 *   }
 *
 *   return <button>Money: {money}</button>;
 * }
 *
 * Ab money survive karega re-renders ke beech. ✅
 * Lekin ek naya problem aa gaya.
 *
 * Hum sirf background mein track karna chahte the — screen
 * pe dikhana nahi tha. Lekin setMoney call hote hi React
 * pura component dobara render karega. Har ek change pe
 * ek re-render. Ye bahut zyada hai ek simple background
 * tracking ke liye.
 *
 * Hume kuch chahiye jo:
 *   ✅ Value ko re-renders ke beech yaad rakhe
 *   ✅ Value change karne pe re-render NA kare
 * ============================================================
 *
 * ============================================================
 * PROBLEM 3 — DOM Ko Direct Touch Karna
 * ============================================================
 * Kabhi kabhi hume directly kisi HTML element ke saath kaam
 * karna hota hai — jaise input pe focus karna.
 *
 * JavaScript ka tarika:
 *   document.getElementById("myInput").focus()
 *
 * Ye kaam karta hai, lekin React mein ye galat hai.
 * id global hoti hai. Do components mein same id ho to
 * conflict hoga. Aur React ko pata nahi chalta ki tumne
 * DOM directly touch kiya — uski apni copy out of sync
 * ho jaati hai.
 * ============================================================
 *
 * ============================================================
 * SOLUTION — useRef
 * ============================================================
 * useRef ek CHOTI SI DIBBI hai jo tumhari pocket mein rehti hai.
 *
 * Is dibbi mein tum kuch bhi rakh sakte ho:
 *   - Number   (jaise money count)
 *   - String   (jaise naam)
 *   - Timer ID (jaise setInterval ki ID)
 *   - HTML element (jaise input box)
 *
 * DIBBI KHAS KYUN HAI?
 *   1. Dibbi render ke beech survive karti hai — reset nahi hoti
 *   2. Dibbi mein kuch rakho to screen update nahi hoti
 *   3. HTML element pe ref laga do — React khud connect kar deta hai
 *
 * SYNTAX:
 *   const meriDibbi = useRef(0);
 *   // meriDibbi = { current: 0 }
 *
 *   Value access: meriDibbi.current
 *   Value update: meriDibbi.current = nayiValue
 *
 * Do use cases hain:
 *   A. DOM element pakadna (getElementById ki jagah)
 *   B. Background mein value store karna (bina re-render ke)
 * ============================================================
 */

import { useRef, useState, useEffect } from "react";
import "./App.css";


/**
 * ============================================================
 * PART 1 — useState vs useRef Side-by-Side
 * ============================================================
 * Sabse pehle dono ka direct comparison dekho taaki fark
 * crystal clear ho jaye.
 *
 * useState (TV ki tarah):
 *   - Value change karo → screen pe immediately dikhega
 *   - Har update pe component re-render hoga
 *
 * useRef (Dibbi ki tarah):
 *   - Value change karo → screen pe nahi dikhega
 *   - Koi re-render nahi hoga
 *   - Value safely stored rehti hai background mein
 *
 * Is example mein ek button dono ko ek saath increment karta hai.
 * Dekho useState wali value screen pe update hoti hai,
 * useRef wali nahi — lekin console mein dono badh rahe hain.
 * ============================================================
 */
function UseStateVsUseRef() {
  const [stateCount, setStateCount] = useState(0);
  const refCount = useRef(0);

  function incrementBoth() {
    // useState — ye screen update karega
    setStateCount(prev => prev + 1);

    // useRef — ye silently background mein update hoga
    refCount.current = refCount.current + 1;

    console.log("useState value:", stateCount + 1);
    console.log("useRef value:", refCount.current);
  }

  return (
    <div className="section">
      <p className="section-title">Part 1 — useState vs useRef Side-by-Side</p>
      <p>Dono ko ek saath increment karo — fark dekhna.</p>

      <div className="compare-grid">
        {/* useState column */}
        <div className="compare-box compare-blue">
          <p className="compare-label">useState — TV 📺</p>
          <p className="compare-value">{stateCount}</p>
          <p className="compare-hint">Har update par screen change hoti hai</p>
        </div>

        {/* useRef column */}
        <div className="compare-box compare-orange">
          <p className="compare-label">useRef — Dibbi 📦</p>
          {/*
            refCount.current yahan screen pe update nahi hoga.
            Kyunki useRef re-render trigger nahi karta.
            Value change ho rahi hai — React ko pata nahi chal raha.
          */}
          <p className="compare-value">{refCount.current}</p>
          <p className="compare-hint">Value badh rahi hai — screen nahi badlegi</p>
        </div>
      </div>

      <div className="btn-row">
        <button className="btn-primary" onClick={incrementBoth}>
          Dono Increment Karo
        </button>
      </div>

      <div className="note">
        Console check karo (F12) — useRef khud screen update nahi karta.
        incrementBoth function mein useState aur useRef dono update ho rahe hain, lekin re-render sirf useState trigger karta hai.
        Is re-render ke time React updated ref.current value ko screen pe read karke dikha deta hai.
        Isliye useRef UI update ke liye nahi, background storage ke liye use hota hai. 
      </div>
    </div>
  );
}


/**
 * ============================================================
 * PART 2 — Normal Variable ka Problem
 * ============================================================
 * Normal let variable aur useRef ka fark side-by-side dekhte hain.
 *
 * Normal variable ka problem:
 *   let money = 0  → ye line har re-render pe dobara chalti hai
 *   To money wapas 0 ho jaata hai. Pehle ki value kho jaati hai.
 *
 * useRef ka solution:
 *   const refMoney = useRef(0)
 *   refMoney.current re-render ke beech survive karta hai.
 *   React isko "dibbi" ki tarah yaad rakhta hai.
 *
 * TRY KARO:
 *   1. Normal increment karo → console mein 1, 2, 3 dikhega
 *   2. Re-render button dabao → normal variable 0 ho jaayega
 *   3. Ref increment karo → re-render ke baad bhi value safe!
 * ============================================================
 */
function NormalVariableProblem() {
  const [renderTrigger, setRenderTrigger] = useState(0);

  // ❌ Ye variable har re-render pe reset ho jaata hai
  let normalMoney = 0;

  // ✅ Ye re-render ke beech survive karta hai
  const refMoney = useRef(0);

  function incrementNormal() {
    normalMoney = normalMoney + 1;
    console.log("💰 Normal money:", normalMoney);
  }

  function incrementRef() {
    refMoney.current = refMoney.current + 1;
    console.log("📦 Ref money:", refMoney.current);
  }

  function reRender() {
    // Sirf re-render trigger karne ke liye state change kar rahe hain
    setRenderTrigger(prev => prev + 1);
  }

  return (
    <div className="section">
      <p className="section-title">Part 2 — Normal Variable ka Problem</p>
      <p>Re-render button dabao — normal variable reset ho jaata hai, ref nahi.</p>

      <div className="compare-grid">
        {/* Normal variable */}
        <div className="compare-box compare-red">
          <p className="compare-label">Normal Variable ❌</p>
          <p className="compare-value">{normalMoney}</p>
          <button className="btn-danger" onClick={incrementNormal}>Increment</button>
          <p className="compare-hint">Re-render pe 0 ho jaayega!</p>
        </div>

        {/* useRef */}
        <div className="compare-box compare-green">
          <p className="compare-label">useRef ✅</p>
          <p className="compare-value">{refMoney.current}</p>
          <button className="btn-success" onClick={incrementRef}>Increment</button>
          <p className="compare-hint">Re-render ke baad bhi value safe!</p>
        </div>
      </div>

      <div className="btn-row" style={{ marginTop: "14px" }}>
        <button className="btn-gray" onClick={reRender}>
          🔄 Re-Render Karo
        </button>
      </div>

      <div className="note note-warning">
        Steps: Normal ko 3 baar increment karo → Re-render dabao → 0 ho gaya.
        Phir Ref ko 3 baar karo → Re-render dabao → value safe hai!
      </div>
    </div>
  );
}


/**
 * ============================================================
 * PART 3 — Timer Store: let vs useState vs useRef
 * ============================================================
 * setInterval() ek ID return karta hai. Timer rokne ke liye
 * ye ID clearInterval() ko deni hoti hai.
 *
 * Ye ID kahan store karein? Teen options hain:
 *
 * Option A — let variable:
 *   let timer = null
 *   Re-render pe timer = null reset ho jayega.
 *   clearInterval(null) kuch nahi karega. Stop kaam nahi karega.
 *
 * Option B — useState:
 *   const [timer, setTimer] = useState(null)
 *   ID store to hogi lekin setTimer call karne pe re-render hoga.
 *   Timer ke liye ye unnecessary render hai.
 *
 * Option C — useRef:  ✅ BEST
 *   const timerRef = useRef(null)
 *   ID store hogi, koi re-render nahi. Perfect.
 * ============================================================
 */


/**
 * OPTION A — let variable se timer ❌
 * Stop button kaam nahi karega kyunki re-render pe
 * timer ID kho jaati hai (let variable reset ho gaya).
 */
function TimerWithLet() {
  const [count, setCount] = useState(0);
  let timer = null; // ❌ har render pe null ho jaata hai

  function startTimer() {
    timer = setInterval(() => {
      setCount(c => c + 1); // ye re-render trigger karega
    }, 1000);
    console.log("Timer ID (let mein):", timer);
  }

  function stopTimer() {
    // ❌ timer yahan null hai — re-render ke baad ID kho gayi
    console.log("Stop try kiya, timer ID:", timer);
    clearInterval(timer); // kuch nahi hoga
  }

  return (
    <div className="section">
      <p className="section-title">Part 3A — Timer with let ❌</p>
      <p>Start karo, phir Stop karo — timer nahi rukega.</p>
      <div className="clock-display">{count}</div>
      <div className="btn-row">
        <button className="btn-success" onClick={startTimer}>Start</button>
        <button className="btn-danger" onClick={stopTimer}>Stop (nahi rukega)</button>
      </div>
      <div className="note note-error">
        Kyun fail hota hai: setCount → re-render → let timer = null reset →
        clearInterval(null) → timer chalta rehta hai
      </div>
    </div>
  );
}


/**
 * OPTION B — useState se timer ⚠️
 * Stop kaam karega lekin setTimer call hone pe
 * ek extra unnecessary re-render hoga.
 * Timer management ke liye ye waste hai.
 */
function TimerWithUseState() {
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(null); // ⚠️ re-render trigger karega
  const [renders, setRenders] = useState(0);

  useEffect(() => {
    // Har render pe count karo
    setRenders(r => r + 1);
  });

  function startTimer() {
    const id = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    setTimer(id); // ⚠️ ye line ek extra re-render trigger karegi
  }

  function stopTimer() {
    clearInterval(timer);
    setTimer(null); // ⚠️ ye bhi extra re-render
  }

  return (
    <div className="section">
      <p className="section-title">Part 3B — Timer with useState ⚠️</p>
      <p>Kaam karta hai — lekin unnecessary extra renders hote hain.</p>
      <div className="clock-display">{count}</div>
      <p className="render-counter">Total renders: <strong>{renders}</strong></p>
      <div className="btn-row">
        <button className="btn-success" onClick={startTimer} disabled={!!timer}>Start</button>
        <button className="btn-danger" onClick={stopTimer} disabled={!timer}>Stop</button>
      </div>
      <div className="note note-warning">
        Dekho renders count — setTimer call pe extra renders ho rahe hain jo
        sirf timer ID store karne ke liye waste hain.
      </div>
    </div>
  );
}


/**
 * OPTION C — useRef se timer ✅
 * ID survive karti hai re-renders ke beech.
 * Koi unnecessary re-render nahi.
 * Ye sahi tarika hai.
 */
function TimerWithUseRef() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [renders, setRenders] = useState(0);
  const timerRef = useRef(null); // ✅ ID yahan safe rahegi

  useEffect(() => {
    setRenders(r => r + 1);
  });

  function startTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    // ✅ timerRef.current = ID — koi re-render nahi hua
    setIsRunning(true);
  }

  function stopTimer() {
    clearInterval(timerRef.current);
    timerRef.current = null; // ✅ koi re-render nahi hua
    setIsRunning(false);
  }

  function resetTimer() {
    stopTimer();
    setCount(0);
  }

  return (
    <div className="section">
      <p className="section-title">Part 3C — Timer with useRef ✅</p>
      <p>ID survive karti hai. Stop kaam karta hai. Extra renders nahi.</p>
      <div className="clock-display">{count}</div>
      <p className="render-counter">Total renders: <strong>{renders}</strong></p>
      <div className="btn-row">
        <button className="btn-success" onClick={startTimer} disabled={isRunning}>Start</button>
        <button className="btn-danger" onClick={stopTimer} disabled={!isRunning}>Stop</button>
        <button className="btn-gray" onClick={resetTimer}>Reset</button>
      </div>
      <div className="note note-success">
        Renders count compare karo 3B se — useRef se extra renders nahi hote
        kyunki timerRef.current = id koi re-render trigger nahi karta.
      </div>
    </div>
  );
}


/**
 * ============================================================
 * PART 4 — Stopwatch — Real World Example
 * ============================================================
 * Ab tak humne timer management dekhi. Ye complete stopwatch
 * hai jisme sab kuch ek saath use hota hai.
 *
 * useRef ka role:
 *   intervalRef.current mein setInterval ki ID store hai.
 *   Stop pe clearInterval(intervalRef.current) se safely rukta hai.
 *   Koi unnecessary re-render nahi.
 *
 * History bhi track ho rahi hai — Start/Stop/Reset kab hua.
 * ============================================================
 */
function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [history, setHistory] = useState([]);
  const intervalRef = useRef(null);

  function start() {
    if (isRunning) return;
    intervalRef.current = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);
    setIsRunning(true);
    setHistory(prev => [...prev, `▶ Started`]);
  }

  function stop() {
    if (!isRunning) return;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
    setHistory(prev => [...prev, `⏸ Stopped at ${time}s`]);
  }

  function reset() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
    setTime(0);
    setHistory(prev => [...prev, `↺ Reset`]);
  }

  const minutes = String(Math.floor(time / 60)).padStart(2, "0");
  const seconds = String(time % 60).padStart(2, "0");

  return (
    <div className="section">
      <p className="section-title">Part 4 — Stopwatch (Real World)</p>

      <div className="stopwatch-time">{minutes}:{seconds}</div>

      <div className="btn-row">
        <button className="btn-success" onClick={start} disabled={isRunning}>Start</button>
        <button className="btn-danger" onClick={stop} disabled={!isRunning}>Stop</button>
        <button className="btn-gray" onClick={reset}>Reset</button>
      </div>

      <span className={`status-badge ${isRunning ? "status-running" : "status-stopped"}`}>
        {isRunning ? "Chal raha hai ⏱" : "Ruka hua hai ⏸"}
      </span>

      <div className="history-box">
        <div className="history-header">
          <p className="history-title">History</p>
          <button className="btn-gray" onClick={() => setHistory([])}>Clear</button>
        </div>
        <ul className="history-list">
          {history.length === 0
            ? <li className="history-empty">Abhi koi action nahi hua</li>
            : history.map((item, i) => <li key={i}>{item}</li>)
          }
        </ul>
      </div>

      <div className="note">
        intervalRef.current mein timer ID store hai — silently, bina re-render ke
      </div>
    </div>
  );
}


/**
 * ============================================================
 * PART 5 — DOM Access: getElementById vs useRef
 * ============================================================
 * Kabhi kabhi hume directly input element ko touch karna hota
 * hai — jaise focus karna, background change karna.
 *
 * getElementById ka problem:
 *   - id global hoti hai — do components same id use karein to
 *     dono mein se koi bhi element pakda ja sakta hai
 *   - React ko pata nahi chalta tumne DOM touch kiya
 *
 * useRef ka solution:
 *   - ref component ke andar scoped hoti hai — koi conflict nahi
 *   - React friendly approach
 * ============================================================
 */


/**
 * getElementById — Galat Tarika ❌
 */
function DomWithGetElementById() {
  function focusInput() {
    // ❌ Global id — dusra component bhi isko pakad sakta hai
    document.getElementById("nameInput").focus();
    document.getElementById("nameInput").style.backgroundColor = "#fef9c3";
    console.log("getElementById se focus kiya");
  }

  return (
    <div className="section">
      <p className="section-title">Part 5A — getElementById ❌</p>
      <input
        id="nameInput"
        type="text"
        placeholder="Type something..."
      />
      <div className="btn-row">
        <button className="btn-primary" onClick={focusInput}>Focus with getElementById</button>
      </div>
      <div className="note note-error">
        id="nameInput" global hai. Kisi aur component mein bhi same id ho to
        wrong element pakad lega. React ko bhi pata nahi chalta.
      </div>
    </div>
  );
}


/**
 * useRef — Sahi Tarika ✅
 */
function DomWithUseRef() {
  const inputRef = useRef(null);

  function focusInput() {
    // ✅ inputRef sirf is component ka private reference hai
    inputRef.current.focus();
    inputRef.current.style.backgroundColor = "#fef9c3";
    console.log("useRef se focus kiya");
  }

  function clearInput() {
    inputRef.current.value = "";
    inputRef.current.style.backgroundColor = "";
    inputRef.current.focus();
  }

  return (
    <div className="section">
      <p className="section-title">Part 5B — useRef DOM Access ✅</p>
      {/* ref={inputRef} — React is input ko inputRef.current se connect karega */}
      <input
        ref={inputRef}
        type="text"
        placeholder="Type something..."
      />
      <div className="btn-row">
        <button className="btn-primary" onClick={focusInput}>Focus with useRef</button>
        <button className="btn-gray" onClick={clearInput}>Clear</button>
      </div>
      <div className="note note-success">
        inputRef is component ka private ref hai — koi global conflict nahi.
        React friendly approach hai.
      </div>
    </div>
  );
}


/**
 * ============================================================
 * PART 6 — Form Validation — Multiple Refs
 * ============================================================
 *
 * SCENARIO:
 * Ek registration form hai — Naam, Email, Phone.
 * User Submit karta hai. Hum check karte hain:
 *   - Jo field KHALI hai → red border + light red background
 *   - Jo field BHARI hai → green border + light green background
 *
 * USEREF KYUN?
 * Hum sirf styling change kar rahe hain — koi nayi value
 * screen pe nahi dikh rahi, koi re-render nahi chahiye.
 * Seedha DOM element ki style change karna hai.
 *
 * TEEN FIELDS = TEEN ALAG REFS
 *   const nameRef  = useRef()  → sirf naam wala input
 *   const emailRef = useRef()  → sirf email wala input
 *   const phoneRef = useRef()  → sirf phone wala input
 *
 * Ek ref = ek element. Private, scoped, no conflict.
 *
 * HOW IT WORKS:
 *
 * Step 1 — Teen refs banao:
 *   const nameRef  = useRef()   → { current: undefined }
 *   const emailRef = useRef()   → { current: undefined }
 *   const phoneRef = useRef()   → { current: undefined }
 *
 * Step 2 — Har input pe ref attach karo:
 *   <input ref={nameRef}  ... />
 *   <input ref={emailRef} ... />
 *   <input ref={phoneRef} ... />
 *   Ab React ne connect kar diya:
 *     nameRef.current  = pehla input element
 *     emailRef.current = doosra input element
 *     phoneRef.current = teesra input element
 *
 * Step 3 — Submit pe validation:
 *   nameRef.current.value          → user ne jo likha
 *   nameRef.current.style.border   → directly border change karo
 *   nameRef.current.style.backgroundColor → directly bg change
 *
 * IMPORTANT — ref.current pe kya kya available hai:
 *   .value           → input mein jo text likha hai
 *   .style.border    → border change karo
 *   .style.backgroundColor → background change karo
 *   .focus()         → focus karo
 * ============================================================
 */
function FormValidationWithRef() {

  // Step 1 — Teen alag refs
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();

  function validate() {
    // Array mein daalo taaki forEach se loop kar sakein
    // label bhi diya hai taaki console mein clear message aaye
    const fields = [
      { ref: nameRef, label: "Naam" },
      { ref: emailRef, label: "Email" },
      { ref: phoneRef, label: "Phone" },
    ];

    fields.forEach(({ ref, label }) => {
      const value = ref.current.value.trim();

      if (value === "") {
        // ❌ Khali hai — directly DOM pe red styling lagao
        ref.current.style.border = "2px solid #ef4444";
        ref.current.style.backgroundColor = "#fef2f2";
        console.log(`❌ ${label} khali hai`);
      } else {
        // ✅ Bhari hai — directly DOM pe green styling lagao
        ref.current.style.border = "2px solid #22c55e";
        ref.current.style.backgroundColor = "#f0fdf4";
        console.log(`✅ ${label}: "${value}"`);
      }
    });
  }

  function resetForm() {
    const fields = [nameRef, emailRef, phoneRef];
    fields.forEach((ref) => {
      ref.current.value = "";  // input clear karo
      ref.current.style.border = "";  // styling hatao
      ref.current.style.backgroundColor = "";
    });
  }

  return (
    <div className="section">
      <p className="section-title">Part 6 — Form Validation — Multiple Refs</p>
      <p>
        Teen fields, teen alag refs. Submit karo — khali fields red,
        bhari fields green ho jaayengi.
      </p>

      <div className="validation-form">

        <div className="form-field">
          <label className="form-label">Naam</label>
          {/* Step 2 — nameRef sirf is input se connected hai */}
          <input ref={nameRef} type="text" placeholder="Apna naam likho" />
        </div>

        <div className="form-field">
          <label className="form-label">Email</label>
          {/* emailRef sirf is input se connected hai */}
          <input ref={emailRef} type="text" placeholder="email@example.com" />
        </div>

        <div className="form-field">
          <label className="form-label">Phone</label>
          {/* phoneRef sirf is input se connected hai */}
          <input ref={phoneRef} type="text" placeholder="10-digit number" />
        </div>

      </div>

      <div className="btn-row">
        {/* validate() mein ref.current.value check hogi — koi state nahi */}
        <button className="btn-primary" onClick={validate}>Submit</button>
        {/* resetForm() mein ref.current.value = "" directly clear hoga */}
        <button className="btn-gray" onClick={resetForm}>Reset</button>
      </div>

      <div className="note">
        Kuch fields khali chhodo, kuch bharo — phir Submit karo.
        Console mein bhi dekho kya print ho raha hai (F12).
      </div>
    </div>
  );
}


/**
 * ============================================================
 * PART 7 — Auto Focus + Smart Form Navigation
 * ============================================================
 * Real world use cases:
 *
 * 1. Page load pe email field pe cursor seedha aa jaye
 *    taaki user seedha type kar sake. useEffect + useRef.
 *
 * 2. Email valid ho to Enter dabane pe cursor automatically
 *    password field mein jump kare — user ko click nahi karna.
 *
 * 3. Invalid field ko red highlight karo aur focus bhi
 *    wapas uski pe le jao.
 *
 * Ye sab useRef ke bina possible nahi tha easily.
 * getElementById se possible tha lekin React friendly nahi.
 * ============================================================
 */
function AutoFocusForm() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);

  // Page load pe email field pe auto focus
  useEffect(() => {
    emailRef.current.focus();
    console.log("Email field pe auto focus hua");
  }, []);

  function handleEmailNext() {
    const email = emailRef.current.value;

    if (email.includes("@") && email.includes(".")) {
      // ✅ Valid email — password pe focus le jao
      emailRef.current.style.border = "2px solid #22c55e";
      emailRef.current.style.backgroundColor = "#f0fdf4";
      passwordRef.current.focus();
    } else {
      // ❌ Invalid — red karo aur focus wapas email pe
      emailRef.current.style.border = "2px solid #ef4444";
      emailRef.current.style.backgroundColor = "#fef2f2";
      emailRef.current.focus();
    }
  }

  function handleSubmit() {
    const password = passwordRef.current.value;

    if (password.length >= 6) {
      setSubmitted(true);
    } else {
      // ❌ Password short hai — red karo aur focus
      passwordRef.current.style.border = "2px solid #ef4444";
      passwordRef.current.style.backgroundColor = "#fef2f2";
      passwordRef.current.focus();
    }
  }

  if (submitted) {
    return (
      <div className="section">
        <p className="section-title">Part 7 — Auto Focus + Smart Navigation</p>
        <div className="note note-success">
          ✅ Form submit ho gaya!
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <p className="section-title">Part 7 — Auto Focus + Smart Navigation</p>
      <p>Page load pe email pe cursor aa jaata hai. Email valid karo to Next dabao.</p>

      <div className="validation-form">

        <div className="form-field">
          <label className="form-label">Email</label>
          <div className="field-with-btn">
            {/* useEffect mein emailRef.current.focus() call hogi */}
            <input ref={emailRef} type="text" placeholder="email@example.com" />
            <button className="btn-primary" onClick={handleEmailNext}>Next →</button>
          </div>
        </div>

        <div className="form-field">
          <label className="form-label">Password (min 6 chars)</label>
          <div className="field-with-btn">
            <input ref={passwordRef} type="password" placeholder="Password likho" />
            <button className="btn-success" onClick={handleSubmit}>Submit</button>
          </div>
        </div>

      </div>

      <div className="note">
        Email mein @ aur . hona chahiye. Password 6+ chars. Invalid hone pe
        field red hogi aur focus wapas wahi aa jaayega.
      </div>
    </div>
  );
}


/**
 * ============================================================
 * PART 8 — Character Count Tracker
 * ============================================================
 * Ye wahi PROBLEM 1 + PROBLEM 2 ka solution hai.
 *
 * Scenario: User tweet likh raha hai. Hum background mein
 * track karna chahte hain kitne characters type hue —
 * sirf console ke liye (analytics), screen pe nahi dikhana.
 *
 * useRef perfect kyun:
 *   - charCountRef.current silently update hota rehta hai
 *   - Koi re-render nahi har character pe
 *   - Value survive karti hai re-renders ke beech
 *
 * useState + useRef ek saath:
 *   useState  → tweet ka text (screen pe dikhana hai) ✅
 *   useRef    → character count (sirf background tracking) ✅
 * ============================================================
 */
function CharCountTracker() {
  const [tweet, setTweet] = useState("");

  // ✅ useRef — screen pe nahi dikhana, sirf background mein track
  const charCountRef = useRef(0);

  function handleChange(e) {
    setTweet(e.target.value);                        // UI ke liye — re-render hoga
    charCountRef.current = e.target.value.length;    // quietly store — no re-render
    console.log("Total chars typed so far:", charCountRef.current);
  }

  return (
    <div className="section">
      <p className="section-title">Part 8 — Character Count Tracker</p>
      <p>Type karo — character count console mein track ho raha hai, screen pe nahi.</p>

      <textarea
        value={tweet}
        onChange={handleChange}
        placeholder="Tweet likho..."
        className="tweet-box"
        rows={3}
      />

      <p style={{ marginTop: "8px" }}>
        Screen pe text: <strong>{tweet || "(kuch nahi)"}</strong>
      </p>

      <div className="note">
        {/* charCountRef.current yahan print kiya hai — lekin ye live update
            nahi hoga screen pe. Kyunki useRef re-render nahi karta.
            Console mein (F12) dekho — har character pe count badhega. */}
        charCountRef.current abhi: {charCountRef.current} — ye number live
        nahi badlega screen pe. Console mein dekho.
      </div>
    </div>
  );
}


/**
 * ============================================================
 * KAB USE KAREIN, KAB NAHI
 * ============================================================
 *
 * ✅ useRef use karo jab:
 *   1. Kisi DOM element ko directly touch karna ho
 *      (style, focus, scroll, innerHTML)
 *   2. Value background mein store karni ho bina re-render ke
 *      (timer ID, interval ID, analytics tracking)
 *
 * ❌ useRef use mat karo jab:
 *   1. Value screen pe dikhani ho aur live update chahiye
 *      → useState use karo
 *   2. Value change hone pe UI update karna ho
 *      → useState use karo
 *
 * ============================================================
 * COMPARISON TABLE
 * ============================================================
 *
 *                    | let variable | useState  | useRef
 * -------------------+--------------+-----------+---------
 * Re-renders ke beech|              |           |
 * survive karta hai? | ❌ Nahi      | ✅ Haan   | ✅ Haan
 * -------------------+--------------+-----------+---------
 * Change pe          |              |           |
 * re-render hota?    | ❌ Nahi      | ✅ Haan   | ❌ Nahi
 * -------------------+--------------+-----------+---------
 * Screen pe value    |              |           |
 * live update?       | ❌ Nahi      | ✅ Haan   | ❌ Nahi
 * -------------------+--------------+-----------+---------
 * DOM element pakad  |              |           |
 * sakta hai?         | ❌ Nahi      | ❌ Nahi   | ✅ Haan
 *
 * YAAD RAKHNE KA ASAAN TARIKA:
 *   useState = TV remote — press karo, screen pe change dikhega
 *   useRef   = Pocket diary — silently note karo, screen nahi badlegi
 * ============================================================
 */


/**
 * ============================================================
 * APP
 * ============================================================
 */
function App() {
  return (
    <div className="app">
      <h1>useRef Hook</h1>

      <h2>Comparison</h2>
      <UseStateVsUseRef />
      <NormalVariableProblem />

      <h2>Use Case B — Background Mein Value Store Karna</h2>
      <TimerWithLet />
      <TimerWithUseState />
      <TimerWithUseRef />
      <Stopwatch />

      <h2>Use Case A — DOM Element Ko Pakadna</h2>
      <DomWithGetElementById />
      <DomWithUseRef />
      <FormValidationWithRef />
      <AutoFocusForm />

      <h2>Use Case B — Background Tracking</h2>
      <CharCountTracker />
    </div>
  );
}

export default App;