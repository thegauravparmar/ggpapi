// index.js (or app.js)

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

//const postRoutess = require("./routes/postRoutess");hellobih
const getRoutes = require("./routes/getRoutes"); // Import GET routes
const postRoutes = require("./routes/postRoutes"); // Import POST routes
const updateRoutes = require("./routes/updateRoutes"); // Import UPDATE routes
const deleteRoutes = require("./routes/deleteRoutes"); // Import DELETE routes
const mailRoutes = require("./routes/mailerroute");
const signupRoutes = require("./routes/signupRoutes");
const loginRoutes = require("./routes/loginRoutes");
const orderRoutes = require("./routes/orderRoutes");
const getProduct = require("./routes/getProduct");
const postProduct = require("./routes/postProduct");
const updateProduct = require("./routes/updateProduct");
const deleteProduct = require("./routes/deleteProduct");
const flyerRoutes = require("./routes/flyerRoutes");
const faqRoutes = require("./routes/faqRoutes");
const bodyRoutes = require("./routes/bodydataRoutes");
const trackmeal = require("./routes/trackmealcontroller");
const fooditems = require("./routes/fooditemscontroller");
const version = require("./routes/versioncontroller");

const uri = process.env.MONGODB_URI;

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected in worker ${process.pid}"))
  .catch((err) => console.log("Connection failed:", err));

// Step 2: Use the separated routes
app.use("/api", loginRoutes);
app.use("/api", signupRoutes);
app.use("/api", getRoutes); // Use GET routes under /api
app.use("/api", postRoutes); // Use POST routes under /api
app.use("/api", updateRoutes); //use UPDATE routes under /api
app.use("/api", deleteRoutes); //use DELETE routes under /api
app.use("/api", mailRoutes);
//app.use('/api', postRoutess);
app.use("/api", orderRoutes);
app.use("/api", getProduct);
app.use("/api", postProduct);
app.use("/api", updateProduct);
app.use("/api", deleteProduct);
app.use("/api", flyerRoutes);
app.use("/api", faqRoutes);
app.use("/api", bodyRoutes);
app.use("/api", trackmeal);
app.use("/api", fooditems);
app.use("/api", version);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Home Route
app.get("/", (req, res) => {
  res.send(`Hello from worker ${process.pid}`);
});

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Worker ${process.pid} started on port ${PORT}`);
});

module.exports = app;
