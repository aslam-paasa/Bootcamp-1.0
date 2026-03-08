import { Navigate } from "react-router-dom";

function RequiresAuth({ children, isLoggedIn }) {
  return isLoggedIn ? children : <Navigate to="/login" />
}

export default RequiresAuth
