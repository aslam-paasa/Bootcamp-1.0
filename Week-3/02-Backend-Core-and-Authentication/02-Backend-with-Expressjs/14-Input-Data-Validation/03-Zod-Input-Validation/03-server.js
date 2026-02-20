/**
 * Use ZOD Library as Independent Validation Library
 * */

const express = require('express');
const app = express();
const zod = require('zod');


/**
 * 1. Create a function validateInput() that needs to validate an input that
 *    comes in like an array of strings.
 * 2. If this is an array of strings with atleast 1 input, return true, else 
 *    return false.
 * 
 * Q. How will you write it?
 * => (a) Check "arr"
 *    (b) Check "obj"
*/

function validateInput(obj) {

    /**
     * if(typeof arr === 'object' && arr.length >= 1 && typeof arr[0] === 'number') { ... }
     * 
     * => We can do bunch of things here, but if we use zod, first we have to write :
     *       const zod = require('zod');
     * 
    */

    /**
     * 4. Now define schema : 
     * => Our input needs to be an array of something.
     * => In this case our array is of strings.
     *       const schema = zod.array(zod.number());
    */

    /**
     * 8. Perform email & password validation checks :
     *
     *    {
     *        email => string => should look like email
     *        password => should have 8 letters
     *
     *    }
    */

    const schema = zod.object({
        email: zod.string().email(),
        password: zod.string().min(8)
        /**
         * Note: Check docs for more validations
        */
    })

    /**
     * Call the function here:
    */
    const response = schema.safeParse(obj);
    console.log(response);
}


/**
 * 6. We tell it to schema, we give it an input. 
 * => It will tell us whether or not the input follows the schema.
*/

// validateInput([1, 2, 3]); // { success: true, data: [ 1, 2, 3 ] }


/**
 * 7. Let's pass something incorrect
*/

// validateInput(["1", 2, 3]); // { success: false, error: [Getter] }  


/**
 * 8. Pass some objects:
*/

validateInput({
    email: 'mohammad@gmail.com',
    password: "12345678"
})

/**
 * Output :
 * 
 *    {
 *        success: true,
 *        data: { email: 'mohammad@gmail.com', password: '12345678' }
 *    }
 */

app.listen(3000);