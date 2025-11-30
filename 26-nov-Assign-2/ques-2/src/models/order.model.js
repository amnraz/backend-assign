const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  _id: Number,
  customerId: String,
  amount: Number,
  product: String
});

module.exports = mongoose.model("Order", orderSchema);
