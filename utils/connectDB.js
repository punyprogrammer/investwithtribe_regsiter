const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
