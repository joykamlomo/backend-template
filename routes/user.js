const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// User signup route
router.post("/signup", async (req, res) => {
  try {
    // Check if the user already exists
    const userExists = await userController.getUserByEmail(req.body.email);
    if (userExists) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // Create the user
    const newUser = await userController.createUser(req.body);

    // Send a response indicating that the user was successfully created
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (err) {
    // If an error occurs, send a response indicating that the user could not be created
    res.status(500).json({
      success: false,
      message: "Failed to create user",
      error: err.message,
    });
  }
});

// User login route
router.post("/login", async (req, res) => {
  try {
    // Check if the user exists
    const user = await userController.getUserByEmail(req.body.email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed",
      });
    }

    // Check if the password is correct
    const passwordMatches = await userController.comparePasswords(
      req.body.password,
      user.password
    );
    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed",
      });
    }

    // Send a response indicating that the user was successfully logged in
    res.status(200).json({
      success: true,
      message: "Authentication successful",
      user: user,
    });
  } catch (err) {
    // If an error occurs, send a response indicating that the user could not be authenticated
    res.status(500).json({
      success: false,
      message: "Failed to authenticate user",
      error: err.message,
    });
  }
});

module.exports = router;
