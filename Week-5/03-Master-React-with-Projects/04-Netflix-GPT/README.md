# Netflix-GPT
- Create React App
- Configured TailwindCSS
- Header
- Routing of App
- Login Form
- Sign up Form
- Form Validation
- useRef Hook
- Firebase Setup
- Deploying our app to production
- Create SignUp User Account in Firebase
- Implement Sign In User API
- Created Redux Store with userSlice
- Implemented Sign Out 
- Update Profile 
- BugFix: Sign Up user displayName and profile picture update
- BugFix: If the user is not logged in, redirect /browse to Login Page
  and vice versa.
- Unsubscribed to the onAuthStateChanged callback
- Add hardcoded values to the constants file
- Register TMDB API & create an app & get access token
- Get Data from TMDB now playing movies list API


# Features
- Login/Sign Up
  - Sign In/Sign Up Form
  - Redirect to Browser Page
- Browser (After Authentication)
  - Header
  - Main Movie
    - Trailer in Background
    - Title & Description
    - MovieSuggestions Slider
      - MovieList * N 
- NetflixGPT
  - Search Bar
  - Movie Suggestions

1. Login Form:
```jsx
const Login = () => {
    return (
        <div>
            <form>
                <h1>Sign In</h1>
                <input type="text" placeholder="Email Address" />
                <input type="password" placeholder="Password" />
                <button>Sign In</button>
            </form>
        </div>
    )
}
export default Login
```

2. Sign Up Form:
- Toggle b/w dynamic Login and SignUp Form
```jsx
const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState();

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }

    return (
        <div>
            <form onSubmit={(e) => e.preventDefault()}>
                <h1>{isSignInForm ? "Sign Up" : "Sign In"}</h1>
                {!isSignInForm && <input
                    type="text"
                    placeholder="Full Name"
                />}
                <input
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    type="password"
                    placeholder="Password"
                />
                <button>
                    {isSignInForm ? "Sign Up" : "Sign In"}
                </button>

                <p onClick={toggleSignInForm}>
                    {isSignInForm ? "Already registered? Sign In Now." : "New to Netflix? Sign Up Now"}
                </p>
            </form>
        </div>
    )
}

export default Login
```

3. useRef Hook: Read the form data
   - Usually, to get data from input boxes, we create state variables
     using useState.
   - But there is another simple way. Instead of using state, we can
     use useRef.
   - useRef helps us to get the value of an input box directly, without
     storing it in state.
   - Using reference, we can:
     a. find that input box
     b. read whatever the user typed inside it
   - So, a reference is just a way to access an input box directly.

   Creating reference:
   - const email = useRef(null);
   - const password = useRef(null);
   - This means:
     a. email will point to the email input box
     b. password will point to the password input box
     c. null means the input box is not connected yet 
        (React will connect it later)

   Pointing Email ref to the Email Input Box:
   - <input
        ref={email}
        type="text"
        placeholder="Email Address"
        className="p-4 my-4 w-full bg-gray-700"
      />
   - What this means:
     a. ref={email}: This connects the email ref to this input box
     b. email references points to this email input box

   Pointing Password ref to the Password Input Box:
   - <input
        ref={password}
        type="password"
        placeholder="Password"
        className="p-4 my-4 w-full bg-gray-700"
     />
   - What this means:
     a. ref={password}: This connects the password ref to the input box
     b. password reference points to this password input box

   Reading Input value using .current.value:
   ```jsx
    const Login = () => {
        const [isSignInForm, setIsSignInForm] = useState();

        const toggleSignInForm = () => {
            setIsSignInForm(!isSignInForm);
        }

        const email = useRef(null);
        const password = useRef(null);

        const handleButtonClick = () => {
            console.log(email.current.value);    /* reading email    */
            console.log(password.current.value); /* reading password */
        }

        return (
            <div>
                <form onSubmit={(e) => e.preventDefault()}>
                    <h1>{isSignInForm ? "Sign Up" : "Sign In"}</h1>
                    {!isSignInForm && <input
                        type="text"
                        placeholder="Full Name"
                    />}
                    <input
                        ref={email}
                        type="text"
                        placeholder="Email Address"
                    />
                    <input
                        ref={password}
                        type="password"
                        placeholder="Password"
                    />
                    <button onClick={handleButtonClick}>
                        {isSignInForm ? "Sign Up" : "Sign In"}
                    </button>

                    <p onClick={toggleSignInForm}>
                        {isSignInForm ? "Already registered? Sign In Now." : "New to Netflix? Sign Up Now"}
                    </p>
                </form>
            </div>
        )
    }

    export default Login
    ```




4. Form Validation:
   - When we click on SignIn:
     - Get form data
     - validate the form
     - error: show error

    ```jsx
    /* utils/validate.js */
    export const checkValidData = (email, password) => {
        const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
        const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

        if(!isEmailValid) return "Email ID is not valid";
        if(!isPasswordValid) return "Password is not valid";

        return null; /* null: no error */
    }
    ```

    ```jsx
    /* Login.jsx: Get the form data, validate it & show error msg */
    const handleButtonClick = () => {
        /* 1. Validate the form data */
        const emailValue = email.current.value;
        const passwordValue = password.current.value;
        const nameValue = !isSignInForm ? name.current.value : null;

        const message = checkValidData(emailValue, passwordValue);
        setErrorMessage(message);

        if(!message && !isSignInForm) {
            console.log("Name", nameValue);
            console.log("Email:", emailValue);
            console.log("Password:", passwordValue);
        }
        
        /* 2. Sign In / Sign Up */
    }
    ```

    ```jsx
    const Login = () => {
        const [isSignInForm, setIsSignInForm] = useState();
        const [errorMessage, setErrorMessage] = useState(null);

        const email = useRef(null);
        const password = useRef(null);

        const toggleSignInForm = () => {
            setIsSignInForm(!isSignInForm);
        }

        const email = useRef(null);
        const password = useRef(null);

        const handleButtonClick = () => {
            /* 1. Validate the form data */
            const emailValue = email.current.value;
            const passwordValue = password.current.value;
            const nameValue = !isSignInForm ? name.current.value : null;

            const message = checkValidData(emailValue, passwordValue);
            setErrorMessage(message);

            if(!message && !isSignInForm) {
                console.log("Name", nameValue);
                console.log("Email:", emailValue);
                console.log("Password:", passwordValue);
            }
            
            /* 2. Sign In / Sign Up */
        }

        return (
            <div>
                <form onSubmit={(e) => e.preventDefault()}>
                    <h1>{isSignInForm ? "Sign Up" : "Sign In"}</h1>
                    {!isSignInForm && <input
                        type="text"
                        placeholder="Full Name"
                    />}
                    <input
                        ref={email}
                        type="text"
                        placeholder="Email Address"
                    />
                    <input
                        ref={password}
                        type="password"
                        placeholder="Password"
                    />
                    <button onClick={handleButtonClick}>
                        {isSignInForm ? "Sign Up" : "Sign In"}
                    </button>

                    <p onClick={toggleSignInForm}>
                        {isSignInForm ? "Already registered? Sign In Now." : "New to Netflix? Sign Up Now"}
                    </p>
                </form>
            </div>
        )
    }

    export default Login
    ```

5. Backend Authentication: Firebase
   a. Install firebase: npm install firebase
   b. Import firebase using SDK
    ```jsx
        import { initializeApp } from "firebase/app";
        import { getAnalytics } from "firebase/analytics";

        const firebaseConfig = {
        apiKey: "AIzaSyB64_HdzlNEoW8xZ4JsIKCCMtI73IE7gKc",
        authDomain: "netflix-gpt-61aed.firebaseapp.com",
        projectId: "netflix-gpt-61aed",
        storageBucket: "netflix-gpt-61aed.firebasestorage.app",
        messagingSenderId: "544097791710",
        appId: "1:544097791710:web:be4070003d490b9da4dc4f",
        measurementId: "G-TG9F38CVNV"
        };

        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);
    ```
   c. Install firebase CLI: npm install -g firebase-tools
   d. Login Command: firebase login
   e. Initialize firebase: firebase init
      - public folder: dist
      - Configure to Single-Page App: No
      - Set up Automatic builds and deploys with GitHub: No
   f. npm run build
   g. firebase deploy
   h. SignUp & Sign In API Calls:
      ```jsx
      /* firebase.js */
        export const auth = getAuth(); 
      ```

      ```jsx
      /* Login.jsx */
        import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
        import { auth } from "../utils/firebase";

        const handleButtonClick = () => {
            /* a. Validate form data */
            const message = checkValidData(email.current.value, password.current.value);
            setErrorMessage(message);

            /* b. No Error: Sign In / Sign Up */

            if (!isSignInForm) {
                /* Firebase: Sign Up Logic */
                createUserWithEmailAndPassword(
                    auth,
                    email.current.value,
                    password.current.value
                ).then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user);
                    navigate("/browse");
                }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });
            }
            else {
                /* Firebase: Sign In Logic */
                signInWithEmailAndPassword(
                    auth,
                    email.current.value,
                    password.current.value
                ).then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user);
                    navigate("/browse");
                }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });
            }
        }
      ```

6. Setup Redux Store: 
   - On our user Sign In, we will add our user to our Redux Store
     and will navigate the user to /browser page.
   - npm i -D @reduxjs/toolkit 
   - npm i react-redux

   a. Creating Redux Store: Central store of our app
      - configureStore() creates the Redux store
      - We register one slice called user.
      - That user state will be available as store.user.
      - So our state shape becomes:
        {
            user: { ...userData } OR null
        }
      ```jsx
        /* appStore.js */
        import { configureStore } from "@reduxjs/toolkit";
        import userReducer from "./userSlice"

        const appStore = configureStore(
            {
                reducer: {
                    user: userReducer,
                }
            }
        )

        export default appStore;
      ```

   b. Creating User Slice.js:
      - initialState is null - means no user logged in
      - addUser() - stores user object in Redux
      - removeUser() - sets state back to null
       ```jsx
        /* userSlice.js */
        import { createSlice } from "@reduxjs/toolkit";

        const userSlice = createSlice({
            name: 'user',
            initialState: null,
            reducers: {
                addUser: (state, action) => {
                    return action.payload;
                },
                removeUser: () => {
                    return null;
                }
            }
        })

        export const { addUser, removeUser } = userSlice.actions;
        export default userSlice.reducer;
       ```

    c. Providing Store to the App Component:
       - Provider makes the Redux store available to all components 
         inside your app.
       - Without this -> useDispatch()  and useSelector won't work.
       ```jsx
       /* App.jsx */
       import Body from './components/Body'
       import { Provider } from 'react-redux'
       import appStore from './utils/appStore'

       function App() {
            return (
                <Provider store={appStore}>
                    <Body />
                </Provider>
            )
       }

       export default App
       ```

    d. Implementing Sign In & Sign Up Firebase Logic:
       - Now the main part - Firebase Authentication
       - In Sign In case, you should NOT manually dispatch user here.
       - Instead, let onAuthStateChanged() handle it automatically.
       - This way your app stays consistent.

       - Why no dispatch here?
       - Because we will handle it globally using onAuthStateChanged()
    ```jsx
        /* Login.jsx */
        const Login = () => {
            const [isSignInForm, setIsSignInForm] = useState(true);
            const [errorMessage, setErrorMessage] = useState(null);

            const navigate = useNavigate();
            const dispatch = useDispatch();

            const name = useRef(null);
            const email = useRef(null);
            const password = useRef(null);

            const toggleSignInForm = () => {
                setIsSignInForm(!isSignInForm);
            }

            const handleButtonClick = () => {
                /* a. Validate form data */
                const message = checkValidData(email.current.value, password.current.value);
                setErrorMessage(message);

                /* b. No Error: Sign In / Sign Up */

                if (!isSignInForm) {
                    /* Firebase: Sign Up Logic */
                    createUserWithEmailAndPassword(
                        auth,
                        email.current.value,
                        password.current.value
                    ).then((userCredential) => {
                        const user = userCredential.user;
                        updateProfile(user, {
                            displayName: name.current.value, 
                            photoURL: "https://avatars.githubusercontent.com/u/36575542?v=4"
                        }).then(() => {
                            const { uid, email, displayName, photoURL } = auth.currentUser;
                            dispatch(addUser({
                                uid: uid,
                                email: email,
                                displayName: displayName,
                                photoURL: photoURL,
                            }))
                            navigate("/browse");
                        }).catch((error) => {
                            setErrorMessage(error.message);
                        });
                        console.log(user);
                    }).catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        setErrorMessage(errorCode + "-" + errorMessage);
                    });
                }
                else {
                    /* Firebase: Sign In Logic */
                    signInWithEmailAndPassword(
                        auth,
                        email.current.value,
                        password.current.value
                    ).then((userCredential) => {
                        const user = userCredential.user;
                        console.log(user);
                        navigate("/browse");
                    }).catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        setErrorMessage(errorCode + "-" + errorMessage);
                    });
                }
            }

            return (
                <div>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <h1>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
                        {!isSignInForm && <input
                            ref={name}
                            type="text"
                            placeholder="Full Name"
                        />}
                        <input
                            ref={email}
                            type="text"
                            placeholder="Email Address"
                        />
                        <input
                            ref={password}
                            type="password"
                            placeholder="Password"
                        />

                        <p>{errorMessage}</p>

                        <button onClick={handleButtonClick}>
                            {isSignInForm ? "Sign In" : "Sign Up"}
                        </button>

                        <p onClick={toggleSignInForm}>
                            {isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now."}
                        </p>
                    </form>
                </div>
            )
        }
    ```
    e. Listening to Auth State Changes:
       - This runs whenever auth state changes.
       - If user logs in - Redux updated automatically.
       - If user logs out - Redux cleared automatically.
       - Even on page refresh - it restores user state
       - This is correct production pattern.
    ```jsx

        const Body = () => {
            const dispatch = useDispatch();
            const navigate = useNavigate();

            useEffect(() => {
                const unsubscribe = onAuthStateChanged(auth, (user) => {
                    if (user) {
                        /* User Sign In */
                        const { uid, email, displayName, photoURL } = user;
                        
                        dispatch(addUser({
                            uid: uid,
                            email: email,
                            displayName: displayName,
                            photoURL: photoURL
                        }));

                        navigate("/browse");

                    } else {
                        /* User Signed Out */
                        dispatch(removeUser());
                        navigate("/");
                    }
                });

                return () => unsubscribe();
            }, []);

            return (
                <div>
                    <RouterProvider router={appRouter} />
                </div>
            )
        }

        export default Body;
    ```

    f. Implementing Sign Out:
       - You don't need to manually dispatch() here.
       - Because onAuthStateChanged() will detect sign out and handle 
         it automatically.
    ```jsx
        /* Header.jsx */
        const Header = () => {
            const navigate = useNavigate();
            const user = useSelector(store => store.user);

            const handleSignout = () => {
                signOut(auth)
                    .then(() => {
                        navigate("/")
                    }).catch((error) => {
                        console.log(error);
                        navigate("/error");
                    });
            }

            return (
                <div>
                    <img
                        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2026-01-09/consent/87b6a5c0-0104-4e96-a291-092c11350111/019ae4b5-d8fb-7693-90ba-7a61d24a8837/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
                        alt="logo"
                    />
                    {user && (
                        <div>
                            <img
                                className="w-12 h-12"
                                src={user?.photoURL}
                                alt="usericon"
                            />
                            <button onClick={handleSignout}>
                                (Sign Out)
                            </button>
                        </div>
                    )}
                </div>
            )
        }

        export default Header
    ```

    g. Flow:
       - User clicks Sign In ->
       - Firbase Authenticates ->
       - Auth state changes ->
       - onAuthStateChanged() runs ->
       - Redux updated ->
       - User navigated to /browse.

       - User clicks Sign Out ->
       - Firebase signs out ->
       - Auth state changes ->
       - Redux cleared ->
       - User navigated to /.

       - Everything is centralized. Everything consistent.


Refactoring Code & Bug Fixes:
1. Refactoring Body.jsx and moving useEffect to Header.jsx
   a. Earlier Structure (Problem Version): Body.jsx
      Body was doing three thing:
        - Creating router
        - Rendering RouterProvider
        - Listening to Firebase auth
        - Calling navigate() inside useEffect

   b. Example:
   ```jsx
    const Body = () => {

            const navigate = useNavigate();

            useEffect(() => {
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        navigate("/browse");
                    } else {
                        navigate("/");
                    }
                });
            }, []);

            return <RouterProvider router={appRouter} />;
        };
   ```

   c. What was actually happening:
      - Body Renders
      - RouterProvider initializes router
      - Router reads current URL
      - Router renders page
      - Then useEffect runs
      - Then navigate() runs
      - Issue:
        - Router already decided what they want to render...
        - Then we force navigation again.
        - So router says: "Okay user is on /browse"
        - Then useEffect says: "No no, go to /"
        - This created:
          - Extra navigation
          - Flicker
          - Double render
          - Hard-to-track route behavior
        - Basically Router and useEffect, both trying to control page flow

   d. Why this is architecturally weird:
      - Body is the component that creates the router.
      - But inside the same component, we were also forcing route changes
      - So:
        - Body -> creates router
        - Body -> overrides router
      - That's like:
        - You build traffic lights...
        - Then you stand in the middle of the road and manually stop cars

    e. After refactoring:
       - We moved the logic into Header.jsx
       - Now Body only does this:
        ```jsx
        const Body = () => {
            const appRouter = createBrowserRouter([
                {
                    path: "/",
                    element: <Login />
                },
                {
                    path: "/browse",
                    element: <Browse />
                }
            ])

            return (
                <div>
                    <RouterProvider router={appRouter} />
                </div>
            )
        }
        ```

    f. Header.jsx: Now Handles Auth
       - onAuthStateChanged() creates a listener
       - That listener keeps watching authentication changes.
       - If we don't clean it up:
         - Every time component mounts, a new listener is added.
         - Old listeners remain active.
         - Multiple listeners start firing.
         - Multiple dispatch calls happens.
       - So, we store it: const unsubscribe = onAuthStateChanged(...)
       - And when component unmounts: return () => unsubscribe();
       - This removes the listener cleanly.

       - Why this matters:
         - Without unsubscribe:
           Login - 1 listener
           Refresh - 2 listeners
           Navigate - 3 listeners
         - Now one auth change triggers multiple dispatch calls.
         - Hard-to-debug bugs start happening.

         - Without unsubscribe:
           Only one active listener at a time.

       ```jsx
        const Header = () => {
            const dispatch = useDispatch();
            const navigate = useNavigate();
            const user = useSelector(store => store.user);

            useEffect(() => {
                const unsubscribe = onAuthStateChanged(auth, (user) => {
                    if (user) {
                        /* Sign In Case */
                        const { uid, email, displayName, photoURL } = user;
                        dispatch(addUser({
                            uid: uid,
                            email: email,
                            displayName: displayName,
                            photoURL: photoURL
                        }));
                        navigate("/browse")
                    } else {
                        /* Sign Out Case */
                        dispatch(removeUser());
                        navigate("/");
                    }
                });
                return () => unsubscribe();
            }, []);

            const handleSignout = () => {
                signOut(auth)
                    .then(() => {
                        navigate("/")
                    }).catch((error) => {
                        console.log(error);
                        navigate("/error");
                    });
            }

            return (
                    <div>
                        <img
                            src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2026-01-09/consent/87b6a5c0-0104-4e96-a291-092c11350111/019ae4b5-d8fb-7693-90ba-7a61d24a8837/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
                            alt="logo"
                        />
                        {user && (
                            <div>
                                <img
                                    className="w-12 h-12"
                                    src={user?.photoURL}
                                    alt="usericon"
                                />
                                <button onClick={handleSignout}>
                                    (Sign Out)
                                </button>
                            </div>
                        )}
                    </div>
                )
        }
        ```

2. Bug: Logged-In User Is Not Redirected to /browse Every Time
   Bug: User Logged Out - User still able to access /browse directly via URL. Restrict it!

    Problem-1:
    - When a user is already logged in and visited /, they are not
      automatically redirected to /browse.
    - So a logged-in user can still see the login page.
    - Because your login page does not check whether the user 
      already exists in Redux.
    - Since onAuthStateChanges() updates Redux after the component
      mounts, there can be a short moment where the login page 
      renders before the redirect happens - or it never check at all

   Problem-2:
   - Even after logging out, a user can manually type /browse in
     the browser URL and still access the page.
   - Because Routing and Authentication are separate systems.
   - React Router does not automatically check whether a user is
     authenticated before rendering a route. So if someone types
     /browse, React simply renders that component - even if Redux
     says user = null.
   - This creates a security flow in the UI Layer.

    Solution: Public Route Guard
    ```jsx
            const user = useSelector(store => store.user);

            useEffect(() => {
                if (user) {
                    navigate("/browse");
                }
            }, [user]);
    ```

    Bug Fix:
    ```jsx
        /* Header.jsx */
        useEffect(() => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    /* Sign In Case */
                    const { uid, email, displayName, photoURL } = user;
                    dispatch(addUser({
                        uid: uid,
                        email: email,
                        displayName: displayName,
                        photoURL: photoURL
                    }));
                    navigate("/browse")
                } else {
                    /* Sign Out Case */
                    dispatch(removeUser());
                    navigate("/");
                }
            });
        }, []);
    ```

    Now:
    - Once login, if we try to go back to / page, it will redirect us
      to /browse.
    - Already logged in, automatically redirected
    - Once logout, if we try to go back to /browse, it will redirect
      us to /browse.

    Refactor Login: 
    - No need to navigate from here (remove it)
    - We'll only navigate from auth state change (Header.jsx)
    ```jsx
        const handleButtonClick = () => {
            /* a. Validate form data */
            const message = checkValidData(email.current.value, password.current.value);
            setErrorMessage(message);

            /* b. No Error: Sign In / Sign Up */
            if (!isSignInForm) {
                /* Firebase: Sign Up Logic */
                createUserWithEmailAndPassword(
                    auth,
                    email.current.value,
                    password.current.value
                ).then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value, 
                        photoURL: "https://avatars.githubusercontent.com/u/36575542?v=4"
                    }).then(() => {
                        const { uid, email, displayName, photoURL } = auth.currentUser;
                        dispatch(addUser({
                            uid: uid,
                            email: email,
                            displayName: displayName,
                            photoURL: photoURL,
                        }))
                    }).catch((error) => {
                        setErrorMessage(error.message);
                    });
                }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });
            }
            else {
                /* Firebase: Sign In Logic */
                signInWithEmailAndPassword(
                    auth,
                    email.current.value,
                    password.current.value
                ).then((userCredential) => {
                    const user = userCredential.user;
                }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });
            }
        }

    ```


# Adding Constants to the Project:
  - Earlier, we were directly writing URLs inside components like this:
    src="https://help.nflxext.com/helpcenter/OneTrust/..."
  - But this creates problems:
    - Hardcoded values scattered across files
    - Difficult to update later
    - Code becomes messy
    - Repeated strings everywhere
  - So we refactored and centralized these value.

  a. Create utils/constants.js:
     - Now we have a single place where static values live.
     - Think of it like a configuration center for reusable values.
    ```jsx
    export const LOGO = "https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2026-01-09/consent/87b6a5c0-0104-4e96-a291-092c11350111/019ae4b5-d8fb-7693-90ba-7a61d24a8837/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"

    export const USER_AVATAR = "https://avatars.githubusercontent.com/u/36575542?v=4";
    ```
  - 

  b. Use Constants in Header.jsx
     - Instead of hardcoding the logo URL:
    ```jsx
    <img
        className="w-44"
        src={LOGO}
        alt="logo"
    />
    ```
     - Now:
       - Header doesn't care what the logo URL is.
       - It just uses LOGO.
       - If logo changes tomorrow, update one file only,

  c. Use Constants in Header.jsx
     - Instead of hardcoding the avatar URL:
    ```jsx
    updateProfile(user, {
        displayName: name.current.value, 
        photoURL: USER_AVATAR
    })
    ```
    - If you want to change default avatar later → just change it in constants.js.
    - No need to search entire project.

Get Data from TMDB now playing movies list API:
```jsx
/* constants.js */
export const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZGM5ODdiNTJiYmUxYThiMWE0Zjg2MDhiNmNjOTE5MCIsIm5iZiI6MTc3MDg3NjA2Mi44OTkwMDAyLCJzdWIiOiI2OThkNmM5ZTcwZTE1NGE0OWY0MTZiNzkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.WRjcysq1qswaJyuutMxA88gI3JK3F3-p2eQZv82At4A'
    }
};
```

```jsx
/* Browse.jsx */
const Browse = () => {

    const getNowPlayingMovies = async () => {
        const data = await fetch(
            'https://api.themoviedb.org/3/movie/now_playing?page=1',
            API_OPTIONS
        );

        const json = await data.json();
        console.log(json.results);
    }

    useEffect(() => {
        getNowPlayingMovies();
    }, [])

    return (
        <div>
            <Header />
        </div>
    )
}
```

Adding movie data to the store (movieSlice):
a. Creating movieSlice:
```jsx
import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        nowPlayingMovies: null
    },
    reducers: {
        addNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload;
        }
    }
})

export const { addNowPlayingMovies } = moviesSlice.actions;

export default moviesSlice.reducer;
```

b. Adding movieSlice to main store:
```jsx
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import moviesReducer from "./moviesSlice"

const appStore = configureStore(
    {
        reducer: {
            user: userReducer,
            movies: moviesReducer
        }
    }
)

export default appStore;
```

c. Add fetched movies data to the moviesSlice using dispatch(action):
```jsx
/* Browse.jsx */
    const dispatch = useDispatch();

    const getNowPlayingMovies = async () => {
        const data = await fetch(
            'https://api.themoviedb.org/3/movie/now_playing?page=1',
            API_OPTIONS
        );

        const json = await data.json();
        dispatch(addNowPlayingMovies(json.results));
    }

    useEffect(() => {
        getNowPlayingMovies();
    }, [])
```

d. Refactor Code: Creating your own custom hook
```jsx
    /* hooks/useNowPlayingMovies.js */    
    import { useEffect } from "react";
    import { API_OPTIONS } from "../utils/constants"
    import { useDispatch } from "react-redux";
    import { addNowPlayingMovies } from "../utils/moviesSlice";

    const useNowPlayingMovies = () => {
        const dispatch = useDispatch();

        const getNowPlayingMovies = async () => {
            const data = await fetch(
                'https://api.themoviedb.org/3/movie/now_playing?page=1',
                API_OPTIONS
            );

            const json = await data.json();
            dispatch(addNowPlayingMovies(json.results));
        }

        useEffect(() => {
            getNowPlayingMovies();
        }, [])

    }

    export default useNowPlayingMovies;
```

```jsx
    /* Browse.jsx */
    import Header from "./Header"
    import useNowPlayingMovies from "../hooks/useNowPlayingMovies"

    const Browse = () => {
        useNowPlayingMovies();

        return (
            <div>
                <Header />
            </div>
        )
    }
```

Building Browse Page:
a. Structure
   - MainContainer
     - VideoBackground
     - VideoTitle
   - SecondaryContainer
     - MovieList * n
       - Cards * n
