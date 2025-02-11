const mongoose = require("mongoose");
const { type } = require("os");

const trackmealSchema = new mongoose.Schema(
  {
    id: { type: Number },
    mealbydate: [
      {
        date: { type: String },
        meallist: [
          {
            name: { type: String },
            quantity: { type: Number }, //don't want
            kcal: { type: String },
            p: { type: String },
            c: { type: String },
            f: { type: String },
            image: { type: String },
            isVeg: { type: Number },
            isSelected: { type: Boolean }, //don't want
            mealType: { type: String },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("trackyourmeal", trackmealSchema);
