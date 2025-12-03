const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    githubId: String,
    username: String,
    email: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
