import { useState } from "react";
import { useNavigate } from "react-router";
import apiClient from "../../service/apiClient";

function Signup() {
  /**
   * Collect all the data from the form:
   * - name, email, password
  */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**
   * State variables to handle loading and error
  */
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /**
   * Navigation: For redirecting to login page without reloading the page
  */
  const navigate = useNavigate();


  /**
   * Handle form submission, after form is submitted:
   * 1. Prevent default, start loading, clear errors
   * 2. Send signup data to backend
   * 3. Handle success/error response
   * 4. Handle technical errors
   * 5. Stop loading
  */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log(`Trying to do a signup with ${name}, ${email}, ${password}`);
      const data = await apiClient.signup(name, email, password);
      console.log("Signup data", data);

      if (data.success) {
        navigate("/login");
      } 
      else {
        setError(data.message || "Signup nahi ho paya");
      }
    } 
    catch (error) {
      setError(error.message || "Signup nahi ho paya");
    }
    finally {
      setLoading(false);
    }
  };

  /**
   * Form:
   * 1. Create form with 3 fields: name, email, password
   * 2. Add a submit button
   * 3. Add a loader to show while the form is being submitted
   * 4. Add a error message to show if the form is not valid
   * 
  */
  return (
    <div className="signup">
      <h1>Welcome to the Signup Page</h1>
      {error && <div>Error: {error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" disabled={loading}>{loading ? "Signing up..." : "Signup"}</button>
      </form>
    </div>
  );
}

export default Signup;
