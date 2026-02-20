import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <>
      <div>
        {isLogin ? <Login /> : <Signup />}
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Signup" : "Login"}
        </button>
      </div>
    </>
  );
}

export default App;
