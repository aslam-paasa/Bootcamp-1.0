/**
 * Creating a separate file for all validations:
 * - This will make the code more modular and easier to maintain
 * - We can use these validations in different parts of the application
*/

import { body } from "express-validator";

const userRegistrationValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty().withMessage("Email is required")
            .isEmail().withMessage("Invalid email"),
        body("username")
            .trim()
            .notEmpty().withMessage("Username is required")
            .isLength({ min: 3, max: 30 }).withMessage("Username must be between 3 and 30 characters long"),
        body("password")
            .trim()
            .notEmpty().withMessage("Password is required")
            .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
    ];
}

const userLoginValidator = (body) => {
    return [
        body("email")
            .trim()
            .notEmpty().withMessage("Email is required")
            .isEmail().withMessage("Invalid email"),
        body("password")
            .trim()
            .notEmpty().withMessage("Password is required")
            .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
    ];
}

export { userRegistrationValidator, userLoginValidator };

