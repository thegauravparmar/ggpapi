const express = require("express"); // Import your Mongoose model
const cors = require("../routes/cors");
const db = require("../sqlconnection");
const router = express.Router();
const logger = require("../logger");
const auth = require("../routes/auth");


router.post('/sleepp', cors, auth,(req, res) => {
    if (GenInfo.value < 10) {
        GenInfo.value++;
        res.status(200).json({ message: 'Value increased successfully', GenInfo });
    } else {
        res.status(400).json({ error: 'Value cannot be greater than 10.' });
    }
});

// POST endpoint to decrease the 'value'
router.post('/sleepn',cors,auth, (req, res) => {
    if (GenInfo.value > 0) {
        GenInfo.value--;
        res.status(200).json({ message: 'Value decreased successfully', GenInfo });
    } else {
        res.status(400).json({ error: 'Value cannot be less than 0.' });
    }
});

router.get("/geninfo", async (req, res) => {
  const query = "SELECT * FROM GenInfo where id = ?";
  db.execute(query[id], (err, results) => {
    if (err) {
      console.error("Error fetching flyers:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

module.exports = router;