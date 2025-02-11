const express = require('express');
const Meal = require('../models/mealModels'); 
const router = express.Router();
const cors = require('./cors');
const apiKeyMiddleware =require('./apikeymiddleware');

router.post('/fooditems',cors,apiKeyMiddleware, async (req, res) => {
    const meal = new Meal({
        name: req.body.name,
        kcal: req.body.kcal,
        p: req.body.p,
        c: req.body.c,
        f: req.body.f,
        image: req.body.image,
        isVeg: req.body.isVeg,
        mealType: req.body.mealType
    });

    try {
        const newMeal = await meal.save();
        res.status(201).json(newMeal);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/fooditems',cors,apiKeyMiddleware, async (req, res) => {
    try {
        const meal = await Meal.find();
        res.json(meal);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
module.exports = router;
