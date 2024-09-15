const express = require('express');
const Sale = require('../models/postModels'); // Import your Mongoose model
const apiKeyMiddleware =require('./apikeymiddleware')
const router = express.Router();

router.delete("/delete/:id",apiKeyMiddleware, async (req, res) => {
    let id =req.params.id;

    try {
        const sale = await Sale.deleteOne({ _id: id });
        
        if (sale.modifiedCount > 0) {
            res.status(200).json({ object: sale, message: "Document successfully deleted" })
        }
        else {
            res.status(200).json({ object: sale, message: "No document found" })
        }
    }
    catch {
        res.status(500).json("internal server error");
    }
})

module.exports = router; // Export the router