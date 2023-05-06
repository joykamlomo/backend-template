// db.js

// Import the necessary packages
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load the environment variables from the .env file
dotenv.config();

// Retrieve the connection string and database name from the environment variables
const uri = process.env.DB_URI;
const dbName = process.env.DB_NAME;

// Connect to the database
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: dbName,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Export the Mongoose connection object
module.exports = mongoose.connection;
