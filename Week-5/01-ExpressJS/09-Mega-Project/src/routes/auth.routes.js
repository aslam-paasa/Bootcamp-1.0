import { Router } from "express";
import { registerUser } from '../controllers/auth.controllers.js'
import { validate } from '../middlewares/validator.middleware.js'
import { userRegistrationValidator} from '../validators/index.js'

const router = Router();

/**
 * Registration Flow (File by File): 
 * 1. auth.routes.js (Current File)
 *    - Client sends POST request to /register with user data
 *    - Route handler receives request with data in req.body
 *    - Data flows through 3 middlewares in sequence:
 *      a) userRegistrationValidator()
 *      b) validate 
 *      c) registerUser
 * 
 * 2. validators/index.js
 *    - userRegistrationValidator checks req.body if:
 *      - Email is valid
 *      - Username is 3-30 chars
 *      - Password is min 8 chars
 *    - If invalid, creates error array (err.param, err.msg), then 
 *      push them in an array and pass it to the validate middleware 
 *      without using next()
 * 
 * 3. middlewares/validator.middleware.js  
 *    - validate middleware checks for validation errors
 *    - If errors found: Returns error response to client
 *    - If no errors: Allows request to continue
 * 
 * 4. controllers/auth.controllers.js
 *    - registerUser receives clean, validated data
 *    - Creates new user in database
 *    - Returns success response to client
 * 
 * Simple Flow: Request -> Validate Data -> Create User -> Send Response
*/
router.post('/register', userRegistrationValidator(), validate, registerUser);

export default router;