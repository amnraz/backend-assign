const mongoose = require("../config/db");

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model("Course", courseSchema);
