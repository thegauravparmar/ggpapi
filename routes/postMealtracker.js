const express = require('express');
const Meal = require('../models/mealModels'); 
const router = express.Router();

router.post('/postmeal', async (req, res) => {
    const meal = new Meal({
        name: req.body.name,
        quantity: req.body.quantity,
        kcal: req.body.kcal,
        p: req.body.p,
        c: req.body.c,
        f: req.body.f,
        image: req.body.image,
        isVeg: req.body.isVeg,
        isSelected: req.body.isSelected,
        mealType: req.body.mealType
    });

    try {
        const newMeal = await meal.save();
        res.status(201).json(newMeal);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
