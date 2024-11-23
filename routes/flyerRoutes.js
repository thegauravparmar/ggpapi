// routes/flyerRoutes.js
const express = require('express');
const router = express.Router();
const Flyer = require('../models/flyer');
const apiKeyMiddleware =require('./apikeymiddleware');
const cors = require('./cors')
// Route to save or update Image 1 URL
router.post('/flyer',cors,apiKeyMiddleware, async (req, res) => {
  try {
var flyer = new Flyer({
        name : req.body.name,
        imageUrl: req.body.imageUrl,
        link: req.body.link
    }
    )
    await flyer.save();
    res.status(200).json({ message: 'Flyer saved successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save Image 1.', error });
  }
});


// Route to fetch saved images
router.get('/flyer',cors,apiKeyMiddleware, async (req, res) => {
  try {
    const flyer = await Flyer.find();
    if (!flyer) {
      return res.status(204).json({ message: 'No images found.' });
    }
    res.status(200).json(flyer);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve images.', error });
  }
});

module.exports = router;