// routes/getRoutes.js
const express = require('express');
const Sale = require('../models/getModels'); // Import your Mongoose model

const router = express.Router();

// GET route to fetch data
router.get('/getsales', async (req, res) => {
    try {
        const sales = await Sale.find(); // Fetch all sales from MongoDB
        res.json(sales); // Send sales as JSON response
    } catch (err) {
        res.status(500).json({ message: 'Error fetching sales', error: err });
    }
});

module.exports = router; // Export the router
