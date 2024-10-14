// index.js (or app.js)

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const postRoutess = require('./routes/postRoutess');
const getRoutes = require('./routes/getRoutes'); // Import GET routes
const postRoutes = require('./routes/postRoutes'); // Import POST routes
const updateRoutes = require('./routes/updateRoutes'); // Import UPDATE routes
const deleteRoutes = require('./routes/deleteRoutes'); // Import DELETE routes
const mailRoutes = require('./routes/mailerroute');
const signupRoutes = require('./routes/signupRoutes');
const loginRoutes = require('./routes/loginRoutes');
const orderRoutes = require('./routes/orderRoutes');

const uri = process.env.MONGODB_URI;

const app = express();
app.use(cors());
app.use(express.json());

// Step 1: Connect to MongoDB using the connection string from the .env file
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('Connection failed:', err));

// Step 2: Use the separated routes
app.use("/api",loginRoutes);
app.use("/api",signupRoutes);
app.use("/api",getRoutes); // Use GET routes under /api
app.use("/api", postRoutes); // Use POST routes under /api
app.use("/api",updateRoutes);//use UPDATE routes under /api
app.use("/api",deleteRoutes);//use DELETE routes under /api
app.use('/api', mailRoutes);
app.use('/api',postRoutess);
app.use('/api',orderRoutes);

// Simple Home Route
app.get("/", (req, res) => {
    res.send("Hello World!");
});



// Step 3: Start the Server
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
