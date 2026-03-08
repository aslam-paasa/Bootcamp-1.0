/**
 * ============================================================
 * TOPIC: useEffect Hook
 * ============================================================
 *
 * Pehle samjho — useEffect kyun banaya gaya?
 *
 * React components ka kaam hai UI render karna. Lekin real
 * apps mein sirf UI render karna kaafi nahi hota. Bahut saara
 * aisa kaam bhi hota hai jo UI se directly related nahi hai:
 *   - Server se data fetch karna (API calls)
 *   - Timer set karna
 *   - Browser events pe subscribe karna (resize, scroll)
 *   - DOM ko directly update karna
 *
 * Ye saare kaam "Side Effects" kehlaate hain.
 * Matlab wo cheezein jo component ke bahar ki duniya ko
 * affect karti hain — React ke bahar.
 *
 * Problem ye thi: ye side effects kab chalein?
 * Har render pe chalein? Sirf pehli baar? Kisi specific
 * value change hone pe?
 *
 * Iske liye useEffect banaya gaya.
 *
 * ============================================================
 * useEffect KYA HAI?
 * ============================================================
 * useEffect ek React hook hai jo tumhe side effects run karne
 * deta hai — aur control deta hai ki wo kab chalein.
 *
 * Syntax:
 *   useEffect(() => {
 *     // ye code side effect hai
 *   }, [dependencies]);
 *
 * Do cheezein leta hai:
 *   1. Callback function — jo code run karna hai
 *   2. Dependency array  — controls karta hai kab chalega
 *
 * Dependency array ke teen cases hain:
 *   Case 1: Array nahi diya      → har render pe chalta hai
 *   Case 2: Empty array []       → sirf pehli baar chalta hai
 *   Case 3: Array mein values    → jab wo value change ho tab chalta hai
 *
 * ============================================================
 * COMPONENT LIFECYCLE — Component ki Life Journey
 * ============================================================
 * Har React component teen stages se guzarta hai:
 *
 * 1. BIRTH (Mounting)
 *    Component pehli baar screen pe aata hai.
 *    Yahan hum: API calls karte hain, timers set karte hain,
 *    initial setup karte hain.
 *
 * 2. GROWTH (Updating)
 *    Component mein kuch change hota hai — props ya state.
 *    Yahan hum: naya data fetch karte hain, UI update karte hain.
 *
 * 3. DEATH (Unmounting)
 *    Component screen se hata diya jaata hai.
 *    Yahan hum: timers band karte hain, subscriptions hatate hain,
 *    memory free karte hain. Isko "cleanup" kehte hain.
 *
 * useEffect in teeno stages ko handle karta hai.
 * ============================================================
 */

import { useEffect, useState } from "react";
import "./App.css";


/**
 * ============================================================
 * PROBLEM — Bina useEffect ke API Call ❌
 * ============================================================
 * Pehle dekho kya problem hoti hai agar API call directly
 * component mein likh dein — useEffect ke baghair.
 *
 * Is example mein:
 * - Button click pe count state change hogi
 * - State change → re-render → API call phir chalegi
 * - User 10 baar click kare → 10 API calls
 * - Server pe load badhega, app slow hogi
 *
 * Ye bilkul aisa hai jaise tum har baar grocery list dekhne
 * ke liye market jaao — list ghar pe rakh ke aao to zyada
 * baar market ka chakkar lagana padega.
 *
 * Sahi solution: API call sirf ek baar honi chahiye —
 * jab component pehli baar load ho. Ye Case 2 mein dekhenge.
 * ============================================================
 */
function GalatTareeka() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);

  // ❌ GALAT — ye directly component mein likhi API call hai
  // Har re-render pe chalegi — is liye comment out kiya hai
  // agar uncomment karo to infinite loop bhi ban sakta hai
  // fetch('https://jsonplaceholder.typicode.com/posts/1')
  //   .then(res => res.json())
  //   .then(data => setData(data));  // setData → re-render → fetch → setData...

  return (
    <div className="section">
      <p className="section-title">Problem — Bina useEffect ke API Call</p>
      <p>Agar API call yahan direct hoti to har button click pe nayi request jaati.</p>
      <p>Count: <strong>{count}</strong></p>
      <p>API Data: {data?.title || "API call commented out hai"}</p>
      <button className="btn-primary" onClick={() => setCount(c => c + 1)}>
        Count Badhao (Har click pe render hoga)
      </button>
      <div className="note note-error">
        Console check karo — agar API on hoti to har click pe fetch dikhta
      </div>
    </div>
  );
}


/**
 * ============================================================
 * CASE 1 — No Dependency Array (Har Render Pe Chalta Hai)
 * ============================================================
 * Jab tum dependency array bilkul nahi dete, useEffect har
 * baar chalta hai — component mount hone pe bhi aur har
 * re-render pe bhi.
 *
 * Is example mein:
 * - Button click karne pe count state toggle hoti hai
 * - State change → re-render → useEffect phir se chalta hai
 * - Matlab har ek click pe console mein "fetched" dikhega
 *
 * PROBLEM:
 * Real app mein agar ye ek API call hoti, to har button click
 * pe server pe ek nayi request jaati. Ye bilkul bhi efficient
 * nahi hai. Generally avoid karo ye case.
 *
 * Ye tab useful hai jab genuinely har render pe kuch karna ho
 * — jo bahut rare situation hai.
 * ============================================================
 */
function CaseOne() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // ❌ Ye har render pe chalega — button click pe bhi
    console.log("10,000 Products fetched from Flipkart");
  }); // ← no dependency array

  return (
    <div className="section">
      <p className="section-title">Case 1 — Har Render Pe (No Dependency Array)</p>
      <p>Count: <strong>{count}</strong></p>
      <button className="btn-primary" onClick={() => setCount(c => c + 1)}>
        Count Badhao
      </button>
      <div className="note note-warning">
        Console check karo — har click pe fetch ho raha hai
      </div>
    </div>
  );
}


/**
 * ============================================================
 * CASE 2 — Empty Dependency Array (Sirf Ek Baar)
 * ============================================================
 * Jab tum empty array [] dete ho, useEffect sirf ek baar
 * chalta hai — jab component pehli baar mount hota hai.
 * Uske baad chahe kitne bhi re-renders hoon, dobara nahi
 * chalega.
 *
 * HOW THIS FIXES THE PROBLEM:
 * GalatTareeka mein har click pe API call hoti thi. Ab sirf
 * ek baar API call hogi — jab page load ho. Button click
 * karne pe koi nayi request nahi jayegi.
 *
 * Ye case sabse zyada use hota hai:
 *   - Page load pe API se data laana
 *   - Initial setup karna
 *   - Ek baar ka event listener lagana
 * ============================================================
 */
function CaseTwo() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Sirf ek baar chalega — component mount hone pe
    console.log("API call ho rahi hai... sirf ek baar");
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then(res => res.json())
      .then(result => {
        setData(result);
        setLoading(false);
        console.log("Data aa gaya:", result.title);
      });
  }, []); // ← empty array = sirf mounting pe

  return (
    <div className="section">
      <p className="section-title">Case 2 — Sirf Ek Baar (Empty Array)</p>
      <p>Count: <strong>{count}</strong></p>
      <p>API Data: {loading ? "Loading..." : data?.title}</p>
      <button className="btn-primary" onClick={() => setCount(c => c + 1)}>
        Count Badhao (Ab API call nahi hogi)
      </button>
      <div className="note note-success">
        Console check karo — sirf ek baar fetch hua hoga
      </div>
    </div>
  );
}


/**
 * ============================================================
 * CASE 3 — Dependency Array with Values (Specific Change Pe)
 * ============================================================
 * Jab tum array mein koi value dete ho, useEffect tab chalta
 * hai jab:
 *   a. Component pehli baar mount hota hai
 *   b. Us specific value mein change aata hai
 *
 * Is example mein do inputs hain — count aur name.
 * useEffect mein [count] diya hai.
 * Matlab:
 *   - Count button click karo → useEffect chalega ✅
 *   - Name input mein type karo → useEffect nahi chalega ❌
 *
 * REAL WORLD USE CASE:
 * Search bar mein user kuch type kare to API call hो.
 * Lekin agar user sirf apni profile photo change kare to
 * search results dobara fetch na hon. Exactly ye hi
 * dependency array karta hai.
 * ============================================================
 */
function CaseThree() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [effectLog, setEffectLog] = useState([]);

  useEffect(() => {
    // ✅ Sirf tab chalega jab count change hoga
    // name change hone pe nahi chalega
    const message = `Effect chala — count ki value ab ${count} hai`;
    console.log(message);
    setEffectLog(prev => [...prev, message]);
  }, [count]); // ← sirf count change pe

  return (
    <div className="section">
      <p className="section-title">Case 3 — Specific Value Change Pe</p>

      <p>Count: <strong>{count}</strong></p>
      <button className="btn-primary" onClick={() => setCount(c => c + 1)}>
        Count Badhao (Effect chalega)
      </button>

      <br /><br />

      <p>Name: <strong>{name || "kuch nahi"}</strong></p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name type karo (effect nahi chalega)"
      />

      <p className="log-label">Effect Log:</p>
      <ul className="effect-log">
        {effectLog.map((log, i) => <li key={i}>{log}</li>)}
      </ul>

      <div className="note">
        Sirf count change karne se effect chalega, name se nahi
      </div>
    </div>
  );
}


/**
 * ============================================================
 * CLEANUP FUNCTION — Component Death Pe Kya Karna Hai
 * ============================================================
 * Jab component screen se hata diya jaata hai (unmount),
 * kuch cheezein band karni padti hain:
 *   - setInterval band karo warna background mein chalta rahega
 *   - Event listeners hatao warna memory leak hoga
 *   - API requests cancel karo agar pending hain
 *
 * Isko "cleanup" kehte hain.
 *
 * Kaise karte hain?
 * useEffect ke andar callback function ek aur function
 * return kar sakta hai — wo return wala function cleanup
 * function hai. React isko automatically call karta hai
 * jab component unmount hota hai.
 *
 *   useEffect(() => {
 *     // setup code
 *     return () => {
 *       // cleanup code — component hatne pe chalega
 *     }
 *   }, []);
 *
 * REAL WORLD EXAMPLE:
 * LinkedIn pe socho. Tum Home tab pe ho — nayi posts fetch
 * ho rahi hain background mein. Tum Notifications tab pe
 * jaate ho. Home component unmount hota hai — cleanup function
 * chalta hai aur posts fetching band ho jaati hai. Ab sirf
 * notifications fetch ho rahi hain. Ye hi cleanup ka kaam hai.
 * ============================================================
 */
function Cleanup() {
  const [showTimer, setShowTimer] = useState(true);

  useEffect(() => {
    const clock = setInterval(() => {
      console.log("Clock tick — Timer toggle ho raha hai");
      setShowTimer(current => !current);
    }, 5000);

    // ✅ Cleanup function — component unmount hone pe chalega
    // Agar ye nahi likha to interval background mein chalta rahega
    // chahe component screen se hata bhi diya jaye
    return () => {
      clearInterval(clock);
      console.log("Cleanup: Clock band ho gaya");
    };
  }, []);

  return (
    <div className="section">
      <p className="section-title">Cleanup Example</p>
      <p>Timer har 5 seconds mein toggle hota hai</p>
      {/* showTimer true hone pe Timer component mount hoga,
          false hone pe unmount hoga aur uska cleanup chalega */}
      {showTimer && <InternalTimer />}
      <div className="note">
        Console check karo — mount aur unmount pe cleanup messages dikhenge
      </div>
    </div>
  );
}

function InternalTimer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // ✅ Cleanup — Timer screen se hatne pe interval band hoga
    return () => {
      clearInterval(interval);
      console.log("Cleanup: Timer ka interval band hua");
    };
  }, []);

  return <p className="internal-timer">{seconds} seconds elapsed</p>;
}


/**
 * ============================================================
 * STOPWATCH — useEffect ka Real World Example
 * ============================================================
 * Ab tak humne useEffect ke teen cases aur cleanup dekha.
 * Ab ek complete real-world example dekhte hain jisme sab
 * kuch ek saath use hota hai.
 *
 * Stopwatch mein teen buttons hain:
 *   - Start  → timer shuru karo
 *   - Stop   → timer rokho (time yaad rahe)
 *   - Reset  → time 0 pe wapas
 *
 * Yahan useEffect kya kar raha hai?
 * isRunning state pe watch kar raha hai — ye Case 3 hai.
 *   - isRunning true hua → setInterval shuru karo
 *   - isRunning false hua → cleanup function chale → clearInterval
 *
 * Cleanup yahan kyun zaruri hai?
 * Jab user Stop dabata hai, isRunning false ho jaata hai.
 * React useEffect ka cleanup function run karta hai aur
 * clearInterval se timer band hota hai. Agar cleanup nahi
 * hota, to purana interval background mein chalta rehta —
 * time double speed se badhne lagta.
 *
 * isRunning true  → useEffect chalta hai → interval shuru
 * isRunning false → cleanup chalta hai  → interval band
 * ============================================================
 */
function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning) {
      // Timer shuru — har second time badhao
      const interval = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);

      // ✅ Cleanup — jab isRunning false hoga tab ye chalega
      // clearInterval se timer safely band hoga
      return () => {
        clearInterval(interval);
      };
    }
  }, [isRunning]); // ← sirf isRunning change pe chalega

  function start() {
    setIsRunning(true);  // isRunning true → useEffect chalta hai → interval shuru
  }

  function stop() {
    setIsRunning(false); // isRunning false → cleanup chalta hai → interval band
  }

  function reset() {
    setIsRunning(false); // pehle band karo
    setTime(0);          // phir time 0 pe wapas
  }

  // Time ko MM:SS format mein dikhao
  // Math.floor(time / 60) → minutes nikalta hai
  // time % 60             → baaki seconds nikalta hai
  // padStart(2, "0")      → single digit ko "01", "02" banana
  const minutes = String(Math.floor(time / 60)).padStart(2, "0");
  const seconds = String(time % 60).padStart(2, "0");

  return (
    <div className="section">
      <p className="section-title">Stopwatch — Case 3 + Cleanup ek saath</p>
      <div className="stopwatch-time">{minutes}:{seconds}</div>
      <div className="btn-row">
        <button className="btn-success" onClick={start} disabled={isRunning}>Start</button>
        <button className="btn-danger" onClick={stop} disabled={!isRunning}>Stop</button>
        <button className="btn-gray" onClick={reset}>Reset</button>
      </div>
      <span className={`status-badge ${isRunning ? "status-running" : "status-stopped"}`}>
        {isRunning ? "Chal raha hai ⏱️" : "Ruka hua hai ⏸️"}
      </span>
    </div>
  );
}


/**
 * ============================================================
 * WINDOW SIZE TRACKER — Event Listener with Cleanup
 * ============================================================
 * Ek aur common real-world pattern: browser events pe
 * listen karna jaise window resize, scroll, keypress.
 *
 * PROBLEM bina cleanup ke:
 * Har baar component re-render hone pe ek naya event listener
 * add ho jaata hai. Purana listener remove nahi hota.
 * 10 re-renders = 10 listeners. Sab ek saath chal rahe hain.
 * Iska naam hai "event listener leak".
 *
 * SOLUTION:
 * useEffect mein listener add karo aur cleanup function mein
 * same listener ko removeEventListener se hata do.
 *
 * Ye pattern exactly wahi hai jo LinkedIn ya YouTube use
 * karte hain — jab tum page pe ho tab listen karo, jab
 * page se jao tab listener hata do.
 * ============================================================
 */
function WindowSizeTracker() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      console.log("Window resize:", window.innerWidth, "x", window.innerHeight);
    }

    // ✅ Ek baar listener add karo
    window.addEventListener("resize", handleResize);
    console.log("Resize listener add hua");

    // ✅ Cleanup — component hatne pe listener bhi hata do
    // Agar ye nahi likha to har re-render pe ek naya listener add hoga
    return () => {
      window.removeEventListener("resize", handleResize);
      console.log("Resize listener hata diya");
    };
  }, []); // ← empty array — sirf ek baar setup hoga

  return (
    <div className="section">
      <p className="section-title">Window Size Tracker — Event Listener Cleanup</p>
      <div className="size-display">
        <div className="size-box">
          <div className="size-label">Width</div>
          <div className="size-value">{windowSize.width}px</div>
        </div>
        <div className="size-box">
          <div className="size-label">Height</div>
          <div className="size-value">{windowSize.height}px</div>
        </div>
      </div>
      <div className="note">
        Browser window resize karo — values live update hongi
      </div>
    </div>
  );
}


/**
 * ============================================================
 * SEARCH WITH DEBOUNCE — Cleanup ka Advanced Use
 * ============================================================
 * Ye sabse common real-world pattern hai jisme cleanup
 * actually critical role play karta hai.
 *
 * PROBLEM:
 * User search bar mein "react" type karta hai.
 * Har character pe API call jaati hai:
 *   "r" → API call
 *   "re" → API call
 *   "rea" → API call
 *   "reac" → API call
 *   "react" → API call
 * 5 API calls sirf ek word type karne pe. Server pe load,
 * aur purani calls ke results baad mein aayenge to
 * wrong results bhi dikh sakte hain.
 *
 * SOLUTION — Debounce:
 * User jab type karna band kare, tab 500ms baad API call karo.
 * Agar dobara type kiya to purana timeout cancel karo aur
 * naya shuru karo. Ye hi debounce hai.
 *
 * Cleanup yahan kya karta hai?
 * search state change hone pe — cleanup function pehle
 * chalta hai aur clearTimeout se purana timer cancel kar
 * deta hai. Phir nayi value ke saath naya timer shuru hota hai.
 * ============================================================
 */
function SearchWithDebounce() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!search || search.length < 2) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    console.log(`Typing: "${search}" — 500ms wait kar raha hai...`);

    // 500ms baad API call karo — agar user phir type kare
    // to cleanup function ye timeout cancel kar dega
    const timeoutId = setTimeout(() => {
      console.log(`API call ho rahi hai for: "${search}"`);

      fetch(`https://jsonplaceholder.typicode.com/posts?userId=1`)
        .then(res => res.json())
        .then(data => {
          const filtered = data
            .filter(post => post.title.toLowerCase().includes(search.toLowerCase()))
            .slice(0, 5);
          setResults(filtered);
          setIsSearching(false);
          console.log(`${filtered.length} results mile for: "${search}"`);
        });
    }, 500);

    // ✅ Cleanup — agar user phir se type kare, purana timeout cancel karo
    // Isse sirf last typed value pe API call hogi, beech wali pe nahi
    return () => {
      clearTimeout(timeoutId);
      console.log(`Purana search cancel: "${search}"`);
    };
  }, [search]); // ← search change hone pe chalega

  return (
    <div className="section">
      <p className="section-title">Search with Debounce — Cleanup ka Advanced Use</p>
      <p>Har character pe API call nahi — typing rukne ke 500ms baad</p>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search karo... (min 2 characters)"
      />
      {isSearching && <p className="searching-text">Searching...</p>}
      <ul className="search-results">
        {results.length > 0
          ? results.map(item => <li key={item.id}>{item.title}</li>)
          : <li>Koi result nahi (type karo)</li>
        }
      </ul>
      <div className="note">
        Console check karo — typing ke beech cancel dikhega
      </div>
    </div>
  );
}


/**
 * ============================================================
 * MULTIPLE useEFFECTS — Ek Component, Alag Alag Kaam
 * ============================================================
 * Ek component mein multiple useEffect likh sakte hain.
 * Har useEffect ka ek specific kaam hona chahiye.
 *
 * Ye example dikhata hai:
 * - Effect 1: userId change pe user ka data fetch karo
 * - Effect 2: userData mile ke baad us user ke posts fetch karo
 *
 * Dono alag hain kyunki dono ka kaam alag hai aur dono ke
 * dependencies alag hain. Ek mein dono kaam likhna code ko
 * messy aur hard to debug banata.
 *
 * BEST PRACTICE:
 * Ek useEffect, ek kaam. Code saaf rehta hai aur debug
 * karna aasaan hota hai.
 * ============================================================
 */
function MultipleEffects() {
  const [userId, setUserId] = useState(1);
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);

  // Effect 1 — sirf jab userId change ho, user data fetch karo
  useEffect(() => {
    console.log(`Effect 1: User ${userId} ka data fetch ho raha hai`);
    setUserData(null);

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUserData(data);
        console.log("User data aa gaya:", data.name);
      });
  }, [userId]);

  // Effect 2 — sirf jab userData aaye, us user ke posts fetch karo
  // Ye Effect 1 ke complete hone ka intezaar karta hai
  useEffect(() => {
    if (!userData) return; // userData nahi hai to kuch mat karo

    console.log(`Effect 2: User ${userId} ke posts fetch ho rahe hain`);

    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then(res => res.json())
      .then(data => {
        setPosts(data.slice(0, 3));
        console.log("Posts aa gaye:", data.length);
      });
  }, [userData, userId]);

  return (
    <div className="section">
      <p className="section-title">Multiple useEffects — Ek Component, Alag Kaam</p>

      <p>User select karo:</p>
      <div className="btn-row">
        {[1, 2, 3].map(id => (
          <button
            key={id}
            className={userId === id ? "btn-active" : "btn-inactive"}
            onClick={() => setUserId(id)}
          >
            User {id}
          </button>
        ))}
      </div>

      <div className="user-posts-grid">
        <div className="info-box">
          <h3>Effect 1 — User Data</h3>
          <p>Name: <strong>{userData ? userData.name : "Loading..."}</strong></p>
          <p>Email: {userData ? userData.email : "..."}</p>
        </div>
        <div className="info-box">
          <h3>Effect 2 — Posts</h3>
          <ul>
            {posts.length > 0
              ? posts.map(post => <li key={post.id}>{post.title}</li>)
              : <li>Loading posts...</li>
            }
          </ul>
        </div>
      </div>

      <div className="note">
        Console check karo — pehle user data, phir posts fetch honge
      </div>
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
      <h1>useEffect Hook</h1>

      <h2>Problem — Bina useEffect ke:</h2>
      <GalatTareeka />

      <h2>Teen Cases:</h2>
      <CaseOne />
      <CaseTwo />
      <CaseThree />

      <h2>Cleanup Function:</h2>
      <Cleanup />

      <h2>Stopwatch — Case 3 + Cleanup ek saath:</h2>
      <Stopwatch />

      <h2>Window Size Tracker — Event Listener Cleanup:</h2>
      <WindowSizeTracker />

      <h2>Search with Debounce — Cleanup ka Advanced Use:</h2>
      <SearchWithDebounce />

      <h2>Multiple useEffects — Ek Component, Alag Kaam:</h2>
      <MultipleEffects />
    </div>
  );
}

export default App;