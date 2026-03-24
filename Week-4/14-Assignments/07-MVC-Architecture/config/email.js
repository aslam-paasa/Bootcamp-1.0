/*
  config/email.js — Nodemailer Transporter
  ==========================================
  Creates and exports a reusable email transporter.
  Uses Mailtrap for development. Swap host/port for production
  (e.g. smtp.gmail.com or a Sendgrid SMTP relay).
*/

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST || "sandbox.smtp.mailtrap.io",
    port: process.env.MAIL_PORT || 587,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

transporter.verify((err) => {
    if (err) console.error("Email transporter error:", err.message);
    else console.log("Email transporter ready!");
});

module.exports = transporter;