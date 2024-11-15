const express = require('express');
const router = express.Router();
const Meal = require('../models/mealModels');
const cors = require('./cors')
const apiKeyMiddleware =require('./apikeymiddleware')

// GET all products
router.get('/getmeal',cors,apiKeyMiddleware, async (req, res) => {
    try {
        const meal = await Meal.find();
        res.json(meal);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
