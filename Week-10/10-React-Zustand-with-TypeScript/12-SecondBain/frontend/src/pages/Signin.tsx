import { Button } from "../components/mainPage/Button"
import { Input } from "../components/mainPage/Input"
import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signin() {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    const handleSignin = () => {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        axios.post(`${BACKEND_URL}/api/v1/signin`, {
                username,
                password
        })
        .then((res) => {
            const token = res.data.token;
            localStorage.setItem("token", token);
            navigate("/dashboard");
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded border min-w-48 p-8 rounded-lg">
                <Input placeholder="Username" onRef={usernameRef} />
                <Input placeholder="Password" onRef={passwordRef} />
                <div className="flex justify-center pt-4">
                    <Button variant="primary" text="Signin" fullWidth={true} loading={false} onClick={handleSignin} />
                </div>
            </div>
        </div>
    )
}