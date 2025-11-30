const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/ordersDB");
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.error("Error connecting DB:", err.message);
  }
};

module.exports = connectDB;
