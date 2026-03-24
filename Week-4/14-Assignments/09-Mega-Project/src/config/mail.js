/**
 * Email Configuration File:
 * - Iss file mein 2 important packages ka use kiya gaya hai:
 *   1. Mailgen: Email ka design/template banane ke liye
 *   2. Nodemailer: Server se email bhejne ke liye
 * 
 * - Simple steps:
 *   1. Pehle Mailgen se email ka template banayenge
 *   2. Fir Nodemailer se wo email bhej denge
*/

import mailgen from 'mailgen';
import nodemailer from 'nodemailer';

/**
 * Send Email Function:
 * 1. Create Email template basic setup
 * 2. Convert email content to text and HTML format
 * 3. Setup email connection (SMTP)
 * 4. Create email basic structure
 * 5. Send email and handle errors
*/
const sendMail = async (options) => {
    /**
     * Step 1: Create Email template basic setup
     */
    const mailGenerator = new mailgen({
        theme: 'default',
        product: {
            name: 'Task Manager',
            link: 'https://mailgen.js/'
        }
    })

    /**
     * Step 2: Convert email content to text and HTML format
     */
    var emailText = mailGenerator.generatePlaintext(options.mailGenContent);
    var emailHtml = mailGenerator.generate(options.mailGenContent);

    /**
     * Step 3: Email bhejne ke liye connection setup (SMTP)
     */
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_TRAP_SMTP_HOST,
        port: process.env.MAIL_TRAP_SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.MAIL_TRAP_SMTP_USER,
            pass: process.env.MAIL_TRAP_SMTP_PASS
        }
    })

    /**
     * Step 4: Email ka basic structure
     */
    const mail = {
        from: 'mail.taskmanager@example.com',
        to: options.email,
        subject: options.subject,
        text: emailText,
        html: emailHtml
    }

    /**
     * Step 5: Send email and handle errors
     */
    try {
        await transporter.sendMail(mail);
        console.log('Email sent successfully');
    } catch (error) {
        console.log('Email not sent');
        console.log(error);
    }
}

/**
 * Create Email Templates:
 * - Niche 2 type ke email templates hai:
 *   1. Email verification ke liye
 *   2. Password reset ke liye
*/

/**
 * Email Template 1: New user ka email verify karne ke liye
 */
const emailVerificationMailGenContent = (username, verificationUrl) => {
    return {
        body: {
            name: username,
            intro: "Welcome to our App! We're very excited to have you on board.",
            action: {
                instructions: "To get started with our app, please click here:",
                button: {
                    color: '#2200FF',
                    text: 'Verify your email',
                    link: verificationUrl
                }
            },
            outro: "Need help, or have questions? Just reply to this email, we'd love to help."
        }
    }
}

/**
 * Email Template 2: Password reset ke liye
 */
const forgotPasswordMailGenContent = (username, passwordResetUrl) => {
    return {
        body: {
            name: username,
            intro: "We got a request to reset your password for your account.",
            action: {
                instructions: "To change your password, please click the button below:",
                button: {
                    color: '#22BC66',
                    text: 'Reset Password',
                    link: passwordResetUrl
                }
            },
            outro: "Need help, or have questions? Just reply to this email, we'd love to help."
        }
    }
}

// Example: Email kaise bheje
// sendMail({
//     email: user.email,
//     subject: 'Verify your email',
//     mailGenContent: emailVerificationMailGenContent(
//         user.username, 
//         user.verificationUrl
//     )
// })
