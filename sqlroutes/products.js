const express = require("express");
const db = require("../sqlconnection"); // Assuming your SQL connection file
const router = express.Router();

// POST: Create a new product
router.post("/products", (req, res) => {
  try {
    const { name, description, price, stock_quantity, category, image_url } = req.body;

    // Validate the input
    if (!name || !price || !stock_quantity) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Insert the product details into the products table
    const query = `
      INSERT INTO products (name, description, price, stock_quantity, category, image_url, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;

    db.execute(query, [name, description, price, stock_quantity, category, image_url || null], (err, result) => {
      if (err) {
        console.error("Error creating product:", err);
        return res.status(500).json({ error: "Database error" });
      }

      res.status(201).json({
        message: "Product created successfully",
        product: {
          id: result.insertId,
          name,
          description,
          price,
          stock_quantity,
          category,
          image_url
        }
      });
    });
  } catch (err) {
    console.error("Server error:", err.message);
    res.status(500).send("Server error");
  }
});

// GET: Fetch all products (with optional filters)
router.get("/products", (req, res) => {
  try {
    let { category, min_price, max_price } = req.query;
    let query = "SELECT * FROM products WHERE 1=1";

    let params = [];
    if (category) {
      query += " AND category = ?";
      params.push(category);
    }
    if (min_price) {
      query += " AND price >= ?";
      params.push(min_price);
    }
    if (max_price) {
      query += " AND price <= ?";
      params.push(max_price);
    }

    db.execute(query, params, (err, results) => {
      if (err) {
        console.error("Error fetching products:", err);
        return res.status(500).json({ error: "Database error" });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "No products found" });
      }

      res.json({
        message: "Products fetched successfully",
        products: results
      });
    });
  } catch (err) {
    console.error("Server error:", err.message);
    res.status(500).send("Server error");
  }
});

// PUT: Update product details
router.put("/products/:id", (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, price, stock_quantity, category, image_url } = req.body;
  
      // Build the SET clause dynamically based on the fields provided
      let setClause = [];
      let values = [];
  
      if (name) {
        setClause.push("name = ?");
        values.push(name);
      }
      if (description) {
        setClause.push("description = ?");
        values.push(description);
      }
      if (price) {
        setClause.push("price = ?");
        values.push(price);
      }
      if (stock_quantity) {
        setClause.push("stock_quantity = ?");
        values.push(stock_quantity);
      }
      if (category) {
        setClause.push("category = ?");
        values.push(category);
      }
      if (image_url) {
        setClause.push("image_url = ?");
        values.push(image_url);
      }
  
      // If no valid fields are passed for update, return an error
      if (setClause.length === 0) {
        return res.status(400).json({ error: "No fields provided to update" });
      }
  
      // Add the product ID at the end of the values array
      values.push(id);
  
      // Construct the query string with the dynamic SET clause
      const query = `
        UPDATE products 
        SET ${setClause.join(", ")} , updated_at = NOW() 
        WHERE id = ?
      `;
  
      db.execute(query, values, (err, result) => {
        if (err) {
          console.error("Error updating product:", err);
          return res.status(500).json({ error: "Database error" });
        }
  
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Product not found" });
        }
  
        res.json({
          message: "Product updated successfully",
          product: {
            id,
            name,
            description,
            price,
            stock_quantity,
            category,
            image_url
          }
        });
      });
    } catch (err) {
      console.error("Server error:", err.message);
      res.status(500).send("Server error");
    }
  });
  

module.exports = router;
