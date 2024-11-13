const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    name: { type: String,},
    quantity: { type: String,},
    kcal: { type: String,},
    p: { type: String,},
    c: { type: String,},
    f: { type: String,},
    image: { type: String,},
    isVeg: { type: String,},
    isSelected: { type: String,},
    mealType: { type: String,}
}, { timestamps: true });

module.exports = mongoose.model('Meal', mealSchema);
