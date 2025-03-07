const mongoose = require("mongoose");
const { eventNames } = require("../models/user_model");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.db_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
