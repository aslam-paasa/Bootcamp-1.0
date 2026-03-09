/*
  utils/sendEmail.js — Email Utility
  =====================================
  A clean reusable function to send emails via nodemailer.
  Uses the transporter configured in config/email.js.
  Called from controllers — keeps email logic out of routes.
*/

const transporter = require("../config/email");

const sendEmail = async ({ to, subject, html, text }) => {
    const mailOptions = {
        from: `"${process.env.APP_NAME || "My App"}" <no-reply@myapp.com>`,
        to,
        subject,
        text: text || "",
        html,
    };

    return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;