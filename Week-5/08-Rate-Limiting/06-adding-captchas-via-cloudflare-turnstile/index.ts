/**
 * Captchas:
 * - Captchas are a great-shield solution to making sure the request was sent 
 *   by a human and not by a machine.
 * - Captchas (Completely Automated Public Turing test to tell Computers and
 *   Humans Apart) are a widely used security measure to ensure that a request
 *   or action is being performed by a human and not by an automated bot or
 *   script. They serve as a valuable defense against various types of abuse,
 *   such as brute-force attacks, spam, and automated account creation.
 * - There are various freely available captchas, Cloudflare Turnstile is one
 *   of them.
*/

/**
 * The Need for Captchas:
 * While rate limiting can help mitigate brute-force attacks and prevent 
 * excessive requests from a single source, it does not provide a foolproof 
 * solution against distributed attacks or sophisticated bots that can rotate 
 * IP addresses or mimic human behavior. Captchas introduce an additional 
 * layer of security by presenting a challenge that is relatively easy for 
 * humans to solve but difficult for machines or automated scripts.
*/

/**
 * Cloudflare Turnstile: A Free Captcha Replacement:
 * 
 * Cloudflare Turnstile is a free and modern alternative to traditional 
 * captchas, designed to provide a frustration-free experience for website 
 * visitors while effectively blocking bots and automated scripts. According 
 * to the information provided:
 * 1. Turnstile delivers captcha-free web experiences to website visitors 
 *    with just a simple snippet of code. 
 * 2. It stops abuse and confirms that visitors are real without the data 
 *    privacy concerns or awful user experience associated with traditional 
 *    captchas.
 * 3. Turnstile is effective at stopping bots by running a series of 
 *    in-browser tests, checking browser characteristics, and utilizing 
 *    lightweight proof-of-work or proof-of-space tests.
*/

/**
 * Example Implementation Flow:
 * 1. User visits ticket booking page
 * 2. Before allowing ticket purchase, system shows Cloudflare Turnstile widget
 * 3. User completes the invisible challenge (no user interaction needed)
 * 4. On clicking "Buy Ticket":
 *    - Frontend sends captcha token to backend along with ticket details
 *    - Backend verifies token with Cloudflare API:
 *      app.post("/buy-ticket", async (req, res) => {
 *        const { token } = req.body;
 *        try {
 *          const response = await fetch(
 *            `https://challenges.cloudflare.com/turnstile/v0/siteverify`,
 *            {
 *              method: 'POST',
 *              body: JSON.stringify({
 *                secret: process.env.TURNSTILE_SECRET_KEY,
 *                response: token
 *              })
 *            }
 *          );
 *          const data = await response.json();
 *          if (data.success) {
 *            // Process ticket purchase
 *            res.json({ success: true });
 *          } else {
 *            res.status(400).json({ error: 'Invalid captcha' });
 *          }
 *        } catch (err) {
 *          res.status(500).json({ error: 'Failed to verify captcha' });
 *        }
 *      });
 * 
 * This ensures only real users can purchase tickets by validating each request
 * with Cloudflare's bot detection system, preventing automated purchases.
*/

/**
 * Why this is not hackable?
 * Because if we go to postman, we can mimic the rest of the request, but
 * we can't really generate the captcha token. The token is generated through
 * browser-based challenges and validations that can only be completed in a 
 * real browser environment. Postman ya koi aur tool se ye token generate 
 * nahi kar sakte, kyunki isme browser-specific checks hote hain jo sirf 
 * actual browser mai hi possible hai.
*/


/**
 * Adding captchas via Cloudflare Turnstile:
 * > Add a new site to turnstile
 * > Keep your site key and site secret safe
 * > Create a react project
 * > Add https://github.com/marsidev/react-turnstile
 * > Update App.tsx
*/


// Frontend Code:
// import { Turnstile } from '@marsidev/react-turnstile'

// import './App.css'
// import axios from 'axios'
// import { useState } from 'react'

// function App() {
//   const [token, setToken] = useState<string>("")

//   return (
//     <>
//       <input placeholder='OTP'></input>
//       <input placeholder='New password'></input>

//       <Turnstile onSuccess={(token) => {
//         setToken(token)
//       }} siteKey='0x4AAAAAAAXtEe2JIeAEUcjX' />

//       <button onClick={() => {
//         axios.post("http://localhost:3000/reset-password", {
//           email: "harkirat@gmail.com",
//           otp: "123456",
//           token: token,
//         })
//       }}>Update password</button>
//     </>
//   )
// }

// export default App


// Backend Code:
import express from 'express';
import cors from "cors";

const SECRET_KEY = "your_site_secret";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// Store OTPs in a simple in-memory object
const otpStore: Record<string, string> = {};

// Endpoint to generate and log OTP
app.post('/generate-otp', (req, res) => {
    console.log(req.body)
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
app.post('/reset-password', async (req, res) => {
    const { email, otp, newPassword, token } = req.body;
    console.log(token);

    let formData = new FormData();
    formData.append('secret', SECRET_KEY);
    formData.append('response', token);

    const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
    const result = await fetch(url, {
        body: formData,
        method: 'POST',
    });
    const challengeSucceeded = (await result.json()).success;

    if (!challengeSucceeded) {
        return res.status(403).json({ message: "Invalid reCAPTCHA token" });
    }

    if (!email || !otp || !newPassword) {
        return res.status(400).json({ message: "Email, OTP, and new password are required" });
    }
    if (Number(otpStore[email]) === Number(otp)) {
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

