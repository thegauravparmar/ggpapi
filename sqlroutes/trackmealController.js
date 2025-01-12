const express = require("express"); // Import your Mongoose model
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../mailer");
const cors = require("../routes/cors");
const db = require("../sqlconnection");
const router = express.Router();
const logger = require("../logger");
const auth = require("../routes/auth");

router.post("/addmeal", cors, auth, async (req, res) => {
  const userID = req?.userInfo?.user?.id;
  const {
    mealDate,
    mealName,
    quantity,
    kcal,
    p,
    c,
    f,
    image,
    foodType,
    mealType,
  } = req.body;

  const query = `
        INSERT INTO MealByDate (
          userId, mealDate, mealName, quantity, kcal, p, c, f, image, foodType, mealType , isSelected
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
      `;

  db.execute(
    query,
    [
      userID,
      mealDate,
      mealName,
      quantity,
      kcal,
      p,
      c,
      f,
      image,
      isVeg,
      mealType,
    ],
    (error, result) => {
      if (error) {
        console.error("Error adding meal:", err);
        res
          .status(500)
          .json({ message: "An error occurred while adding the meal." });
      } else {
        res.status(201).json({
          message: "Meal added successfully",
        });
      }
    }
  );
});

router.get("/trackmeal", cors, auth, (req, res) => {
  const { date } = req.body;
  const userID = req?.userInfo?.user?.id;

  const query = "Select * from MealByDate Where userId = ? AND mealDate = ?";

  db.execute(query, [userID, date], (error, result) => {
    if (error) {
      res.status(500).json({ msg: "Database error" + error });
    } else {
      res.status(200).json({ meals: result });
    }
  });
});

router.delete("/trackmeal", cors, auth, (req, res) => {
  const { mealId } = req.body;
  const query = "DELETE FROM MealByDate WHERE mealId = ?";
  db.execute(query, [mealId], (error, result) => {
    if (error) {
      res.status(500).json({ msg: "Database error" });
    } else {
      res.status(200).json({ msg: "Successfully deleted meal" });
    }
  });
});

router.put("/selectmeal", cors, (req, res) => {
  const { mealId, isSelected } = req.body;
  const query = "UPDATE MealByDate SET isSelected = ? Where mealId = ?";
  db.query(query, [mealId, isSelected], (error, result) => {
    if (error) {
      res.status(500).json({ msg: "DB Error" });
    } else {
      res.status(200).json({ msg: "Meal selected successfully" });
    }
  });
});
module.exports = router;
