import { useState } from "react";
import "./App.css";

function FormValidation() {
    /**
     * 1. State:
     *    - username       : string
     *    - email          : string
     *    - password       : string
     *    - confirmPassword: string
     */
    const [username, setusername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    /**
     * 2. State:
     *    - errorUserName       : string
     *    - errorEmail          : string
     *    - errorPassword       : string
     *    - errorConfrimPassword: string
     */
    const [errorUserName, setErrorUserName] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorConfrimPassword, setErrorConfirmPassword] = useState("");

    /**
     * 3. State:
     *    - userColor           : string
     *    - emailColor          : string
     *    - passwordColor       : string
     *    - confirmPasswordColor: string
     */
    const [userColor, setUserColor] = useState("");
    const [emailColor, setEmailColor] = useState("");
    const [passwordColor, setPasswordColor] = useState("");
    const [confirmPasswordColor, setConfirmPasswordColor] = useState("");

    /**
     * 4. Function:
     *    - validate: function to validate the form
     *      a. username
     *      b. email
     *      c. password
     *      d. confirmPassword
     *    - e.preventDefault is used to prevent the default behavior of the 
     *      form i.e. page reload after submitting the form. 
     */
    function validate(e) {
        e.preventDefault();

        if (username.length > 8) {
            setErrorUserName("");
            setUserColor("green");
        } else {
            setErrorUserName("Username must be 8 letters long.");
            setUserColor("red");
        }

        if (email.includes("@gmail")) {
            setErrorEmail("");
            setEmailColor("green");
        } else {
            setEmailColor("red");
            setErrorEmail("Email should have @gmail");
        }

        if (password.length > 8) {
            setErrorPassword("");
            setPasswordColor("green");
        } else {
            setErrorPassword("Password should be 8 letters long ");
            setPasswordColor("red");
        }

        if (password != "" && password == confirmPassword) {
            setErrorConfirmPassword("");
            setConfirmPasswordColor("green");
        } else {
            setErrorConfirmPassword("Passwords didn't matched.");
            setConfirmPasswordColor("red");
        }
    }

    /**
     * 5. Return:
     */
    return (
        <>
            <div className="card">
                <div className="card-image"></div>

                <form>
                    <input
                        type="text"
                        placeholder="Name"
                        style={{ borderColor: userColor }}
                        value={username}
                        onChange={(e) => setusername(e.target.value)}
                    />

                    <p className="error">{errorUserName}</p>

                    <input
                        type="text"
                        placeholder="Email"
                        style={{ borderColor: emailColor }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <p className="error">{errorEmail}</p>

                    <input
                        type="password"
                        placeholder="Password"
                        style={{ borderColor: passwordColor }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <p className="error">{errorPassword}</p>

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        style={{ borderColor: confirmPasswordColor }}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <p className="error">{errorConfrimPassword}</p>

                    <button className="submit-btn" onClick={validate}>
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
}

export default FormValidation;
