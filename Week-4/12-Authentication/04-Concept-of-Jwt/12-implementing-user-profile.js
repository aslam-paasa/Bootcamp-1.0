/**
 * Implement User Profile:
 * 1. Create a GET route /route/:userID that requires authentication
 *    using the authVerify middleware.
 * 2. Retrieve the user's ID from the decoded token(req.user.userID)
 *    and compare it to the userID provided in the route parameters
 *    (req.params.userID).
 * 3. If they match, return a JSON response with user information.
 * 4. If they do not match, return a 403 status code with a JSON
 *    response containing the message "trying to access unauthorized".
*/

app.get('user/:userID, authVerify', (req, res) => {
    const { userID } = req.user;
    const { userID: requestedUser } = req.params;

    if(userID !== requestedUser) {
        res.status(403).json({ message: "Trying to access unauthorized" });
    }

    // Replace with actual logic to retrieve user information
    // UserAddress.findById({ userID }); // retrieving user address demo
    res.json({ name: "Tanay", age: 31, pincode: "560102"})
})