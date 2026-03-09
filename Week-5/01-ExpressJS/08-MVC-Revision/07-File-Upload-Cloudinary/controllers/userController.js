const { validationResult } = require('express-validator');
const cloudinary = require('../config/cloudinary');  // FIXED: import from config
const DetailsData = require('../models/userModel');
const fs = require("fs").promises;


/**
 * How to send data to the server?
 * - body
 * - query 
 * - header
 * */

const home = (req, res) => {
    res.status(200).json({
        msg: "Hi from Home Page!"
    });
}


const details = (req, res) => {
    res.status(200).json({
        email: req.body.email
    })
}

/**
 * Sending Query Data:
 * - Go to Postman
 * - Go to Params: localhost:4000/login/?email="mohammad@gmail.com"&password=123
 *   Key      :   Value
 *   email    :   mohammad@gmail.com
 *   password :   123
 * 
 * Data Validation using express-validator:
 * - express-validator should be kept at the top at middlware level.
 * - body logic       : server
 * - validation logic : userController
 * 
 * Steps:
 * 1. If the validationResultStore(req) has any error then store it in
 *    the 'err' variable.
 * 2. If 'err' is empty then logic successfull.
*/
const login = (req, res) => {
    const err = validationResult(req);
    if (err.isEmpty()) {
        res.status(200).send(req.query);
    } else {
        res.status(400).json({ error: err.array() });
    }
}


/**
 * Uploading file in Cloudinary:
 * > Step-1: npm i cloudinary
 * > Step-2: require cloudinary in index.js
 * > Step-3: Configure cloudinary
 * > Step-4: Image Upload Logic
 *   - req.file.path comes from multer
 * 
 * Note: After uploading the image to Cloudinary, delete the image
 *       from the local server (/uploads) using fs.unlink.
*/
const fileUpload = async (req, res) => {
    try {
        /**
         * Upload file to Cloudinary
         * req.file.path comes from multer
        */
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
            public_id: req.file.filename
        });

        /**
         * Delete local file immediately after successful upload
        */
        await fs.unlink(req.file.path);
        console.log("Local file deleted");

        res.status(201).json({
            message: "File uploaded successfully",
            url: uploadResult.secure_url,
            public_id: uploadResult.public_id
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Cloudinary upload failed",
            error: error.message
        });

    }
};


module.exports = {
    home,
    details,
    fileUpload,
    login,
};
