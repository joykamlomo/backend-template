// controllers/userController.js

// Import the User model
const User = require("../models/user");

// Define the controller methods
exports.createUser = async (req, res) => {
  try {
    // Create a new user object using the request body
    const user = new User(req.body);

    // Save the user object to the database
    await user.save();

    // Send a response indicating that the user was successfully created
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: user,
    });
  } catch (err) {
    // If an error occurs, send a response indicating that the user could not be created
    res.status(500).json({
      success: false,
      message: "Failed to create user",
      error: err.message,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    // Retrieve the user with the specified ID from the database
    const user = await User.findById(req.params.id);

    // If the user is found, send a response with the user object
    if (user) {
      res.status(200).json({
        success: true,
        message: "User retrieved successfully",
        user: user,
      });
    } else {
      // If the user is not found, send a response indicating that no user was found with the specified ID
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (err) {
    // If an error occurs, send a response indicating that the user could not be retrieved
    res.status(500).json({
      success: false,
      message: "Failed to retrieve user",
      error: err.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    // Find the user with the specified ID and update their details using the request body
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    // If the user is found and updated, send a response with the updated user object
    if (user) {
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        user: user,
      });
    } else {
      // If the user is not found, send a response indicating that no user was found with the specified ID
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (err) {
    // If an error occurs, send a response indicating that the user could not be updated
    res.status(500).json({
      success: false,
      message: "Failed to update user",
      error: err.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    // Find the user with the specified ID and remove them from the database
    const user = await User.findByIdAndRemove(req.params.id);

    // If the user is found and removed, send a response indicating that the user was deleted
    if (user) {
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } else {
      // If the user is not found, send a response indicating that no user was found with the specified ID
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
      error: err.message,
    });
  }
};
