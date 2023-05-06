const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const routes = require('./routes/api');

// Initialize express app
const app = express();

// Middleware for parsing request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware for logging HTTP requests
app.use(morgan('dev'));

// Middleware for handling CORS
app.use(cors());

// Middleware for authentication
app.use(passport.initialize());
require('./config/passport')(passport);

// API routes
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
