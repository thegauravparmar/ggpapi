const express = require('express');
const Meal = require('../models/trackmealmodels');
const router = express.Router();
const apiKeyMiddleware = require('./apikeymiddleware')
const cors = require('./cors')

router.post('/trackmeal', cors, apiKeyMiddleware, async (req, res) => {
    const userInfo = await Meal.find({ id: req.body.id }) //may be time consuming
    // for user first time adding there meal 
    if (userInfo.length <= 0) {
        const meal = new Meal(req.body);
        try {
            const newMeal = await meal.save();
            res.status(201).json(newMeal);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
    else {
        //If date for the existing user is already there then append meal in that object only
        //Or or create new array for that day's meal
        const isDateAlreadyThere = userInfo[0].mealbydate.find(a => a.date == req.body.mealbydate[0].date); //time consuming

        if (isDateAlreadyThere == undefined) {
            const result = await Meal.findOneAndUpdate(
                { id: req.body.id },
                { $push: { "mealbydate": { $each: req.body.mealbydate } } },
                { new: true }
            );
            res.status(200).json({ result })
        }
        else {
            const result = await Meal.findOneAndUpdate(
                {
                    id: req.body.id,
                    "mealbydate.date": req.body.mealbydate[0].date
                },
                {
                    $push: { "mealbydate.$.meallist": req.body.mealbydate[0].meallist } // Add the new meal to the meallist array
                }
            );
            res.status(200).json({ result })
        }
    }
});

router.delete('/trackmeal', cors, apiKeyMiddleware, async (req, res) => {

    //If date for the existing user is already there then append meal in that object only
    //Or or create new array for that day's meal
    const result = await Meal.findOneAndUpdate(
        {
            id: req.body.id,
            "mealbydate.date": req.body.date
        },
        {
            $unset: { [`mealbydate.$.meallist.${req.body.indexToRemove}`]: "" }//set required object null
        }
    );

    const resu = await Meal.findOneAndUpdate(
        {
            id: req.body.id,
            "mealbydate.date": req.body.date
        },
        {
            $pull: { "mealbydate.$.meallist": null }  // delete null meal object
        }
    );

    res.status(200).json({ result })
});


router.put('/trackmeal', cors, apiKeyMiddleware, async (req, res) => {

    const result = await Meal.findOneAndUpdate(
        {
            id: req.body.id,
            "mealbydate.date": req.body.date
        },
        {
            $set: { [`mealbydate.$.meallist.${req.body.indexToUpdate}`]: req.body.updatedMeal }
        }
    );

    res.status(200).json({ result })
});

router.get('/trackmeal', cors, apiKeyMiddleware, async (req, res) => {
    try {
        const { id, date } = req.query;
        if (id != undefined) {
            const meal = await Meal.find({ id: id });
            const mealByDate = meal[0].mealbydate.find(a => a.date == date);
            if (date != undefined) {
                res.json(mealByDate);
            }
            else {
                res.json(meal);
            }
        }
        else {
            res.json({ message: "No user id found!!!" })
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
