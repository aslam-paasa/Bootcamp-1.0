/**
 * Create Facebook Login Validation :
*/

const express = require('express');
const app = express();
const zod = require('zod');

/**
 * If this is an array of number with atleast 1 input , 
 * (a) return true, 
 * (b) else return false
*/
function validateInput(obj) {

    const schema = zod.object({
        email: zod.string().email(),
        password: zod.string().min(8)
    })

    const response = schema.safeParse(obj);
    console.log(response);
}

app.post('/login', function (req, res) {
    const response = validateInput(req.body);
    /**
     * If end user hasn't send me the right thing
    */
    if (!response.success) {
        res.json({ msg: "Your inputs are invalid" });
        return;
    }
})

app.listen(3000);