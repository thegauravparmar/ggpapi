const express = require("express"); // Import your Mongoose model
const cors = require("../routes/cors");
const db = require("../sqlconnection");
const router = express.Router();
const logger = require("../logger");
const auth = require("../routes/auth");

router.get("/usermeta",cors,auth,async (req, res) => {
  const userID = req?.userInfo?.user?.id;
    const query = `
      SELECT 
        UserData.*,
        UserLogins.name, UserLogins.email, UserLogins.id
      FROM 
        UserData
      RIGHT JOIN 
        UserLogins ON UserData.userId = UserLogins.id
      WHERE 
        UserLogins.id = ?
    `;
    db.execute(query, [userID], (err, results) => {
      if (err) {
        console.error("Error fetching user metadata:", err);
        return res.status(500).json({ error: "Database error" });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ error: "ID not found" });
      }
  
      res.json(results);
    });
  });

module.exports = router;
