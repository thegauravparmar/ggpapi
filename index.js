// index.js (or app.js)

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const getRoutes = require('./routes/getRoutes'); // Import GET routes
const postRoutes = require('./routes/postRoutes'); // Import POST routes

const app = express();
app.use(cors());
app.use(express.json());

// Step 1: Connect to MongoDB using the connection string from the .env file
mongoose.connect('mongodb+srv://organikkanpur:d6fpbA3irM6wQgSC@customerdb.mvlkwaq.mongodb.net/customerDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('Connection failed:', err));

// Step 2: Use the separated routes
app.use('/api', getRoutes); // Use GET routes under /api
app.use('/api', postRoutes); // Use POST routes under /api

// Simple Home Route
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Step 3: Start the Server
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
