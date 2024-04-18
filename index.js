// index.js

const express = require('express');
const mongoose = require('mongoose');
const config = require('./app/config/db.config');
const syncHandler = require('./app/middleware/syncHandler');
const errorHandler = require('./app/middleware/ErrorHandler');
const customerRoutes = require('./app/routes/CustomerRoutes')

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = config.url;

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(express.json());

// Routes
app.use('/api/customers', syncHandler(customerRoutes));

// Error handling middleware for 404 Not Found
app.use((req, res, next) => {
    const err = new AppError(`Can't find ${req.originalUrl} on this server!`, 404);
    next(err);
});

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

process.on('unhandledRejection', err => {
    console.log('UnExpected Error Occurred! Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
