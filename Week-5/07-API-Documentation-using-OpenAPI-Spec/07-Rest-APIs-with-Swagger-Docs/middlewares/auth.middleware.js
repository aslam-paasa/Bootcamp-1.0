require("dotenv").config();
const JWT = require("jsonwebtoken");
const httpStatus = require("http-status-codes");
const BlackList = require("../models/blacklist.model");

const checkAuthToken = async(req, res, next) => {

    const token = req.headers.authorization?.split(" ")[1];

    try{

        const isValidToken = await BlackList.findOne({
            token
        });

        if(isValidToken){
            return res.json({
                status: false,
                message: "Invalid Token"
            });
        }

        const decodedUserData = JWT.verify(token, process.env.JWT_SECRET);

        req.user = decodedUserData;

        next();
    } catch(error){
        return res.status(httpStatus.StatusCodes.UNAUTHORIZED).json({
            status: false,
            message: "Access denied"
        });
    }
}

const sessionCheckAuth = async(req, res, next) => {

    if(req.session.user){
        next();
    } else{
        return res.json({
            status: false,
            message: "Access denied"
        });
    }
}

module.exports = {
    checkAuthToken,
    sessionCheckAuth
}