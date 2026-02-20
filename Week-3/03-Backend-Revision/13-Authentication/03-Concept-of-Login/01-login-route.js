/**
 * Understanding:
 * Up until here, we have completed authentication concepts. This is it.
 * You have a secret between client and server. If you know the secret,
 * they can talk. Else, no talka talkie.
 * 
 * But do you see the glaring problem with this? If one client loses the
 * secret, everyone's security is compromised. This is where crypto-
 * graphy comes to rescue. It can generate different token for different
 * people and then validate the token too. We will see how that works
 * soon, but first let's look at how to implement login functionality
 * on backend.
 * */


/**
 * Login Route:
 * 1. For now, use a simple array of username and password.
 * 2. On your /login route, take username and password from body and
 *    check if the credentials are correct using array.find. 
 *    a. If yes, then send them a token - { token: "abcdefghi" } &
 *       message that the user is found.
 *    b. If not, then send them a 401 response.
 * 3. Test this from the frontend by making Postman call.
*/


const express = require('express');
const app = express();

app.use(express.json());

/**
 * User DB object
*/
const users = [
    { username: "user1", password: "bhokaal" },
    { username: "user2", password: "eehuinabaat" },
]


/**
 * API Routes
*/
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(
        (user) => user.username === username & user.password === password)

    if (user) {
        const token = "abcdefghi";
        res.json({ message: 'User Found', token })
    } else {
        res.status(401).json({ message: 'Authentication failed' })
    }
});


/**
 * Server started
*/
app.listen(3000, () => {
    console.log('server started');
});


/**
 * Understanding:
 * 1. This is what you'll do for each user. Just that instead of looking
 *    up an array you would do it from the database.
 * 2. Pay attention that we can login, and username-password pair only
 *    once. Later, we use only the token to authenticate the user.
 *    a. This way you don't send credentials in every request.
 *    b. Also, it saves from for each request as you dn't need to do an
 *       extra query to DB per request.
 * 3. Another thing to notice is that there's no logout. Since there's
 *    no token saved on server, server can't log out. Expiry of your token
 *    is logout.
 *    a. Therefore, JWT works best on HTTPS. If you're not using HTTPs
 *       on your site in 2021 then you have bigger issues.
*/