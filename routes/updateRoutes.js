const express = require('express');
const Sale = require('../models/postModels'); // Import your Mongoose model
const apiKeyMiddleware =require('./apikeymiddleware')
const router = express.Router();

router.put("/update/:id",apiKeyMiddleware,async (req, res) => {
   let updatedBody = req.body;
   let id =req.params.id;

    try{
        const sale = await Sale.updateOne({ _id: id }, { $set:updatedBody})
        if(sale.modifiedCount > 0)
        {
      res.status(200).json({object: sale,message: "seccesfull updation"})
        }
        else{
            res.status(200).json({object: sale,message: "No updation has done"})  
        }
    }
    catch{
      res.status(500).json("internal server error");
    }
})

module.exports = router; // Export the router