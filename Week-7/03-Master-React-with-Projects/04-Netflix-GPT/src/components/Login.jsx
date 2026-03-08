import { useRef, useState } from "react"
import Header from "./Header"
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_AVATAR } from "../utils/constants";


const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

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
                    photoURL: USER_AVATAR
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
                console.log(user.displayName);
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode + "-" + errorMessage);
            });
        }
    }

    return (
        <div>
            <Header />
            <div className="absolute">
                <img
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/e49aba81-ee7c-4f19-baef-7c54bbab003e/web/IN-en-20260202-TRIFECTA-perspective_04f5de39-b518-493c-9a8d-6aef11af0457_large.jpg"
                    alt="logo"
                />
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="w-3/12 absolute p-12 bg-black/82 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
                <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
                {!isSignInForm && <input
                    ref={name}
                    type="text"
                    placeholder="Full Name"
                    className="p-4 my-4 w-full bg-gray-700"
                />}
                <input
                    ref={email}
                    type="text"
                    placeholder="Email Address"
                    className="p-4 my-4 w-full bg-gray-700"
                />
                <input
                    ref={password}
                    type="password"
                    placeholder="Password"
                    className="p-4 my-4 w-full bg-gray-700"
                />

                <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>

                <button className="p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </button>

                <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
                    {isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now."}
                </p>
            </form>
        </div>
    )
}

export default Login
