const mongoose = require("../config/db");

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model("Student", studentSchema);
