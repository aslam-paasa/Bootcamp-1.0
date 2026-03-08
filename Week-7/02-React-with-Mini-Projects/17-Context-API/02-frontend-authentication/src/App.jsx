/**
 * Challenge: Auth
 * In this challenge, our goal is to make the user's authentication state
 * (as well as a way to update that state) available to anywhere in our
 * component tree that needs it.
 * 
 * You're given an 'authContext' with expected shape of the user's auth 
 * state - 'isAuthenticated: boolean', 'login: function', 'logout: function'. 
 * 
 * Your challenge is to finish the 'AuthProvider' component - making
 * 'isAuthenticated', 'login' and 'logout' available anywhere in the component
 * tree - and then to use those values in any component that needs them.
 * 
 * Tasks:
 * 1. Render a login form when the user is not authenticated.
 * 2. Display the Dashboard component after the user logs in
 * 3. Display the login screen if the user logs out
 * 
 * Hint:
 * 1. Remember, context is a transporter, not a way to manage state. We'll
 *    still need to do the "managing" to state ourselves with 'useState'. 
 * 
 *    Inside of 'AuthProvider', we'll need to update 'isAuthenticated' to be
 *    a piece of React state that we can then update in our 'login' and 'logout'
 *    functions. If it weren't a piece of state using 'useState', then our
 *    component would never re-render when it changes.
 * 
 *    const AuthProvider = ({ children }) => {
 *       const [isAuthenticated, setIsAuthenticated] = useState(false);
 *       
 *       const login = () => {
 *          setIsAuthenticated(true);
 *       };
 *
 *       const logout = () => {
 *          setIsAuthenticated(false);
 *       };
 *
 *       return (
 *          <authContext.Provider>
 *             {children}
 *          </authContext.Provider>
 *       );
 *    };
 * 
 * 2. In order to make 'isAuthenticated', 'login', and 'logout' available
 *    anywhere in the component tree, we'll need to pass them as values to
 *    the 'authContext.Provider' component.
 * 
 *    const AuthProvider = ({ children }) => {
 *       const [isAuthenticated, setIsAuthenticated] = useState(false);
 *       
 *       const login = () => {
 *          setIsAuthenticated(true);
 *       };
 *
 *       const logout = () => {
 *          setIsAuthenticated(false);
 *       };
 *
 *       return (
 *          <authContext.Provider value={{ isAuthenticated, login, logout }}>
 *             {children}
 *          </authContext.Provider>
 *       );
 *    };
 * 
 * 3. To get any of the values on our 'authContext', we can use 'useContext'
 *    passing it 'authContext'. 
 * 
 *    function Navbar() {
 *       const { logout, isAuthenticated } = React.useContext(authContext);
 *
 *       return (
 *          <nav>
 *             <span role="img" aria-label="Money bags emoji"> 💰 </span>
 *             {isAuthenticated && (
 *                <button className="link" onClick={logout}> Logout </button>
 *             )}
 *          </nav>
 *       );
 *    }
*/

import './App.css'

function Dashboard() {
  const transactions = [
    { id: 1, date: "2023-05-01", description: "Deposit", amount: 1000.0 },
    { id: 2, date: "2023-05-02", description: "Withdrawal", amount: 100.0 },
    { id: 3, date: "2023-05-03", description: "Purchase", amount: 50.0 },
    { id: 4, date: "2023-05-04", description: "Deposit", amount: 200.75 }
  ];

  return (
    <section>
      <h1>Account Summary</h1>
      <div>
        <strong>Balance:</strong> $2,432.97
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.date}</td>
                <td>{transaction.description}</td>
                <td>${transaction.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}


const authContext = React.createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {}
});

function AuthProvider ({ children }) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <authContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </authContext.Provider>
  );
}

function LoginForm() {
  const { login } = React.useContext(authContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get("username");
    const password = formData.get("password");
    login(username, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log In</h2>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          required
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          required
          id="password"
          type="password"
          name="password"
          placeholder="Enter your password"
        />
      </div>
      <button className="primary" type="submit">
        Login
      </button>
    </form>
  );
}

function NavBar() {
  const { logout, isAuthenticated } = React.useContext(authContext);

  return (
    <nav>
      <span role="img" aria-label="Money bags emoji">
        💰
      </span>
      {isAuthenticated && (
        <button className="link" onClick={logout}>
          Logout
        </button>
      )}
    </nav>
  );
}

function Main() {
  const { isAuthenticated } = React.useContext(authContext);

  return <main>{isAuthenticated ? <Dashboard /> : <LoginForm />}</main>;
}

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <Main />
    </AuthProvider>
  );
}

export default App
