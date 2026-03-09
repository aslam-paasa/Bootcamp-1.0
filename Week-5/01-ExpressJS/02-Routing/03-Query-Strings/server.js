/*
  ASSIGNMENT 6 — Query Strings: /search?name=john
  =================================================

  WHAT IS A QUERY STRING?
  A query string is extra information added at the END of a URL
  after a "?" symbol. It is made up of key=value pairs.

  URL: /search?name=john
               ↑    ↑
              key  value

  Multiple query strings are separated by "&":
  /search?name=john&city=delhi&age=25
          ↑          ↑          ↑
        pair 1     pair 2     pair 3

  HOW TO ACCESS IT:
  Query strings are available inside req.query
  URL: /search?name=john  →  req.query.name  →  "john"
  URL: /search?name=john&city=delhi  →  req.query  →  { name: "john", city: "delhi" }

  DIFFERENCE FROM ROUTE PARAMETERS:
  Route param  → part of the URL path  → /users/:id     → REQUIRED
  Query string → after the "?" symbol  → /search?name=  → OPTIONAL

  Use route params for identifying a specific resource (e.g. user by id).
  Use query strings for filtering, searching, or sorting data.

  SETUP (run in terminal before starting):
  -----------------------------------------
  npm init -y
  npm install express
  node assignment-06.js

  Then test in browser → http://localhost:3000/search?name=alice
*/

const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

/*
  Fake database — array of users to search/filter through.
*/
const users = [
    { id: 1, name: "Alice", city: "Delhi", age: 25 },
    { id: 2, name: "Bob", city: "Mumbai", age: 30 },
    { id: 3, name: "Carol", city: "Delhi", age: 22 },
    { id: 4, name: "Dave", city: "Mumbai", age: 28 },
];

/*
  Route: GET /search?name=john
  -----------------------------
  req.query.name reads the "name" value from the URL query string.
  If no name is provided, we return an error asking for one.

  Test in browser:
  → http://localhost:3000/search?name=alice
  → http://localhost:3000/search?name=bob
  → http://localhost:3000/search          (no query → shows error)
*/
app.get("/search", (req, res) => {
    const name = req.query.name;

    if (!name) {
        return res.status(400).json({ error: "Please provide a name. Example: /search?name=alice" });
    }

    const results = users.filter((u) =>
        u.name.toLowerCase().includes(name.toLowerCase())
    );

    res.json({ query: name, count: results.length, results });
});

/*
  Route: GET /filter?city=delhi
  ------------------------------
  Using query strings to FILTER users by city.

  Test in browser:
  → http://localhost:3000/filter?city=delhi
  → http://localhost:3000/filter?city=mumbai
*/
app.get("/filter", (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ error: "Please provide a city. Example: /filter?city=delhi" });
    }

    const results = users.filter((u) =>
        u.city.toLowerCase() === city.toLowerCase()
    );

    res.json({ city, count: results.length, results });
});

/*
  Route: GET /users?city=delhi&age=25
  -------------------------------------
  You can combine MULTIPLE query strings to filter more precisely.
  Both filters are applied together — only users matching both will show.

  req.query gives you ALL key=value pairs as an object.
  URL: /users?city=delhi&age=25
  req.query → { city: "delhi", age: "25" }

  Test in browser:
  → http://localhost:3000/users?city=delhi&age=25
  → http://localhost:3000/users?city=mumbai&age=30
  → http://localhost:3000/users?city=delhi         (age not provided → ignored)
*/
app.get("/users", (req, res) => {
    const { city, age } = req.query;

    let results = users;

    if (city) {
        results = results.filter((u) => u.city.toLowerCase() === city.toLowerCase());
    }

    if (age) {
        results = results.filter((u) => u.age === parseInt(age));
    }

    res.json({ filters: req.query, count: results.length, results });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});