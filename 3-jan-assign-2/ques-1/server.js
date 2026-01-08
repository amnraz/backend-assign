require("dotenv").config();
const express = require("express");
const passport = require("passport");
const connectDB = require("./config/db");

const app = express();

// DB
connectDB();

// Passport
require("./config/passport");
app.use(passport.initialize());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
