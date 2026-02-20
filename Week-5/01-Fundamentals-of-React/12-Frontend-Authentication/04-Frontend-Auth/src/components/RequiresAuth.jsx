import { Navigate } from "react-router-dom";
import { AuthContext } from "../main.jsx";
import { useContext } from "react";

function RequiresAuth({ children }) {

  /**
   * Step-4: Destructure & Use the Context
  */
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? children : <Navigate to="/login" />
}

export default RequiresAuth
