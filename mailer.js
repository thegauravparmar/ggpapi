// mailer.js
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables from .env

// Create a function to send emails
const sendEmail = async (recipientEmail, subject, text) => {
    // Step 1: Configure nodemailer transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail', // You can use any email service provider
        auth: {
            user: process.env.EMAIL_USER, // Your email address from .env
            pass: process.env.EMAIL_PASS  // Your email password or app-specific password
        }
    });

    // Step 2: Define the email options
    let mailOptions = {
        from: process.env.EMAIL_USER, // Sender's email address
        to: recipientEmail, // Recipient's email address
        subject: subject, // Subject of the email
        text: text // Plain text body of the email
    };

    // Step 3: Send the email
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.log('Error sending email:', error);
    }
};

module.exports = sendEmail;
