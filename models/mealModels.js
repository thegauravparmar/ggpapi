const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    name: { type: String,},
    quantity: { type: String, default:"0"},//don't want
    kcal: { type: String,},
    p: { type: String,},
    c: { type: String,},
    f: { type: String,},
    image: { type: String,},
    isVeg: { type: String,},
    mealType: { type: String,}
}, { timestamps: true });

module.exports = mongoose.model('foodItems', mealSchema);
