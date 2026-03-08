import { Button } from "../components/mainPage/Button"
import { Input } from "../components/mainPage/Input"
import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signup() {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    const handleSignup = () => {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        axios.post(`${BACKEND_URL}/api/v1/signup`, {
                username,
                password
        })
        navigate("/signin");
    }

    return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded border min-w-48 p-8 rounded-lg">
                <Input placeholder="Username" onRef={usernameRef} />
                <Input placeholder="Password" onRef={passwordRef} />
                <div className="flex justify-center pt-4">
                    <Button variant="primary" text="Signup" fullWidth={true} loading={false} onClick={handleSignup} />
                </div>
            </div>
        </div>
    )
}