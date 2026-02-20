const express = require('express');
const app = express();
const z = require('zod');

app.use(express.json());

/**
 * This is where zod comes into the picture
 */ 

const kidneysInput = z.literal("1").or(z.literal("2"));

app.post('/health-checkup', function (req, res) {
    const kidneyId = req.body.kidneyId;
    const validation = kidneysInput.safeParse(kidneyId);
    if(!validation.success) {
        res.send("Incorrect input");
        return;
    }
    res.send("Your kidney is " + kidneyId);
});

app.listen(3000);