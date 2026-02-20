import { Navigate } from "react-router-dom";
import { AuthContext } from "../main.jsx";
import { useContext } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";


function RequiresAuth({ children }) {

  const { isLoggedIn } = useContext(AuthContext);

  /**
   * Step-1: Get the previous path
  */
  const location = useLocation();

  /**
   * Step-2: Return the component or navigate to the login page
  */
  return isLoggedIn ? children : <Navigate to="/login" state={{ from: location }} />
}

RequiresAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RequiresAuth
