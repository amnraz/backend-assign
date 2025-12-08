const express = require("express");
const itemsRouter = require("./src/routes/items.routes");

const app = express();
app.use(express.json());

app.use("/items", itemsRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
