const User = require("../models/user.model");
const httpStatus = require("http-status-codes");
const bcrypt = require("bcrypt");
const { UserSchemaValidation } = require("../validation/user.validation");
const { generateToken } = require("../helper/auth.helper");
const BlackList = require("../models/blacklist.model");

/**
 * @openapi
 * 
 * /api/v1/auth/register:
 *   post:
 *     summary: Register User API
 *     description: 
 *     operationId: postapiv1authregister
 *     parameters: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: {}
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               name: User 8
 *               email: user8@gmail.com
 *               password: 12345678
 *               gender: male
 */
const register = async (req, res) => {
    
    try{

        const bodyData = req.body;

        const { error } = UserSchemaValidation.validate(req.body);

        // Data Validation
        if(error){
            return res.status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: error.details[0].message
            });
        }

        // Check Email Exists
        const userExists = await User.findOne({
            email: bodyData.email
        })

        if(userExists){

            return res.status(httpStatus.StatusCodes.BAD_REQUEST).json({
                status: false,
                message: "Email already been taken, please try with other email"
            });
        }

        // Create a New User
        const userObject = new User(bodyData)
        await userObject.save();

        return res.status(httpStatus.StatusCodes.CREATED).json({
            status: true,
            message: "Successfully, user created."
        });
    } catch( error ) {

        return res.status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: false,
            message: error
        });
    }
}

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     summary: Login User API
 *     description: 
 *     operationId: postapiv1authlogin
 *     parameters: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: {}
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               email: user8@gmail.com
 *               password: 12345678 
*/
const login = async(req, res) => {
    try{
        const { email, password } = req.body;
        console.log(req.session);

        const UserExists = await User.findOne({
            email
        });

        if(UserExists){

            const isMatch = await bcrypt.compare(password, UserExists.password);

            if(!isMatch){
                return res.status(httpStatus.StatusCodes.UNAUTHORIZED).json({
                    status: false,
                    message: "Invalid credentials"
                });
            }

            //const token = generateToken(UserExists);

            /*return res.status(httpStatus.StatusCodes.OK).json({
                status: true,
                message: "User logged in",
                token
            });*/

            req.session.user = {
                id: UserExists._id,
                emailAddress: UserExists.email,
                name: UserExists.name
            };

            return res.status(httpStatus.StatusCodes.OK).json({
                status: true,
                message: "User logged in"
            });
        } else {

            return res.status(httpStatus.StatusCodes.NOT_FOUND).json({
                status: false,
                message: "User email not found"
            });
        }
    } catch(error){
        return res.status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: false,
            message: error
        });
    }
}

const profile = (req, res) => {

    return res.json({
        status: true,
        message: "User Profile data",
        user: req.session.user
    })
}

const logout = async(req, res) => {

    // const token = req.headers.authorization?.split(" ")[1];

    // if(token){
    //     await BlackList.create({
    //         token,
    //         expiredAt: new Date(req.user.exp * 1000) 
    //     });
    // }

    await req.session.destroy();

    res.json({
        status: true,
        message: "User Logout"
    })
}

module.exports = {
    register,
    login,
    profile,
    logout
}