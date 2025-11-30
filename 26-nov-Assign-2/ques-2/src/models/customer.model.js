const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  _id: String,
  name: String,
  city: String
});

module.exports = mongoose.model("Customer", customerSchema);
