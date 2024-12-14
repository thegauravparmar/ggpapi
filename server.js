const express = require("express");
const bodyParser = require("body-parser");
const userLoginApi = require("./sqlroutes/userloginapi"); // Import the userloginapi route file

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use("/api", userLoginApi); // Use the userLoginApi routes under "/api"

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
