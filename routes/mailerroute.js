// routes/mailRoutes.js
const express = require('express');
const sendEmail = require('../mailer'); // Import the mailer function
const apiKeyMiddleware =require('./apikeymiddleware')
const router = express.Router();
const cors = require('./cors')


// POST route to send an email
router.post('/send-email',cors,apiKeyMiddleware, async (req, res) => {
    const { email, subject, message } = req.body;

    try {
        await sendEmail(email, subject, message);
        res.json({ message: 'Email sent successfully!' });
    } catch (err) {
        res.status(500).json({ message: 'Error sending email', error: err });
    }
});

module.exports = router;
