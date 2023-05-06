const mongoose = require('mongoose');
const { db } = require('./config');

const connectDB = async () => {
  try {
    await mongoose.connect(db.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
