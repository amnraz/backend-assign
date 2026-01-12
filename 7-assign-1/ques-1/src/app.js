const express = require("express");
require("dotenv").config();

const emailRoutes = require("./routes/email.routes");

const app = express();

app.use("/", emailRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
