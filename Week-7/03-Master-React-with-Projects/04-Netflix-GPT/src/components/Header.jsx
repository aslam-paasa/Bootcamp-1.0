import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { useDispatch } from "react-redux"
import { addUser, removeUser } from "../utils/userSlice"
import { LOGO } from "../utils/constants";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(store => store.user);

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

    const handleSignout = () => {
        signOut(auth)
            .then(() => { })
            .catch((error) => {
                console.log(error);
                navigate("/error");
            });
    }

    return (
        <div className="absolute w-screen px-8 py-2 bg-linear-to-b from-black z-10 flex justify-between">
            <img
                className="w-44"
                src={LOGO}
                alt="logo"
            />
            {user && (
                <div className="flex p-2">
                    <img
                        className="w-12 h-12"
                        src={user?.photoURL}
                        alt="usericon"
                    />
                    <button
                        className="font-bold text-white cursor-pointer"
                        onClick={handleSignout}
                    >
                        (Sign Out)
                    </button>
                </div>
            )}
        </div>
    )
}

export default Header
