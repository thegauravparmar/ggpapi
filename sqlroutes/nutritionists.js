const express = require("express");
const db = require("../sqlconnection"); // Assuming this is your DB connection file
const auth = require("../routes/auth"); // Assuming you have an authentication middleware
const router = express.Router();

// POST: Create a new Nutritionist
router.post("/nutritionists", (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      phone_number,
      specialty,
      years_of_experience,
      current_organisation,
      address
    } = req.body;

    // Validate input
    if (!first_name || !last_name || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Insert the new nutritionist into the database
    const query = `
      INSERT INTO nutritionists 
      (first_name, last_name, email, phone_number, specialty, years_of_experience, current_organisation, address, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;

    db.execute(query, [first_name, last_name, email, phone_number || null, specialty || null, years_of_experience || null, current_organisation || null, address || null], (err, result) => {
      if (err) {
        console.error("Error adding nutritionist:", err);
        return res.status(500).json({ error: "Database error" });
      }

      res.status(201).json({
        message: "Nutritionist created successfully",
        nutritionist: {
          id: result.insertId,
          first_name,
          last_name,
          email,
          phone_number,
          specialty,
          years_of_experience,
          current_organisation,
          address
        }
      });
    });
  } catch (err) {
    console.error("Server error:", err.message);
    res.status(500).send("Server error");
  }
});

// GET: Get all Nutritionists
router.get("/nutritionists", (req, res) => {
  const query = "SELECT * FROM nutritionists";

  db.execute(query, (err, results) => {
    if (err) {
      console.error("Error fetching nutritionists:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// GET: Get a single Nutritionist by ID
router.get("/nutritionists/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM nutritionists WHERE id = ?";

  db.execute(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching nutritionist:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Nutritionist not found" });
    }
    res.json(results[0]);
  });
});

// PUT: Update a Nutritionist (single parameter update supported)
router.put("/nutritionists/:id",  (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, phone_number, specialty, years_of_experience, current_organisation, address } = req.body;

    // Build dynamic SET clause based on the provided fields
    let setClause = [];
    let values = [];

    if (first_name) {
      setClause.push("first_name = ?");
      values.push(first_name);
    }
    if (last_name) {
      setClause.push("last_name = ?");
      values.push(last_name);
    }
    if (email) {
      setClause.push("email = ?");
      values.push(email);
    }
    if (phone_number) {
      setClause.push("phone_number = ?");
      values.push(phone_number);
    }
    if (specialty) {
      setClause.push("specialty = ?");
      values.push(specialty);
    }
    if (years_of_experience) {
      setClause.push("years_of_experience = ?");
      values.push(years_of_experience);
    }
    if (current_organisation) {
      setClause.push("current_organisation = ?");
      values.push(current_organisation);
    }
    if (address) {
      setClause.push("address = ?");
      values.push(address);
    }

    // If no valid fields are passed for update, return error
    if (setClause.length === 0) {
      return res.status(400).json({ error: "No fields provided to update" });
    }

    // Add the nutritionist ID at the end of values array
    values.push(id);

    // Construct the dynamic query for the update
    const query = `
      UPDATE nutritionists 
      SET ${setClause.join(", ")}, updated_at = NOW() 
      WHERE id = ?
    `;

    db.execute(query, values, (err, result) => {
      if (err) {
        console.error("Error updating nutritionist:", err);
        return res.status(500).json({ error: "Database error" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Nutritionist not found" });
      }

      res.json({
        message: "Nutritionist updated successfully",
        nutritionist: {
          id,
          first_name,
          last_name,
          email,
          phone_number,
          specialty,
          years_of_experience,
          current_organisation,
          address
        }
      });
    });
  } catch (err) {
    console.error("Server error:", err.message);
    res.status(500).send("Server error");
  }
});

// DELETE: Delete a Nutritionist
router.delete("/nutritionists/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM nutritionists WHERE id = ?";
  
  db.execute(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting nutritionist:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Nutritionist not found" });
    }

    res.json({
      message: "Nutritionist deleted successfully"
    });
  });
});

module.exports = router;
