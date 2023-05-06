const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup = async (req, res) => {
  try {
    // Check if user already exists with the same email address
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Hash the password before storing in the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user object using the request body
    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword
    });

    // Save the user object to the database
    await user.save();

    // Generate and send a JSON web token in the response for further authentication
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(201).json({ success: true, message: 'User created successfully', token });
  } catch (err) {
    // If an error occurs, send a response indicating that the user could not be created
    res.status(500).json({ success: false, message: 'Failed to create user', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    // Check if user exists with the given email address
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    // Check if the password is valid using bcrypt
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    // Generate and send a JSON web token in the response for further authentication
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ success: true, message: 'Logged in successfully', token });
  } catch (err) {
    // If an error occurs, send a response indicating that the user could not be logged in
    res.status(500).json({ success: false, message: 'Failed to login', error: err.message });
  }
};
