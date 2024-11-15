// index.js (or app.js)

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cluster = require('cluster');
const os = require('os');
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
const getProduct = require('./routes/getProduct');
const postProduct = require('./routes/postProduct');
const updateProduct = require('./routes/updateProduct');
const deleteProduct = require('./routes/deleteProduct');
const flyerRoutes = require('./routes/flyerRoutes');
const faqRoutes = require('./routes/faqRoutes');
const bodyRoutes = require('./routes/bodydataRoutes');

const uri = process.env.MONGODB_URI;
const numCPUs = os.cpus().length;

const app = express();
app.use(cors());
app.use(express.json());
// if (cluster.isMaster) {
//     console.log(`Master ${process.pid} is running`);

//     // Fork workers for each CPU
//     for (let i = 0; i < numCPUs; i++) {
//         cluster.fork();
//     }

//     // Restart worker if it exits
//     cluster.on('exit', (worker, code, signal) => {
//         console.log(`Worker ${worker.process.pid} died. Starting a new worker...`);
//         cluster.fork();
//     });
// } else {
    // Worker process: set up the Express server and MongoDB connection


    // Step 1: Connect to MongoDB using the connection string from the .env file
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => console.log('MongoDB connected in worker ${process.pid}'))
        .catch((err) => console.log('Connection failed:', err));

    // Step 2: Use the separated routes
    app.use("/api", loginRoutes);
    app.use("/api", signupRoutes);
    app.use("/api", getRoutes); // Use GET routes under /api
    app.use("/api", postRoutes); // Use POST routes under /api
    app.use("/api", updateRoutes);//use UPDATE routes under /api
    app.use("/api", deleteRoutes);//use DELETE routes under /api
    app.use('/api', mailRoutes);
    app.use('/api', postRoutess);
    app.use('/api', orderRoutes);
    app.use("/api", getProduct);
    app.use("/api", postProduct);
    app.use("/api", updateProduct);
    app.use("/api", deleteProduct);
    app.use("/api", flyerRoutes);
    app.use("/api", faqRoutes);
    app.use("/api", bodyRoutes)

    // Home Route
    app.get("/", (req, res) => {
        res.send(`Hello from worker ${process.pid}`);
    });


    // Start Server
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Worker ${process.pid} started on port ${PORT}`);
    });
// }

module.exports = app;

