const mongoose = require('mongoose');

// Define the Mongoose schema for the `sales` collection
const user6Schema = new mongoose.Schema({
    name: String,
    email: String,
    age: String
});

module.exports = mongoose.model('user5', user6Schema);