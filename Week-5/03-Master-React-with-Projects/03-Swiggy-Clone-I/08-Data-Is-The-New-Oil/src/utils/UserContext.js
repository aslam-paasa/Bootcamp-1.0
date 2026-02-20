/**
 * 1. Create a Context:
 *    - Provide some piece of information that it will hold. (global data)
*/
import { createContext } from "react";

const UserContext = createContext({
    loggedInUser: "Default User",
});

export default UserContext;