// app.js

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Set up static file serving
app.use(express.static("public"));

// Set up view engine
app.set("view engine", "ejs");

// Set up routes
const userRoutes = require("./routes/user");
app.use("/users", userRoutes);

// Start server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
