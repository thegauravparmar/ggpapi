const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Step 1: Connect to MongoDB
mongoose.connect('mongodb+srv://organikkanpur:d6fpbA3irM6wQgSC@customerdb.mvlkwaq.mongodb.net/customerDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('Connection failed:', err));

// Step 2: Define a Mongoose Schema and Model for `sales`
const saleSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: String
});

const Sale = mongoose.model('user2', saleSchema); // Maps to the `sales` collection

// Step 3: Create Route to Fetch Data from `sales`
app.get('/api/sales', async (req, res) => {
    try {
        const sales = await Sale.find(); // Fetch all sales from MongoDB
        res.json(sales); // Send sales as JSON response
    } catch (err) {
        res.status(500).json({ message: 'Error fetching sales', error: err });
    }
});
app.get("/", (req, res) => {
    res.send("Hello World!");
  });

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
