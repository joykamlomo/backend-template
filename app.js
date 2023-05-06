const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');

// Load environment variables from .env file
dotenv.config();

// Connect to the database
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error(err));

// Create a new Express app
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Mount the userRoutes router at the /users path
app.use('/users', userRoutes);

// Start the server
app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));
