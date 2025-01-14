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

const { exec } = require("child_process");
const cors = require("cors");

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use("/api", userLoginApi); // Use the userLoginApi routes under "/api"
app.use("/api", logger);
app.use("/api", flyers);
app.use("/api", faq);
app.use("/api", trackMeal);
app.use("/api", usermeta);
app.use("/api", geninfo);
// const corsOptions = {
//   origin: "https://www.goodgutproject.in,*", // Allow all origins
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS", // Specify allowed methods
//   allowedHeaders: "Content-Type, Authorization, x-api-key", // Specify allowed headers
// };

app.use(
  cors({
    origin: "https://www.goodgutproject.in", // Replace with your client's origin
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Include cookies if needed
  })
);
// Apply CORS globally
//app.use(cors(corsOptions));

app.get("/test", (req, res) => {
  res.send("App restarted");
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
