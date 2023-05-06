const faker = require('faker');
const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/user');

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to database'))
  .catch(err => console.log(err));

const seedUsers = async () => {
  try {
    // Delete all existing users
    await User.deleteMany({});

    // Create an array of user objects with fake data
    const users = Array.from({ length: 10 }, async () => ({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      password: await bcrypt.hash(faker.internet.password(), 10)
    }));

    // Save the user objects to the database
    await User.insertMany(users);

    console.log('Users seeded successfully');
  } catch (err) {
    console.log(err);
  }
};

seedUsers()
  .then(() => mongoose.disconnect())
  .catch(err => console.log(err));
