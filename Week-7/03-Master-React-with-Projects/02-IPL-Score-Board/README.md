# IPL Score Board:

# useParams Hook Working:
1. Route Setup (App.jsx):
```jsx
    // In your main routing file
    <Routes>
        <Route path="/matchDetail/:id" element={<MatchDetail />} />
    </Routes>
```

   What happens here:
   - :id is a dynamic parameter - it's a placeholder
   - When someone visits /matchDetail/123, 123 becomes id
   - When someone visits /matchDetail/456, 456 becomes id

2. Creating Links (Home.jsx)
```jsx
    // When you create links to navigate
    <Link to="/matchDetail/91596">Match 91596</Link>
    <Link to="/matchDetail/89654">Match 89654</Link>
```

   What happens here:
   - Each link has a different number after /matchDetail/
   - These numbers are the dynamic values that will become the id parameter

3. Accessing the Parameter (MatchDetail.jsx)
```jsx
   import { useParams } from "react-router-dom";
   
   function MatchDetail() {
       let { id } = useParams();
       // If URL is /matchDetail/91596 → id = "91596"
       // If URL is /matchDetail/89654 → id = "89654"
       
       console.log(id); // Shows the dynamic ID from URL
   }
```

   What happens here:
   - useParams() is a hook that reads the current URL
   - It looks at the route pattern (/matchDetail/:id)
   - It extracts the actual value from the URL and gives it to you as id

4. Complete Visual Flow:
   User Clicks Link: "/matchDetail/91596"
            ↓
   React Router matches: "/matchDetail/:id"
            ↓
   useParams() extracts: { id: "91596" }
            ↓
   Your component receives: id = "91596"
            ↓
   You use this ID to show specific data


5. Real Example with Multiple Matches
   a. Home Component (Creating Links)
   ```jsx
      function Home() {
          return (
              <div>
                  <h2>Match List</h2>
                  <Link to="/matchDetail/91596">MI vs KKR</Link>
                  <Link to="/matchDetail/89654">RCB vs CSK</Link>
                  <Link to="/matchDetail/89700">RR vs DC</Link>
              </div>
          );
      }
   ```

   b. MatchDetail Component (Using the Parameter):
   ```jsx
      function MatchDetail() {
          let { id } = useParams();
          
          // Different data for different IDs
          const matchData = {
              "91596": { team1: "MI", team2: "KKR", venue: "Wankhede" },
              "89654": { team1: "RCB", team2: "CSK", venue: "Chinnaswamy" },
              "89700": { team1: "RR", team2: "DC", venue: "Jaipur" }
          };
          
          const currentMatch = matchData[id];
          
          return (
              <div>
                  <h1>Match ID: {id}</h1>
                  <p>{currentMatch.team1} vs {currentMatch.team2}</p>
                  <p>Venue: {currentMatch.venue}</p>
              </div>
          );
      }
   ```

   c. What happens when user navigates:
      Scenario 1: 
      - User clicks: "/matchDetail/91596"
        → useParams() returns { id: "91596" }
        → Component shows MI vs KKR at 
        
      Scenario 2:
      - User clicks: "/matchDetail/89654" 
        → useParams() returns { id: "89654" }
        → Component shows RCB vs CSK at Chinnaswamy

6. Key Points for Beginner:
   a. :id is a Variable - Think of it like :id = "whatever comes here"
   b. useParams() is a Reader - It reads the actual value from the URL
   c. One Component, Multiple Views - Same component shows different data based on URL
   d. Links are Like Addresses - Each link points to a different "address" with different parameters

7. Simple Analogy:
   - Think of a hotel with room numbers:
     a. Route Pattern: /hotel/room/:roomNumber
     b. Links:
        - /hotel/room/101 (Room 101)
        - /hotel/room/205 (Room 205)
     c. useParams: The receptionist who tells you "You're in room {roomNumber}"
   - The same hotel building (component) shows different interiors (data) based on which room number (parameter) you're in!

```jsx
// App.jsx
   <Routes>
     <Route path="/match/:matchId" element={<MatchPage />} />
   </Routes>
   
   // Navigation.jsx  
   <Link to="/match/91596">Go to Match 91596</Link>
   <Link to="/match/89654">Go to Match 89654</Link>
   
   // MatchPage.jsx
   function MatchPage() {
       let { matchId } = useParams(); // Gets the dynamic part from URL
       
       return (
           <div>
               <h1>You are viewing Match: {matchId}</h1>
               {/* This will show different content based on matchId */}
           </div>
       );
   }
```


# Default Tab Selection: Why "MI" is Active First?
1. What is InPageNavigation?
   Think of it as a TV Remote Control that lets you switch between different "channels" (content) in the same component.
   a. Buttons      = Remote control buttons (MI, KKR)
   b. Sliding Line = The light that shows which button is selected
   c. Content      = The TV screen showing different channels

2. How We USE InPageNavigation (The Remote Control)
   ```jsx
   /**
    * In MatchDetail.jsx - Setting up our TV channels
   */
   <InPageNavigaion
       teams={["MI", "KKR"]}  // Remote buttons: MI and KKR
   >
       {/* Channel 1: MI Players */}
       <div>
           <h1>Rohit Sharma</h1>
           <h3>Batsman</h3>
           <h1>Hardik Pandya</h1>
           <h3>All-rounder</h3>
           {/* ... more MI players */}
       </div>
   
       {/* Channel 2: KKR Players */}
       <div>
           <h1>Shreyas Iyer</h1>
           <h3>Batsman</h3>
           <h1>Andre Russell</h1>
           <h3>All-rounder</h3>
           {/* ... more KKR players */}
       </div>
   </InPageNavigaion>
   ```

   What this creates:
   REMOTE CONTROL:
   [ MI ]      [ KKR ]
     ↓            ↓
   CHANNEL 1   CHANNEL 2
   MI Players  KKR Players

3. Data Flow Into InPageNavigation:
   a. Props = Information we GIVE to Component
      ```jsx
      /**
       * What we SEND to InPageNavigation:
      */
      teams: ["MI", "KKR"]  // Button labels
      
      /**
       * Children:
       * a. MI Players
       * b. KKR Players
      */
      children: [
          [<div>Rohit Sharma...</div>, <div>Hardik Pandya...</div>], 
          [<div>Shreyas Iyer...</div>, <div>Andre Russell...</div>] 
      ]
      ```

      b. Visual Representation:
         INPUT DATA:
         ┌─────────────────┐    ┌──────────────────┐
         │   teams prop    │    │  children prop   │
         ├─────────────────┤    ├──────────────────┤
         │ ["MI", "KKR"]   │    │ [MI-content,     │
         │                 │    │  KKR-content]    │
         └─────────────────┘    └──────────────────┘


4. Initial Setup - Default Value

   ```jsx
      const [activeTabIndex, setActiveTabIndex] = useState(0);
      // Yaha pe DIRECT 0 set kiya gaya hai
      // 0 = FIRST tab, 1 = SECOND tab
   ```

   Important: Ye props se automatically nahi ho raha, hum manually 0 set kar rahe hain!

5. Props ka Actual Role
   a. Props Data:

      ```jsx
         <InPageNavigation
             teams={["MI", "KKR"]}  // Props
         >
             {/* Children */}
         </InPageNavigation>
      ```

   b. What Happens:

      teams = ["MI", "KKR"]
               ↓
      activeTabIndex = 0  → teams[0] = "MI" 
      activeTabIndex = 1  → teams[1] = "KKR"

      Props sirf LABELS provide karta hai, activeTabIndex nahi!

6. Complete Initial Flow
   a. Page Load Hota Hai:

      ```jsx
      // 1. Component mount hota hai
      const [activeTabIndex, setActiveTabIndex] = useState(0);
      // ↑ Yaha pe HUM NE manually 0 set kiya!
      
      // 2. Render hota hai
      return (
          <div>
              {/* Buttons banate hain teams array se */}
              <button>{teams[0]}</button>  // "MI" (kyuki teams[0] = "MI")
              <button>{teams[1]}</button>  // "KKR" (kyuki teams[1] = "KKR")
              
              {/* Content show karte hain */}
              {children[activeTabIndex]}  // children[0] = MI players
          </div>
      );
      ```

      b. Visual Flow:
         - INITIAL SETUP:
           activeTabIndex = 0 (HUM NE manually set kiya)
         
           teams[0] = "MI"    → MI button banega
           teams[1] = "KKR"   → KKR button banega
         
           children[0]        → MI players show honge

7. Agar Hum Change Karna Chahein?
   a. Current Situation:

      ```jsx
        // Currently: MI always selected by default
        setState(0); // Hardcoded 0
      ```

   b. Better Approach (Dynamic):

      ```jsx
      // Props se default value le sakte the:
      function InPageNavigation({ teams, children, defaultTab = 0 }) {
          const [activeTabIndex, setActiveTabIndex] = useState(defaultTab);
          // Ab parent component control kar sakta hai
      }
      ```

   c. Use Case:
      ```jsx
      // Parent component mein:
      <InPageNavigation
          teams={["MI", "KKR"]}
          defaultTab={1}  // KKR selected by default
      >
          {/* Children */}
      </InPageNavigation>
      ```

8. Current Code mein Exactly Kya Ho Raha Hai
   a. MatchDetail.jsx (Parent):

      ```jsx
      <InPageNavigation
          teams={[
              data.matchInfo.team1.shortName,  // "MI"  
              data.matchInfo.team2.shortName   // "KKR"
          ]}
      >
          {/* MI Players */}
          {data.matchInfo.team1.playerDetails.map(...)}
          
          {/* KKR Players */}  
          {data.matchInfo.team2.playerDetails.map(...)}
      </InPageNavigation>
      ```

   b. InPageNavigation.jsx (Child):

      ```jsx
      function InPageNavigation({ teams, children }) {
          // 🔥 YAHI PE FIXED 0 SET HAI!
          const [activeTabIndex, setActiveTabIndex] = useState(0);
          
          return (
              <div>
                  {/* Buttons teams array se banenge */}
                  {teams.map((teamName, index) => (
                      <button onClick={() => setActiveTabIndex(index)}>
                          {teamName}  // "MI" ya "KKR"
                      </button>
                  ))}
                  
                  {/* Content activeTabIndex ke hisab se */}
                  {children[activeTabIndex]}  
                  // Always starts with children[0]: MI
              </div>
          );
      }
      ```

9. Summary - Kaise MI Select Hota Hai
   "MI select isliye hota hai kyunki humne useState(0) manually set kiya hai, na ki props se!"

   Detailed Breakdown:
   a. useState(0) → activeTabIndex initially 0 hota hai
   b. teams[0] → "MI" return karta hai (kyuki array ka first element)
   c. children[0] → MI players return karta hai (kyuki children array ka first element)
   d. Combined Result → MI button + MI players show hote hain

10. Visual Representation:

   INITIAL STATE:
   activeTabIndex = 0 (MANUALLY SET BY US)
   
        teams array          children array
       ┌─────────────┐      ┌─────────────┐
       │ [0] = "MI"  │      │ [0] = MI    │
       │ [1] = "KKR" │      │ [1] = KKR   │
       └─────────────┘      └─────────────┘
             ↓                     ↓
        "MI" button         MI players content

    Final Result: MI automatically selected dikhta hai kyunki humne useState(0) set kiya hai!

11. Key Learning:
   - activeTabIndex props se automatically nahi, balki humne manually 0 set kiya hai, isliye MI select hota hai!

   - Agar hum useState(1) karte, toh KKR automatically select hota! 


# Sliding Effect on Tab Button using useRef: (DOM Manipulation)
1. Component ka kaam:
   Iska kaam hai:
   a. Tabs render karna
   b. Sliding line to active tab ke neeche move karna
   c. Content dikhana
      

2. Imports - what each import is for
    ```jsx
    import { useEffect, useRef, useState } from "react";
    import { Link } from "react-router-dom";
    import PropTypes from "prop-types";
    ```

    a. useState — store karo which tab is active (index).
    b. useRef — get direct access to real DOM elements (button, hr) for measurement & style changes.
    c. useEffect — run side-effects after render (initial placement).
    d. Link — agar tabs routes hain to button ko link banane ke liye.
    e. PropTypes — runtime prop validation (helps catch wrong props during dev).

    Think: imports = tool. Each one solves a small problem.

3. Component Signature & Props:
    ```jsx
    function InPageNavigaion({ teams, children }) { ... }
    ```

    a. teams = array that defines tabs. Two formats possible:
       - Simple : ["MI", "KKR"] (strings)
       - Complex: [{ path, title}, ... ] (objects for links)

    b. children: array of React nodes (content for each tab in simple mode)

    Think: 
    - props = what component will render. 
    - Always ask: "Where is my data coming from?"

4. State: which tab is active
    ```jsx
    const [index, setIndex] = useState(0);
    ```

   a. index stores the active tab index (0 = first).
   b. setIndex(i) changes active tab.

   Think: UI reflects state. If 'index' changes, UI (class, content) should update.

5. Refs: direct DOM handles
    ```jsx
    let tabLineRef = useRef(); // Sliding line ko pakadne ka reference
    let btnRef = useRef();     // First button ko pakadne ka reference

    // tabLineRef.current = actual <hr> element
    // btnRef.current     = actual first <button> element
    ```

    a. tabLineRef.current → points to the <hr> (sliding line) DOM node. We change style.left and style.width on it.
    b. btnRef.current → in original code points to the first button DOM node, used for initial placement.

    Important thought: useRef doesn't cause re-renders when updated - it's just to keep DOM or value.

6. The main logic: togleBtn(btn, i)
    ```jsx
    function togleBtn(btn, i) {
        /* 1. Button ki width aur position measure karo */
        let { offsetWidth, offsetLeft } = btn;

        /* 2. Sliding line ko button ke position pe move karo */
        tabLineRef.current.style.width = offsetWidth + "px";
        tabLineRef.current.style.left = offsetLeft + "px";

        /* 3. Active tab change karo */
        setIndex(i);
    }
    ```

    a. btn is a DOM element (the clicked button).
    b. offsetWidth = button ka width in pixels.
    c. offsetLeft = distance from parent container's left edge to button.
    d. We set tabLineRef.current.style.width and .left so the <hr> moves under that button.
    e. setIndex(i) updates the active tab state.

    Think: measure > apply > update state. Always measure real DOM for positions, then apply styles.

    Tip: Use e.currentTarget (safer) in click handler to get the button element. e.target can be a nested child inside the button.

7. Initial placement on component mount: Page Load Par
   ```jsx
   useEffect(() => {
    /**
     * Page load par first button (MI) pe sliding line set karo
     * a. btnRef.current = actual first <button> element
     * b. i = 0 (index-0) i.e., "MI"
     */
     togleBtn(btnRef.current, 0);
   }, []);
   ```

   a. After first render, call togleBtn with the first button so the sliding line starts under it.
   b. [] dependency means “run once after mount”.

   Important nuance:
   useEffect runs after paint — sometimes you'll see a quick flicker (line at left then jump). For measuring & immediate placement, prefer useLayoutEffect (runs before paint).

   Think: “I want the line already in place on first paint” → use useLayoutEffect.

8. Rendering Tabs (two modes):

   Case 1: Simple Mode (strings)
   Parent component se simple strings array data aayega:

    ```jsx
    <InPageNavigation
        teams={["MI", "KKR"]}
    >
        <MIPlayers />
        <KKRPlayers />
    </InPageNavigation>
    ```

    Case 2: Complex Mode (Objects)
    Parent component se Object array with path & title data aayega aur isme koi children nahi - router handle karega.

    ```jsx
    <InPageNavigation
        teams={[
            {path: "/mi", title: "MI"},
            {path: "/kkr", title: "KKR"}, 
            {path: "/rcb", title: "RCB"}
        ]}
    >
    </InPageNavigation>
    ```

    Actual checking logic: teams array ki length 2 se zyada hai ya nahi
    1. Complex Mode: > 2  (Navigation Links)
    2. Simple Mode : <= 2 (Content Tabs)

    a. Current Logic (problem)
       ```jsx
        { teams.length > 2 ? /* Complex Mode */ : /* Simple Mode */ }
        { teams.length > 2 ? complex (Link + title) : simple (just buttons)}
       ```

    b. Better Logic:
    ```jsx
    /* Check karo: teams array mein objects hain ya strings? */
    const isComplexMode = teams.some(team => typeof team === 'object');
    /* OR, Pehle element mein path property hai kya? */
    const isComplexMode = teams[0] && teams[0].path;
    ```

    Tum kaise pta karoge?
    As a developer?
    a. Check your data - strings hai ya objects?
    b. Check your use case - same page pe content switch karna hai ya different pages pe navigate karna hai?

    Current Code ka Issue? {teams.length > 2 ? complex : simple}
    Yeh assumption galat hai ki:
    - 2 ya kam tabs = simple mode (content switching)
    - 3 ya zyada tabs = complex mode (navigation)
    But actual mein yeh data type pe depend karna chahiye!

    Real World Examples:
    a. MI vs KKR Match (Simple Mode)
       ```jsx
       <InPageNavigation
           teams={["MI", "KKR"]}
       >
           {/* MI Players */}
           {miPlayers.map(player => <div>{player.name}</div>)}
           
           {/* KKR Players */}
           {kkrPlayers.map(player => <div>{player.name}</div>)}
       </InPageNavigation>
       ```

    b. Website Navigation (Complex Mode: navigation links to different pages)
       ```jsx
       <InPageNavigation
           teams={[
               {path: "/", title: "Home"},
               {path: "/matches", title: "Matches"},
               {path: "/teams", title: "Teams"},
               {path: "/news", title: "News"}
           ]}
       />
       ```
    Final Conditional Check Logic:
    ```jsx
            {teams.length > 2
            /* Complex Mode: Object */ 
              ? teams.map(({ path, title }, i) => ( ... ))
            /* Simple Mode: String */
              : teams.map((data, i) => ( ... ))
            }
    ```

9. Complex Mode - Navigation Links Banana
   a. Conditional Check
      ```jsx
      {teams.length > 2
          ? /* Chalega agar 3 ya zyada items hain */
          : /* Chalega agar 2 ya kam items hain */
      }
      ```
      - teams.length - Array mein kitne items hain count karo
      - > 2 - Check karo kya 2 se zyada hain?
      - ? : - Agar haan toh left wala, agar nahi toh right wala

      Example:
      teams = ["MI", "KKR"]        → length=2 → 2>2? NO  → Simple Mode
      teams = ["MI", "KKR", "RCB"] → length=3 → 3>2? YES → Complex Mode

   b. Complex Mode - Navigation Link Banao
    b.1. Data ko alag alag karo
      ```jsx
      /** 
       * teams = [{path: "/mi", title: "MI"}, {path: "/kkr", title: "KKR"}] */
      teams.map(({ path, title }, i) => (
          /* path = "/mi", title = "MI", i = 0   */
          /* path = "/kkr", title = "KKR", i = 1 */
      ))
      ```
      - teams.map() - Har item ko loop karo
      - ({ path, title }) - Object se path aur title nikal lo
      - i - Index number le lo (0, 1, 2...)
      - Think: Jaise gift box kholna - andar se do cheezein nikalna: address aur naam

    b.2. Link Lagana (Button ko Clickable Banana)
      ```jsx
      <Link to={path} key={path || i}>
          {/* Button andar aayega */}
      </Link>
      ```
      - <Link> - Special button jo page change kare
      - to={path} - Konse page pe jana hai
      - key={path || i} - React ko batana yeh konsa item hai
      - Think: Jaise elevator button - press karo toh different floor pe le jaye


    b.3. Button banana
      ```jsx
      <button>{title}</button>
      ```
      - <button> - Normal button banayo
      - {title} - Button pe text dikhao ("MI", "KKR")
      - Think: Normal button jaisa, bas link ke andar wrapped hai

   c. Simple Mode: Content Tabs Banana
    c.1. Simple Data Use Karna
    ```jsx
    teams.map((data, i) => (
        /* data = direct string "MI", "KKR" */
        /* i = number 0, 1                  */
    ))
    ```
    - teams.map() - Har item loop karo
    - (data, i) - String aur number le lo
    - Think: Jaise direct naam leke pukarna - "MI", "KKR"

    c.2. Direct Button (No Link) + useRef Connection
    ```jsx
       <button
           // ... properties  
       >
           {data}
       </button>
    ```
    - <button> - Normal button
    - {data} - Direct text show karo


10. Implementing useRef: (Special Connection)
    1. useRef Boxes banae (Setup):
       ```jsx
       let tabLineRef = useRef();  /*  BOX 1 - Sliding line ke liye  */
       let btnRef = useRef();      /*  BOX 2 - First button ke liye  */
       ```
       Kya hua:
       - Do khaali dibbe ban gaye
       - tabLineRef dibba: sliding line ko rakhega
       - btnRef dibba: first button ko rakhega
       - Think: Jaise do khaali almari ke compartments

    2. Button Banana + useRef Connection
       ```jsx
        <button 
            /* PEHLA BUTTON DIABBE MEIN DAALO */
            ref={i == 0 ? btnRef : null}  
            className={
                  "mr-1 font-bold px-7 py-5 lg:px-16 text-sm hover:bg-gray-200/20 " +
                  (index == i ? "text-white bg-gray-200/20" : "text-gray-200")
            }
            onClick={(e) => togleBtn(e.target, i)}
          >
            {title}
        </button>
       ```

        useRef set karna:
          - ref={i == 0 ? btnRef : null} - Sirf first button ko dibbe mein daalo
          - i == 0 - Check karo kya first button hai?
          - ? btnRef - Haan toh special connection do
          - : null - Nahi toh kuch mat do
          - Colors - Active/inactive tab highlight karo

        Sliding Effect: Kaise Kaam Karta Hai? 
        1. Initial Render (index 0 - Pehla Button):
           - Sirf pehle button (i === 0) par `useRef` (`btnRef`) lagate hain: `{ ref={i === 0 ? btnRef : null} }`
           - Kyun? Taaki component jab pehli baar render ho, tab hume us first button ka exact position DOM se mil sake.
           - `useEffect` ke andar `togleBtn(btnRef.current, 0)` call hota hai:
             a. Yaha `btnRef.current` first button ka DOM node milta hai.
             b. Wo node se `offsetWidth` (button ki width in pixels) aur `offsetLeft` (left distance from parent, pixels me) milta hai.
                - offsetWidth: Actual rendered button kitne pixels chauda hai.
                - offsetLeft: Button parent container ke left se kitna door hai.
             c. Ye offset ki values selected tab wali line (`tabLineRef.current`) ki styling me lag jaati hain:

             ```js
                tabLineRef.current.style.width = offsetWidth + "px";
                tabLineRef.current.style.left  = offsetLeft + "px";
             ```

             d. Isse sliding line first button ke neeche sahi jagah dikhti hai.
             
           - NOTE: offset values DOM se milti hain, directly button ki position and size ke according.

        2. Next Button Pe Sliding Effect Kaise Move Hota Hai?
           - Jab user koi aur button click karta hai:
             a. `onClick={(e) => togleBtn(e.target, i)}` call hota hai.
             b. `e.target` abhi click hua button ka DOM element hota hai. (e.g index 1 ya 2)
             c. `togleBtn` phir se:
                - usbutton DOM (e.target) se fresh `offsetWidth` aur `offsetLeft` leta hai.
                - tabLineRef.current ki styling ko update karta hai:
                  - width: naye button ki width
                  - left: naye button ka position
             d. Result: Sliding line ab naye, active button ke niche smoothly shift ho jaati hai. Animation CSS ki duration property se milti hai.

        3. DRY RUN EXAMPLE ---
           Maan lo 2 button hain: "MI" (index 0), "KKR" (index 1)
           - Render hote hi:
             - btnRef.current MI wale button ka DOM deta hai.
             - `offsetWidth` maan lo 120px, `offsetLeft` hai 0px.
             - tabLineRef.current line w=>120px, l=>0px set, slider MI ke niche dikhegi.
             - Ab KKR wale button pe click kiya:
               - `e.target` KKR button ka DOM hai.
               - Uska `offsetWidth` maan lo 124px, `offsetLeft` 120px.
               - tabLineRef.current line w=>124px, l=>120px set, slider KKR ke niche smoothly shift.

        4. Visual Flow:
           - User clicks "KKR" button
              ↓
           - moveSlidingLine gets the KKR button element
              ↓
           - Reads: width=200px, position=250px
              ↓
           - Moves sliding line: width=200px, left=250px
              ↓
           - Sliding line smoothly moves under KKR tab! 

        TL;DR:
        - offsetWidth & offsetLeft directly DOM button ki properties hain.
        - Pehli render par ref se, baaki buttons pe click par e.target se DOM milta hai.
        - tabLineRef.current pe ye properties lag jaati hain, isliye sliding bar exact correct jagah/size par dikhti hai.

        Ek Line Mein:


        Click Pe Kya Hoga:
        ```jsx
        onClick={(e) => togleBtn(e.target, i)}
        ```

        Initial render pe sliding line first button ki ref se set hoti hai, aur baad me koi bhi button click karo, sliding line directly us button ke neeche aa jaati hai kyunki onClick me wahi button ka DOM object mil jata hai.

    3. Flow:
       - Buttons: [MI] [KKR] [RCB]
       - Only MI (i=0) goes in box: btnRef = [MI BUTTON]
       - KKR and RCB get null: ignored
       - Think: Jaise family photo - sirf first person ko special frame diya

    4. Complex Visual Flow:
       START: teams = [{path: "/mi", title: "MI"}, ...]
            ↓
       STEP 1: Check length > 2? → YES
            ↓  
       STEP 2: Har item ke liye:
          - path = "/mi", title = "MI", i = 0
          - Link banayo "/mi" pe jane ke liye
          - Button banayo "MI" text ke saath
          - 🎯 First button ko dibbe mein daalo
          - Colors set karo active/inactive
          - Click handler lagao
            ↓
       END: Navigation buttons ready!

12. The Complete Flow
   a. Initial Setup (When page loads):
      1. User opens page → activeTabIndex = 0 (MI channel)
      2. slidingLineRef gets connected to the sliding line
      3. firstButtonRef gets connected to MI button
      4. useEffect runs → positions sliding line under MI button
      5. children[0] shows → MI players content

   b. User Clicks "KKR" Button:
      - USER ACTION: Click "KKR" button
                 ↓
      - FUNCTION: handleTabClick(clickedButton, 1)
                 ↓
      - DATA FLOW:
        1. clickedButton = the actual KKR button element
        2. tabIndex = 1 (KKR channel number)
                 ↓
      - ANIMATION:
        1. Get KKR button position: width=200px, left=250px  
        2. Move sliding line: width=200px, left=250px
        3. slidingLineRef.current.style updates → line moves!
                 ↓
      - CONTENT SWITCH:
        1. setActiveTabIndex(1) → activeTabIndex becomes 1
        2. children[1] renders → KKR players appear!

13. Visual Data Flow Diagram:
   - MATCH DETAIL COMPONENT
         ↓
   - PROPS SENT:
     teams: ["MI", "KKR"] ────────────────────┐
                                              ↓
   - children: [MI-content, KKR-content] ────→ INPAGENAVIGATION
                                              ↓
   - INSIDE INPAGENAVIGATION:                 
     activeTabIndex: 0 or 1 ←──────────────────┐
                         ↓                     │
   - DISPLAY: children[activeTabIndex] ←───────┘
                         ↓
   - USER SEES: Either MI players or KKR players


14. The 'Magic' Behind Content Switching:
   ```jsx
   /**
    * The secret sauce:
   */
   {children[activeTabIndex]}
   
   /**
    * What this means:
    * - If activeTabIndex = 0 → children[0] → MI players
    * - If activeTabIndex = 1 → children[1] → KKR players
   */
   ```

   Think of it like:
   ```jsx
   const TVChannels = {
       0: "MI Players Channel",
       1: "KKR Players Channel"  
   };
   
   const currentChannel = TVChannels[activeTabIndex];
   ```

15. Complete Step-by-Step Journey:
   Scenario: User wants to see KKR Players
      1. PAGE LOADS:
         - activeTabIndex = 0 (MI selected by default)
         - Sliding line under MI button
         - MI players visible
      
      2. USER CLICKS "KKR":
         - handleTabClick runs with:
           * clickedButton = KKR button element  
           * tabIndex = 1
      
      3. ANIMATION HAPPENS:
         - slidingLineRef.current moves to KKR button position
         - Smooth transition animation
      
      4. CONTENT CHANGES:
         - setActiveTabIndex(1) updates state
         - children[1] renders KKR players
         - User now sees KKR team!
      
      5. FINAL STATE:
         - activeTabIndex = 1
         - Sliding line under KKR button  
         - KKR players displayed



14. Final Code:
```jsx
function InPageNavigation({ teams, children }) {
  /* STEP 1: useRef boxes banaye */
  let tabLineRef = useRef();  /* 🎁 Box 1 - Sliding line */
  let btnRef = useRef();      /* 🎁 Box 2 - First button */

  function togleBtn(btn, i) {
    /* STEP 5: useRef use karo sliding line ko move karne ke liye */
    let { offsetWidth, offsetLeft } = btn;
    tabLineRef.current.style.width = offsetWidth + "px";  // 🎯 Direct access
    tabLineRef.current.style.left = offsetLeft + "px";    // 🎯 Direct access
    setIndex(i);
  }

  useEffect(() => {
    /* STEP 4: useRef use karo initial setup ke liye */
    togleBtn(btnRef.current, 0);  // 🎯 Direct first button access
  }, []);

  return (
    <div>
      {/* Button(Link) + Sliding Underline Effect */} 
      <div>
        {teams.length > 2
          ? teams.map(({ path, title }, i) => (
            /**
             * STEP 3: First Button useRef
             * Why only the first button? 
             * > Because we need to know where to put the sliding 
             *   under-line initially!
             * > Imagine: The remote control's pointer should start
             *   under "MI" by default.
             *
             *
             * 1. Create a reference box for the first button.
             *    > let btnRef = useRef();
             *    > This will let us access the DOM element (real 
             *      button!) directly.
             *
             * 2. Attach ref to only the first button:
             *    - ref={i === 0 ? btnRef : null}
             *    - Means: If this is the very first button (index 0), 
             *      assign the ref. Other buttons get "null" (no ref).
             *
             * 3. After the component loads (mounts), useEffect runs:
             *    - useEffect(() => { 
             *         togleBtn(btnRef.current, 0); 
             *      }, []);
             *    - This makes sure the sliding underline is shown 
             *      under the first button when the page loads.
             *    - btnRef.current now refers to the actual <button> 
             *      element in the DOM.
             *
             * 4. What is "togleBtn"? 
             *    It reads the first button's width and left position:
             *    - offsetWidth = width of the button (how wide)
             *    - offsetLeft  = how far it is from the left side
             *    - We set the sliding underline's CSS left/width to 
             *      match the button. So, sliding line exactly matches
             *      the first button!
             *
             * 5. Why only useRef on the first button?
             *    - We only need to know where to start the underline. 
             *    - When the user clicks another tab, we can read info 
             *      from the button they clicked (via event).
             *    - This pattern keeps things simple for initialization.
             *
             * 6. onClick changing effect to other button:
             *    - When you click on ANY button (onClick), the sliding
             *      underline ("effect line") moves to that button.
             *    - It works for all tabs: 
             *      onClick={(e) => togleBtn(e.target, i)} reads the 
             *      clicked button's position and size, then moves the
             *      underline there by updating tabLineRef.current via
             *      DOM style.
             *    - So, clicking any tab (not just first!) changes the
             *      effect.
             */
              <Link to={path} key={path || i}>
                  ref={i == 0 ? btnRef : null}  {/* Only first button */} 
                  onClick={(e) => togleBtn(e.target, i)}
                >
                  {title}
                </button>
              </Link>
            ))
          : teams.map((data, i) => (
            /**
             * STEP 3: First Button useRef
             * Why only the first button? 
             * > Because we need to know where to put the sliding 
             *   under-line initially!
             * > Imagine: The remote control's pointer should start
             *   under "MI" by default.
             *
             *
             * 1. Create a reference box for the first button.
             *    > let btnRef = useRef();
             *    > This will let us access the DOM element (real 
             *      button!) directly.
             *
             * 2. Attach ref to only the first button:
             *    - ref={i === 0 ? btnRef : null}
             *    - Means: If this is the very first button (index 0), 
             *      assign the ref. Other buttons get "null" (no ref).
             *
             * 3. After the component loads (mounts), useEffect runs:
             *    - useEffect(() => { 
             *         togleBtn(btnRef.current, 0); 
             *      }, []);
             *    - This makes sure the sliding underline is shown 
             *      under the first button when the page loads.
             *    - btnRef.current now refers to the actual <button> 
             *      element in the DOM.
             *
             * 4. What is "togleBtn"? 
             *    It reads the first button's width and left position:
             *    - offsetWidth = width of the button (how wide)
             *    - offsetLeft  = how far it is from the left side
             *    - We set the sliding underline's CSS left/width to 
             *      match the button. So, sliding line exactly matches
             *      the first button!
             *
             * 5. Why only useRef on the first button?
             *    - We only need to know where to start the underline. 
             *    - When the user clicks another tab, we can read info 
             *      from the button they clicked (via event).
             *    - This pattern keeps things simple for initialization.
             *
             * 6. onClick changing effect to other button:
             *    - When you click on ANY button (onClick), the sliding
             *      underline ("effect line") moves to that button.
             *    - It works for all tabs: 
             *      onClick={(e) => togleBtn(e.target, i)} reads the 
             *      clicked button's position and size, then moves the
             *      underline there by updating tabLineRef.current via
             *      DOM style.
             *    - So, clicking any tab (not just first!) changes the
             *      effect.
             */
              <button
                ref={i === 0 ? btnRef : null}  // 🎯 Sirf first button pe lagao
                onClick={(e) => togleBtn(e.target, i)}
              >
                {data}
              </button>
            ))}

        {/* STEP 2: useRef lagao sliding line pe (sliding effect)
         *          (Sliding Underline Effect - DOM Manipulation)
         *    a. Create a box to hold the width and left of the button
         *       - const tabLineRef = useRef(null);
         *    b. Target the <hr> element (effect line)
         *       - ref={tabLineRef}
         *       - tabLineRef.current = <hr className={...} /> 
         *         (<hr/> element pe humara sliding effect implement)
         *    c. Jab bhi togleBtn chalate hain (ya useEffect chalti hai),
         *       btn ka size (offsetWidth) aur left (offsetLeft) nikal ke,
         *       tabLineRef.current me un values ko dal dete hain:
         *         tabLineRef.current.style.width = offsetWidth + "px"
         *         tabLineRef.current.style.left = offsetLeft + "px"
         *    d. Isse white sliding line bilkul button ke neeche aa jati hai!
         * */}
        <hr
          ref={tabLineRef}
          className="border-white absolute border-2 duration-300"
        />
      </div>

      {/* Display Team Members */}
      {teams.length > 2 ? "" : children[index]}
    </div>
  );
}
```

Note: Data Manipulation k liye hum useState use karte hai aur DOM Manipulation like styling or animation etc k liye we use useRef.


                {/**

                 */}
                ref={i === 0 ? btnRef : null}  // 🎯 Sirf pehla button: direct reference
                onClick={(e) => togleBtn(e.target, i)}
              >
                {data}
              </button>
            ))}

        {/* STEP 2: tabLineRef useRef (sliding underline effect)
         *    a. tabLineRef ek dabba hai jo <hr> sliding line ka real DOM pakadta hai

         *
         *    // useEffect summary (easy words):
         *    - Page khulte hi useEffect => togleBtn(btnRef.current, 0)
         *    - Is line se hum btnRef wali value (i.e. pehle button ka size/position)
         *      tabLineRef me dal dete hain -> sliding line slide ho ke aa jati hai!
         */}