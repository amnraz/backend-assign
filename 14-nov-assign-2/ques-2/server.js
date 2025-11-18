const express = require("express");
const ticketRoutes = require("./routes/ticketRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());

// Routes
app.use("/tickets", ticketRoutes);

// 404 for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

app.listen(PORT, () => {
  console.log(`✅ Ticketing system running at http://localhost:${PORT}`);
});