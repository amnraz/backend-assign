const mongoose = require("mongoose");

// Address Subdocument Schema
const addressSchema = new mongoose.Schema(
  {
    street: String,
    city: String,
    state: String,
    country: {
      type: String,
      default: "India"
    },
    pincode: Number
  },
  { _id: false }
);

// User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    age: Number,
    addresses: [addressSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
