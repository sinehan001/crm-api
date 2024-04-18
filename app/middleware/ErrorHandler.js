// app/middleware/ErrorHandler.js
const AppError = require('./AppError');

// Error handling middleware
const errorHandler = (err, req, res, next) => {
    if (err.statusCode && err.statusCode === 404) {
        const err = new AppError(`Can't find ${req.originalUrl} on this server!`, 404);
        next(err);
    } else {
        console.error(err.stack);
        res.status(500).send('Something went wrong!');
    }
};

module.exports = errorHandler;