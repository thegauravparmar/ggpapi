const express = require("express");
const bodyParser = require("body-parser");
const userLoginApi = require("./sqlroutes/userloginapi"); // Import the userloginapi route file
const logger = require("./sqlroutes/loggerController");
const flyers = require("./sqlroutes/flyer");
const trackMeal = require("./sqlroutes/trackmealController");
const faq = require("./sqlroutes/faq");
const usermeta = require("./sqlroutes/userMeta");
const geninfo = require("./sqlroutes/genInfo");
const exercises = require("./sqlroutes/exercise");
const dietSlots = require("./sqlroutes/dieticianSlots");
const usercalls = require("./sqlroutes/userCalls");
const product = require("./sqlroutes/products");
const nutritionist = require("./sqlroutes/nutritionists");

const app = express();
const port = 3000;

const { exec } = require("child_process");
const cors = require("cors");

app.use(
  cors({
    origin: [
      "https://www.goodgutproject.in",
      "https://goodgutproject.in",
      "http://localhost:3000",
      "https://admindashboard-nu-lovat.vercel.app",
    ],
  })
);
// Handle preflight requests (OPTIONS)
app.options("*", (req, res) => {
  const allowedOrigins = [
    "https://www.goodgutproject.in",
    "https://goodgutproject.in",
    "http://localhost:3000",
    "https://admindashboard-nu-lovat.vercel.app",
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.sendStatus(200);
});



// Middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use("/api", userLoginApi); // Use the userLoginApi routes under "/api"
app.use("/api", logger);
app.use("/api", flyers);
app.use("/api", faq);
app.use("/api", trackMeal);
app.use("/api", usermeta);
app.use("/api", geninfo);
app.use("/api", exercises);
app.use("/api", dietSlots);
app.use("/api", usercalls);
app.use("/api", product);
app.use("/api", nutritionist);

app.get("/test", (req, res) => {
  res.send("App restartedss");
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
