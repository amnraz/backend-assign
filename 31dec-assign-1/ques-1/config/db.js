const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/schoolDB")
  .then(() => console.log("DB Connected"))
  .catch(err => console.error(err));

module.exports = mongoose;
