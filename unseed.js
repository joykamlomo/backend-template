const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/user');

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to database'))
  .catch(err => console.log(err));

const unseedUsers = async () => {
  try {
    // Delete all users from the database
    await User.deleteMany({});

    console.log('Users unseeded successfully');
  } catch (err) {
    console.log(err);
  }
};

unseedUsers()
  .then(() => mongoose.disconnect())
  .catch(err => console.log(err));
