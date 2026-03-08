/**
 * Exercise: Skipping a Route in Next.js (Route Groups)
 * In the last lesson, we learned about "private routes" in Next.js:
 * a. Private routes help us control what is "hidden".
 * b. Skip routes (also called "route groups") help us keep our file 
 *   structure neat—without affecting the URLs.
 *
 * What is a "Skip Route" or Route Group?
 * > Sometimes you want your folders like "auth" to help organize your
 *   code (for example, you put login and register inside "auth"). But you
 *   want users to be able to visit /login and /register (not /auth/login).
 * 
 * Instructions:
 * 1. Create the 'users' folder (but it shouldn't be a route)
 * 2. Inside the 'users' folder create a 'userinfo' route
 * 3. Inside the 'app' directory create another folder name 'auth' but it
 *    (shouldn't be a route)
 * 4. Inside the 'auth' folder create a login route which will only print
 *    (Please login to see the content)
 */

const HomePage = () => {
    return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
            <h1 style={{ fontWeight: "bold", fontSize: "2rem" }}>
                🏠 Home Page — Skip Route (Route Groups) Demo
            </h1>
            <p style={{ marginTop: "1rem", color: "#444" }}>
                <strong>Why use skip/route groups?</strong><br />
                They let you organize your code into folders like <code>(auth)</code> and <code>(users)</code> 
                <br />
                <span style={{ color: "#2274a5" }}>(skip folders are ignored in the URL!)</span>
            </p>
            <p style={{ marginTop: "0.5rem", color: "#444" }}>
                <strong>In this project:</strong><br />
                We have two skip folders:
                <ul style={{ listStyle: "none", padding: 0, marginTop: 8 }}>
                    <li>
                        <code>(auth)/login</code>&nbsp;
                        <span style={{ color: "#888" }}>(visit <code>/login</code>)</span>
                    </li>
                    <li>
                        <code>(users)/userinfo</code>&nbsp;
                        <span style={{ color: "#888" }}>(visit <code>/userinfo</code>)</span>
                    </li>
                </ul>
                <em>No <code>/auth</code> or <code>/users</code> in the URL!</em>
            </p>
            <p style={{ marginTop: "0.75rem", color: "#666" }}>
                See <code>/login</code> ("Please Login To See The Content") <br />
                See <code>/userinfo</code> ("User Information")
            </p>
        </div>
    );
};

export default HomePage;