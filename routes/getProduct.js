const express = require('express');
const router = express.Router();
const Product = require('../models/productModels');
const cors = require('./cors')
const apiKeyMiddleware =require('./apikeymiddleware')

// GET all products
router.get('/products',cors,apiKeyMiddleware, async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
