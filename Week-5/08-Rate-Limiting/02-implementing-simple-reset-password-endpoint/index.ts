/** 
 * Implementing a simple reset password endpoint:
 * 1. Init a typescript project:
 *    > npm init -y
 *    > npx tsc --init
 * 2. Update tsconfig.json:
 *    > "rootDir": "./src",
 *    > "outDir": "./dist",
 * 3. Add dependencies:
 *    > npm i express @types/express
 * 4. Add the code
 * 
 * Try hitting it with various OTPs one by one. Notice the server doesn't 
 * rate limit you.
 * {
 *   "email": "harkirat.iitr@gmail.com",
 *   "otp": "123123",
 *   "newPassword": "newPassword"
 * }
 * 
 * Response:
 * {
 *   "message": "Invalid OTP"
 * }
*/

import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

// Store OTPs in a simple in-memory object
const otpStore: Record<string, string> = {};

// Endpoint to generate and log OTP
app.post('/generate-otp', (req, res) => {
    const email = req.body.email;
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // generates a 6-digit OTP
    otpStore[email] = otp;

    console.log(`OTP for ${email}: ${otp}`); // Log the OTP to the console
    res.status(200).json({ message: "OTP generated and logged" });
});

// Endpoint to reset password
app.post('/reset-password', (req, res) => {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
        return res.status(400).json({ message: "Email, OTP, and new password are required" });
    }
    if (otpStore[email] === otp) {
        console.log(`Password for ${email} has been reset to: ${newPassword}`);
        delete otpStore[email]; // Clear the OTP after use
        res.status(200).json({ message: "Password has been reset successfully" });
    } else {
        res.status(401).json({ message: "Invalid OTP" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

