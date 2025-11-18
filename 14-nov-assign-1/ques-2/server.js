const express = require('express');
const app = express();
const port = 3000;

app.get("/user/get", (req, res) => {
    res.json({ "id": 1, "name": "John Doe", "email": "john@example.com" });
});


app.get("/user/list", (req, res) => {
    const users = [{ "id": 1, "name": "John Doe", "email": "john@example.com" },
    { "id": 2, "name": "Jane Smith", "email": "jane@example.com " },
      {"id": 3, "name": "Alice Johnson", "email": "alice@example.com"}
    ];
    res.json(users)
});

app.use((req, res) => {
    res.status(404).send("404 Not Found");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});