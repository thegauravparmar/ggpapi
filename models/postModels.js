    // models/postModel.js
const mongoose = require('mongoose');

// Define a schema for data to be inserted by the POST API
const user6Schema = new mongoose.Schema({
    gender: String,
    dob: String,
    height: String,
    weight: String,
    medical: String,
    goal: String,
    bodyfat: String,
    workout: String,
    food: String,
    occupation: String,
});

module.exports = mongoose.model('user6', user6Schema); // Model for the POST API
