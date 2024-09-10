const express = require('express');
const Sale = require('../models/postModels'); // Import your Mongoose model

const router = express.Router();

router.put("/update/:height",async (req, res) => {
    let upheight = req.params.height;
    let upgender = req.body.gender;
    let updob = req.body.dob;
    let upweight = req.body.weight;


    try{
        const sale = await Sale.updateOne({ height: upheight }, { $set: { gender: upgender, dob: updob, weight: upweight }})
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