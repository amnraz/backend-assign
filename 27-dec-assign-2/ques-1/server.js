require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const userRoutes = require("./routes/user.routes");
const profileRoutes = require("./routes/profile.routes");

const app = express();
app.use(express.json());

connectDB();

app.use(userRoutes);
app.use(profileRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
