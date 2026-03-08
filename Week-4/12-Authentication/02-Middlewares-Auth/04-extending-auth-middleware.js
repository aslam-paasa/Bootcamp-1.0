/**
 * Q. Modify the existing authVerify middleware to include the user's
 *    detail in the req.user object. 
 * Q. When the token is present, set req.user with:
 *    { id: "123", name: tanay }, & then call next().
 * Q. Access req.user in /orders route.
 * */ 


const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors())

// this will not talk to DB ever
function authVerify(req, res, next) {
  const token = req.headers.authorization;
  if (token === "abcdefghi") {
    req.user = { id: '123', name: "Tanay"}  // 
    return next();
  } res.status(401).json({ message: "Unauthorised access, please add the token"}) 
}


app.get('/orders', authVerify, (req, res) => {
  console.log(req.user)
  res.json([{ item: "goggles"}])
});

app.get('/cart', authVerify, (req, res) => {
  res.json({ cart: []})
})

app.post('/login', (req, res) => {
  // read username/password from the body
  // check in array/db if the username password pair is correct
  // if yes, then send them a token { token: "abcdefghi"}

  // if not, then send them a 401 response
})

app.listen(3000, () => {
  console.log('server started');
});