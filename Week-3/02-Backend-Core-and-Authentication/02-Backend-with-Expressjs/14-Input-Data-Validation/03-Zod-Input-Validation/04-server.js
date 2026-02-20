/**
 * Use Zod : Independent Validation Library
*/

const express = require('express');
const app = express();
const zod = require('zod');

function validateInput(obj) {

    const schema = zod.object({
        email: zod.string().email(),
        password: zod.string().min(8)
    })

    const response = schema.safeParse(obj);
    console.log(response);
}

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