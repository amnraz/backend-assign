const express = require("express");
const connectDB = require("./config/db");

const app = express();
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Orders Aggregation API Running");
});

app.listen(8080, () => console.log("Server running on port 8080"));
