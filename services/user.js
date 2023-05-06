const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const createUser = async (userData) => {
  try {
    const { name, email, password } = userData;

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object with the hashed password
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user object to the database
    await user.save();

    return { success: true, message: "User created successfully", user };
  } catch (error) {
    return { success: false, message: "Failed to create user", error };
  }
};

const getUserByEmail = async (email) => {
  try {
    // Retrieve the user with the specified email address from the database
    const user = await User.findOne({ email });

    // If the user is found, return the user object
    if (user) {
      return { success: true, message: "User retrieved successfully", user };
    } else {
      // If the user is not found, return an error message
      return { success: false, message: "User not found" };
    }
  } catch (error) {
    return { success: false, message: "Failed to retrieve user", error };
  }
};

const authenticateUser = async (email, password) => {
  try {
    // Retrieve the user with the specified email address from the database
    const user = await User.findOne({ email });

    // If the user is found, compare the provided password with the hashed password in the database
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        // If the password is correct, create a JWT token for the user
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        return {
          success: true,
          message: "User authenticated successfully",
          user,
          token,
        };
      } else {
        // If the password is incorrect, return an error message
        return { success: false, message: "Invalid password" };
      }
    } else {
      // If the user is not found, return an error message
      return { success: false, message: "User not found" };
    }
  } catch (error) {
    return { success: false, message: "Failed to authenticate user", error };
  }
};

module.exports = {
  createUser,
  getUserByEmail,
  authenticateUser,
};
