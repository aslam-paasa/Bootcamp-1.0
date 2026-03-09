/**
 * How to send data to the server?
 * - body
 * - query 
 * - header
 * */ 

const home = (req, res) => {
    res.status(201).json({
        msg: "Hi from Home Page!"
    });
}

const details = (req, res) => {
    res.status(200).json({
        email: req.body.email
    })
}

const login = (req, res) => {
    res.send('Login Page');
}


module.exports = {
    home,
    details,
    login,
};
