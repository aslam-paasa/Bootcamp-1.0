import { validationResult } from "express-validator";
import { ApiError } from '../config/api-error';

/**
 * Custom Validation Middleware:
 * This function is used to validate the request body
 * 1. Pass the req.body in validationResult
 * 2. If there are no errors, call next()
 * 3. If there are errors, extract the errors:
 *    - Extract the errors from the validationResult
 *    - Push the errors in an array
 *    - Return the errors in the response body
 * 4. Pass the errors in the ApiError constructor (custom error class)
 *    - Status code: 422
 *    - Message: "Received data is invalid"
 *    - Errors: extractedErrors
 *      - err.param: name of the field (username, email, password, etc.)
 *      - err.msg  : error message (required, invalid email, password must be at least 8 characters long, etc.)
*/

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    
    if (errors.isEmpty()) {
        return next();
    }
    
    const extractedErrors = []
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
    
    throw new ApiError(422, "Received data is invalid", extractedErrors);
}

export { validate };