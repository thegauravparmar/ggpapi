const express = require("express");
const bodyParser = require("body-parser");
const userLoginApi = require("./sqlroutes/userloginapi"); // Import the userloginapi route file
const logger = require("./sqlroutes/loggerController");
const flyers = require("./sqlroutes/flyer");
const trackMeal = require("./sqlroutes/trackmealController");
const faq = require("./sqlroutes/faq");
const usermeta = require("./sqlroutes/userMeta");
const geninfo = require("./sqlroutes/genInfo");
const app = express();
const port = 3000;
// #test
const { exec } = require('child_process');
const cors = require("cors");


app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from your frontend
    methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
    credentials: true, // If sending cookies or authentication tokens
  })
);
// Middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use("/api", userLoginApi); // Use the userLoginApi routes under "/api"
app.use("/api", logger);
app.use("/api", flyers);
app.use("/api", faq);
app.use("/api", trackMeal);
app.use("/api", usermeta);
app.use("/api", geninfo);
app.use(cors());

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
