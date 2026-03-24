/*
  ASSIGNMENT 25 — Sending Emails: nodemailer
  ===========================================

  WHAT IS NODEMAILER?
  Nodemailer is an npm package that lets your Express server
  send emails programmatically — no clicking, no manual work.

  REAL WORLD USE CASES:
  - Welcome email after registration
  - Password reset link
  - Order confirmation
  - Email verification (OTP)
  - Notification emails

  HOW IT WORKS:
  1. You create a TRANSPORTER — a connection to an email service
     (Gmail, Outlook, Mailtrap, Sendgrid etc.)
  2. You define the mail options — who sends, who receives, subject, body
  3. You call transporter.sendMail() to send it

  Your App → Nodemailer → Email Service (Gmail etc.) → Recipient Inbox

  EMAIL SERVICE OPTIONS:
  ----------------------
  Option A — Gmail (easiest for learning):
  Use your Gmail account. You need to create an "App Password"
  because Gmail does not allow your real password.
  Go to: Google Account → Security → 2-Step Verification → App Passwords

  Option B — Mailtrap (BEST for development/testing):
  Mailtrap is a fake inbox — emails are captured and shown in
  the Mailtrap dashboard. Nothing goes to a real inbox.
  Sign up free at: https://mailtrap.io
  This is the SAFEST way to test without spamming real people.

  We will use Mailtrap in this assignment.

  SETUP (run in terminal before starting):
  -----------------------------------------
  npm init -y
  npm install express nodemailer dotenv
  node server.js

  .env file — get values from Mailtrap dashboard:
  MAILTRAP_USER=your_mailtrap_username
  MAILTRAP_PASS=your_mailtrap_password
  PORT=3000
*/

require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

/* ---------------------------------------------------------------
  TRANSPORTER — connection to the email service
  -----------------------------------------------
  The transporter is the bridge between your app and the
  email service that will actually deliver the email.

  nodemailer.createTransport() takes a config object:
  host → the mail server address
  port → 587 is the standard SMTP port for sending email
  auth → your login credentials for the mail service

  For Mailtrap:
  → Sign up at https://mailtrap.io
  → Go to Inboxes → SMTP Settings
  → Copy the host, port, username, and password into your .env

  For Gmail (alternative):
  host: "smtp.gmail.com"
  port: 587
  auth: { user: "your@gmail.com", pass: "your_app_password" }
---------------------------------------------------------------- */
const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 587,
    auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
    },
});

/* ---------------------------------------------------------------
  VERIFY TRANSPORTER CONNECTION
  ------------------------------
  transporter.verify() checks if the connection to the mail
  server works correctly when the server starts.
  If credentials are wrong, you see an error immediately
  instead of finding out only when you try to send an email.
---------------------------------------------------------------- */
transporter.verify((err, success) => {
    if (err) {
        console.error("Email transporter error:", err.message);
    } else {
        console.log("Email transporter is ready to send emails!");
    }
});

/* ---------------------------------------------------------------
  HELPER — sendEmail
  -------------------
  A reusable function that sends an email.
  We pass in the "to", "subject", and "html" body each time.

  mailOptions fields:
  from    → who is sending (shown in the inbox as the sender)
  to      → recipient email address
  subject → subject line of the email
  text    → plain text version (for email clients that block HTML)
  html    → HTML version (styled email body — most clients use this)
---------------------------------------------------------------- */
const sendEmail = async ({ to, subject, html, text }) => {
    const mailOptions = {
        from: `"My Express App" <no-reply@myapp.com>`,
        to,
        subject,
        text: text || "",  // plain text fallback
        html,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
};

/* ---------------------------------------------------------------
  ROUTES
---------------------------------------------------------------- */

/*
  GET /
  ------
  Test in browser → http://localhost:3000
*/
app.get("/", (req, res) => {
    res.json({ message: "Email server is running!" });
});

/*
  POST /send/welcome — Send a welcome email
  ------------------------------------------
  Simulates sending a welcome email after registration.

  Test in Postman:
  - Method: POST
  - URL: http://localhost:3000/send/welcome
  - Body → raw → JSON: { "name": "Alice", "email": "alice@test.com" }
  - Then check your Mailtrap inbox to see the email!
*/
app.post("/send/welcome", async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ error: "name and email are required." });
        }

        await sendEmail({
            to: email,
            subject: "Welcome to My Express App!",
            html: `
        <h2>Welcome, ${name}! 🎉</h2>
        <p>Thanks for registering with us.</p>
        <p>Your account has been created successfully.</p>
        <br/>
        <p>— The My Express App Team</p>
      `,
        });

        res.json({ message: `Welcome email sent to ${email}!` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/*
  POST /send/reset-password — Send a password reset email
  --------------------------------------------------------
  Simulates sending a password reset link to a user.
  In a real app, you would generate a unique token,
  save it to the DB with an expiry, and put it in the URL.

  Test in Postman:
  - Method: POST
  - URL: http://localhost:3000/send/reset-password
  - Body → raw → JSON: { "email": "alice@test.com" }
*/
app.post("/send/reset-password", async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: "email is required." });
        }

        /*
          In a real app, generate a secure token and save it to DB.
          For this assignment we use a fake token just to show the flow.
        */
        const resetToken = "fake-reset-token-12345";
        const resetLink = `http://localhost:${PORT}/reset-password?token=${resetToken}`;

        await sendEmail({
            to: email,
            subject: "Reset Your Password",
            html: `
        <h2>Password Reset Request</h2>
        <p>We received a request to reset your password.</p>
        <p>Click the link below to reset it:</p>
        <a href="${resetLink}" style="
          background:#4F46E5;
          color:white;
          padding:10px 20px;
          border-radius:5px;
          text-decoration:none;
        ">Reset Password</a>
        <p>This link expires in 1 hour.</p>
        <p>If you did not request this, ignore this email.</p>
      `,
        });

        res.json({ message: `Password reset email sent to ${email}!` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/*
  POST /send/otp — Send a one-time password (OTP)
  -------------------------------------------------
  Simulates sending a 6-digit OTP for email verification.
  In a real app, save the OTP in DB with an expiry time
  and verify it when the user submits it.

  Test in Postman:
  - Method: POST
  - URL: http://localhost:3000/send/otp
  - Body → raw → JSON: { "email": "alice@test.com" }
*/
app.post("/send/otp", async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: "email is required." });
        }

        /*
          Generate a random 6-digit OTP.
          Math.floor(100000 + Math.random() * 900000) always gives 6 digits.
        */
        const otp = Math.floor(100000 + Math.random() * 900000);

        await sendEmail({
            to: email,
            subject: "Your OTP Code",
            html: `
        <h2>Your Verification Code</h2>
        <p>Use the code below to verify your email address:</p>
        <h1 style="
          font-size:48px;
          letter-spacing:10px;
          color:#4F46E5;
        ">${otp}</h1>
        <p>This code expires in 10 minutes.</p>
        <p>Do not share this code with anyone.</p>
      `,
        });

        res.json({ message: `OTP sent to ${email}!` });
        /*
          In a real app: save otp and its expiry to DB here,
          then verify it when the user submits the form.
        */
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});