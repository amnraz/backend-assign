const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  saleId: Number,
  product: String,
  category: String,
  amount: Number,
  date: Date,
  region: String
});

module.exports = mongoose.model("Sale", saleSchema);
