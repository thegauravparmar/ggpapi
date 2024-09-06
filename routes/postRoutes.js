// routes/postRoutes.js
const express = require('express');
const Sale = require('../models/postModels'); // Import your Mongoose model

const router = express.Router();

// POST route to add new data
router.post('/setsales', async (req, res) => {
    const newSale = new Sale({
        gender: req.body.gender,
        dob: req.body.dob,
        height: req.body.height,
        weight: req.body.weight,
        medical: req.body.medical,
        goal: req.body.goal,
        bodyfat: req.body.bodyfat,
        workout: req.body.workout,
        food: req.body.food,
        occupation: req.body.occupation
    });

    try {
        const savedSale = await newSale.save(); // Save new sale to MongoDB
        res.status(201).json("Thankyou! Your data has been successfully saved."); // Send saved sale as a response
    } catch (err) {
        res.status(500).json({ message: 'Error creating sale', error: err });
    }
});

module.exports = router; // Export the router
