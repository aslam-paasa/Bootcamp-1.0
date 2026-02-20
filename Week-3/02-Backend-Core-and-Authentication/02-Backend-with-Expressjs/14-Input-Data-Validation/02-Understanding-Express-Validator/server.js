/**
 * Input Data Validation:
 * Q. How we can validate our credentials before or after sending it
 *    to the database?
 * => Jb hm query string m email paas krnge to wo usse validate krega.
 * => Validate means email m '@', '.com' hona chaiye.
 * 
 * Example:
 * - Email ko validate krte waqt check kiya jata hai ki email format 
 *   sahi hai ya nahi 
 *   (e.g., username@example.com).
 */

/**
 * Q. What is validation in express?
 * => Validation is a way of checking incoming data for correctness.
 * => Express applications often use middleware like 'express-validator'
 *    to handle validation.
*/ 

/** 
 * Types of validation:
 *    1. Client-Side Validation
 *    2. Server-Side Validation
 * 
 * Client-Side Validation:
 * => Ye validation front-end pe hota hai. Yaha javascript ya HTML5 ka 
 *    use krke basic checks lagaye ja skte hain (e.g., email format).
 * 
 * Server-Side Validation:
 * => Backend me validation essential hota hai, qki front-end validation
 *    ko bypass kiya ja skta hai. Isliye server pe validation ka hona 
 *    zaroori hota hai for security and data integrity.
 */

/**
 * Client-Side Validation:
 * => Maan lo maine ek login page bnaya, ab jb user waha pe apna 
 *    credential fill out krega aur submit krega, tab email ka format
 *    galat dalne par wahi frontend pe ek warning ya error message show
 *    hoga. Ye 'Client-Side Validation' hai.
 * => Ye validation fast hota hai but it can be bypassed, isliye 
 *    server-side validation bhi zaroori hai.
 */

/**
 * Server-Side Validation:
 * => Server pe validation isliye important hai, qki agar kisi ne 
 *    frontend ka bypass kiya to backend still request ko handle kr k 
 *    invalid data ko rok lega.
 * => 'express-validator' jaisi libraries ko use krke hum multiple 
 *    validations laga skte hain (email check, password length check, 
 *    etc.)
 */

/**
 * Different types of validation:
 * 1. required validation
 * 2. length validation
 * 3. email validation
 * 4. password validation
 * 5. number validation
 * 6. date validation
 * 7. phone number validation
 * 8. pattern validation
 * 9. custom validation
 * etc...
 * => Har validation ka purpose hota hai ki humara data accurate aur 
 *    valid ho, taaki database aur system ki integrity maintained rahe.
/*


/** 
 * Third-Party Validation:
 * => We will use third-party library/validator to simplify validation.
 * => For example, hm 3rd party library ka use kr k check krwa skte hai
 *    ki jo email mere user ne daala hai wo correct hai ya incorrect.
 *    Aur ye hm backend pe krnge, qki frontend pe agar wo validation
 *    kaam nhi krega to hmein ek backup k liye backend side pe lga denge.
 * Ex: express-validator - npm i express-validator
 */

const express = require('express');
const app = express();
const { body, validationResult } = require('express-validator');
app.use(express.json());

/**
 * Q. Express-Validator ka logic hm kis position pe rkhe?
 * => Middleware ki position pe, aur middleware hm route & controller
 *    logic k bich m use krte hai.
 * => body('email').isEmail() ka use krte hai email ko validate krne k liye,
 *    aur iska logic hm directly route pe lagaenge.
 */

/**
 * Step 1: Middleware for validation.
 * Middleware ka logic request or controller k beech m hota hai.
 * Yaha hum express-validator ka use karenge to check if the email is valid.
 * Agar email valid hoga tabhi request ko aage process krne denge.
 * 
 * body('email').isEmail() function email ko validate krta hai, 
 * aur agar wo valid nhi hai, to error return hoga.
 */

app.post('/login', body('email').isEmail(), (req, res) => {
    /**
     * Step 2: Handling the validation result.
     * Express-validator se hm req ka validation result check krte hai 
     * using validationResult() method.
     * 
     * Agar validationResult(req) empty hai, to iska matlab validation 
     * pass ho gya, aur hum success response de denge.
     * Agar koi error hai, to hum error response return krenge.
     */
    
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        res.status(200).send(req.body);
    } else {
        res.status(400).json({
            message: "Bad Request",
            errors: errors.array()
        });
    }
});

/**
 * Step 3: Starting the server at port 3000.
 * Server will be listening for requests at localhost:3000
 */
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
