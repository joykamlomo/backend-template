const mongoose = require("mongoose");

// check if model has already been compiled
const User = mongoose.models.User
  ? mongoose.model("User")
  : mongoose.model("User", new mongoose.Schema({
      firstname: {
        type: String,
        required: true,
      },
      lastname: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
    }));

module.exports = User;
